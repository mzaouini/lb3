# LibertyPay Testing Guide

This guide provides step-by-step instructions for testing the LibertyPay application with dummy data.

## Test User Credentials

### Personal Information
- **Full Name**: Meryem Guezzour
- **Date of Birth**: 01/01/2000
- **National ID (CIN)**: AB100900
- **Phone Number**: +212 612345678
- **Email**: meryem.guezzour@libertypay.ma

### Employment Details
- **Company**: Anfa Place
- **Net Salary**: 8,000 Dhs
- **Available Balance**: 4,000 Dhs (50% of salary)

### Address
- **Address Line 1**: Anfa Place
- **Address Line 2**: Boulevard de la Corniche
- **City**: Casablanca
- **Postal Code**: 20000
- **Country**: Morocco

### Authentication
- **Fixed OTP**: `123456` (for phone verification)
- **Test PIN**: `1234` (for app access)

### Bank Account
- **Bank Name**: Attijariwafa Bank
- **Account Number**: XXXX XXXX XXXX 0401
- **IBAN**: MA64011519000001205000000141
- **Account Holder**: Meryem Guezzour

### Virtual Card
- **Card Number**: 5412 7512 3456 0401
- **Cardholder Name**: MERYEM GUEZZOUR
- **Expiry Date**: 12/2028
- **CVV**: 123
- **Card Type**: MasterCard
- **Status**: Active
- **Balance**: 4,000 Dhs
- **Daily Limit**: 2,000 Dhs
- **Monthly Limit**: 10,000 Dhs

## Setting Up Test Data

### Step 1: Run Database Migration

First, ensure the database schema is created:

1. Open Supabase Dashboard
2. Navigate to SQL Editor
3. Run the migration script from `supabase_migration.sql`

### Step 2: Load Seed Data

Load the test user and sample transactions:

1. In Supabase SQL Editor
2. Run the seed data script from `supabase_seed_data.sql`
3. Verify the data was created successfully (the script includes verification queries)

### Step 3: Verify Data

The seed script will output:
- User created confirmation
- Bank account details
- Available balance calculation
- Summary of all records created

Expected output:
```
User Created: Meryem Guezzour
Bank Account: XXXX XXXX XXXX 0401 (Attijariwafa Bank)
Available Balance: 4,000 Dhs
Summary: 1 bank account, 1 salary advance, 2 transactions, 1 card, 4 card transactions
```

## Testing Workflows

### 1. Onboarding Flow

**Test the complete user registration process:**

1. **Welcome Screen**
   - Open app at `/`
   - Verify Liberty Pay splash screen displays
   - Click "Get Started"

2. **Phone Entry**
   - Enter phone: `612345678`
   - Country code should show: `+212`
   - Click "Continue"

3. **OTP Verification**
   - Enter OTP: `123456`
   - Code should auto-advance between fields
   - Click "Verify"

4. **Create PIN**
   - Enter PIN: `1234`
   - Verify PIN strength indicators
   - Click "Continue"

5. **Confirm PIN**
   - Re-enter PIN: `1234`
   - Should match and proceed
   - Click "Continue"

6. **Personal Details**
   - Fill in Meryem's information:
     - First Name: Meryem
     - Last Name: Guezzour
     - Date of Birth: 01/01/2000
     - National ID: AB100900
     - Company: Anfa Place
     - Net Salary: 8000
   - Click "Complete Registration"

### 2. Salary Advance Flow

**Test requesting a salary advance:**

1. **Home Screen**
   - Verify balance card shows:
     - Net Salary: 8,000 Dhs
     - Available: 4,000 Dhs
   - Click "Get Advance" or "Yalla"

2. **Product Selection (Yalla)**
   - Select "Salary Advance"
   - View product details

3. **Enter Amount**
   - Test amount: `1500` Dhs
   - Verify service fee calculation (5% = 75 Dhs)
   - Total should show: 1,575 Dhs
   - Click "Continue"

4. **Select Bank Account**
   - Should display: Attijariwafa Bank (XXXX 0401)
   - Select the account
   - Click "Continue"

5. **Review Transaction**
   - Verify all details:
     - Amount: 1,500 Dhs
     - Service Fee: 75 Dhs
     - Total: 1,575 Dhs
     - Bank: Attijariwafa Bank
   - Click "Confirm"

6. **Success Screen**
   - Verify success message
   - Check transaction reference number
   - Click "Done" to return home

### 3. Transaction History

**View past transactions:**

1. Navigate to "Transactions" tab
2. Should display:
   - Recent salary advance (2,000 Dhs) - Completed
   - Repayment transaction (-2,100 Dhs) - Completed
3. Test date filters:
   - Last 7 days
   - Last 30 days
   - Custom date range

### 4. Bank Account Management

**Manage linked accounts:**

1. Navigate to "Profile" → "Bank Accounts"
2. Should display existing account:
   - Attijariwafa Bank
   - XXXX 0401
   - Default account badge
3. Test adding new account:
   - Click "Add Account"
   - Fill in details
   - Verify IBAN validation

### 5. Virtual Card

**Test card features:**

