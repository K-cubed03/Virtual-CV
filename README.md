# Khotso Kenneth Khanye — Portfolio
 
A personal portfolio website built from scratch with HTML, CSS, and JavaScript — no frameworks, no build step.
 
🔗 **Live site:** `https://<your-username>.github.io/<repo-name>/`
 
## About
 
This is my personal portfolio site, showcasing my background as a Final Year BSc Information Technology student at North-West University (Vanderbijlpark Campus). It includes my education, experience, projects, and technical skills.
 
## Features
 
- Responsive layout — works on desktop, tablet, and mobile
- Sticky navigation with a mobile hamburger menu
- Scroll-triggered reveal animations for sections
- Animated skill bars
- Downloadable CV
- Contact links (email, LinkedIn, GitHub)
## Tech Stack
 
- **HTML5** — semantic page structure
- **CSS3** — custom properties (design tokens), Flexbox/Grid layout, responsive media queries
- **Vanilla JavaScript** — mobile nav toggle, `IntersectionObserver` for scroll animations
## Project Structure
 
```
.
├── index.html          # Page markup
├── style.css           # Styling and layout
├── script.js           # Interactivity (nav, animations)
├── cv/
│   └── Khotso_Kenneth_Khanye_CV.pdf
└── assets/
    ├── profile.jpg
    └── project2.png
```
 
## Running Locally
 
Since this is a static site, you just need to serve the folder — opening `index.html` directly (`file://`) will work for most of the page, but for downloads and external links to behave correctly, use a local server:
 
**Using VS Code:**
1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Right-click `index.html` → **Open with Live Server**
**Using Python:**
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`
 
## Deployment
 
This site is deployed with **GitHub Pages**:
1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose your main branch and `/ (root)` folder
5. Save — the site will be live at `https://<your-username>.github.io/<repo-name>/` within a couple of minutes
## Contact
 
- 📧 [khanyekhotso05@gmail.com](mailto:khanyekhotso05@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/khotso-kenneth-khanye-0a96242a5/)
- 💻 [GitHub](https://github.com/K-cubed03)
## License
 
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
