// DOM elements
const projectsGrid = document.getElementById('projects-grid');
const searchInput = document.getElementById('search');
const particlesContainer = document.getElementById('particles');

// Create floating particles
function createParticles() {
    if (!particlesContainer) return;
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// FIXED: Project card - NO CSS CONFLICTS
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const techBadges = project.tech.map(tech => `<span>${tech}</span>`).join('');
    
    card.innerHTML = `
        <h3>${project.title}</h3>
        <p>👤 ${project.author}</p>
        <p>${project.description}</p>
        <div class="tech">${techBadges}</div>
        <div class="project-links" style="pointer-events: auto;">
            <a href="${project.liveUrl}" 
               target="_blank" 
               rel="noopener noreferrer"
               style="pointer-events: auto; 
                      z-index: 9999;
                      position: relative;
                      display: inline-block;
                      text-decoration: none;">
               🌐 Live Demo
            </a>
            <a href="${project.repoUrl}" 
               target="_blank" 
               rel="noopener noreferrer"
               style="pointer-events: auto; 
                      z-index: 9999;
                      position: relative;
                      display: inline-block;
                      text-decoration: none;
                      margin-left: 10px;">
               📂 GitHub
            </a>
        </div>
    `;
    
    const links = card.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            window.open(this.href, '_blank');
        });
    });
    
    return card;
}

// Render projects
function renderProjects(filteredProjects = projects) {
    projectsGrid.innerHTML = '';
    
    filteredProjects.forEach((project, index) => {
        const card = createProjectCard(project);
        card.style.animationDelay = index * 0.1 + 's';
        projectsGrid.appendChild(card);
    });
}

// Filter projects
function filterProjects() {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
        renderProjects(projects);
        return;
    }
    
    const filtered = projects.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.author.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tech.some(tech => tech.toLowerCase().includes(query))
    );
    renderProjects(filtered);
}

// FIXED: Smooth scroll ONLY navigation links
function initSmoothScroll() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Event listeners
if (searchInput) {
    searchInput.addEventListener('input', () => {
        clearTimeout(window.searchTimeout);
        window.searchTimeout = setTimeout(filterProjects, 300);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    renderProjects();
    initSmoothScroll();
});
