# 🗄️ **DATABASE SETUP GUIDE - DAILY SECRETS APPLICATION**

## 🚨 **CRITICAL: DATABASE CONFIGURATION REQUIRED**

The application requires a PostgreSQL database to function properly. Here are multiple setup options:

---

## 🚀 **OPTION 1: FREE CLOUD DATABASE (RECOMMENDED)**

### **A. Supabase (Recommended)**
1. **Sign up**: Go to https://supabase.com
2. **Create project**: Click "New Project"
3. **Get connection string**: 
   - Go to Settings → Database
   - Copy the connection string
4. **Update .env.local**:
   ```bash
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?schema=public"
   ```

### **B. Neon (Alternative)**
1. **Sign up**: Go to https://neon.tech
2. **Create database**: Click "Create Database"
3. **Get connection string**: Copy from dashboard
4. **Update .env.local**:
   ```bash
   DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]/[DATABASE]?sslmode=require"
   ```

### **C. Railway (Alternative)**
1. **Sign up**: Go to https://railway.app
2. **Create PostgreSQL**: Add PostgreSQL service
3. **Get connection string**: Copy from service details
4. **Update .env.local** with the connection string

---

## 🏠 **OPTION 2: LOCAL POSTGRESQL SETUP**

### **Install PostgreSQL Locally**

#### **macOS (using Homebrew)**
```bash
# Install PostgreSQL
brew install postgresql

# Start PostgreSQL service
brew services start postgresql

# Create database
createdb daily_secrets

# Update .env.local
DATABASE_URL="postgresql://postgres:password@localhost:5432/daily_secrets?schema=public"
```

#### **Windows**
1. **Download**: https://www.postgresql.org/download/windows/
2. **Install**: Run the installer
3. **Create database**: Use pgAdmin or command line
4. **Update .env.local** with local connection string

#### **Linux (Ubuntu/Debian)**
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database
sudo -u postgres createdb daily_secrets

# Update .env.local
DATABASE_URL="postgresql://postgres:password@localhost:5432/daily_secrets?schema=public"
```

---

## 🔧 **OPTION 3: DOCKER SETUP (QUICK)**

### **Using Docker Compose**
Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: daily_secrets
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### **Run Database**
```bash
# Start PostgreSQL
docker-compose up -d

# Update .env.local
DATABASE_URL="postgresql://postgres:password@localhost:5432/daily_secrets?schema=public"
```

---

## 📋 **AFTER DATABASE SETUP**

### **1. Generate Prisma Client**
```bash
npx prisma generate
```

### **2. Run Database Migrations**
```bash
npx prisma db push
```

### **3. Verify Connection**
```bash
npx prisma studio
```

### **4. Test Authentication**
```bash
npm run dev
# Navigate to http://localhost:3000
# Test user registration and login
```

---

## 🚨 **QUICK START (5 MINUTES)**

### **For Immediate Testing**
1. **Go to Supabase**: https://supabase.com
2. **Sign up** (free account)
3. **Create new project**
4. **Copy database URL** from Settings → Database
5. **Update .env.local** with the URL
6. **Run setup commands**:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run dev
   ```

---

## 🔍 **TROUBLESHOOTING**

### **Common Issues**

#### **"Database connection failed"**
- Check DATABASE_URL format
- Verify database is running
- Check firewall settings

#### **"Schema validation failed"**
- Run `npx prisma format`
- Check for duplicate models
- Verify field types

#### **"Migration failed"**
- Check database permissions
- Verify connection string
- Try `npx prisma db push --force-reset`

---

## 📊 **PRODUCTION CONSIDERATIONS**

### **For Production Deployment**
1. **Use managed PostgreSQL**: AWS RDS, Google Cloud SQL, or Azure Database
2. **Enable SSL**: Use `?sslmode=require` in connection string
3. **Set up backups**: Configure automated backups
4. **Monitor performance**: Set up database monitoring
5. **Security**: Use connection pooling and proper access controls

---

## ✅ **VERIFICATION CHECKLIST**

After database setup, verify:
- [ ] `npx prisma generate` runs without errors
- [ ] `npx prisma db push` creates tables successfully
- [ ] `npx prisma studio` opens database browser
- [ ] Application starts without database errors
- [ ] User registration works (creates user in database)
- [ ] User login works (session persists)
- [ ] API endpoints return data (not 401 errors)

---

**Status**: 🔴 **CRITICAL - BLOCKING PRODUCTION DEPLOYMENT**  
**Estimated Setup Time**: 5-15 minutes  
**Priority**: ⚡ **IMMEDIATE ATTENTION REQUIRED**
