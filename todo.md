# LibertyPay TypeScript Migration - TODO

## Database Schema & Models
- [x] Create Abhi data model tables (users, bank_accounts, transactions, salary_advances, cards)
- [x] Add currency field with MAD default
- [ ] Create seed data for testing

## Color Scheme & Styling
- [x] Integrate Liberty Pay color scheme (Navy Blue, Teal, Mint Green, Gold)
- [x] Update tailwind.css with extracted CSS variables from lb repository
- [x] Ensure mobile responsiveness (max-width: 448px)
- [x] Configure Poppins and Neo Sans Arabic fonts

## Onboarding Screens (from lb repository)
- [x] Splash screen
- [x] Welcome/Get Started screen
- [x] Phone Entry screen
- [x] OTP Verification screen
- [x] Create PIN screen
- [x] Confirm PIN screen
- [x] Personal Details screen
- [ ] Verification Identity screen
- [ ] Scan ID Front screen
- [ ] ID Scan Success screen
- [ ] Flip ID screen
- [ ] Scan ID Back screen
- [ ] Confirm ID Scan screen
- [ ] Liveness Check screen
- [ ] Verification Selfie screen
- [ ] Address screen
- [ ] Confirm Address screen
- [ ] Review Details screen
- [ ] Success screen

## Main App Screens (from Abhi APK)
- [x] Home/Dashboard screen (with balance card)
- [x] Product Selection (Yalla) screen
- [x] Enter Amount screen
- [x] Select Account screen (Bank Accounts)
- [x] Official Details screen
- [x] Review transaction screen
- [x] Transaction Success screen
- [x] Transaction History screen
- [x] Profile screen

## Card Management Screens
- [x] Card Home screen (MasterCard display)
- [x] Card History screen
- [x] Card Settings screen

## Currency Integration
- [x] Create currency constants file (MAD with "Dhs" symbol)
- [ ] Replace all SAR references with MAD
- [ ] Update currency display throughout app

## Backend Integration
- [x] Create tRPC procedures for salary advances
- [x] Create tRPC procedures for bank account management
- [x] Create tRPC procedures for transaction management
- [x] Create tRPC procedures for card management
- [x] Integrate MySQL database connection (via Drizzle ORM)

## Bug Fixes
- [x] Fix white screen - app should load onboarding flow like https://libertypaykyc.netlify.app/
- [x] Connect to Supabase PostgreSQL database
- [x] Update DATABASE_URL environment variable
- [x] Migrate schema to Supabase
- [x] Fix TypeScript error: getUserAvailableBalance should be getAvailableBalance in routers.ts
- [x] Add missing createSalaryAdvance function to db.ts
- [x] Add missing createTransaction function to db.ts
- [x] Add missing createBankAccount function to db.ts
- [x] Install @supabase/supabase-js package
- [x] Update server/db.ts to use Supabase client instead of Drizzle ORM

## Testing & Documentation
- [x] Test all screens and flows
- [x] Create comprehensive README.md
- [x] Document integration challenges and solutions
- [ ] Package final project as ZIP

## Deployment
- [x] Push to GitHub repository (lb3)
- [ ] Deploy to Netlify

## Seed Data & Testing
- [x] Create dummy user: Meryem Guezzour (DOB: 01/01/2000, CIN: AB100900)
- [x] Set fixed OTP to 123456 for testing
- [x] Add salary data: 8,000 Dhs net salary at Anfa Place
- [x] Create bank account: XXXX 0401 (Attijariwafa Bank)
- [x] Add sample transactions and salary advance history
- [x] Set available balance to 4,000 Dhs (50% of salary)
- [x] Create comprehensive testing guide (TESTING_GUIDE.md)
