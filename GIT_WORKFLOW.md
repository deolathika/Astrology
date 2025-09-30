# 🌟 Daily Secrets - Git Workflow Guide

## 📋 **Branch Strategy Overview**

### 🌿 **Branch Structure**
```
main (production)     ← Production-ready code
├── staging (testing) ← QA and testing environment  
├── develop (dev)     ← Active development
└── feature/*        ← Feature branches
```

## 🚀 **Development Workflow**

### 1. **Development Phase** 🔧
**Branch**: `develop`
- **Purpose**: All active development work
- **Who**: Developers
- **When**: Daily development
- **Deployment**: Development server

```bash
# Start development
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/new-feature
# ... make changes ...
git add .
git commit -m "feat: Add new feature"
git push origin feature/new-feature

# Merge back to develop
git checkout develop
git merge feature/new-feature
git push origin develop
```

### 2. **Testing Phase** 🧪
**Branch**: `staging`
- **Purpose**: QA testing and bug fixes
- **Who**: QA team, developers
- **When**: Before production
- **Deployment**: Staging server

```bash
# Promote to staging
git checkout staging
git merge develop
git push origin staging

# Test and fix issues
git checkout -b hotfix/staging-issue
# ... fix issues ...
git add .
git commit -m "fix: Resolve staging issue"
git push origin hotfix/staging-issue

# Merge back to staging
git checkout staging
git merge hotfix/staging-issue
git push origin staging
```

### 3. **Production Phase** 🚀
**Branch**: `main`
- **Purpose**: Production-ready code
- **Who**: DevOps, Project Manager
- **When**: After testing approval
- **Deployment**: Production server

```bash
# Deploy to production (requires approval)
git checkout main
git merge staging
git tag v1.0.0
git push origin main --tags
```

## 📝 **Commit Message Convention**

### **Format**: `type(scope): description`

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code formatting
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples**:
```bash
git commit -m "feat(auth): Add OAuth2 integration"
git commit -m "fix(api): Resolve 500 error in today endpoint"
git commit -m "docs(readme): Update installation guide"
```

## 🔒 **Branch Protection Rules**

### **Main Branch Protection**
- ✅ Require pull request reviews
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Restrict pushes to main
- ✅ Require linear history

### **Staging Branch Protection**
- ✅ Require pull request reviews
- ✅ Require status checks to pass
- ✅ Allow force pushes (for hotfixes)

## 🚦 **Deployment Pipeline**

### **Development → Staging**
```bash
# 1. Complete feature in develop
git checkout develop
git pull origin develop

# 2. Create pull request: develop → staging
# 3. Review and approve
# 4. Merge to staging
git checkout staging
git merge develop
git push origin staging

# 5. Deploy to staging server
```

### **Staging → Production**
```bash
# 1. Complete testing in staging
git checkout staging
git pull origin staging

# 2. Create pull request: staging → main
# 3. Get approval from project manager
# 4. Merge to main
git checkout main
git merge staging
git tag v1.0.0
git push origin main --tags

# 5. Deploy to production server
```

## 🛠️ **Environment Configuration**

### **Development Environment**
- **Branch**: `develop`
- **URL**: `http://localhost:8120`
- **Database**: Local development
- **Features**: All experimental features

### **Staging Environment**
- **Branch**: `staging`
- **URL**: `https://staging.dailysecrets.app`
- **Database**: Staging database
- **Features**: Production-like testing

### **Production Environment**
- **Branch**: `main`
- **URL**: `https://dailysecrets.app`
- **Database**: Production database
- **Features**: Stable, tested features only

## 📊 **Version Management**

### **Semantic Versioning**
- **Format**: `MAJOR.MINOR.PATCH`
- **Example**: `1.2.3`

**Version Types**:
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

### **Release Process**
```bash
# 1. Update version in package.json
npm version patch  # or minor, major

# 2. Create release notes
# 3. Tag the release
git tag v1.2.3
git push origin v1.2.3

# 4. Create GitHub release
# 5. Deploy to production
```

## 🔄 **Hotfix Process**

### **Critical Production Issues**
```bash
# 1. Create hotfix branch from main
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

## 📋 **Daily Workflow Checklist**

### **Morning Routine**
- [ ] Pull latest changes from develop
- [ ] Check for any new issues or features
- [ ] Update local dependencies if needed

### **Development Work**
- [ ] Create feature branch for new work
- [ ] Make incremental commits
- [ ] Test locally before pushing
- [ ] Create pull request when ready

### **End of Day**
- [ ] Push all changes to feature branch
- [ ] Update issue tracking
- [ ] Plan next day's work

## 🚨 **Emergency Procedures**

### **Production Outage**
1. **Immediate**: Create hotfix branch from main
2. **Fix**: Resolve the critical issue
3. **Deploy**: Merge and deploy immediately
4. **Document**: Update issue tracking
5. **Follow-up**: Merge back to develop

### **Rollback Procedure**
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

## 📚 **Best Practices**

### **Commit Guidelines**
- ✅ Make small, focused commits
- ✅ Write clear commit messages
- ✅ Test before committing
- ✅ Use conventional commit format

### **Branch Guidelines**
- ✅ Keep branches short-lived
- ✅ Delete merged branches
- ✅ Use descriptive branch names
- ✅ Keep develop branch stable

### **Code Review Guidelines**
- ✅ Review all changes before merging
- ✅ Test the changes locally
- ✅ Check for security issues
- ✅ Ensure code quality standards

## 🎯 **Your Workflow Summary**

### **For Daily Development**:
1. Work on `develop` branch
2. Create feature branches for new work
3. Test thoroughly before merging
4. Push to `staging` when ready for QA

### **For Testing**:
1. Test on `staging` branch
2. Fix any issues found
3. Get approval for production
4. Merge to `main` when approved

### **For Production**:
1. Only merge tested code to `main`
2. Tag releases properly
3. Deploy with confidence
4. Monitor for issues

---

**🌟 This workflow ensures code quality, reduces bugs, and provides a safe path to production!**
