# 🚂 Railway Deployment Guide for TraceRight

> **Complete guide for deploying TraceRight to Railway.app**

---

## 📋 Overview

Railway is a modern platform-as-a-service (PaaS) that makes deploying web applications incredibly simple. This guide covers deploying TraceRight from scratch or updating an existing Railway environment.

---

## 🎯 Two Deployment Scenarios

### Scenario 1: New Railway Deployment (First Time)
You're deploying TraceRight to Railway for the first time.

### Scenario 2: Updating Existing Railway Environment
You already have a Railway environment and want to replace/update it with this codebase.

---

## 🆕 Scenario 1: New Railway Deployment

### Prerequisites
- Railway account (sign up at https://railway.app)
- GitHub account (recommended) or local codebase
- This TraceRight codebase

### Option A: Deploy from GitHub (Recommended)

#### Step 1: Push Code to GitHub
```bash
# In your TraceRight project folder
git init
git add .
git commit -m "Initial commit: TraceRight v2.0"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/traceright.git
git branch -M main
git push -u origin main
```

#### Step 2: Connect to Railway
1. **Log in to Railway**: https://railway.app
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Authorize Railway** to access your GitHub
5. **Select your TraceRight repository**
6. **Railway auto-detects** settings and deploys!

#### Step 3: Configure Build Settings (Usually Auto-Detected)
Railway should automatically detect:
- **Build Command**: `npm run build`
- **Start Command**: `npm run preview`
- **Root Directory**: `/`

If not, set them manually in Settings → Deploy.

#### Step 4: Add Environment Variables (Optional)
In Railway dashboard → Variables tab:
```env
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_PROJECT_ID=your_project
VITE_GCP_PROJECT_ID=your_gcp_project
VITE_ENABLE_ALL_FEATURES=true
```

#### Step 5: Deploy!
- Railway automatically deploys on push to `main` branch
- You'll get a URL like: `https://traceright-production.up.railway.app`
- Custom domains can be added in Settings → Domains

### Option B: Deploy from CLI

#### Step 1: Install Railway CLI
```bash
# macOS/Linux
brew install railway

# Windows (PowerShell)
iwr https://railway.app/install.ps1 | iex

# NPM (cross-platform)
npm install -g @railway/cli
```

#### Step 2: Login
```bash
railway login
```

#### Step 3: Initialize Project
```bash
# In your TraceRight folder
railway init

# Follow prompts:
# - Create new project? Yes
# - Project name: traceright-app
# - Environment: production
```

#### Step 4: Link and Deploy
```bash
# Link to Railway project
railway link

# Deploy
railway up
```

#### Step 5: Open in Browser
```bash
railway open
```

---

## 🔄 Scenario 2: Updating Existing Railway Environment

You mentioned having an existing Railway environment. Here's how to replace/update it:

### Method 1: Using Railway's Environment Sync Feature

This is what you described in your question. Here's the detailed process:

#### What is Environment Sync?
Railway's sync feature allows you to copy services and configurations from one environment to another (e.g., staging → production).

#### When to Use Sync
- ✅ You have multiple environments (staging, production)
- ✅ You want to promote changes from one environment to another
- ✅ You want to mirror configuration between environments

#### How to Sync Environments

1. **Access Your Railway Project**
   - Go to https://railway.app/dashboard
   - Select your TraceRight project

2. **Navigate to Target Environment**
   - Ensure your current environment is the one that should **receive** the changes
   - Example: If updating production, select "production" environment

3. **Click "Sync" Button**
   - Located at the top of the canvas
   - Looks like a refresh/sync icon

4. **Select Source Environment**
   - Choose the environment FROM which to sync changes
   - Example: If your new code is in "staging", select "staging"

5. **Review Staged Changes**
   - Each service card will be tagged:
     - **"New"** - New service being added
     - **"Edited"** - Existing service with changes
     - **"Removed"** - Service being removed
   - Click "Details" on the staged changes banner to review

6. **Deploy Changes**
   - Click "Deploy" to apply all changes
   - Railway will redeploy affected services
   - Monitor deployment logs for any issues

#### Important Notes About Sync
- ⚠️ Sync copies **service configurations**, not just code
- ⚠️ Environment variables are **not** synced (set them manually)
- ⚠️ Always review changes before deploying
- ⚠️ Consider creating a backup/snapshot first

### Method 2: Update via Git Push (Recommended for Code Updates)

If you just want to update the code in your existing environment:

#### Step 1: Connect Your Codebase to Existing Railway Project

**If using GitHub:**
1. Push your new TraceRight code to the **same GitHub repository** that Railway is watching
2. Railway automatically detects the push and redeploys

```bash
# In your new TraceRight codebase
git remote add origin https://github.com/yourusername/existing-repo.git
git push -f origin main  # Force push to replace old code
```

**If using Railway CLI:**
```bash
# Link to your existing project
railway link

# Select your existing project from the list

# Deploy new code
railway up
```

#### Step 2: Monitor Deployment
```bash
# Watch logs in real-time
railway logs

# Or check in Railway dashboard
```

#### Step 3: Verify Deployment
- Visit your Railway URL
- Test major features
- Check browser console for errors

### Method 3: Redeploy from Scratch in Same Environment

If you want to completely replace your existing Railway service:

#### Step 1: Remove Old Service
1. Go to Railway dashboard
2. Select your environment
3. Click on your service
4. Go to Settings → Danger
5. Click "Delete Service"

#### Step 2: Create New Service
1. Click "+ New" in Railway dashboard
2. Select "GitHub Repo" or "Empty Service"
3. Choose your repository with new code
4. Railway deploys fresh instance

#### Step 3: Reconfigure
- Add environment variables
- Set custom domain (if you had one)
- Configure any other settings

---

## ⚙️ Railway-Specific Configuration

### Create `railway.json` (Optional but Recommended)

Create this file in your project root:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm run preview",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Create `nixpacks.toml` (Advanced Configuration)

For more control over the build process:

```toml
[phases.setup]
nixPkgs = ["nodejs-18_x"]

[phases.install]
cmds = ["npm ci"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "npm run preview"
```

### Update `package.json` Scripts for Railway

Ensure your `package.json` has the right scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview --host 0.0.0.0 --port $PORT",
    "start": "vite preview --host 0.0.0.0 --port $PORT"
  }
}
```

**Key points:**
- `--host 0.0.0.0` - Allows Railway to access the server
- `--port $PORT` - Uses Railway's assigned port
- Both `preview` and `start` commands - Railway may use either

---

## 🔐 Environment Variables in Railway

### How to Add Environment Variables

1. **Via Railway Dashboard:**
   - Project → Variables tab
   - Click "+ New Variable"
   - Add key-value pairs
   - Click "Add" or "Deploy" to apply

2. **Via Railway CLI:**
   ```bash
   railway variables set VITE_FIREBASE_API_KEY=your_key
   railway variables set VITE_GCP_PROJECT_ID=your_project
   ```

3. **Bulk Import:**
   - Create `.env.production` file locally
   - Copy all variables
   - Paste into Railway Variables (one per line)

### Required Environment Variables for TraceRight

```env
# Optional - only if using Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

