# Deployment Guide - Todo List App

## Overview

This guide provides instructions for deploying the Todo List Application to production environments. Both the backend and frontend are ready for deployment.

---

## Prerequisites

- GitHub account (for repository hosting)
- Render account (for backend deployment)
- GitHub Pages or Netlify account (for frontend deployment)
- MongoDB Atlas account (for cloud database)
- Git installed locally

---

## Part 1: Prepare Code for Deployment

### 1. Create GitHub Repository

```bash
# Initialize git if not already done
cd /path/to/prateekjain_task33
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Todo List App with backend and frontend"

# Create repository on GitHub and add remote
git remote add origin https://github.com/yourusername/todoapp.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 2. Update Environment Variables

**Backend (.env)**
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp?retryWrites=true&w=majority
NODE_ENV=production
```

**Frontend (.env)**
```
VITE_API_URL=https://your-backend-url.com/api
```

---

## Part 2: Backend Deployment (Render)

### Step 1: Create MongoDB Atlas Database

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Set up database user with username and password
4. Get connection string:
   - Copy the connection string (URI)
   - Replace `<username>` and `<password>`

### Step 2: Deploy to Render

1. **Visit Render Dashboard**
   - Go to https://render.com
   - Sign in or create account

2. **Create New Web Service**
   - Click "New +"
   - Select "Web Service"

3. **Connect Repository**
   - Click "Connect a repository"
   - Select your GitHub repository
   - Authorize Render to access GitHub

