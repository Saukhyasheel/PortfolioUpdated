# Deployment Guide

## Download Project from Replit

1. **Download as ZIP**:
   - In Replit, click the three dots menu (⋯) next to your project name
   - Select "Download as ZIP"
   - Extract the ZIP file to your local machine

2. **Alternative - Git Clone** (if you have Git enabled):
   ```bash
   git clone <your-replit-git-url>
   ```

## Deploy to Render

### Method 1: Direct Upload (Recommended)

1. **Create Render Account**:
   - Go to [render.com](https://render.com)
   - Sign up for a free account

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Choose "Build and deploy from a Git repository"
   - Connect your GitHub account and upload your project there, OR
   - Use "Deploy from Git repository" after pushing to GitHub

3. **Configure Build Settings**:
   ```
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Environment Variables**:
   - Add `NODE_ENV=production`
   - Add `PORT=10000` (Render's default)

### Method 2: GitHub Integration

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Render**:
   - In Render dashboard, click "New +" → "Web Service"
   - Choose "Build and deploy from a Git repository"
   - Select your GitHub repository

3. **Configure Deployment**:
   - **Name**: your-portfolio-site
   - **Root Directory**: (leave blank)
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

## Project Configuration for Render

The project is already configured with:
- ✅ Production build scripts in `package.json`
- ✅ Express server that serves static files
- ✅ Environment variable support
- ✅ Port binding to `process.env.PORT || 5000`

## Database Setup (Optional)

If you want persistent database storage:

1. **Add PostgreSQL Database**:
   - In Render dashboard, create a new PostgreSQL database
   - Copy the connection string

2. **Update Environment Variables**:
   - Add `DATABASE_URL=<your-postgres-connection-string>`

3. **Enable Database in Code**:
   - The project already supports PostgreSQL through Drizzle ORM
   - Contact data will be stored in the database instead of memory

## Custom Domain (Optional)

1. **Add Custom Domain**:
   - In your Render service settings
   - Go to "Settings" → "Custom Domains"
   - Add your domain and configure DNS

## Deployment Checklist

- [ ] Project downloaded from Replit
- [ ] Code pushed to GitHub (if using Git method)
- [ ] Render account created
- [ ] Web service configured
- [ ] Environment variables set
- [ ] Build and start commands configured
- [ ] Domain configured (optional)

## Troubleshooting

**Build Fails**:
- Check Node.js version compatibility
- Ensure all dependencies are in `package.json`

**App Won't Start**:
- Verify start command: `npm start`
- Check that port is bound to `process.env.PORT`

**Contact Form Not Working**:
- Ensure API routes are properly configured
- Check that form submits to correct endpoints

## Support

If you encounter issues:
1. Check Render's build and deploy logs
2. Verify all environment variables are set
3. Test the application locally first with `npm run build && npm start`