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
- **Photo**: replace the `.hero__avatar` initials block in `index.html` with an `<img>` tag pointing to your photo.
- **Roles in typing effect**: edit the `roles` array in `script.js`.

---

© Sok Vannal · Full Stack Web Developer