4. **Configure Service**
   - **Name**: todoapp-backend (or your choice)
   - **Root Directory**: backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. **Add Environment Variables**
   - Click "Environment"
   - Add variables:
     ```
     PORT=5000
     MONGODB_URI=mongodb+srv://...
     NODE_ENV=production
     ```

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the backend URL (e.g., https://todoapp-backend.onrender.com)

### Step 3: Update Frontend with Backend URL

1. Update `frontend/.env`:
   ```
   VITE_API_URL=https://todoapp-backend.onrender.com/api
   ```

2. Commit and push:
   ```bash
   git add frontend/.env
   git commit -m "Update backend URL for production"
   git push
   ```

---

## Part 3: Frontend Deployment (GitHub Pages)

GitHub Pages hosts the static React frontend. Deploy the Express/MongoDB backend separately (for example, on Render).

1. Push this project to `prateek2302/prateekjain_task33`.
2. Open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source.
3. Under **Settings → Secrets and variables → Actions → Variables**, add `VITE_API_URL` with the deployed backend API URL, such as `https://your-backend.onrender.com/api`.
4. Run the **Deploy frontend to GitHub Pages** workflow, or push to `main`.
5. Visit `https://prateek2302.github.io/prateekjain_task33/`.

Without `VITE_API_URL`, the frontend falls back to `http://localhost:5000/api`, which cannot reach your local machine from the public site.

### Alternative: Deploy to Netlify

For Netlify, use `frontend` as the base directory, `npm run build` as the build command, and `dist` as the publish directory. Set the `VITE_API_URL` environment variable to the deployed backend API URL.

### Step 2: Configure Custom Domain (Optional)

1. Go to "Domain management"
2. Click "Add domain"
3. Enter your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (usually 24 hours)

---

## Verification Checklist

### Backend
- [ ] Health check endpoint responds: `https://your-backend.onrender.com/api/health`
- [ ] Can create todo via API
- [ ] Can get all todos
- [ ] Can update todo
- [ ] Can delete todo

### Frontend
- [ ] Page loads: `https://your-frontend.netlify.app`
- [ ] Can create todo
- [ ] Can view todos
- [ ] Can edit todo
- [ ] Can delete todo
- [ ] Can filter todos
- [ ] Can search todos

### Integration
- [ ] Frontend can communicate with backend
- [ ] No CORS errors in console
- [ ] API calls succeed
- [ ] Data persists in MongoDB

---

## Monitoring & Maintenance

### Backend (Render)

1. **View Logs**
   - Go to "Logs" tab
   - Monitor for errors
   - Check startup messages

2. **Monitor Performance**
   - View CPU and memory usage
   - Check response times
   - Monitor error rates

3. **Redeploy**
   - Push new code to GitHub
   - Render automatically redeploys
   - Or manually redeploy from dashboard

### Frontend (Netlify)

1. **View Deployment Status**
   - Go to "Deployments"
   - See build logs
   - Monitor for build failures

2. **View Analytics**
   - Go to "Analytics"
   - Monitor page views and performance

---

## Troubleshooting

### Backend Not Responding

1. **Check if service is running**
   - Render dashboard shows status
   - Check recent logs for errors

2. **Check MongoDB Connection**
   - Verify connection string
   - Ensure IP whitelist includes Render

3. **Check Environment Variables**
   - All required variables set
   - No typos in variable names

### Frontend Not Loading

1. **Check Build Status**
   - Netlify dashboard shows build logs
   - Look for build errors

2. **Check API URL**
   - Verify VITE_API_URL is correct
   - Test API endpoint manually

3. **Clear Cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Clear browser cache

### CORS Errors

1. **Verify Backend URL**
   - Must be exact URL including protocol

2. **Check Render Logs**
   - Look for CORS-related errors

3. **Update Frontend URL**
   - If backend URL changed, update frontend

---

## Performance Optimization

### Backend

1. **Enable Compression**
   - Already configured in Express

2. **Database Indexing**
   - MongoDB indexes created automatically
   - Consider adding compound indexes for filters

3. **Caching**
   - Add Redis for frequently accessed data

### Frontend

1. **Optimize Bundle**
   - Vite already optimizes production builds
   - Monitor bundle size

2. **Lazy Loading**
   - Consider lazy loading components

3. **Image Optimization**
   - Not applicable for this app (text-based)

---

## Backup & Recovery

### MongoDB Backups

1. **Enable Automatic Backups**
   - MongoDB Atlas automatically backs up
   - Retention: 35 days (M2+)

2. **Manual Backup**
   - Use MongoDB backup tools
   - Store in secure location

3. **Restore**
   - Use MongoDB Atlas restore feature
   - Or restore from backup file

---

## Security Considerations

### For Production

1. **Update CORS**
   ```javascript
   // In backend/index.js
   app.use(cors({
     origin: 'https://yourdomain.com',
     credentials: true
   }));
   ```

2. **Enable HTTPS**
   - Both Render and Netlify provide HTTPS
   - Certificate auto-renewal included

3. **Secure Secrets**
   - Never commit .env files
   - Use platform environment variables
   - Rotate credentials regularly

4. **MongoDB Authentication**
   - Use strong passwords
   - Enable IP whitelist
   - Use VPN for connections

5. **Rate Limiting**
   - Add rate limiting middleware for production
   - Prevent abuse and DDoS

---

## Rollback Procedure

### If Deployment Fails

**Backend (Render)**
1. Go to Deployments
2. Click previous successful deployment
3. Click "Redeploy"

**Frontend (Netlify)**
1. Go to Deployments
2. Click previous successful deployment
3. Click "Publish deploy"

---

## Cost Considerations

### Estimated Monthly Costs

- **Render**: $7/month (free tier available)
- **MongoDB Atlas**: $9/month (M2 tier, free tier available)
- **Netlify**: Free (with optional paid tier)
- **Total**: $16/month minimum

### Free Options

- Render: Free tier included (no credit card required)
- Netlify: Free tier with generous limits
- MongoDB Atlas: Free tier with 512MB storage

---

## Scale as You Grow

### When to Upgrade

1. **Backend**
   - If more than 100,000 requests/month → upgrade Render tier
   - If response time > 500ms → optimize queries
   - If hitting resource limits → scale vertically

2. **Database**
   - If storage > 512MB → upgrade MongoDB tier
   - If queries slow → add indexes
   - If concurrent connections high → upgrade tier

3. **Frontend**
   - Current setup handles millions of page views
   - No upgrade needed unless custom needs

---

## Continuous Integration/Deployment (CI/CD)

### Automatic Deployment

Both Render and Netlify support automatic deployment:
- Push to main branch
- Automatic build and deploy
- Rollback on build failure

### Manual Deployment

1. **Render**
   - Go to Service settings
   - Click "Manual deploy" → "Deploy latest commit"

2. **Netlify**
   - Trigger build via dashboard
   - Or push new commit to GitHub

---

## Support Resources

- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Express Docs**: https://expressjs.com
- **React Docs**: https://react.dev

---

## Summary

Your Todo List App is now deployed and ready for production use!

- **Backend**: https://your-backend.onrender.com
- **Frontend**: https://your-frontend.netlify.app

For updates:
1. Make changes locally
2. Commit and push to GitHub
3. Automatic deployment triggers
4. Monitor logs in respective dashboards

Happy deploying! 🚀
