# Sok Vannal — Portfolio

A modern, responsive single-page developer portfolio built with **vanilla HTML, CSS, and JavaScript** — no build step required. Ready to deploy on **GitHub Pages**.

## ✨ Features

- Responsive layout (mobile → desktop)
- Light / dark theme toggle (remembers your choice)
- Animated typing effect, scroll reveals, and counters
- Sticky navigation with mobile menu and scroll-spy
- Sections: Hero, About, Skills, Experience timeline, Education, Contact & References
- Accessible (respects `prefers-reduced-motion`)

## 📁 Structure

```
portfolio/
├── index.html      # Page markup & content
├── styles.css      # Theme tokens + styling
├── script.js       # Interactions (theme, typing, reveals, counters)
└── README.md
```

## 🚀 Run locally

Just open `index.html` in your browser, or serve it:

```bash
# Python
python -m http.server 5500

# or Node
npx serve .
```

Then visit `http://localhost:5500`.

## 🌐 Deploy to GitHub Pages

1. Create a new repository (e.g. `username.github.io` for a user site, or any name for a project site).
2. Push these files to the repository:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```

3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
5. Save — your site will be live at `https://<username>.github.io/<repo>/`.

## 🛠 Customize

- **Content**: edit text directly in `index.html`.
- **Colors / theme**: change the CSS variables at the top of `styles.css` (`--accent`, `--bg`, etc.).
- **Photo**: replace `profile.jpg` (the `.hero__avatar` `<img>` in `index.html`).
- **Roles in typing effect**: edit the `roles` array in `script.js`.

## 🐳 Docker + CI/CD deploy to a Linux server

The site is containerized with nginx and served under the **`/Vannal-SOK`** subpath, so it
goes live at **https://kbounkhnat.site/Vannal-SOK**.

### Files
| File | Purpose |
|------|---------|
| `Dockerfile` | Builds an `nginx:alpine` image with the static site |
| `nginx.conf` | Serves the site under `/Vannal-SOK/` (inside the container) |
| `docker-compose.yml` | Optional convenience for running on the server |
| `.github/workflows/deploy.yml` | Builds → pushes image to GHCR → deploys over SSH |
| `deploy/host-nginx-kbounkhnat.conf` | Reverse-proxy snippet for the host (TLS + domain) |

### Test locally
```bash
docker build -t vannal-portfolio .
docker run --rm -p 8080:80 vannal-portfolio
# open http://localhost:8080/Vannal-SOK/
```

### One-time server setup
1. Install Docker on the Linux server.
2. The container listens on host port **8080**. Add the reverse-proxy snippet from
   `deploy/host-nginx-kbounkhnat.conf` to the existing TLS `server` block for
   `kbounkhnat.site`, then `sudo nginx -t && sudo systemctl reload nginx`.
3. Create an SSH key the CI will use to log in (add the public key to the server's
   `~/.ssh/authorized_keys`).
4. Create a GitHub Personal Access Token with `read:packages` so the server can pull
   the image from GHCR.

### Required GitHub repository secrets
Settings → Secrets and variables → Actions → **New repository secret**:

| Secret | Value |
|--------|-------|
| `SSH_HOST` | Server IP / hostname |
| `SSH_USER` | SSH username |
| `SSH_KEY` | Private SSH key (the matching public key is on the server) |
| `SSH_PORT` | SSH port (usually `22`) |
| `GHCR_USERNAME` | Your GitHub username |
| `GHCR_TOKEN` | GitHub PAT with `read:packages` (used by the server to pull) |

> `GITHUB_TOKEN` is provided automatically and is used to **push** the image to GHCR.

### Deploy
Push to `main` (or run the workflow manually). The pipeline will:
1. Build the Docker image and push it to `ghcr.io/<owner>/<repo>`.
2. SSH into the server, pull the image, and restart the `vannal-portfolio` container.

Once DNS + reverse proxy are in place, the site is live at
**https://kbounkhnat.site/Vannal-SOK**.

---

© Sok Vannal · Full Stack Web Developer
