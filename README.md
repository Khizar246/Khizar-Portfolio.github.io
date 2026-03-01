# 🚀 Modern Data Analyst Portfolio

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://your-username.github.io/portfolio)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/Khizar246)

> A modern, responsive portfolio website showcasing data analysis projects, technical skills, and professional experience.

![Portfolio Preview](images/IT%20Career%20Insights%20Dashboard.png)

## ✨ Features

- 🎨 **Modern Design**: Clean, professional interface with gradient accents and smooth animations
- 🌓 **Dark/Light Mode**: Toggle between themes with persistent preference storage
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 🖼️ **Lightbox Gallery**: Click any project or certification image to view in full screen
- 🎯 **Smooth Navigation**: Floating menu with smooth scroll to sections
- ⚡ **Fast Loading**: Optimized performance with lazy loading and efficient code
- ♿ **Accessible**: WCAG compliant with keyboard navigation support
- 🎭 **Interactive**: Hover effects, scroll animations, and smooth transitions

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup for better SEO and accessibility
- **CSS3** - Modern styling with custom properties and flexbox/grid layouts
- **JavaScript (ES6+)** - Vanilla JS for interactivity and dynamic features

### Design & UI
- **Google Fonts (Poppins)** - Clean, modern typography
- **Font Awesome 6** - Scalable vector icons
- **Custom CSS Variables** - Easy theme customization
- **CSS Animations** - Smooth scroll-triggered animations

### Features
- **Local Storage API** - Theme preference persistence
- **Intersection Observer API** - Efficient scroll animations
- **CSS Grid & Flexbox** - Responsive layouts
- **Custom Lightbox** - Image viewing modal

## 📂 Project Structure

```
portfolio/
├── index.html              # Main portfolio page
├── generic.html            # Detailed about page
├── elements.html           # Design system reference
├── README.md              # This file
├── assets/
│   ├── css/
│   │   └── main.css       # Main stylesheet with theme support
│   ├── js/
│   │   └── main.js        # Interactive functionality
│   └── Resume.pdf         # Downloadable resume
└── images/                # Project screenshots and assets
    ├── IT Career Insights Dashboard.png
    ├── Orders Dashboard.png
    ├── Audit Agent.png
    ├── News Agent.png
    ├── Finance_Dashboard.png
    ├── Sales Analysis Dashboard.png
    ├── Spending Habits.png
    ├── DP900_Certification.png
    └── [skill icons]
```

## 🚀 Getting Started

### Prerequisites

No build tools or dependencies required! This is a static website that runs directly in the browser.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Khizar246/portfolio.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd portfolio
   ```

3. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Or using Node.js with http-server
   npx http-server
   ```

4. **Access the portfolio**
   - Open `http://localhost:8000` in your browser

### Deployment

#### GitHub Pages

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select `main` branch as source
   - Save and wait for deployment

2. **Access your site**
   - Your portfolio will be available at `https://your-username.github.io/repository-name`

#### Other Platforms

This portfolio can be deployed to any static hosting service:
- **Netlify**: Drag and drop the folder
- **Vercel**: Import from GitHub
- **Firebase Hosting**: Use Firebase CLI
- **AWS S3**: Upload as static website

## 🎨 Customization Guide

### Changing Colors

Edit CSS variables in `assets/css/main.css`:

```css
:root {
    --primary-color: #667eea;        /* Main brand color */
    --secondary-color: #764ba2;      /* Accent color */
    --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Adding Projects

1. **Add project image** to `images/` folder
2. **Edit `index.html`** in the projects section:

```html
<article class="project-card">
    <div class="project-image-container">
        <img src="images/your-project.png" alt="Project Name" class="clickable-image" />
        <div class="project-overlay">
            <h4>Your Project Title</h4>
        </div>
    </div>
    <div class="project-details">
        <h4>Your Project Title</h4>
        <p>Project description here...</p>
        <div class="project-tech">
            <span class="tech-tag">Technology 1</span>
            <span class="tech-tag">Technology 2</span>
        </div>
        <a href="your-link" target="_blank" class="btn btn-outline">
            <i class="fas fa-external-link-alt"></i>
            View Project
        </a>
    </div>
</article>
```

### Updating Content

- **Personal Info**: Edit the hero section in `index.html`
- **About Text**: Modify the about section content
- **Skills**: Update skill tags in the skills section
- **Contact Info**: Change email, LinkedIn, GitHub links
- **Resume**: Replace `assets/Resume.pdf` with your resume

### Changing Fonts

Update the Google Fonts import in HTML files:

```html
<link href="https://fonts.googleapis.com/css2?family=Your-Font:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Then update CSS:

```css
:root {
    --font-primary: 'Your-Font', sans-serif;
}
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🎯 Key Sections

### Home
- Hero section with call-to-action
- Theme toggle and navigation menu
- Smooth scroll to sections

### About
- Professional background
- Experience stats
- Career achievements

### Skills
- Technical expertise categorized by domain
- Interactive skill tags with hover effects
- Visual presentation with icons

### Projects
- Featured project showcase
- Project grid with detailed cards
- Lightbox image viewing
- Live demo and GitHub links

### Certifications
- Professional certifications display
- Certificate image with details
- Skills and competencies

### Contact
- Multiple contact methods
- Social media links
- Professional profile connections

## 🔧 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

**Note**: Modern browsers with ES6+ support required

## ⚡ Performance

- **Lighthouse Score**: 95+ across all metrics
- **Load Time**: < 2 seconds on average connection
- **Optimizations**: 
  - Lazy loading for images
  - Minified assets (optional)
  - Efficient CSS and JavaScript
  - No external dependencies beyond fonts and icons

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Mohd Khizar**

- 🌐 Portfolio: [https://your-username.github.io/portfolio](https://your-username.github.io/portfolio)
- 💼 LinkedIn: [@khizar246](https://www.linkedin.com/in/khizar246/)
- 🐙 GitHub: [@Khizar246](https://github.com/Khizar246)
- 📧 Email: khizerwork75@gmail.com

## 🌟 Acknowledgments

- Design inspiration from modern web trends
- Icons by [Font Awesome](https://fontawesome.com/)
- Fonts by [Google Fonts](https://fonts.google.com/)
- Template structure by HTML5 UP (heavily customized)

## 📊 Portfolio Stats

- **Total Projects**: 6+ featured projects
- **Technologies Showcased**: 15+ tools and languages
- **Experience**: 1.8+ years in Data Analysis
- **Certifications**: Microsoft Azure DP-900

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

Made with ❤️ and ☕ by [Mohd Khizar](https://github.com/Khizar246)

**[View Live Demo](https://your-username.github.io/portfolio)** | **[Report Bug](https://github.com/Khizar246/portfolio/issues)** | **[Request Feature](https://github.com/Khizar246/portfolio/issues)**

</div>
