# Git Workflow - Daily Secrets App

## Branch Strategy

### Main Branches
- **`main`** - Production-ready code
- **`develop`** - Integration branch for features
- **`staging`** - Pre-production testing environment

### Feature Branches
- **`feature/feature-name`** - New features
- **`bugfix/bug-description`** - Bug fixes
- **`hotfix/critical-issue`** - Critical production fixes

## Workflow Process

### 1. Development Workflow
```bash
# Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/profile-editing

# Work on feature
git add .
git commit -m "feat: add profile editing functionality"

# Push feature branch
git push origin feature/profile-editing

# Create Pull Request to develop
```

### 2. Testing Workflow
```bash
# Merge to staging for testing
git checkout staging
git pull origin staging
git merge feature/profile-editing
git push origin staging

# Deploy to staging environment
npm run deploy:staging
```

### 3. Production Workflow
```bash
# Merge to main for production
git checkout main
git pull origin main
git merge develop
git tag v1.0.0
git push origin main --tags

# Deploy to production
npm run deploy:production
```

## Branch Protection Rules

### Main Branch Protection
- Require pull request reviews
- Require status checks to pass
- Require branches to be up to date
- Restrict pushes to main branch

### Develop Branch Protection
- Require pull request reviews
- Require status checks to pass
- Allow force pushes (for rebasing)

## Commit Message Convention

### Format
```
type(scope): description

[optional body]

[optional footer]
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples
```
feat(profile): add editable profile functionality
fix(api): resolve NASA API JSON parsing errors
docs(readme): update deployment instructions
test(validation): add astrology validation tests
```

## Environment Setup

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint
```

### Staging
```bash
# Build for staging
npm run build:staging

# Deploy to staging
npm run deploy:staging
```

### Production
```bash
# Build for production
npm run build:production

# Deploy to production
npm run deploy:production
```

## CI/CD Pipeline

### GitHub Actions Workflow
1. **Code Quality Checks**
   - ESLint
   - TypeScript compilation
   - Unit tests

2. **Security Scanning**
   - Dependency vulnerability scan
   - Code security analysis

3. **Deployment**
   - Staging deployment (on develop merge)
   - Production deployment (on main merge)

## Testing Strategy

### Unit Tests
- Component tests
- API endpoint tests
- Utility function tests

### Integration Tests
- Database integration
- External API integration
- Authentication flow

### E2E Tests
- User journey tests
- Cross-browser testing
- Mobile responsiveness

## Code Review Process

### Pull Request Requirements
- [ ] Code follows project conventions
- [ ] Tests pass
- [ ] No console.log statements
- [ ] Proper error handling
- [ ] Documentation updated
- [ ] Security considerations addressed

### Review Checklist
- [ ] Code quality
- [ ] Performance implications
- [ ] Security considerations
- [ ] Accessibility compliance
- [ ] Mobile responsiveness
- [ ] Browser compatibility

## Release Process

### Version Numbering
- **Major**: Breaking changes
- **Minor**: New features
- **Patch**: Bug fixes

### Release Steps
1. Update version in package.json
2. Update CHANGELOG.md
3. Create release branch
4. Run full test suite
5. Deploy to staging
6. User acceptance testing
7. Deploy to production
8. Create GitHub release
9. Monitor production metrics

## Emergency Procedures

### Hotfix Process
```bash
# Create hotfix branch from main
git checkout main
git checkout -b hotfix/critical-security-fix

# Make critical fix
git add .
git commit -m "fix(security): patch critical vulnerability"

# Push and create PR to main
git push origin hotfix/critical-security-fix
```

### Rollback Process
```bash
# Rollback to previous version
git checkout main
git reset --hard <previous-commit-hash>
git push origin main --force

# Deploy rollback
npm run deploy:production
```

## Best Practices

### Code Quality
- Write clean, readable code
- Follow TypeScript best practices
- Use meaningful variable names
- Add proper error handling
- Write comprehensive tests

### Security
- Never commit secrets
- Use environment variables
- Validate all inputs
- Implement proper authentication
- Regular security audits

### Performance
- Optimize images and assets
- Implement caching strategies
- Monitor bundle size
- Use lazy loading
- Optimize database queries

### Documentation
- Keep README updated
- Document API endpoints
- Add inline comments
- Maintain changelog
- Update deployment guides