# HNG_TASK_1

Express API for string processing operations.

## Local Development

### Installation
```bash
npm install
```

### Running Locally
```bash
npm start
```
Server runs on `http://localhost:3000`

## Deployment on Railway

### Quick Deploy Steps:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Railway deployment"
   git push origin main
   ```

2. **Deploy on Railway:**
   - Go to [Railway.app](https://railway.app/)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will automatically:
     - Detect Node.js
     - Run `npm install`
     - Start with `npm start`
     - Assign a public URL

3. **Done!** Your API will be live at `https://your-app.up.railway.app`

### Health Check
The API includes a `/health` endpoint for monitoring:
```
GET /health
Response: { "status": "ok", "message": "Server is running" }
```
