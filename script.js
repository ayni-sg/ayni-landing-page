const header = document.querySelector('.site-header');
const nav = document.querySelector('.site-nav');
const toggle = document.querySelector('.menu-toggle');
const form = document.getElementById('waitlist-form');
const formMessage = document.querySelector('.form-message');
const year = document.getElementById('year');
const mentorGrid = document.getElementById('mentor-grid');

if (year) {
  year.textContent = new Date().getFullYear();
}

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.13 }
);

revealItems.forEach((item) => observer.observe(item));

const mentors = [
    {
    name: 'Dr. Manan Shah',
    title: 'Renewable Energy • Sustainability • Academic Leadership',
    image: 'assets/manan.jpeg',
    bio: 'Recognized among the World’s Top 2% Scientists by Stanford University and Elsevier, Dr. Manan Shah specializes in geothermal energy, renewable technologies, and sustainable engineering.',
    expertise: ['Renewable Energy', 'Sustainability', 'Geothermal Engineering', 'Scientific Research', 'Academic Mentorship'],
    linkedin: ''
  },
  {
    name: 'Nirali Desai',
    title: 'AI-Driven Bioinformatics & Computational Biology',
    image: 'assets/nirali.jpeg',
    bio: 'A computational biologist with expertise spanning bioinformatics, genomics, multi-omics, AI, and machine learning. Nirali has worked across academia and industry, building AI-powered drug discovery solutions using LLMs and RAG systems.',
    expertise: ['Bioinformatics', 'AI & ML', 'Drug Discovery', 'Genomics', 'Python'],
    linkedin: ''
  },
  {
    name: 'James Shah',
    title: 'Software Engineering • AI Systems • Product Development',
    image: 'assets/james.jpeg',
    bio: 'A Senior Software Engineer based in California, James designs scalable cloud-native platforms and enterprise AI systems with experience spanning ZS, Autodesk, and Northeastern University.',
    expertise: ['AI Engineering', 'Cloud Computing', 'System Design', 'Backend', 'Full Stack'],
    linkedin: ''
  },
  {
    name: 'Helly Shah',
    title: 'Molecular Biology & Life Sciences Research',
    image: 'public/images/mentors/helly-placeholder.png',
    bio: 'Helly has a strong foundation in molecular biology, RNA research, and laboratory sciences, guiding students through experimental design and scientific communication with confidence.',
    expertise: ['Molecular Biology', 'RNA Biology', 'Laboratory Research', 'Experimental Design', 'Scientific Writing'],
    linkedin: ''
  }
];

function renderMentors() {
  if (!mentorGrid) return;

  mentorGrid.innerHTML = mentors
    .map((mentor) => {
      const expertiseMarkup = mentor.expertise
        .map((item) => `<span class="mentor-tag">${item}</span>`)
        .join('');

      const linkedinMarkup = mentor.linkedin
        ? `<a class="mentor-link" href="${mentor.linkedin}" target="_blank" rel="noreferrer" aria-label="${mentor.name} LinkedIn">in</a>`
        : '';

      return `
        <article class="mentor-card reveal fade-up">
          <div class="mentor-portrait">
            <img src="${mentor.image}" alt="${mentor.name}" loading="lazy" />
          </div>
          <div class="mentor-header">
            <div>
              <h3 class="mentor-name">${mentor.name}</h3>
              <p class="mentor-title">${mentor.title}</p>
            </div>
            ${linkedinMarkup}
          </div>
          <p class="mentor-bio">${mentor.bio}</p>
          <div class="mentor-tags">${expertiseMarkup}</div>
        </article>
      `;
    })
    .join('');

  mentorGrid.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
}

renderMentors();

window.addEventListener('scroll', () => {
  if (window.scrollY > 24) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
});

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const country = form.querySelector('#country');
    const education = form.querySelector('#education');
    const submitButton = form.querySelector('button[type="submit"]');
    const errorFields = form.querySelectorAll('.field-error');

    const errors = [];

    errorFields.forEach((field) => {
      field.textContent = '';
    });

    if (!name?.value.trim()) {
      errors.push('Please share your name.');
      form.querySelector('[data-fs-error="name"]').textContent = 'Please share your name.';
    }

    if (!email?.value.trim() || !email.value.includes('@')) {
      errors.push('Please enter a valid email address.');
      form.querySelector('[data-fs-error="email"]').textContent = 'Please enter a valid email address.';
    }

    if (!country?.value.trim()) {
      errors.push('Please tell us your country.');
      form.querySelector('[data-fs-error="country"]').textContent = 'Please tell us your country.';
    }

    if (!education?.value) {
      errors.push('Please select your education level.');
      form.querySelector('[data-fs-error="education"]').textContent = 'Please select your education level.';
    }

    if (errors.length) {
      formMessage.textContent = errors.join(' ');
      formMessage.style.color = '#f59e0b';
      return;
    }

    formMessage.textContent = 'Sending your request…';
    formMessage.style.color = '#94a3b8';
    submitButton.disabled = true;

    try {
      const response = await fetch(form.getAttribute('action'), {
        method: (form.getAttribute('method') || 'POST').toUpperCase(),
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      });

      if (response.ok) {
        form.reset();
        formMessage.textContent = 'Thank you. Your waitlist request has been received.';
        formMessage.style.color = '#06b6d4';
      } else {
        throw new Error('Unable to send request right now. Please try again later.');
      }
    } catch (error) {
      formMessage.textContent = error.message || 'Unable to send request right now. Please try again later.';
      formMessage.style.color = '#f59e0b';
    } finally {
      submitButton.disabled = false;
    }
  });
}
