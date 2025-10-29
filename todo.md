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

## New Feature Requests (User Requested)
- [x] Add CIN Front scanning screen to onboarding
- [x] Add CIN Back scanning screen to onboarding
- [x] Add simulated liveness check screen with camera
- [x] Add "Under Process" confirmation flow after KYC submission
- [x] Change fee structure from 2% commission to fixed 60 Dhs
- [x] Update fee calculation in Enter Amount screen
- [x] Update fee display in Review screen
- [x] Show fixed fee in transaction history
- [x] Add receipt generation option for transactions
- [x] Add receipt download/share functionality
- [x] Update seed data to reflect fixed 60 Dhs fee
- [x] Update onboarding flow routing (Personal Details → ID Scan → Liveness → Complete)
- [x] Add transaction reference number generation
- [x] Add fee breakdown display in Success screen

## Bug Fixes (New)
- [x] Fix white screen on /app/home - content not displaying, only bottom navigation visible
- [x] Remove min-h-screen from mobile-container CSS class to fix layout conflicts

## Home Screen Updates
- [x] Change username from "demo" to "Meryem"
- [x] Update transaction name from "DOrg FName53 DOrg LName53" to "Meryem - ACME"
- [x] Change transaction status from "In Progress" to "Instant"
- [x] Update transaction to show completed/instant status instead of pending
- [x] Update available balance to 4,000 Dhs (50% of 8,000 Dhs salary)
- [x] Update transaction amount to 2,060 Dhs (2,000 + 60 fee)

## New Requirements (User Requested)
- [x] Update Home/Welcome page design to match https://libertypaykyc2.netlify.app/
- [x] Add Liberty Pay logo with orange stacked icon
- [x] Update welcome message and tagline
- [x] Update bank account details to LibertyPay Nasp account (XXXX XXXX XXXX 0401)
- [x] Update IBAN to MA64011519000001205000000141
- [x] Implement dynamic balance calculation based on days worked
- [x] Set base salary to 10,000 Dhs in seed data
- [x] Calculate available EWA as 50% of earned salary (14 days worked = 2,333 Dhs available)
- [x] Update company name to ACME in seed data
- [x] Update SelectAccount screen with new bank details

## Review Screen Updates
- [x] Update account title from "DOrg FName53 DOrg LName53" to "Meryem Guezzour"
- [x] Update account number from "7678232423445532242342424" to "XXXX XXXX XXXX 0401"
- [x] Update bank name from "Bank Muscat" to "LibertyPay Nasp account"

## Quick Amount Selection & Card Screen Updates
- [x] Add quick amount buttons (500 Dhs, 1000 Dhs, 2000 Dhs) to Enter Amount screen
- [x] Update Cards screen to show gradient card design (navy to orange)
- [x] Display card balance on Cards screen (2,333.33 Dhs)
- [x] Show masked card number on card display (**** **** **** 1983)
- [x] Update card design to match reference (prepaid card style)
- [x] Update card holder name to Meryem Guezzour

