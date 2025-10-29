import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Salary Advances
  salaryAdvances: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserSalaryAdvances(ctx.user.id);
    }),
    
    getAvailableBalance: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserAvailableBalance(ctx.user.id);
    }),
    
    create: protectedProcedure
      .input(z.object({
        bankAccountId: z.number(),
        amount: z.number().positive(),
        serviceFee: z.number().min(0),
      }))
      .mutation(async ({ ctx, input }) => {
        const totalAmount = input.amount + input.serviceFee;
        
        await db.createSalaryAdvance({
          userId: ctx.user.id,
          bankAccountId: input.bankAccountId,
          amount: input.amount,
          serviceFee: input.serviceFee,
          totalAmount,
          status: "pending",
          requestedAt: new Date(),
        });
        
        // Create transaction record
        await db.createTransaction({
          userId: ctx.user.id,
          type: "salary_advance",
          amount: totalAmount,
          status: "in_progress",
          description: "Salary Advance Request",
          createdAt: new Date(),
        });
        
        return { success: true };
      }),
  }),

  // Bank Accounts
  bankAccounts: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserBankAccounts(ctx.user.id);
    }),
    
    create: protectedProcedure
      .input(z.object({
        accountTitle: z.string(),
        accountNumber: z.string(),
        bankName: z.string(),
        iban: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.createBankAccount({
          userId: ctx.user.id,
          ...input,
          isDefault: false,
          createdAt: new Date(),
        });
        
        return { success: true };
      }),
  }),

  // Transactions
  transactions: router({
    list: protectedProcedure
      .input(z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      }).optional())
      .query(async ({ ctx, input }) => {
        return db.getUserTransactions(
          ctx.user.id,
          input?.startDate,
          input?.endDate
        );
      }),
  }),

  // Cards
  cards: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserCard(ctx.user.id);
    }),
    
    transactions: protectedProcedure
      .input(z.object({
        cardId: z.number(),
      }))
      .query(async ({ input }) => {
        return db.getCardTransactions(input.cardId);
      }),
  }),
});

export type AppRouter = typeof appRouter;
