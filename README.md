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

## Project Structure

```
.
├── index.html          # Main HTML file
├── simple-webpage.html # Alternative HTML file
├── imgs/              # Images folder
│   └── 89939503_2749424095293305_8900976475763638272_n.jpg
└── README.md          # This file
```

## Features

- Background image from local folder
- Centered H1 heading
- Animated H2 that blinks in RGB colors and jumps around the page

