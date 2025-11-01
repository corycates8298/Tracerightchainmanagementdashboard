# 🔄 Railway: Update Code, Keep Everything Else

> **How to replace your Railway frontend code while keeping your existing database, storage, and variables intact**

---

## 🎯 Your Situation

You have:
- ✅ Railway environment already running
- ✅ Database configured and connected
- ✅ Storage set up
- ✅ Environment variables configured
- ✅ Custom domains (possibly)

You want:
- 🔄 Replace frontend code with TraceRight
- ✅ Keep all existing backend infrastructure
- ✅ Keep all environment variables
- ✅ Keep database connections
- ✅ Keep storage configuration

---

## 🏆 Best Method: Git Push (Recommended)

**Why this is easiest:**
- ✅ All your infrastructure stays untouched
- ✅ Environment variables remain the same
- ✅ Database connections stay active
- ✅ Zero reconfiguration needed
- ✅ Railway auto-deploys on push
- ✅ Rollback is simple (revert git commit)

### Step-by-Step Instructions

#### Step 1: Backup Your Current Environment Variables

Before making changes, document what you have:

1. **Go to Railway Dashboard** → Your Project → Variables tab
2. **Copy all variables** to a text file (just in case)
3. **Take a screenshot** of your service configuration

#### Step 2: Prepare Your New TraceRight Code

```bash
# In your TraceRight directory
# Make sure you have all the files

# Check if Git is initialized
git status

# If not initialized, initialize it
git init
git add .
git commit -m "TraceRight v2.0 - Initial commit"
```

#### Step 3: Connect to Your Existing Railway GitHub Repo

**Find your Railway GitHub repo:**
1. Go to Railway Dashboard
2. Click on your service
3. Look for "Source" or "GitHub" - note the repository name

**Connect your TraceRight code to that repo:**

```bash
# Remove any existing remote (if present)
git remote remove origin

# Add your Railway GitHub repo as remote
git remote add origin https://github.com/yourusername/your-existing-repo.git

# Check your connection
git remote -v
```

#### Step 4: Deploy the New Code

**Option A: Replace everything (clean slate):**
```bash
# Force push to replace all code
git push -f origin main

# Railway automatically detects the push and rebuilds
```

**Option B: Keep git history (safer):**
```bash
# Pull existing history first
git pull origin main --allow-unrelated-histories

# Resolve any conflicts (usually just README)
# Then push
git push origin main
```

#### Step 5: Monitor the Deployment

```bash
# Install Railway CLI if not already installed
npm install -g @railway/cli

# Login and link to your project
railway login
railway link

# Watch deployment logs in real-time
railway logs --follow
```

#### Step 6: Verify Everything Works

1. **Visit your Railway URL** (same URL as before)
2. **Check that TraceRight loads**
3. **Verify database connection** (if your app uses it)
4. **Check environment variables** are being read
5. **Test main features**

---

## 🛠️ Method 2: Railway CLI (Alternative)

If you prefer using the Railway CLI directly:

### Step 1: Install and Login

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login
```

### Step 2: Link to Your Existing Project

```bash
# In your TraceRight directory
railway link

# You'll see a list of your projects - select the existing one
# Choose your environment (production/staging)
```

### Step 3: Deploy

```bash
# Deploy the new code
railway up

# Monitor deployment
railway logs
```

**That's it!** Your environment variables, database, storage - everything stays the same.

---

## 🔑 Environment Variables: What Happens

### Good News: They Stay Exactly the Same

When you push new code to Railway:
- ✅ All environment variables persist
- ✅ Database connection strings stay intact
- ✅ API keys remain configured
- ✅ Feature flags are preserved

### TraceRight Environment Variables

Your TraceRight app expects these variables (check if you have them):

```env
# Firebase (if using)
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

# Google Cloud (if using)
VITE_GCP_PROJECT_ID=...
VITE_MAPS_API_KEY=...

# Feature Flags (optional)
VITE_ENABLE_ALL_FEATURES=false
```

### How to Check Your Current Variables

**Via Railway Dashboard:**
1. Go to your project
2. Click on your service
3. Go to "Variables" tab
4. Review what's currently set

**Via Railway CLI:**
```bash
railway variables
```

### Adding Missing TraceRight Variables

If TraceRight needs variables you don't have:

**Via Dashboard:**
1. Variables tab → "+ New Variable"
2. Add key-value pairs
3. Click "Deploy" to apply

**Via CLI:**
```bash
railway variables set VITE_FIREBASE_API_KEY=your_key
railway variables set VITE_GCP_PROJECT_ID=your_project
```

---

## 💾 Database: What Happens

### Your Existing Database Stays Connected

When you update the frontend code:
- ✅ Database remains untouched
- ✅ Connection strings stay the same
- ✅ Data is preserved
- ✅ No downtime

### Connecting TraceRight to Your Database

TraceRight is currently using **mock data**. To connect it to your real database:

#### If Using Firebase/Firestore:

Your existing Firebase environment variables will work automatically with TraceRight if you set them up.

#### If Using PostgreSQL/MySQL:

You'll need to:
1. Update TraceRight components to use your API endpoints
2. Create API routes that query your database
3. Replace mock data calls with real API calls

**Example modification locations:**
```
components/DashboardView.tsx  → Replace MockData.kpis()
components/LogisticsView.tsx  → Replace mock logistics data
components/WarehouseOpsView.tsx → Replace mock warehouse data
```

---

## 📦 Storage: What Happens

### Your Storage Stays Configured

When you push new code:
- ✅ Storage buckets remain connected
- ✅ File uploads continue to work (if configured)
- ✅ Access keys stay valid

### If Using Railway Volumes

Railway volumes persist across deployments:

```bash
# Check your volumes
railway volumes

