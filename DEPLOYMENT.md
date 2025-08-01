# CrewAI Dashboard - Deployment Guide

This guide provides step-by-step instructions for deploying the CrewAI Dashboard to various platforms.

## 🚀 Quick Deploy to Vercel

### 1. Prepare Your Repository

1. **Fork or Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/crewai-dashboard.git
   cd crewai-dashboard
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   VITE_API_URL=https://your-api-domain.com
   VITE_CEREBRAS_API_KEY=your_cerebras_api_key
   VITE_CEREBRAS_MODEL_ID=your_model_id
   VITE_CEREBRAS_BASE_URL=https://api.cerebras.ai
   VITE_WS_URL=wss://your-api-domain.com/ws
   ```

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your repository
   - Configure environment variables in the Vercel dashboard

3. **Set Environment Variables in Vercel**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add the following variables:
     - `VITE_API_URL`
     - `VITE_CEREBRAS_API_KEY`
     - `VITE_CEREBRAS_MODEL_ID`
     - `VITE_CEREBRAS_BASE_URL`
     - `VITE_WS_URL`

4. **Deploy**
   - Vercel will automatically build and deploy your project
   - Your app will be available at `https://your-project.vercel.app`

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow the prompts**
   - Link to existing project or create new
   - Set environment variables when prompted
   - Deploy to production

### 3. Configure Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to your Vercel project dashboard
   - Navigate to "Settings" > "Domains"
   - Add your custom domain
   - Configure DNS settings as instructed

2. **SSL Certificate**
   - Vercel automatically provides SSL certificates
   - No additional configuration needed

## 🌐 Deploy to Other Platforms

### Netlify Deployment

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repository
   - Set environment variables in Netlify dashboard

3. **Configure Redirects**
   Create `_redirects` file in `public/`:
   ```
   /*    /index.html   200
   ```

### GitHub Pages Deployment

1. **Add GitHub Pages Script**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

2. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine as builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=builder /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create nginx.conf**
   ```nginx
   events {
     worker_connections 1024;
   }
   
   http {
     include /etc/nginx/mime.types;
     default_type application/octet-stream;
     
     server {
       listen 80;
       server_name localhost;
       root /usr/share/nginx/html;
       index index.html;
       
       location / {
         try_files $uri $uri/ /index.html;
       }
       
       location /api {
         proxy_pass http://your-api-server;
         proxy_set_header Host $host;
         proxy_set_header X-Real-IP $remote_addr;
       }
     }
   }
   ```

3. **Build and Run**
   ```bash
   docker build -t crewai-dashboard .
   docker run -p 80:80 crewai-dashboard
   ```

## 🔧 Environment Configuration

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://api.crewai.com` |
| `VITE_CEREBRAS_API_KEY` | Cerebras API Key | `your_api_key_here` |
| `VITE_CEREBRAS_MODEL_ID` | Cerebras Model ID | `cerebras-llm-13b` |
| `VITE_CEREBRAS_BASE_URL` | Cerebras Base URL | `https://api.cerebras.ai` |
| `VITE_WS_URL` | WebSocket URL | `wss://api.crewai.com/ws` |

### Optional Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_APP_NAME` | Application Name | `CrewAI Dashboard` |
| `VITE_APP_VERSION` | Application Version | `1.0.0` |
| `VITE_DEBUG_MODE` | Debug Mode | `false` |
| `VITE_ENABLE_LOGS` | Enable Logs | `true` |

## 🔒 Security Considerations

### 1. Environment Variables
- Never commit sensitive environment variables to version control
- Use platform-specific secret management (Vercel, Netlify, etc.)
- Rotate API keys regularly

### 2. CORS Configuration
- Configure your backend to allow requests from your frontend domain
- Set appropriate CORS headers

### 3. Content Security Policy
- The application includes basic CSP headers
- Customize based on your requirements

### 4. API Security
- Use HTTPS for all API communications
- Implement proper authentication and authorization
- Rate limit API endpoints

## 📊 Performance Optimization

### 1. Build Optimization
- The project uses Vite for fast builds
- Code splitting is automatically configured
- Assets are optimized and compressed

### 2. Caching Strategy
- Static assets are cached for 1 year
- API responses should be cached appropriately
- Use CDN for global distribution

### 3. Bundle Analysis
```bash
npm run build
npx vite-bundle-analyzer dist
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (requires 16+)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

2. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names (case-sensitive)
   - Verify API endpoints are accessible

3. **CORS Errors**
   - Configure backend CORS settings
   - Check API URL configuration
   - Verify WebSocket connection

4. **Performance Issues**
   - Enable gzip compression
   - Optimize images and assets
   - Use CDN for static files

### Debug Mode

Enable debug mode for troubleshooting:
```env
VITE_DEBUG_MODE=true
VITE_ENABLE_LOGS=true
```

## 📈 Monitoring and Analytics

### 1. Error Tracking
- Integrate Sentry for error monitoring
- Set up logging for production issues

### 2. Performance Monitoring
- Use Vercel Analytics
- Monitor Core Web Vitals
- Track API response times

### 3. User Analytics
- Integrate Google Analytics
- Track user interactions
- Monitor feature usage

## 🔄 Continuous Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📞 Support

For deployment issues:
1. Check the troubleshooting section
2. Review platform-specific documentation
3. Open an issue on GitHub
4. Contact the development team

## 🎯 Next Steps

After successful deployment:
1. Configure your backend API
2. Set up Cerebras integration
3. Test all functionality
4. Monitor performance and errors
5. Set up monitoring and analytics 