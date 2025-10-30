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
- [x] Create Transaction Details screen (tap transaction → full breakdown with amount, fee, bank details, reference, timeline)
- [x] Add Email Receipt option in Transaction Details screen
- [x] Add Receipt History section in Profile screen (marked as BETA, coming soon)
- [x] Create Push Notifications / Notification Center (BETA feature)
- [x] Add mock notifications for transaction approvals and completions (5 notifications)
- [x] Expand transaction history to 5-6 transactions across October and September
- [x] Add realistic transaction dates and amounts (now showing 10 transactions: 5 advances + 5 fees)
- [x] Create Detailed Employer Info screen (BETA feature)
- [x] Show Employee ID, Department, Join date, Contract type
- [x] Add Card Transaction History section in Cards screen
- [x] Show card transactions: Coffee shop, Grocery, Online shopping (5 transactions)
- [x] Create Limits & Settings display (BETA feature)
- [x] Show daily advance limit (5,000 Dhs) and monthly limit (8,000 Dhs)
- [x] Display current month usage (3,120 Dhs) and remaining (4,880 Dhs)
- [x] Add notification bell icon to Home screen with unread indicator
- [x] Add all new screens to Profile menu with BETA badges
- [x] Add routes for all new screens in App.tsx

## Fee Deduction Clarification
- [x] Update Review screen message to clarify fee is deducted immediately
- [x] Change text from "amount and service fee will be deducted from salary" to "amount will be deducted from salary, fee already deducted"
- [x] Update transaction history to show fee as separate debit transaction (-60 Dhs)
- [x] Show advance as credit (+2,000 Dhs) and fee as debit (-60 Dhs) separately
- [x] Update Home screen to show latest 2 transactions (advance + fee)
- [x] Color code: Green for credits (+), Red for debits (-)
- [x] Add subtitle to each transaction (Meryem - ACME for advances, Transaction Fee for fees)

## Final Polishing (User Requested)
- [x] Remove "Made with Manus" branding from ManusDialog component
- [x] Update login dialog text to remove Manus references ("Please login to continue" + "Login" button)
- [x] Copy dummy ID card images to project (front and back)
- [x] Copy dummy liveness photo to project
- [x] Update ScanIDFront to show dummy ID front image
- [x] Update ScanIDBack to show dummy ID back image
- [x] Update LivenessCheck to show dummy face photo
- [x] All images cropped and placed in /client/public/demo/ folder
- [ ] Test complete onboarding flow with dummy images
- [ ] Push updated code to GitHub for Vercel redeployment

## Final UX/UI Polish & Fixes (User Requested)
- [x] 0. Verify color scheme consistency (navy/mint/gold) with gradient overlays
- [x] 1. Redesign card: LibertyPay logo top-right, naps logo left (smaller), remove "A" badge, keep chip/contactless
- [ ] 2. Add landing page with login screen and signup CTA below
- [ ] 3. Prefill ALL input fields throughout app for smooth demo flow
- [ ] 4. Ensure UX/color consistency across iOS/Android/browsers (mobile-first)
- [x] 5. Replace %VITE_APP_TITLE% in browser tab with 3-dash Liberty logo favicon
- [ ] 6. Fix Profile screen not working (investigate routing/component issue)
- [x] 7. Fix contrast on Notifications & Transaction History screens (use white or original navy/mint)
- [x] 8. Update Card tab transactions: +2000 Dhs in, -60 Dhs out, balance 1500 Dhs
- [x] 8a. Add realistic Moroccan transactions: Café Casablanca -45, Marjane -320, Zara -850, Pizza Hut -180, Afriquia -400
- [x] 8b. Ensure all card transactions sum correctly to show 1500 Dhs balance

## Additional UX Refinements (User Requested)
- [x] Fix Transaction History - show only salary advance transactions (already correct, no card purchases)
- [x] Improve Profile screen readability with better contrast/white background
- [x] Update all CTAs to use color palette (navy/mint/teal)
- [x] Remove "Biometric enable" and "Privacy Policy" from Profile security section
- [x] Merge Employee Details with Official Details in Profile (comprehensive page with all info)
- [x] Move "Change PIN" and "Limits & Usage" from Profile to Cards tab
- [x] Update favicon to orange 3-dash logo on white background

## Flow Improvements After Yalla Button (User Requested)
- [x] Add Select Account screen after Review (choose bank account for disbursement)
- [x] Add OTP Verification screen after Select Account (6-digit code with auto-focus)
- [x] Update Success screen to show proper confirmation (already complete)
- [x] Navigate to Home after Success (Done button goes to /app/home)
- [x] Update Home balance after successful advance (deducts amount from available balance)
- [ ] Add new transaction to history dynamically (advance + fee)
- [ ] Ensure balance consistency across Home and Transaction screens
- [ ] Fix screen colors throughout the flow for consistency

## Transaction History Value Fix
- [x] Fix transaction amounts - showing 20 Dhs instead of 2,000 Dhs (converted to centimes)
- [x] Fix service fee - showing 0.6 Dhs instead of 60 Dhs (converted to centimes)
- [x] Fix total calculation to match actual transaction values (now shows correct sum)
- [x] Ensure consistency with Home screen transaction display

## Profile Enhancement
- [x] Add address field to Profile page (full address: Anfa Place Living, Building A, Apt 502)
- [x] Add city field to Profile page (Casablanca)
- [x] Add postal code field to Profile page (20250)
- [x] Ensure fields are properly styled and consistent with existing design