## Card Design Update (User Reference)
- [x] Update card design to match reference image
- [x] Replace logo with LibertyPay logo (orange stacked 3-bar icon)
- [x] Add decorative teal/mint swirl pattern on right side of card
- [x] Add gold chip with contactless symbol
- [x] Format card number as 5335 7600 0000 1983
- [x] Update cardholder name to MERYEM GUEZZOUR
- [x] Keep Mastercard logo (red/orange circles)
- [x] Use dark purple background (#2d1b4e) matching reference

## Netlify Deployment Fix
- [x] Create netlify.toml configuration file
- [x] Add _redirects file for client-side routing (public/_redirects)
- [x] Document required environment variables
- [x] Create deployment guide with build settings (NETLIFY_DEPLOYMENT.md)

## Branding & Deployment
- [ ] Remove "Made with Manus" branding from footer/UI
- [ ] Document that this is a full-stack app requiring server deployment
- [ ] Note: Netlify (static hosting) won't work without backend migration

## Vercel Deployment Configuration
- [x] Create vercel.json configuration file
- [x] Add Vercel deployment guide (VERCEL_DEPLOYMENT.md)
- [x] Document environment variables for Vercel
- [x] Configure build settings for full-stack deployment
- [x] Add API route rewrites for backend server
- [x] Configure security headers

## UI/UX Fixes (User Reported)
- [x] Fix balance display - now shows 2,333.33 Dhs (50% of 14 days worked from 10,000 Dhs salary)
- [x] Make transaction history dynamic - showing 2 completed transactions
- [x] Update transaction history to show Meryem's transactions (Meryem - ACME)
- [x] Create Card Settings screen with toggles (Online Payment, ATM, Payment Abroad, NFC)
- [x] Add Card Benefits navigation option
- [x] Update Profile screen with Meryem Guezzour name
- [x] Change "National ID / Iqamah" to "CIN" in OfficialDetails screen
- [x] Update OfficialDetails with complete Meryem data (DOB: 01/01/2000, CIN: AB100900, Address: Anfa Place Casablanca, Company: ACME, Salary: 10,000 Dhs)
- [x] Add CardSettings route and screen
- [x] Update Cards screen Settings button to navigate to CardSettings
- [x] Show transaction status as "Instant" with green checkmark for completed transactions
- [x] Calculate total transaction amount dynamically (3,120 Dhs total)

## Demo Enhancement Features
- [x] Create Login screen with phone + PIN authentication (Phone: +212 612345678, PIN: 1234)
- [x] Redirect to Login after onboarding completion
- [x] Show "Welcome Back" message on Login screen
- [x] Create Salary Breakdown screen as NEW BETA FEATURE (not in original Abhi app)
- [x] Show days worked (14/30) and earned salary calculation
- [x] Display available advance amount (50% of earned = 2,333.33 Dhs)
- [x] Add next payday countdown (Nov 30, in 16 days)
- [x] Add visual progress bar for earned vs. total salary
- [x] Add BETA badge to Salary Breakdown feature
- [x] Add "View salary breakdown" link on Home screen
- [x] Show daily rate calculation (333.33 Dhs/day)
- [x] Add "How Earned Wage Access Works" educational section
- [x] Display employer info (ACME) in Salary Breakdown

## Vercel Deployment Fix
- [x] Fix vercel.json output directory to dist/public
- [x] Update routes configuration for proper SPA routing
- [x] Set framework to "vite" for proper detection

## Prefill Demo Data
- [x] Prefill phone number with 0709968035 in PhoneEntry screen (editable)
- [x] Prefill OTP with 123456 in OTPVerification screen (editable)
- [x] Prefill Personal Details with Meryem's data (Name: Meryem Guezzour, CIN: AB100900, Company: ACME, Salary: 10,000 Dhs)
- [x] Make all prefilled fields editable for custom demo data
- [x] Change "National ID / Iqamah" to "CIN (National ID)" in PersonalDetails
- [x] Ensure edited data creates NEW user records (doesn't update Meryem's data)

## Additional Demo Features (User Requested)
- [ ] Create Transaction Details screen (tap transaction → full breakdown with amount, fee, bank details, reference, timeline)
- [ ] Add Email Receipt option in Success screen
- [ ] Add Receipt History section in Profile screen
- [ ] Create Push Notifications / Notification Center (BETA feature)
- [ ] Add mock notifications for transaction approvals and completions
- [ ] Expand transaction history to 5-6 transactions across October and September
- [ ] Add realistic transaction dates and amounts
- [ ] Create Detailed Employer Info screen (BETA feature)
- [ ] Show Employee ID, Department, Join date, Contract type
- [ ] Add Card Transaction History section in Cards screen
- [ ] Show card transactions: Coffee shop, Grocery, Online shopping
- [ ] Create Limits & Settings display
- [ ] Show daily advance limit (5,000 Dhs) and monthly limit (8,000 Dhs)
- [ ] Display current month usage (3,120 Dhs) and remaining (4,880 Dhs)

## Fee Deduction Clarification
- [x] Update Review screen message to clarify fee is deducted immediately
- [x] Change text from "amount and service fee will be deducted from salary" to "amount will be deducted from salary, fee already deducted"
- [x] Update transaction history to show fee as separate debit transaction (-60 Dhs)
- [x] Show advance as credit (+2,000 Dhs) and fee as debit (-60 Dhs) separately
- [x] Update Home screen to show latest 2 transactions (advance + fee)
- [x] Color code: Green for credits (+), Red for debits (-)
- [x] Add subtitle to each transaction (Meryem - ACME for advances, Transaction Fee for fees)
