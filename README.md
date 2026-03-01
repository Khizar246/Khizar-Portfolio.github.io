# 🚀 Modern Data Analyst Portfolio

> A modern, responsive portfolio website showcasing data analysis projects, technical skills, and professional experience.

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

## 🎨 Customization Guide

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

## 📊 Portfolio Stats

- **Total Projects**: 8+ featured projects
- **Technologies Showcased**: 15+ tools and languages
- **Experience**: 2+ years in Data Analysis
- **Certifications**: Microsoft Azure DP-900

---