1. Navigate to "Cards" tab
2. Verify card display:
   - MasterCard logo
   - Card number: 5412 7512 3456 0401
   - Expiry: 12/28
   - Balance: 4,000 Dhs
3. View card transactions:
   - Marjane Hypermarket: -250 Dhs
   - Shell Station: -120 Dhs
   - Morocco Mall: -350 Dhs
   - Cafe de France: -180 Dhs
4. Test card controls:
   - Lock/Unlock card
   - View limits
   - Transaction history

### 6. Profile Management

**Update user information:**

1. Navigate to "Profile" tab
2. View personal details:
   - Name: Meryem Guezzour
   - Phone: +212 612345678
   - Email: meryem.guezzour@libertypay.ma
3. View official details:
   - CIN: AB100900
   - Company: Anfa Place
   - Net Salary: 8,000 Dhs
   - Address: Anfa Place, Casablanca

## Expected Calculations

### Available Balance Formula
```
Max Advance = Net Salary × 50%
            = 8,000 Dhs × 0.5
            = 4,000 Dhs

Outstanding Advances = Sum of (approved + disbursed advances)
                     = 0 Dhs (previous advance was repaid)

Available Balance = Max Advance - Outstanding
                  = 4,000 Dhs - 0 Dhs
                  = 4,000 Dhs
```

### Service Fee Calculation
```
Service Fee = Advance Amount × 5%

Example:
Amount: 1,500 Dhs
Fee: 1,500 × 0.05 = 75 Dhs
Total: 1,575 Dhs
```

## Testing Checklist

### Onboarding
- [ ] Splash screen displays with Liberty Pay branding
- [ ] Phone number accepts Moroccan format
- [ ] OTP 123456 validates successfully
- [ ] PIN creation accepts 4-digit code
- [ ] PIN confirmation matches
- [ ] Personal details form validates all fields
- [ ] Registration completes and redirects to home

### Salary Advance
- [ ] Home screen shows correct balance (4,000 Dhs)
- [ ] Amount entry validates against available balance
- [ ] Service fee calculates correctly (5%)
- [ ] Bank account selection displays linked accounts
- [ ] Review screen shows all transaction details
- [ ] Success screen confirms transaction
- [ ] Balance updates after advance

### Transactions
- [ ] Transaction list displays all records
- [ ] Date filters work correctly
- [ ] Transaction details show complete information
- [ ] Currency displays as "Dhs" throughout

### Bank Accounts
- [ ] Existing account displays correctly
- [ ] Add account form validates IBAN
- [ ] Default account badge shows
- [ ] Account deletion confirms before removing

### Cards
- [ ] Card displays with MasterCard branding
- [ ] Card number shows last 4 digits
- [ ] Balance displays correctly
- [ ] Transaction history loads
- [ ] Lock/unlock functionality works

### Profile
- [ ] Personal information displays correctly
- [ ] Official details show employment info
- [ ] Address displays complete information
- [ ] Settings accessible from profile

## Currency Display

All amounts should display with **Moroccan Dirham (MAD)** using the **"Dhs"** symbol:

✅ Correct: `1,500 Dhs`  
❌ Incorrect: `1,500 SAR` or `1500 MAD`

### Format Examples
- Balance: `4,000 Dhs`
- Service Fee: `75 Dhs`
- Transaction: `-2,100 Dhs`
- Card Balance: `4,000 Dhs`

## Mobile Responsiveness

Test on different screen sizes:
- iPhone SE (375px)
- iPhone 12/13 (390px)
- iPhone 14 Pro Max (428px)
- Samsung Galaxy S21 (360px)

All screens should:
- Display within max-width: 448px
- Maintain Liberty Pay color scheme
- Show proper spacing and padding
- Have touch-friendly button sizes (min 44px)

## Known Test Limitations

### Development Mode Features
1. **Fixed OTP**: In development, OTP 123456 always works
2. **No SMS**: OTP is not actually sent via SMS
3. **No Real Banking**: Bank accounts are simulated
4. **No Payment Processing**: Transactions are recorded but not processed

### Production Considerations
Before deploying to production:
- [ ] Implement real OTP sending via SMS gateway
- [ ] Add bank account verification
- [ ] Integrate payment processing
- [ ] Add proper PIN hashing
- [ ] Implement rate limiting
- [ ] Add fraud detection
- [ ] Enable two-factor authentication

## Troubleshooting

### OTP Not Accepting
- Ensure you're using: `123456`
- Check browser console for errors
- Clear sessionStorage and retry

### Balance Not Showing
- Verify seed data was loaded
- Check Supabase connection
- Inspect network requests in DevTools

### Navigation Issues
- Clear browser cache
- Check routing configuration
- Verify all routes are registered

### Styling Issues
- Ensure Tailwind CSS is compiled
- Check Liberty Pay color variables
- Verify mobile-container class is applied

## Support

For issues or questions:
1. Check browser console for errors
2. Verify database connection
3. Review seed data in Supabase
4. Check network requests in DevTools

---

**Happy Testing! 🚀**

For production deployment, remember to:
- Replace fixed OTP with real SMS integration
- Implement proper security measures
- Add comprehensive error handling
- Enable monitoring and logging
