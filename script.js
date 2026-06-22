// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const skillsContainer = document.getElementById('skills-container');
const projectsContainer = document.getElementById('projects-container');
const contactForm = document.getElementById('contact-form');

// Create Floating Particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size and position
        const size = Math.random() * 4 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Create Electric Lightning Effects
function createLightning() {
    const lightningContainer = document.getElementById('lightning-container');
    const lightningCount = 5;
    
    for (let i = 0; i < lightningCount; i++) {
        const lightning = document.createElement('div');
        lightning.classList.add('lightning');
        
        // Create SVG lightning bolt
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '200');
        svg.setAttribute('height', '300');
        svg.setAttribute('viewBox', '0 0 200 300');
        
        // Main lightning bolt path
        const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const boltPath1 = generateLightningPath();
        path1.setAttribute('d', boltPath1);
        path1.classList.add('lightning-bolt');
        
        // Secondary lightning branch
        const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const boltPath2 = generateSecondaryLightningPath();
        path2.setAttribute('d', boltPath2);
        path2.classList.add('lightning-bolt-secondary');
        
        svg.appendChild(path1);
        svg.appendChild(path2);
        lightning.appendChild(svg);
        
        // Random position and animation delay
        lightning.style.left = Math.random() * 80 + '%';
        lightning.style.top = Math.random() * 60 + '%';
        lightning.style.animationDelay = Math.random() * 8 + 's';
        lightning.style.animationDuration = (Math.random() * 3 + 4) + 's';
        
        lightningContainer.appendChild(lightning);
    }
}

// Generate random lightning bolt path
function generateLightningPath() {
    const segments = [
        'M50,0',
        `L${45 + Math.random() * 10},40`,
        `L${55 + Math.random() * 10},80`,
        `L${40 + Math.random() * 20},120`,
        `L${50 + Math.random() * 15},160`,
        `L${35 + Math.random() * 30},200`,
        `L${45 + Math.random() * 10},240`,
        'L50,280'
    ];
    return segments.join(' ');
}

// Generate secondary lightning branch
function generateSecondaryLightningPath() {
    const segments = [
        'M55,100',
        `L${70 + Math.random() * 15},130`,
        `L${60 + Math.random() * 20},160`
    ];
    return segments.join(' ');
}

// Add electric effect to buttons on hover
function addElectricEffects() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.4), 0 0 60px rgba(168, 85, 247, 0.2)';
            btn.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.boxShadow = '';
            btn.style.textShadow = '';
        });
    });
}

// Create random lightning flash effect
function triggerLightningFlash() {
    const body = document.body;
    body.style.background = '#1a0066';
    body.style.transition = 'background 0.1s';
    
    setTimeout(() => {
        body.style.background = '';
        body.style.transition = 'background 1s';
    }, 100);
    
    // Schedule next random flash
    setTimeout(triggerLightningFlash, Math.random() * 15000 + 10000); // 10-25 seconds
}

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if open
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 0, 51, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 0, 51, 0.95)';
    }
});

// Load Skills
async function loadSkills() {
    try {
        const response = await fetch(`${API_BASE_URL}/skills`);
        const skills = await response.json();
        
        skillsContainer.innerHTML = skills.map(skill => `
            <div class="skill-card">
                <div class="skill-header">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-level">${skill.level}%</span>
                </div>
                <div class="skill-progress">
                    <div class="skill-progress-bar" style="width: 0%;" data-width="${skill.level}%"></div>
                </div>
            </div>
        `).join('');
        
        // Animate progress bars
        setTimeout(() => {
            document.querySelectorAll('.skill-progress-bar').forEach(bar => {
                bar.style.width = bar.dataset.width;
            });
        }, 500);
        
    } catch (error) {
        console.error('Error loading skills:', error);
        skillsContainer.innerHTML = `
            <div class="skill-card">
                <div class="skill-header">
                    <span class="skill-name">HTML</span>
                    <span class="skill-level">75%</span>
                </div>
                <div class="skill-progress">
                    <div class="skill-progress-bar" style="width: 75%;"></div>
                </div>
            </div>
            <div class="skill-card">
                <div class="skill-header">
                    <span class="skill-name">CSS</span>
                    <span class="skill-level">70%</span>
                </div>
                <div class="skill-progress">
                    <div class="skill-progress-bar" style="width: 70%;"></div>
                </div>
            </div>
            <div class="skill-card">
                <div class="skill-header">
                    <span class="skill-name">JavaScript</span>
                    <span class="skill-level">65%</span>
                </div>
                <div class="skill-progress">
                    <div class="skill-progress-bar" style="width: 65%;"></div>
                </div>
            </div>
        `;
    }
}

