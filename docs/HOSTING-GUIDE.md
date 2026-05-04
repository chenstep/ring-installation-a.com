# Hosting Guide: Getting Your Prototype on GitHub Pages

## Step-by-Step Setup

### Step 1: Install Git

1. Go to: **https://git-scm.com/download/win**
2. Download the installer (64-bit)
3. Run the installer — use all default settings (just click "Next" through everything)
4. When done, **close and reopen your terminal** (or restart Kiro)

To verify it worked, open a new terminal and type:
```
git --version
```
You should see something like: `git version 2.44.0.windows.1`

---

### Step 2: Create a GitHub Account (if you don't have one)

**For personal/public GitHub:**
- Go to: **https://github.com**
- Sign up with your email

**For Amazon internal GitHub (code.amazon.com):**
- Go to: **https://code.amazon.com** (requires VPN/corp network)
- Log in with your Amazon credentials
- This is preferred for internal prototypes

---

### Step 3: Create a New Repository

1. On GitHub, click **"+" → "New repository"**
2. Name it: `ring-installation-prototype`
3. Set to **Private** (important for internal work)
4. Do NOT initialize with README (we already have one)
5. Click **"Create repository"**

---

### Step 4: Connect Your Local Project to GitHub

After Git is installed, open a terminal and run these commands one at a time:

```bash
cd C:\Users\chenstep\Desktop\ring-installation-prototype

git init

git add .

git commit -m "Initial prototype - PDP page with Professional Installation Service"

git branch -M main

git remote add origin https://github.com/YOUR_USERNAME/ring-installation-prototype.git

git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

(If using code.amazon.com, the URL will be different — it'll be shown on the repo creation page)

---

### Step 5: Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source", select:
   - Branch: `main`
   - Folder: `/src` (if available) or `/ (root)`
4. Click **Save**
5. Wait ~1 minute, then your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/ring-installation-prototype/
   ```

---

### Step 6: Share the Link! 🎉

Copy the GitHub Pages URL and share it with your team. Anyone with the link (and access, if private) can click through the prototype.

---

## Updating the Prototype

After making changes, push updates with:
```bash
cd C:\Users\chenstep\Desktop\ring-installation-prototype
git add .
git commit -m "Description of changes"
git push
```

The live link will auto-update within ~1 minute.

---

## Quick Alternative: No Git Needed

If you want to share RIGHT NOW without setting up Git:

1. **Zip the `src/` folder**
2. **Email it** to your team — they can open `index.html` in their browser
3. Or **drag the `src/` folder** onto https://app.netlify.com/drop for an instant link

---

*Guide created: May 4, 2026*
