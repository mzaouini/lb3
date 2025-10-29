-- LibertyPay Seed Data for Testing
-- Test User: Meryem Guezzour
-- Phone: +212 612345678
-- Fixed OTP: 123456
-- PIN: 1234

-- Insert test user
INSERT INTO users (
  open_id,
  name,
  email,
  login_method,
  role,
  phone_number,
  national_id,
  company,
  net_salary,
  currency,
  kyc_status,
  kyc_completed_at,
  pin,
  address_line1,
  address_line2,
  city,
  postal_code,
  country,
  created_at,
  updated_at,
  last_signed_in
) VALUES (
  'test_user_meryem_001',
  'Meryem Guezzour',
  'meryem.guezzour@libertypay.ma',
  'phone',
  'user',
  '+212612345678',
  'AB100900',
  'Anfa Place',
  8000.00,
  'MAD',
  'verified',
  NOW(),
  '1234', -- Note: In production, this should be hashed
  'Anfa Place',
  'Boulevard de la Corniche',
  'Casablanca',
  '20000',
  'Morocco',
  NOW(),
  NOW(),
  NOW()
) ON CONFLICT (open_id) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  phone_number = EXCLUDED.phone_number,
  national_id = EXCLUDED.national_id,
  company = EXCLUDED.company,
  net_salary = EXCLUDED.net_salary,
  address_line1 = EXCLUDED.address_line1,
  address_line2 = EXCLUDED.address_line2,
  city = EXCLUDED.city,
  postal_code = EXCLUDED.postal_code,
  country = EXCLUDED.country,
  kyc_status = EXCLUDED.kyc_status,
  kyc_completed_at = EXCLUDED.kyc_completed_at,
  updated_at = NOW();

-- Get the user ID for subsequent inserts
DO $$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Get user ID
  SELECT id INTO v_user_id FROM users WHERE open_id = 'test_user_meryem_001';

  -- Insert bank account
  INSERT INTO bank_accounts (
    user_id,
    account_title,
    account_number,
    bank_name,
    iban,
    is_default,
    created_at,
    updated_at
  ) VALUES (
    v_user_id,
    'Meryem Guezzour',
    'XXXX XXXX XXXX 0401',
    'Attijariwafa Bank',
    'MA64011519000001205000000141',
    1,
    NOW(),
    NOW()
  ) ON CONFLICT DO NOTHING;

  -- Insert a completed salary advance (repaid)
  INSERT INTO salary_advances (
    user_id,
    amount,
    service_fee,
    total_amount,
    status,
    bank_account_id,
    requested_at,
    approved_at,
    disbursed_at,
    repaid_at,
    due_date,
    created_at,
    updated_at
  ) VALUES (
    v_user_id,
    2000.00,
    100.00,
    2100.00,
    'repaid',
    (SELECT id FROM bank_accounts WHERE user_id = v_user_id LIMIT 1),
    NOW() - INTERVAL '30 days',
    NOW() - INTERVAL '29 days',
    NOW() - INTERVAL '29 days',
    NOW() - INTERVAL '1 day',
    NOW() - INTERVAL '1 day',
    NOW() - INTERVAL '30 days',
    NOW()
  );

  -- Insert transaction for the salary advance request
  INSERT INTO transactions (
    user_id,
    salary_advance_id,
    type,
    amount,
    status,
    description,
    reference_number,
    created_at,
    completed_at
  ) VALUES (
    v_user_id,
    (SELECT id FROM salary_advances WHERE user_id = v_user_id ORDER BY created_at DESC LIMIT 1),
    'salary_advance',
    2100.00,
    'completed',
    'Salary Advance - 2,000 Dhs + 100 Dhs fee',
    'SA-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-001',
    NOW() - INTERVAL '29 days',
    NOW() - INTERVAL '29 days'
  );

  -- Insert transaction for the repayment
  INSERT INTO transactions (
    user_id,
    salary_advance_id,
    type,
    amount,
    status,
    description,
    reference_number,
    created_at,
    completed_at
  ) VALUES (
    v_user_id,
    (SELECT id FROM salary_advances WHERE user_id = v_user_id ORDER BY created_at DESC LIMIT 1),
    'repayment',
    -2100.00,
    'completed',
    'Repayment - Salary Advance',
    'RP-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-001',
    NOW() - INTERVAL '1 day',
    NOW() - INTERVAL '1 day'
  );

  -- Insert virtual MasterCard
  INSERT INTO cards (
    user_id,
    card_number,
    cardholder_name,
    expiry_month,
    expiry_year,
    cvv,
    card_type,
    status,
    balance,
    daily_limit,
    monthly_limit,
    created_at,
    updated_at
  ) VALUES (
    v_user_id,
    '5412 7512 3456 0401',
    'MERYEM GUEZZOUR',
    12,
    2028,
    '123',
    'MasterCard',
    'active',
    4000.00,
    2000.00,
    10000.00,
    NOW() - INTERVAL '60 days',
    NOW()
  ) ON CONFLICT DO NOTHING;

  -- Insert sample card transactions
  INSERT INTO card_transactions (
    card_id,
    amount,
    merchant,
    category,
    status,
    transaction_date,
    created_at
  ) VALUES
    (
      (SELECT id FROM cards WHERE user_id = v_user_id LIMIT 1),
      -250.00,
      'Marjane Hypermarket',
      'Groceries',
      'completed',
      NOW() - INTERVAL '2 days',
      NOW() - INTERVAL '2 days'
    ),
    (
      (SELECT id FROM cards WHERE user_id = v_user_id LIMIT 1),
      -120.00,
      'Shell Station',
      'Fuel',
      'completed',
      NOW() - INTERVAL '5 days',
      NOW() - INTERVAL '5 days'
    ),
    (
      (SELECT id FROM cards WHERE user_id = v_user_id LIMIT 1),
      -350.00,
      'Morocco Mall',
      'Shopping',
      'completed',
      NOW() - INTERVAL '7 days',
      NOW() - INTERVAL '7 days'
    ),
    (
      (SELECT id FROM cards WHERE user_id = v_user_id LIMIT 1),
      -180.00,
      'Cafe de France',
      'Dining',
      'completed',
      NOW() - INTERVAL '10 days',
      NOW() - INTERVAL '10 days'
    );

