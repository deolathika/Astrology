# 🔒 Security Configuration Guide

## Environment Variables for Security

Add these to your `.env.local` file:

```bash
# CSRF Protection
CSRF_SECRET=your-super-secret-csrf-key-change-in-production

# Rate Limiting (optional - defaults will be used if not set)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security Headers
SECURITY_CSP_REPORT_URI=https://your-domain.com/csp-report
SECURITY_HSTS_MAX_AGE=31536000

# Data Protection
MASK_EMAIL=true
MASK_PHONE=true
MASK_SSN=true
MASK_CREDIT_CARD=true
MASK_IP=true

# Admin Access
ADMIN_EMAILS=admin@dailysecrets.com,superadmin@dailysecrets.com

# Security Monitoring
SECURITY_LOG_LEVEL=info
SECURITY_ALERT_EMAIL=security@dailysecrets.com

# Production Security
NODE_ENV=production
NEXT_PUBLIC_APP_ENV=production
```

## Security Features Implemented

### ✅ **CSRF Protection**
- Token-based CSRF protection on all state-changing operations
- Automatic token generation and validation
- Configurable token expiration

### ✅ **Rate Limiting**
- Endpoint-specific rate limiting
- Different limits for auth, admin, and general endpoints
- IP and user-based rate limiting

### ✅ **PII Masking**
- Email address masking
- Phone number masking
- SSN masking
- Credit card masking
- IP address masking

### ✅ **Security Headers**
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options
- X-Content-Type-Options
- Referrer Policy
- Permissions Policy

### ✅ **Data Protection**
- Role-based data filtering
- Input sanitization
- Audit logging for data access

## Testing Security

1. **Visit Security Test Page**: `/security-test`
2. **Run Security Tests**: Click "Run All Tests" button
3. **Check Results**: Verify all tests pass
4. **Review Recommendations**: Follow security best practices

## Production Deployment

1. **Set Environment Variables**: Copy security config to production
2. **Generate CSRF Secret**: Use a strong, random secret
3. **Configure Rate Limits**: Adjust based on your traffic
4. **Enable Monitoring**: Set up security alerting
5. **Test Security**: Run security tests after deployment

## Security Checklist

- [ ] CSRF protection enabled
- [ ] Rate limiting configured
- [ ] PII masking active
- [ ] Security headers present
- [ ] Input validation working
- [ ] Role-based access control
- [ ] Audit logging enabled
- [ ] Security tests passing