## Transaction Tab Restructure
- [x] Show "Total Earned Wage Access" in green (sum of all advances)
- [x] Show service fees in red, lowercase, smaller font below each advance
- [x] Calculate October total as 3,500 Dhs (2,000 + 1,000 + 500)
- [x] Group transactions by month with monthly summary totals
- [x] Ensure layout reflects EWA (Earned Wage Access) concept clearly

## Transaction Details Fix
- [x] Fix Amount Breakdown to show fee as deduction (not addition)
- [x] Show "Total Received" as Requested Amount minus Service Fee (2,000 - 60 = 1,940 Dhs)
- [x] Display service fee in red with minus sign (-60 Dhs)
- [x] Change "Total Amount" to "Amount Received" for clarity

## Transaction Month Filter
- [x] Show only current month (October 2025) transactions
- [x] Remove September 2025 section
- [x] Update total to reflect only October: 3,500 Dhs

## Transaction UI Fixes
- [x] Fix Total EWA showing 6,700 Dhs - now correctly shows 3,500 Dhs (October only)
- [x] Update bank account details (LibertyPay Naps Account, XXXX 1983, formatted IBAN)
- [x] Improve contrast/readability with lighter text (opacity-90 instead of opacity-75)

## Dynamic Transaction Creation (Session-Based)
- [x] Validate request amount against available balance (cannot exceed)
- [x] Create new transaction after OTP success (advance + fee)
- [x] Update Home screen with new transaction in recent activity
- [x] Update Home balance to reflect new advance
- [x] Update Transactions tab with new transaction
- [x] Update Total EWA in Transactions tab
- [x] Use sessionStorage to persist changes during app session only
- [x] Reset balance and transactions on login (fresh session)

## Card Design Update
- [x] Change card background from navy/purple to mint/teal gradient (#00d4aa to #00a896)
- [x] Match the green gradient shown in reference image
- [x] Ensure text remains readable on new background (white decorative pattern)

## Card Hover Animation
- [x] Add subtle hover effect to card (lift -2px + enhanced shadow)
- [x] Smooth transition (300ms) for interactive feel
- [x] Maintain premium card aesthetic with cursor pointer

## Night Mode (Manual Toggle)
- [ ] Create theme context/store for dark/light mode state
- [ ] Add toggle button in Profile screen
- [ ] Save theme preference to localStorage
- [ ] Lighten colors across all screens for better contrast in dark mode
- [ ] Adjust text colors to ensure readability on dark backgrounds
- [ ] Update card gradients to work well in both themes
- [ ] Enhance button and CTA visibility in night mode
- [ ] Add smooth transitions between themes
- [ ] Test all screens for proper contrast ratios

## Dark/Light Mode Toggle (User Requested)
- [x] Create theme store with localStorage persistence
- [x] Add theme toggle button in Profile screen
- [x] Implement dark mode color palette with lighter colors for better contrast
- [x] Update all screens to use semantic colors (bg-background, bg-card, etc.)
- [x] Add smooth transitions between theme changes (0.3s ease)
- [x] Update CSS variables for dark mode (lighter navy, brighter teal/mint)
- [x] Replace hardcoded bg-gray-50 with bg-background across all app screens
- [x] Replace hardcoded bg-white borders with bg-card border-border for navigation bars
- [x] Test dark mode on all screens (Home, Cards, Transactions, Profile, etc.)

## Loading Animation Enhancement
- [x] Add loading/processing screen between OTP verification and success screen
- [x] Show "Money is being sent to your account" message
- [x] Add animated money stack icon with pulse/bounce effect
- [x] Display 2-3 second loading animation before showing success

## Bug Fixes (Animation Not Showing)
- [x] Fix Review screen to navigate to OTP verification instead of directly to success
- [x] Fix SelectAccount screen to navigate to Review instead of directly to OTP
- [x] Ensure transaction flow goes: Select Account → Review → OTP → Processing Animation → Success

## Review Screen Button Fix
- [x] Change Review screen button text from "..." to "Yalla"
- [x] Ensure complete flow: Select Account → Review (click Yalla) → OTP → Processing Animation → Success → Home

## Processing Animation Enhancement - USD Bills
- [x] Replace generic money stack with realistic USD $100 dollar bills
- [x] Add green color scheme matching real US currency
- [x] Include USD bill details: "USA", "$", "100", "ONE HUNDRED"
- [x] Create 3D layered effect with 3 stacked bills
- [x] Add decorative border patterns for authenticity

## Color Palette Consistency Audit
- [x] Review screen - sync with Liberty Pay colors (navy, teal, mint, gold)
- [x] Success screen - sync with Liberty Pay colors (already using navy + mint)
- [x] ProcessingTransaction screen - sync with Liberty Pay colors (navy background)
- [x] OTPVerification screen - sync with Liberty Pay colors (already using liberty-gradient)
- [x] EnterAmount screen - sync with Liberty Pay colors (already using navy + mint)
- [x] SelectAccount screen - sync with Liberty Pay colors (already using navy + mint)
- [x] Ensure all cards use consistent gradient styles matching Home/Cards screens

## Success Screen Fee Breakdown Update
- [x] Update Success screen to show detailed fee breakdown
- [x] Display Service Fee HT: 50 Dhs
- [x] Display VAT (20%): 10 Dhs
- [x] Display Service Fee TTC: 60 Dhs (total for fee receipt)
- [x] Update download receipt to separate advance and fee sections
- [x] Update share receipt to separate advance and fee
- [x] Show only advance amount (500 Dhs) as "will be transferred"
- [x] Clarify that fee is charged separately, not added to transfer amount
- [x] Fee receipt shows as separate service charge (HT + VAT = TTC)
