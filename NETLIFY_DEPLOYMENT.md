# Netlify Deployment Guide for LibertyPay

## Prerequisites
- GitHub repository: https://github.com/mzaouini/lb3
- Netlify account connected to GitHub
- Supabase project with database set up

## Build Settings

In your Netlify dashboard, configure these settings:

### Basic Build Settings
- **Build command:** `pnpm install && pnpm build`
- **Publish directory:** `dist`
- **Node version:** 22 (set in netlify.toml)

### Environment Variables

Add these environment variables in Netlify Dashboard → Site settings → Environment variables:

#### Required (Supabase)
```
DATABASE_URL=postgresql://[user]:[password]@[host]:5432/[database]
```

#### Auto-injected by Manus (copy from local .env if needed)
```
BUILT_IN_FORGE_API_KEY=your_forge_api_key
BUILT_IN_FORGE_API_URL=your_forge_api_url
JWT_SECRET=your_jwt_secret
OAUTH_SERVER_URL=your_oauth_server_url
OWNER_NAME=your_owner_name
OWNER_OPEN_ID=your_owner_open_id
VITE_ANALYTICS_ENDPOINT=your_analytics_endpoint
VITE_ANALYTICS_WEBSITE_ID=your_website_id
VITE_APP_ID=your_app_id
VITE_APP_LOGO=https://your-logo-url.com/logo.png
VITE_APP_TITLE=LibertyPay
VITE_OAUTH_PORTAL_URL=your_oauth_portal_url
```

## Deployment Steps

### Option 1: Automatic Deployment (Recommended)
1. Connect your GitHub repository (mzaouini/lb3) to Netlify
2. Netlify will auto-detect the `netlify.toml` configuration
3. Add all environment variables listed above
4. Click "Deploy site"
5. Netlify will automatically redeploy on every push to master branch

### Option 2: Manual Deployment
1. Build locally: `pnpm build`
2. Upload the `dist` folder to Netlify via drag-and-drop
3. Note: Environment variables still need to be set in Netlify dashboard

## Troubleshooting

### "Page not found" Error
- **Cause:** Missing `_redirects` file or incorrect publish directory
- **Solution:** Ensure `public/_redirects` exists and publish directory is set to `dist`

### Build Fails
- **Check build logs** in Netlify dashboard
- **Common issues:**
  - Missing environment variables
  - Node version mismatch (should be 22)
  - pnpm not installed (netlify.toml handles this)

### White Screen After Deployment
- **Check browser console** for errors
- **Verify environment variables** are set correctly
- **Check API endpoints** are accessible from Netlify domain

## Post-Deployment

### Load Seed Data
After successful deployment, load the test data into your Supabase database:

1. Open Supabase Dashboard → SQL Editor
2. Run the script from `supabase_seed_data.sql`
3. This creates the test user (Meryem) and sample data

### Test the App
- Phone: +212 612345678
- OTP: 123456 (fixed for testing)
- PIN: 1234

## Custom Domain (Optional)

To use a custom domain:
1. Go to Netlify Dashboard → Domain settings
2. Add your custom domain
3. Configure DNS records as instructed by Netlify
4. SSL certificate will be auto-generated

## Support

For deployment issues:
- Check Netlify build logs
- Verify all environment variables are set
- Ensure Supabase database is accessible
- Review the `netlify.toml` configuration
