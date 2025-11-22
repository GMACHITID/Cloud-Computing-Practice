# Week 3 Homework Submission

A simple webpage with animated elements, ready to deploy on Cloudflare Pages.

## Deploy to Cloudflare Pages (Free)

### Option 1: Via GitHub/GitLab (Recommended)

1. **Push to GitHub/GitLab:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Pages** → **Create a project**
   - Click **Connect to Git**
   - Select your repository
   - Build settings:
     - **Framework preset:** None
     - **Build command:** (leave empty)
     - **Build output directory:** `/` (root)
   - Click **Save and Deploy**

### Option 2: Direct Upload

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project**
3. Select **Upload assets**
4. Drag and drop all files (including the `imgs` folder)
5. Click **Deploy site**

### Option 3: Using Wrangler CLI

1. **Install Wrangler:**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare:**
   ```bash
   wrangler login
   ```

3. **Deploy:**
   ```bash
   wrangler pages deploy .
   ```

## Setup - Configure Gemini API Key

Before deploying, you need to configure your Google AI Studio API key:

1. Open `config.js` file
2. Replace `'YOUR_API_KEY_HERE'` with your actual Google AI Studio API key
3. Get your API key from: [Google AI Studio](https://aistudio.google.com/app/apikey)

**Important:** 
- The API key will be visible in the client-side code (this is normal for browser-based apps)
- Consider setting up API key restrictions in Google Cloud Console for security
- Never commit your real API key to public repositories

## Project Structure

```
.
├── index.html          # Main HTML file with chat bot
├── config.js           # API configuration (add your API key here)
├── imgs/              # Images folder
│   └── 89939503_2749424095293305_8900976475763638272_n.jpg
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## Features

- Background image from local folder
- Centered H1 heading
- Animated H2 that blinks in RGB colors and jumps around the page
- **Customer Chat Bot** powered by Google Gemini API
  - Floating chat widget
  - Real-time AI responses
  - Modern, responsive UI

