# 🚀 Daily Secrets - Deployment Configuration

## 🌍 **Environment Setup**

### **Development Environment**
```bash
# Branch: develop
# URL: http://localhost:8120
# Database: Local SQLite/PostgreSQL
# Features: All experimental features enabled
# Debug: Full logging enabled
```

### **Staging Environment**
```bash
# Branch: staging  
# URL: https://staging.dailysecrets.app
# Database: Staging PostgreSQL
# Features: Production-like with testing features
# Debug: Limited logging
```

### **Production Environment**
```bash
# Branch: main
# URL: https://dailysecrets.app
# Database: Production PostgreSQL
# Features: Stable features only
# Debug: Error logging only
```

## 🔧 **Environment Variables**

### **Development (.env.local)**
```bash
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:8120
NEXT_PUBLIC_APP_ENV=development
DATABASE_URL=postgresql://localhost:5432/dailysecrets_dev
NEXTAUTH_URL=http://localhost:8120
NEXTAUTH_SECRET=dev-secret-key
GOOGLE_MAPS_API_KEY=dev-maps-key
OPENAI_API_KEY=dev-openai-key
```

### **Staging (.env.staging)**
```bash
NODE_ENV=staging
NEXT_PUBLIC_APP_URL=https://staging.dailysecrets.app
NEXT_PUBLIC_APP_ENV=staging
DATABASE_URL=postgresql://staging-db:5432/dailysecrets_staging
NEXTAUTH_URL=https://staging.dailysecrets.app
NEXTAUTH_SECRET=staging-secret-key
GOOGLE_MAPS_API_KEY=staging-maps-key
OPENAI_API_KEY=staging-openai-key
```

### **Production (.env.production)**
```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://dailysecrets.app
NEXT_PUBLIC_APP_ENV=production
DATABASE_URL=postgresql://prod-db:5432/dailysecrets_prod
NEXTAUTH_URL=https://dailysecrets.app
NEXTAUTH_SECRET=production-secret-key
GOOGLE_MAPS_API_KEY=production-maps-key
OPENAI_API_KEY=production-openai-key
```

## 🚦 **Deployment Pipeline**

### **1. Development Deployment**
```bash
# Automatic deployment on develop branch
git checkout develop
git push origin develop
# → Triggers development deployment
```

### **2. Staging Deployment**
```bash
# Manual deployment to staging
git checkout staging
git merge develop
git push origin staging
# → Triggers staging deployment
```

### **3. Production Deployment**
```bash
# Manual deployment to production (requires approval)
git checkout main
git merge staging
git tag v1.0.0
git push origin main --tags
# → Triggers production deployment
```

## 🔒 **Branch Protection Rules**

### **Main Branch Protection**
- ✅ Require pull request reviews (2 reviewers)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Restrict pushes to main
- ✅ Require linear history
- ✅ Require signed commits

### **Staging Branch Protection**
- ✅ Require pull request reviews (1 reviewer)
- ✅ Require status checks to pass
- ✅ Allow force pushes (for hotfixes)
- ✅ Require signed commits

## 📊 **Version Management**

### **Semantic Versioning**
- **Format**: `MAJOR.MINOR.PATCH`
- **Example**: `1.2.3`

### **Version Types**
- **MAJOR (1.0.0)**: Breaking changes
- **MINOR (1.1.0)**: New features
- **PATCH (1.1.1)**: Bug fixes

### **Release Process**
```bash
# 1. Update version
npm version patch  # or minor, major

# 2. Create release notes
# 3. Tag the release
git tag v1.2.3
git push origin v1.2.3

# 4. Create GitHub release
# 5. Deploy to production
```

## 🛠️ **Deployment Scripts**

### **Development Deployment**
```bash
#!/bin/bash
# deploy-dev.sh
echo "Deploying to development..."
git checkout develop
git pull origin develop
npm install
npm run build
npm run start:dev
```

### **Staging Deployment**
```bash
#!/bin/bash
# deploy-staging.sh
echo "Deploying to staging..."
git checkout staging
git pull origin staging
npm install
npm run build
npm run test
npm run start:staging
```

### **Production Deployment**
```bash
#!/bin/bash
# deploy-production.sh
echo "Deploying to production..."
git checkout main
git pull origin main
npm install
npm run build
npm run test
npm run start:production
```

## 🔄 **Hotfix Process**

### **Critical Production Issues**
```bash
# 1. Create hotfix branch
git checkout main
git checkout -b hotfix/critical-issue

# 2. Fix the issue
# ... make changes ...
git add .
git commit -m "fix: Resolve critical production issue"

# 3. Merge to main
git checkout main
git merge hotfix/critical-issue
git tag v1.2.4
git push origin main --tags

# 4. Merge back to develop
git checkout develop
git merge hotfix/critical-issue
git push origin develop
```

## 📋 **Deployment Checklist**

### **Pre-Deployment**
- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Backup created (production)

### **During Deployment**
- [ ] Monitor deployment logs
- [ ] Check health endpoints
- [ ] Verify database connections
- [ ] Test critical functionality

### **Post-Deployment**
- [ ] Monitor application metrics
- [ ] Check error logs
- [ ] Verify all features working
- [ ] Update documentation

## 🚨 **Rollback Procedure**

### **Emergency Rollback**
```bash
# 1. Identify last working commit
git log --oneline -10

# 2. Reset to working commit
git reset --hard <commit-hash>
git push origin main --force

# 3. Deploy rollback
# 4. Investigate and fix issue
# 5. Re-deploy when ready
```

## 📊 **Monitoring & Alerts**

### **Health Checks**
- ✅ Application health endpoint
- ✅ Database connection status
- ✅ API endpoint availability
- ✅ Performance metrics

### **Alerts**
- ✅ Error rate > 5%
- ✅ Response time > 2s
- ✅ Database connection failures
- ✅ Memory usage > 80%

## 🎯 **Your Deployment Workflow**

### **Daily Development**
1. Work on `develop` branch
2. Test locally
3. Push to `develop` (auto-deploy to dev)

### **Weekly Testing**
1. Merge `develop` → `staging`
2. Test on staging environment
3. Fix any issues found
4. Get approval for production

### **Production Release**
1. Get approval from project manager
2. Merge `staging` → `main`
3. Tag the release
4. Deploy to production
5. Monitor for issues

---

**🌟 This deployment strategy ensures safe, reliable releases!**