# Your volume mounts automatically with new deployment
```

---

## 🎨 What Actually Changes

| Component | Status | Action Needed |
|-----------|--------|---------------|
| **Frontend Code** | 🔄 Replaced | ✅ Automatic |
| **Database** | ✅ Unchanged | ❌ None |
| **Storage** | ✅ Unchanged | ❌ None |
| **Environment Variables** | ✅ Unchanged | ❌ None |
| **Domain/URL** | ✅ Unchanged | ❌ None |
| **Build Settings** | ⚠️ May need update | ⚙️ Check below |

---

## ⚙️ Build Settings: What to Check

### Your Current Build Settings

Railway may need to know how to build TraceRight. Check these:

**In Railway Dashboard → Settings → Build:**

| Setting | TraceRight Value | Your Current Value |
|---------|------------------|-------------------|
| Build Command | `npm run build` | ??? |
| Start Command | `npm run start` | ??? |
| Root Directory | `/` | ??? |

### If Build Settings Need Update

1. Go to Railway Dashboard → Your Service → Settings
2. Update build configuration:
   ```
   Build Command: npm run build
   Start Command: npm run start
   ```
3. Save and redeploy

**Or via `railway.json`** (already included in your TraceRight):
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm run start"
  }
}
```

Railway will automatically use this file.

---

## 🔄 Step-by-Step: Complete Process

### 🎬 The Complete Flow (5 minutes)

```bash
# === STEP 1: Prepare TraceRight ===
cd /path/to/traceright
git init
git add .
git commit -m "TraceRight v2.0"

# === STEP 2: Connect to Railway GitHub Repo ===
# (Find your repo name in Railway dashboard first)
git remote add origin https://github.com/yourusername/your-railway-repo.git

# === STEP 3: Deploy ===
# Option A: Clean deployment (recommended)
git push -f origin main

# Option B: Preserve history
git pull origin main --allow-unrelated-histories
git push origin main

# === STEP 4: Monitor ===
railway login
railway link
railway logs --follow

# === STEP 5: Verify ===
# Visit your Railway URL and test
```

### ⏱️ Timeline

- **Pushing code**: 30 seconds
- **Railway build**: 2-3 minutes
- **Deployment**: 30 seconds
- **Total**: ~5 minutes

---

## 🔍 Verification Checklist

After deployment, check:

### Frontend
- [ ] TraceRight dashboard loads
- [ ] Navigation works
- [ ] Visualizations render
- [ ] No console errors
- [ ] Mobile responsive

### Backend
- [ ] Environment variables accessible
- [ ] Database queries work (if applicable)
- [ ] API endpoints respond
- [ ] File uploads work (if applicable)
- [ ] Authentication works (if applicable)

### Infrastructure
- [ ] Custom domain still works
- [ ] SSL certificate valid
- [ ] Performance acceptable
- [ ] No deployment errors in logs

```bash
# Check logs for errors
railway logs | grep -i error
```

---

## 🐛 Troubleshooting

### Issue 1: Build Fails After Push

**Error**: `npm install` fails or dependencies missing

**Solution**:
```bash
# Check package.json exists in repo root
ls -la package.json

# Ensure build command is correct
# In Railway: Settings → Build → Build Command: npm run build
```

### Issue 2: App Not Starting

**Error**: Deployed but not accessible

**Solution**:
```bash
# Check start command uses correct port
# In package.json:
"start": "vite preview --host 0.0.0.0 --port ${PORT:-5173}"

# Railway needs $PORT environment variable
railway logs | grep PORT
```

### Issue 3: Environment Variables Not Working

**Error**: `import.meta.env.VITE_XXX` is undefined

**Solution**:
1. Verify variables have `VITE_` prefix (Vite requirement)
2. Restart deployment:
   ```bash
   railway redeploy
   ```
3. Check variables are set:
   ```bash
   railway variables
   ```

### Issue 4: Database Connection Lost

**Error**: Can't connect to database after deployment

**Solution**:
1. Check database service is running in Railway
2. Verify connection string variable is still set:
   ```bash
   railway variables | grep DATABASE
   ```
