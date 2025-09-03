// Small helper: project data (replace with real links & descriptions)
const PROJECTS = {
    landing: {
    title: 'Landing Website',
    desc: 'Conversion-focused landing page with lead capture forms, hero A/B sections, and fast performance. Implemented with responsive design and accessible markup.',
    live: 'https://live-demo-landing.example',
    repo: 'https://github.com/yourusername/landing-site'
    },
    ecommerce: {
    title: 'E-Commerce Website',
    desc: 'Full shopping experience, product catalog, cart, secure checkout demo (Stripe). Server-side built with Node.js and Express, product data in MongoDB.',
    live: 'https://live-demo-store.example',
    repo: 'https://github.com/yourusername/ecommerce-site'
    },
    blogapp: {
    title: 'CRUD Blog App',
    desc: 'Content-driven application with JWT auth, role-based permissions, and an admin panel for content management.',
    live: 'https://live-demo-blog.example',
    repo: 'https://github.com/yourusername/blog-app'
    }
};

// Modal logic
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalContent = document.getElementById('modalContent');
const liveLink = document.getElementById('liveLink');
const repoLink = document.getElementById('repoLink');

document.querySelectorAll('[data-open]').forEach(btn => {
    btn.addEventListener('click', e => {
    const id = btn.getAttribute('data-open');
    openProject(id);
    });
});

document.getElementById('closeModal').addEventListener('click', closeModal);

modal.addEventListener('click', (e) => { 
    if (e.target === modal) closeModal(); 
});

function openProject(id) {
    const p = PROJECTS[id];
    if (!p) return;

    modalTitle.textContent = p.title;
    modalDesc.textContent = p.desc;

    modalContent.innerHTML = `
        <p class=\"muted\">
            Tech stack: ${
                id === 'ecommerce' ? 'Node.js, Express, MongoDB, Stripe' : id === 'blogapp' ? 'Express, MongoDB, JWT' : 'HTML, CSS, JS'
            }
        </p>
    `;

    liveLink.href = p.live;
    repoLink.href = p.repo;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    history.replaceState(null,'',`#project-${id}`);
}

function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    history.replaceState(null,'',location.pathname);
}

// Contact form placeholder handler
function handleContact(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name||!email||!message) {
        alert('Please fill all fields.');
        return false
    }

    // Basic validation passed — show a friendly message. In production replace with API call.
    alert('Thanks '+name+" — message received! I'll respond shortly.");
    e.target.reset();
    return false;
}

// Small accessibility/seo utilities
document.getElementById('year').textContent = new Date().getFullYear();

// Lazy load images (modern browsers)
document.querySelectorAll('img').forEach(img => { 
    if ('loading' in HTMLImageElement.prototype) img.loading='lazy'; 
});

// Keyboard: close modal with Escape
window.addEventListener('keydown', e => { 
    if (e.key==='Escape') closeModal(); 
});

// Simple focus trap when modal opens (minimal)
modal.addEventListener('keydown', e => {
    if (e.key==='Tab') {
        const focusables = modal.querySelectorAll('button,a,input,textarea');

        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length-1];

        if (e.shiftKey && document.activeElement===first) { 
            last.focus(); e.preventDefault(); 
        }
        else if (!e.shiftKey && document.activeElement===last) { 
            first.focus(); e.preventDefault(); 
        }
    }
});

// Simple UTM safe link enhancement (preserve privacy)
document.querySelectorAll('a[target="_blank"]').forEach(a => a.rel='noopener noreferrer');