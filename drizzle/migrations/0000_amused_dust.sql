CREATE TYPE "public"."card_status" AS ENUM('active', 'locked', 'expired');--> statement-breakpoint
CREATE TYPE "public"."kyc_status" AS ENUM('pending', 'in_progress', 'verified', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."salary_advance_status" AS ENUM('pending', 'approved', 'disbursed', 'repaid', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."transaction_status" AS ENUM('pending', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('salary_advance', 'repayment', 'fee', 'transfer');--> statement-breakpoint
CREATE TABLE "bank_accounts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bank_accounts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"account_title" varchar(255) NOT NULL,
	"account_number" varchar(50) NOT NULL,
	"bank_name" varchar(255) NOT NULL,
	"iban" varchar(34),
	"is_default" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "card_transactions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "card_transactions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"card_id" integer NOT NULL,
	"amount" integer NOT NULL,
	"merchant" varchar(255),
	"category" varchar(100),
	"status" "transaction_status" DEFAULT 'completed' NOT NULL,
	"transaction_date" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cards" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cards_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"card_number" varchar(19) NOT NULL,
	"cardholder_name" varchar(255) NOT NULL,
	"expiry_month" integer NOT NULL,
	"expiry_year" integer NOT NULL,
	"cvv" varchar(4),
	"card_type" varchar(50) DEFAULT 'virtual' NOT NULL,
	"status" "card_status" DEFAULT 'active' NOT NULL,
	"balance" integer DEFAULT 0 NOT NULL,
	"daily_limit" integer,
	"monthly_limit" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "salary_advances" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "salary_advances_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"amount" integer NOT NULL,
	"service_fee" integer NOT NULL,
	"total_amount" integer NOT NULL,
	"status" "salary_advance_status" DEFAULT 'pending' NOT NULL,
	"bank_account_id" integer,
	"requested_at" timestamp DEFAULT now() NOT NULL,
	"approved_at" timestamp,
	"disbursed_at" timestamp,
	"repaid_at" timestamp,
	"due_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "transactions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"salary_advance_id" integer,
	"type" "transaction_type" NOT NULL,
	"amount" integer NOT NULL,
	"status" "transaction_status" DEFAULT 'pending' NOT NULL,
	"description" text,
	"reference_number" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"open_id" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"login_method" varchar(64),
	"role" "role" DEFAULT 'user' NOT NULL,
	"phone_number" varchar(20),
	"national_id" varchar(50),
	"company" varchar(255),
	"net_salary" integer,
	"currency" varchar(3) DEFAULT 'MAD' NOT NULL,
	"kyc_status" "kyc_status" DEFAULT 'pending' NOT NULL,
	"kyc_completed_at" timestamp,
	"pin" varchar(255),
	"address_line1" text,
	"address_line2" text,
	"city" varchar(100),
	"postal_code" varchar(20),
	"country" varchar(100) DEFAULT 'Morocco',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"last_signed_in" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_open_id_unique" UNIQUE("open_id")
);
--> statement-breakpoint
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "card_transactions" ADD CONSTRAINT "card_transactions_card_id_cards_id_fk" FOREIGN KEY ("card_id") REFERENCES "public"."cards"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cards" ADD CONSTRAINT "cards_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salary_advances" ADD CONSTRAINT "salary_advances_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salary_advances" ADD CONSTRAINT "salary_advances_bank_account_id_bank_accounts_id_fk" FOREIGN KEY ("bank_account_id") REFERENCES "public"."bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_salary_advance_id_salary_advances_id_fk" FOREIGN KEY ("salary_advance_id") REFERENCES "public"."salary_advances"("id") ON DELETE no action ON UPDATE no action;