END $$;

-- Verify the data
SELECT 
  'User Created' as status,
  id,
  name,
  phone_number,
  net_salary,
  city
FROM users 
WHERE open_id = 'test_user_meryem_001';

SELECT 
  'Bank Account Created' as status,
  account_number,
  bank_name,
  iban
FROM bank_accounts 
WHERE user_id = (SELECT id FROM users WHERE open_id = 'test_user_meryem_001');

SELECT 
  'Available Balance' as status,
  (net_salary * 0.5) as max_advance,
  COALESCE(
    (SELECT SUM(total_amount) 
     FROM salary_advances 
     WHERE user_id = users.id 
     AND status IN ('approved', 'disbursed')),
    0
  ) as outstanding,
  (net_salary * 0.5) - COALESCE(
    (SELECT SUM(total_amount) 
     FROM salary_advances 
     WHERE user_id = users.id 
     AND status IN ('approved', 'disbursed')),
    0
  ) as available_balance
FROM users 
WHERE open_id = 'test_user_meryem_001';

-- Summary
SELECT 
  'Summary' as info,
  COUNT(DISTINCT ba.id) as bank_accounts,
  COUNT(DISTINCT sa.id) as salary_advances,
  COUNT(DISTINCT t.id) as transactions,
  COUNT(DISTINCT c.id) as cards,
  COUNT(DISTINCT ct.id) as card_transactions
FROM users u
LEFT JOIN bank_accounts ba ON ba.user_id = u.id
LEFT JOIN salary_advances sa ON sa.user_id = u.id
LEFT JOIN transactions t ON t.user_id = u.id
LEFT JOIN cards c ON c.user_id = u.id
LEFT JOIN card_transactions ct ON ct.card_id = c.id
WHERE u.open_id = 'test_user_meryem_001'
GROUP BY u.id;