# Optional - only if using Google Cloud
VITE_GCP_PROJECT_ID=your_gcp_project
VITE_MAPS_API_KEY=your_google_maps_key

# Optional - feature toggles
VITE_ENABLE_ALL_FEATURES=false
```

---

## 🎯 Best Practices for Railway Deployment

### 1. Use Multiple Environments

Create separate environments for different stages:
- **Development** - For testing
- **Staging** - For QA/preview
- **Production** - For live users

```bash
# Create new environment
railway environment

# Select or create staging/production
```

### 2. Enable PR Deployments

In Railway dashboard → Settings → Enable PR deploys:
- Automatically deploy pull requests
- Get preview URLs for each PR
- Test before merging to main

### 3. Set Up Health Checks

Add a health check endpoint to your app:

```typescript
// In App.tsx or create a separate health endpoint
// Railway will ping this to verify app is running
```

### 4. Monitor Deployments

```bash
# Watch deployment logs
railway logs --follow

# Check deployment status
railway status
```

### 5. Use Railway Volumes (If Needed)

For persistent storage:
```bash
railway volume add --name traceright-data --mount /data
```

---

## 🐛 Troubleshooting Railway Deployments

### Issue 1: Build Fails

**Error**: `npm install` or `npm run build` fails

**Solutions:**
```bash
# Ensure package.json is valid
npm install  # Test locally first

# Check Node version
node --version  # Railway uses Node 18 by default

# Force clean install
railway run npm ci
```

### Issue 2: App Not Accessible

**Error**: Deployed but can't access URL

**Solutions:**
1. Check if app is running:
   ```bash
   railway logs
   ```

2. Ensure `vite preview` uses correct host/port:
   ```json
   {
     "scripts": {
       "preview": "vite preview --host 0.0.0.0 --port $PORT"
     }
   }
   ```

3. Check Railway assigned port:
   - Railway sets `$PORT` environment variable
   - Your app must listen on this port

### Issue 3: Environment Variables Not Working

**Error**: `import.meta.env.VITE_XXX` is undefined

**Solutions:**
1. Ensure variables have `VITE_` prefix (Vite requirement)
2. Redeploy after adding variables:
   ```bash
   railway up --detach
   ```
3. Check variables are set:
   ```bash
   railway variables
   ```

### Issue 4: Deployment Timeout

**Error**: Build takes too long

**Solutions:**
1. Optimize dependencies:
   ```bash
   npm prune --production
   ```

2. Use Railway Pro plan (more resources)

3. Split build into smaller steps

### Issue 5: Old Code Still Showing

**Error**: Deployed new code but seeing old version

**Solutions:**
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache
3. Check Railway logs to confirm new deployment:
   ```bash
   railway logs
   ```
4. Force redeploy:
   ```bash
   railway up --detach
   ```

---

## 🔄 Continuous Deployment with Railway

### Automatic Deployments from GitHub

Railway automatically deploys when you push to connected branch:

```bash
# Make changes
git add .
git commit -m "Update TraceRight features"
git push origin main

