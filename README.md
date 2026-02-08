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

## Setup - Cloudflare D1 (Comments)

For the anonymous comment section, you need a D1 database.

### Option A: Use wrangler.toml (recommended for Git deploy)

1. **Create D1 database:** Cloudflare Dashboard → Workers & Pages → D1 → Create database  
   - Name it (e.g. `comments-db`). Note the **Database ID** (UUID) from the database overview.

2. **Edit `wrangler.toml`** in the project root: replace `YOUR_D1_DATABASE_ID` with your database UUID, and adjust `database_name` if you used a different name.

3. **Run the migration** (creates the `comments` table):
   ```bash
   wrangler d1 execute comments-db --remote --file=./migrations/0001_create_comments.sql
   ```
   Use the same database name as in `wrangler.toml` (e.g. `comments-db`).

4. **Commit and push** so the next Pages deployment uses the config. Ensure your Pages project uses the **V2 build** (Settings → Builds & deployments) so the Wrangler file is applied.

### Option B: Dashboard-only binding

1. Create the D1 database and run the migration as in steps 1 and 3 above.

2. **Bind D1 in the dashboard:** Pages → Your Project → Settings → Functions → D1 database bindings → Add binding  
   - **Variable name:** `DB` (or `D1` / `DATABASE` — the code accepts any of these)  
   - **D1 database:** select your database  
   - Add for **Production** (and Preview if you use it).

3. Redeploy the project.

## Project Structure

```
.
├── index.html          # Main HTML file with chat bot
├── comments.html       # Comments display page
├── wrangler.toml       # Pages + D1 config (set database_id for comments)
├── config.example.js   # API config template
├── imgs/               # Images folder
├── functions/api/      # Cloudflare Pages Functions
│   ├── chat.js         # Gemini chat API
│   └── comments.js     # D1 comments API
├── migrations/         # D1 schema
│   └── 0001_create_comments.sql
└── README.md
```

## Features

- Background image from local folder
- Centered H1 heading
- Animated H2 that blinks in RGB colors and jumps around the page
- **Customer Chat Bot** powered by Google Gemini API
- **Anonymous Comments** stored in Cloudflare D1
  - Input in bottom-left corner (max 400 chars, text only)
  - View all comments on `comments.html`