3. Check if database is in same Railway project
4. Review Railway logs for connection errors:
   ```bash
   railway logs | grep -i "database\|connection"
   ```

### Issue 5: Old Code Still Showing

**Error**: Pushed new code but seeing old version

**Solution**:
1. Clear browser cache (Ctrl+Shift+R)
2. Check Railway logs to confirm new deployment:
   ```bash
   railway logs | head -50
   ```
3. Check git push was successful:
   ```bash
   git log origin/main
   ```
4. Force redeploy in Railway dashboard

---

## 🎯 What You DON'T Need to Do

You do **NOT** need to:

- ❌ Recreate database
- ❌ Re-enter environment variables
- ❌ Reconfigure storage
- ❌ Update DNS/domains
- ❌ Change Railway service settings
- ❌ Migrate data
- ❌ Set up SSL again

**All infrastructure stays the same. Only code changes.**

---

## 🔐 Keeping Your Infrastructure Safe

### Before Deploying (Safety Checklist)

```bash
# 1. Export current environment variables
railway variables > backup-variables.txt

# 2. Take a snapshot of your database (if critical)
# Method depends on your database type

# 3. Note your current deployment ID (for rollback)
railway status

# 4. Test build locally first
npm install
npm run build
npm run preview
```

### Quick Rollback (If Needed)

If something goes wrong:

**Method 1: Git Revert**
```bash
git revert HEAD
git push origin main
```

**Method 2: Railway Dashboard**
1. Go to Deployments tab
2. Find previous successful deployment
3. Click "Redeploy"

**Method 3: Railway CLI**
```bash
# View deployment history
railway status --history

# Redeploy specific deployment
railway redeploy <deployment-id>
```

---

## 💡 Pro Tips

### 1. Test Locally First
```bash
# Install dependencies
npm install

# Build
npm run build

# Test production build locally
npm run preview

# If it works locally, it should work on Railway
```

### 2. Use Feature Branches
```bash
# Create a test branch first
git checkout -b railway-test

# Push to test branch
git push origin railway-test

# If Railway has PR previews enabled, you'll get a preview URL
# Test there before merging to main
```

### 3. Enable Railway PR Deploys

In Railway Dashboard → Settings:
- Enable "PR Deploys"
- Get preview URLs for every PR
- Test before going to production

### 4. Monitor After Deployment

```bash
# Keep logs open for first 5 minutes
railway logs --follow

# Watch for errors
railway logs | grep -i "error\|fail\|warn"
```

---

## 📊 Comparison: All Methods

| Method | Keeps Database | Keeps Variables | Keeps Storage | Difficulty | Time |
|--------|----------------|-----------------|---------------|------------|------|
| **Git Push** | ✅ Yes | ✅ Yes | ✅ Yes | 🟢 Easy | 5 min |
| **Railway CLI** | ✅ Yes | ✅ Yes | ✅ Yes | 🟢 Easy | 5 min |
| **Environment Sync** | ⚠️ Maybe | ❌ No | ⚠️ Maybe | 🟡 Medium | 10 min |
| **Delete + Recreate** | ❌ No | ❌ No | ❌ No | 🔴 Hard | 30 min |

**Winner: Git Push or Railway CLI** (both equally easy, keep everything)

---

## ✅ Final Answer: What To Do

### Absolute Simplest Method:

```bash
# 1. In your TraceRight directory
git remote add origin https://github.com/your/railway-repo.git

# 2. Push (replace all code)
git push -f origin main

# 3. Wait for Railway to auto-deploy (2-3 minutes)

# 4. Visit your Railway URL and test
```

**Everything else (database, storage, variables) stays exactly the same.**

---

## 🆘 Still Have Questions?

### Quick Commands Reference

```bash
# Check what Railway project you're in
railway status

# See all your environment variables
railway variables

# View database status
railway list

# Watch deployment logs
railway logs --follow

# Force redeploy
railway redeploy

# Open app in browser
railway open
```

### Documentation References
- Railway Dashboard: https://railway.app/dashboard
- Railway Docs: https://docs.railway.app
- Your env variables: Railway Dashboard → Variables tab
- Your database: Railway Dashboard → Database service

---

## 🎉 Summary

**Your Exact Situation:**
- ✅ You have existing Railway environment with database, storage, variables
- ✅ You want to replace frontend code with TraceRight
- ✅ You want to keep all infrastructure untouched

**Best Method:**
1. Push TraceRight code to your existing Railway GitHub repo
2. Railway auto-rebuilds with new code
3. All infrastructure (database, storage, variables) stays the same
4. Done in 5 minutes

**What Changes:**
- Frontend code → TraceRight v2.0

**What Stays the Same:**
- Database → Unchanged
- Storage → Unchanged
- Environment Variables → Unchanged
- Domain/URL → Unchanged
- Backend Infrastructure → Unchanged

**You're in the perfect situation for a simple code update!**

---

*Last Updated: November 1, 2025*  
*Railway Existing Environment Update Guide*  
*TraceRight v2.0*
