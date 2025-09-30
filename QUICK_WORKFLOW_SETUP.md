# 🚀 Quick Workflow Setup Guide

## 📋 **Your New Git Workflow**

### 🌿 **Branch Structure**
```
main (production)     ← Production-ready code
├── staging (testing) ← QA and testing environment  
├── develop (dev)     ← Active development
└── feature/*        ← Feature branches
```

## 🎯 **Your Daily Workflow**

### **1. Development Work** 🔧
```bash
# Start your day
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature-name
# ... make your changes ...
git add .
git commit -m "feat: Add your feature"
git push origin feature/your-feature-name

# When ready, merge back to develop
git checkout develop
git merge feature/your-feature-name
git push origin develop
```

### **2. Testing Phase** 🧪
```bash
# When ready for testing
git checkout staging
git merge develop
git push origin staging

# Run staging deployment
./scripts/deploy-staging.sh
```

### **3. Production Release** 🚀
```bash
# When testing is complete and approved
git checkout main
git merge staging
git tag v1.0.0
git push origin main --tags

# Run production deployment
./scripts/deploy-production.sh
```

## 🛠️ **Quick Commands**

### **Start Development**
```bash
git checkout develop
git pull origin develop
npm run dev
```

### **Deploy to Staging**
```bash
git checkout staging
git merge develop
git push origin staging
./scripts/deploy-staging.sh
```

### **Deploy to Production**
```bash
git checkout main
git merge staging
git push origin main
./scripts/deploy-production.sh
```

## 📝 **Commit Message Format**

```bash
# Feature
git commit -m "feat(auth): Add OAuth2 login"

# Bug fix
git commit -m "fix(api): Resolve 500 error in today endpoint"

# Documentation
git commit -m "docs(readme): Update installation guide"

# Refactoring
git commit -m "refactor(components): Optimize navigation performance"
```

## 🔒 **Branch Protection**

### **Main Branch**
- ✅ Requires pull request reviews
- ✅ Requires status checks to pass
- ✅ No direct pushes allowed
- ✅ Requires approval for production

### **Staging Branch**
- ✅ Requires pull request reviews
- ✅ Allows testing and fixes
- ✅ Safe for QA testing

## 🚦 **Deployment Process**

### **Development → Staging**
1. Complete feature in `develop`
2. Merge to `staging`
3. Deploy to staging server
4. Test all features
5. Fix any issues

### **Staging → Production**
1. Get approval from project manager
2. Merge `staging` to `main`
3. Tag the release
4. Deploy to production
5. Monitor for issues

## 🎯 **Your Workflow Summary**

### **Daily Development**:
- Work on `develop` branch
- Create feature branches for new work
- Test locally before pushing
- Merge to `staging` when ready for QA

### **Weekly Testing**:
- Test on `staging` branch
- Fix any issues found
- Get approval for production
- Merge to `main` when approved

### **Production Release**:
- Only merge tested code to `main`
- Tag releases properly
- Deploy with confidence
- Monitor for issues

## 🚨 **Emergency Hotfix**

```bash
# For critical production issues
git checkout main
git checkout -b hotfix/critical-issue
# ... fix the issue ...
git add .
git commit -m "fix: Resolve critical production issue"
git checkout main
git merge hotfix/critical-issue
git tag v1.0.1
git push origin main --tags
```

## 📊 **Environment URLs**

- **Development**: `http://localhost:8120`
- **Staging**: `https://staging.dailysecrets.app`
- **Production**: `https://dailysecrets.app`

---

**🌟 This workflow ensures safe, reliable development and deployment!**
