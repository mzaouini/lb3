# Vercel Deployment Guide for LibertyPay

## Why Vercel?

Vercel supports **full-stack applications** with both frontend and backend, making it perfect for LibertyPay which has:
- React/Vite frontend ✅
- Node.js/Express backend ✅  
- PostgreSQL database (Supabase) ✅

Unlike Netlify (static-only), Vercel can run your server code!

## Prerequisites

- GitHub repository: https://github.com/mzaouini/lb3
- Vercel account (sign up at https://vercel.com)
- Supabase project with database configured

## Quick Start

### 1. Connect GitHub to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your repository: `mzaouini/lb3`
4. Vercel will auto-detect the project settings

### 2. Configure Build Settings

Vercel should auto-detect from `vercel.json`, but verify:

- **Framework Preset:** Other
- **Build Command:** `pnpm install && pnpm build`
- **Output Directory:** `dist`
- **Install Command:** `pnpm install`
- **Node.js Version:** 22.x

### 3. Add Environment Variables

Click "Environment Variables" and add these:

#### Required - Database
```
DATABASE_URL=postgresql://[user]:[password]@[host]:5432/[database]
```
Get this from your Supabase project settings → Database → Connection string

#### Required - Application Secrets
```
JWT_SECRET=your_jwt_secret_here
VITE_APP_TITLE=LibertyPay
VITE_APP_LOGO=https://your-logo-url.com/logo.png
```

#### Optional - Manus Integration (if using)
```
BUILT_IN_FORGE_API_KEY=your_forge_api_key
BUILT_IN_FORGE_API_URL=your_forge_api_url
OAUTH_SERVER_URL=your_oauth_server_url
OWNER_NAME=your_owner_name
OWNER_OPEN_ID=your_owner_open_id
VITE_ANALYTICS_ENDPOINT=your_analytics_endpoint
VITE_ANALYTICS_WEBSITE_ID=your_website_id
VITE_APP_ID=your_app_id
VITE_OAUTH_PORTAL_URL=your_oauth_portal_url
```

### 4. Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Your app will be live at `https://your-project.vercel.app`

## Post-Deployment Setup

### Load Test Data

After deployment, initialize your database with test data:

1. Open Supabase Dashboard → SQL Editor
2. Run the script from `supabase_seed_data.sql`
3. This creates:
   - Test user: Meryem Guezzour
   - Phone: +212 612345678
   - Fixed OTP: 123456
   - Salary: 10,000 Dhs (ACME company)
   - Available balance: 2,333.33 Dhs (14 days worked)

### Test the Deployment

1. Visit your Vercel URL
2. Click "Get Started"
3. Enter phone: `+212 612345678`
4. Enter OTP: `123456`
5. Create PIN: `1234`
6. Complete KYC flow (ID scanning, liveness check)
7. Access home screen and test salary advance

## Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Production:** Pushes to `master` branch
- **Preview:** Pull requests get preview URLs
- **Instant:** Deploys complete in ~2 minutes

## Custom Domain

To add your own domain:

1. Go to Vercel Dashboard → Settings → Domains
2. Add your domain (e.g., `libertypay.com`)
3. Update DNS records as instructed
4. SSL certificate auto-generated
5. Domain active in ~5 minutes

## Troubleshooting

### Build Fails

**Check build logs** in Vercel dashboard for specific errors.

Common issues:
- Missing environment variables → Add in Vercel dashboard
- Node version mismatch → Set to 22.x in project settings
- pnpm not found → Vercel auto-installs from `vercel.json`

### "Page not found" or 404 Errors

**Cause:** Routing configuration issue

**Solution:**
- Verify `vercel.json` has correct rewrites
- Check that `dist` directory is being generated
- Ensure frontend routes are configured properly

### API Routes Not Working

**Cause:** Backend server routes not configured

**Solution:**
- Verify `/api/*` routes in `vercel.json` point to server
- Check server code is in `server/` directory
- Ensure environment variables are set

### Database Connection Errors

**Cause:** DATABASE_URL not set or incorrect

**Solution:**
- Get connection string from Supabase dashboard
- Format: `postgresql://user:password@host:5432/database`
- Add to Vercel environment variables
- Redeploy after adding

### White Screen After Deployment

**Check browser console** (F12) for errors

Common causes:
- Missing environment variables (especially `VITE_*` vars)
- API endpoints not accessible
- CORS issues (check server CORS configuration)

## Performance Optimization

### Edge Functions

Vercel runs your API routes as serverless functions:
- Auto-scales with traffic
- Global CDN for frontend assets
- Fast cold starts

### Caching

Static assets are automatically cached:
- Images, CSS, JS cached at edge
- API responses can be cached with headers
- Database queries should use connection pooling

## Monitoring

Access deployment metrics in Vercel dashboard:
- Request logs
- Function execution time
- Error rates
- Bandwidth usage

## Cost

Vercel pricing:
- **Hobby (Free):** Perfect for testing
  - Unlimited deployments
  - 100GB bandwidth/month
  - Serverless function execution included
  
- **Pro ($20/month):** For production
  - Custom domains
  - More bandwidth
  - Team collaboration
  - Analytics

## Comparison: Vercel vs Netlify vs Manus

| Feature | Vercel | Netlify | Manus |
|---------|--------|---------|-------|
| Frontend hosting | ✅ | ✅ | ✅ |
| Backend/API | ✅ | ❌ | ✅ |
| Database | External | External | ✅ |
| Auto-deploy | ✅ | ✅ | ✅ |
| Custom domains | ✅ | ✅ | ✅ |
| Free tier | ✅ | ✅ | ✅ |

**Recommendation:** Use Vercel for this full-stack app!

## Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Discord: https://vercel.com/discord
- GitHub Issues: Report issues in your repository

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Add environment variables
3. ✅ Load seed data into Supabase
4. ✅ Test the application
5. ✅ Add custom domain (optional)
6. ✅ Monitor performance
7. ✅ Set up error tracking (optional: Sentry)

Your LibertyPay app will be live and fully functional on Vercel! 🚀