# Railway automatically detects and deploys!
```

### Manual Deployments

Trigger deployment manually:

```bash
# Via CLI
railway up

# Via Dashboard
# Click "Deploy" button in Railway UI
```

### Rollback to Previous Deployment

If something goes wrong:

1. **Via Dashboard:**
   - Go to Deployments tab
   - Find previous successful deployment
   - Click "Redeploy"

2. **Via Git:**
   ```bash
   git revert HEAD
   git push origin main
   ```

---

## 📊 Railway vs. Other Platforms

| Feature | Railway | Vercel | Netlify | Heroku |
|---------|---------|--------|---------|--------|
| Free Tier | ✅ $5 free | ✅ Generous | ✅ 100GB | ❌ Paid only |
| Auto-deploy | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| Custom domains | ✅ Free | ✅ Free | ✅ Free | 💰 Paid |
| Environment sync | ✅ Yes | ❌ No | ❌ No | ❌ No |
| Database hosting | ✅ Built-in | ❌ No | ❌ No | 💰 Add-ons |
| CLI tool | ✅ Excellent | ✅ Good | ✅ Good | ✅ Good |
| PR previews | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |

**Railway is great for:**
- Full-stack apps with databases
- Apps needing environment flexibility
- Teams wanting easy environment sync
- Projects needing volume storage

---

## 💰 Railway Pricing

### Hobby Plan (Free)
- $5 free credit monthly
- All features unlocked
- Perfect for TraceRight
- ~500 hours runtime

### Pro Plan ($20/month)
- Includes $20 credit
- Priority support
- Faster builds
- More concurrent deployments

**TraceRight Estimate:**
- Frontend-only: ~$5-10/month (fits in free tier)
- With database: ~$15-25/month

---

## ✅ Railway Deployment Checklist

### Pre-Deployment
- [ ] Code pushed to GitHub
- [ ] `package.json` has correct scripts
- [ ] Environment variables documented
- [ ] Railway account created

### Deployment
- [ ] Railway project created
- [ ] GitHub repository connected
- [ ] Build settings configured
- [ ] Environment variables added
- [ ] Custom domain configured (optional)

### Post-Deployment
- [ ] Deployment successful
- [ ] URL accessible
- [ ] All features work
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Performance acceptable

---

## 🎬 Quick Start Commands Summary

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize new project
railway init

# Deploy
railway up

# View logs
railway logs

# Add environment variable
railway variables set KEY=value

# Open deployed app
railway open

# Link to existing project
railway link

# Check status
railway status
```

---

## 🆘 Getting Help

### Railway Resources
- **Documentation**: https://docs.railway.app
- **Discord**: https://discord.gg/railway
- **Status**: https://status.railway.app
- **Twitter**: @Railway

### TraceRight Support
- See `DEPLOYMENT_TRANSFER_GUIDE.md` for general deployment
- See `FOR_YOUR_DEVELOPER.md` for technical setup
- See `DEVELOPER_TECHNICAL_GUIDE.md` for troubleshooting

---

## 📝 Summary: Your Answer

> **"If I already have an environment stood up, how do I replace that environment?"**

### Short Answer:
**Option 1 (Simplest):** Push your new TraceRight code to the same GitHub repo that Railway is watching. Railway auto-deploys.

**Option 2 (Environment Sync):** If you have staging + production environments, use Railway's Sync feature (as you described) to promote changes from one to another.

**Option 3 (Clean slate):** Delete the old service in Railway and create a new one with your updated codebase.

### Recommended Approach:
```bash
# 1. Link to your existing Railway project
railway link

# 2. Deploy your new TraceRight code
railway up

# 3. Monitor deployment
railway logs

# Done! Your environment is replaced with new code.
```

The environment sync feature you mentioned is great when you have **multiple environments** (staging → production), but if you're just updating code in one environment, a simple `railway up` or `git push` is all you need.

---

*Last Updated: November 1, 2025*  
*Railway Deployment Guide for TraceRight v2.0*  
*Status: Production Ready ✅*