// Load Projects
async function loadProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        const projects = await response.json();
        
        projectsContainer.innerHTML = projects.map(project => `
            <div class="project-card">
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${project.github_url ? `<a href="${project.github_url}" class="project-link" target="_blank">
                            <i class="fab fa-github"></i>View Code
                        </a>` : ''}
                        ${project.demo_url ? `<a href="${project.demo_url}" class="project-link" target="_blank">
                            <i class="fas fa-external-link-alt"></i>Live Demo
                        </a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsContainer.innerHTML = `
            <div class="project-card">
                <div class="project-content">
                    <h3 class="project-title">Personal Portfolio</h3>
                    <p class="project-description">A modern portfolio website built with HTML, CSS, and JavaScript featuring a responsive design and smooth animations.</p>
                    <div class="project-tech">
                        <span class="tech-tag">HTML</span>
                        <span class="tech-tag">CSS</span>
                        <span class="tech-tag">JavaScript</span>
                    </div>
                    <div class="project-links">
                        <a href="#" class="project-link">
                            <i class="fab fa-github"></i>View Code
                        </a>
                    </div>
                </div>
            </div>
            <div class="project-card">
                <div class="project-content">
                    <h3 class="project-title">Todo Application</h3>
                    <p class="project-description">A simple todo app to practice JavaScript fundamentals with local storage and dynamic DOM manipulation.</p>
                    <div class="project-tech">
                        <span class="tech-tag">HTML</span>
                        <span class="tech-tag">CSS</span>
                        <span class="tech-tag">JavaScript</span>
                    </div>
                    <div class="project-links">
                        <a href="#" class="project-link">
                            <i class="fab fa-github"></i>View Code
                        </a>
                    </div>
                </div>
            </div>
            <div class="project-card">
                <div class="project-content">
                    <h3 class="project-title">Landing Page</h3>
                    <p class="project-description">Responsive landing page with modern CSS features including flexbox, grid, and smooth animations.</p>
                    <div class="project-tech">
                        <span class="tech-tag">HTML</span>
                        <span class="tech-tag">CSS</span>
                    </div>
                    <div class="project-links">
                        <a href="#" class="project-link">
                            <i class="fab fa-github"></i>View Code
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}

// Handle Contact Form
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert('Message sent successfully! I\'ll get back to you soon.');
            contactForm.reset();
        } else {
            throw new Error(result.error || 'Failed to send message');
        }
        
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Sorry, there was an error sending your message. Please try again later.');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Create animated particles
    createParticles();
    
    // Create electric lightning effects
    createLightning();
    
    // Add electric effects to interactive elements
    addElectricEffects();
    
    // Start random lightning flashes
    setTimeout(triggerLightningFlash, Math.random() * 5000 + 3000); // Start after 3-8 seconds
    
    loadSkills();
    loadProjects();
    
    // Add animation classes to sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add glowing effect to section titles after load
    setTimeout(() => {
        document.querySelectorAll('.section-title').forEach((title, index) => {
            if (index % 2 === 0) {
                title.classList.add('electric-text');
            } else {
                title.classList.add('glow-text');
            }
        });
    }, 1000);
});