/* script.js
   Updated to add interactive planners for:
   1) Secondary (Class 10)
   2) Senior-Secondary (Class 12)
   3) Under-Graduate
   4) Post-Graduate
   - Keeps the rest of your app functionality (particles, quiz, chat, college search, courses).
*/

/* --------------------------
   Helper & DOM helpers
   -------------------------- */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* --------------------------
   Particles (lively background)
   -------------------------- */
function createParticles(count = 20) {
  const container = document.getElementById('particles');
  if (!container) return;
  container.innerHTML = '';
  const colors = ['rgba(124,58,237,0.6)', 'rgba(110,231,183,0.55)', 'rgba(99,102,241,0.45)'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'particle';
    const size = Math.round(20 + Math.random() * 80);
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.left = `${left}%`;
    el.style.top = `${top}%`;
    el.style.background = colors[i % colors.length];
    el.style.opacity = (0.2 + Math.random() * 0.6).toFixed(2);
    el.style.animationDuration = `${8 + Math.random() * 14}s`;
    el.style.filter = `blur(${3 + Math.random() * 6}px)`;
    container.appendChild(el);
  }
}

/* --------------------------
   Planner data (streams / degrees -> dynamic content)
   -------------------------- */
const planners = {
  secondary: {
    title: "Secondary (Class 10) — Choose your stream",
    options: {
      mathematics: {
        title: "Mathematics",
        careerIn: "Engineering, Computer Science, Data Science, Actuarial Science",
        roles: ["Software Developer", "Data Analyst", "Actuary", "Statistician", "Machine Learning Engineer"],
        skills: ["Analytical Thinking", "Logical Reasoning", "Quantitative Aptitude", "Problem Solving"],
        notes: "Strong foundation for STEM. Participate in Olympiads and strengthen algebra, geometry and basic programming."
      },
      biology: {
        title: "Biology",
        careerIn: "Medicine, Biotechnology, Environmental Science, Agriculture",
        roles: ["Doctor (MBBS path)", "Biotechnologist", "Research Associate", "Lab Technician"],
        skills: ["Observation", "Lab Skills", "Biological Concepts", "Data Interpretation"],
        notes: "Good base for life sciences; begin reading basics of human biology and lab safety."
      },
      commerce: {
        title: "Commerce",
        careerIn: "Business, Accounting, Finance, Entrepreneurship",
        roles: ["Accountant", "Business Analyst", "Tax Consultant", "Entrepreneur"],
        skills: ["Numeracy", "Financial Literacy", "Business Communication"],
        notes: "Covers basics of money, trade and business studies — great for starting commerce in Class 11/12."
      },
      humanities: {
        title: "Humanities",
        careerIn: "Social Sciences, Media, Civil Services, Education",
        roles: ["Researcher", "Teacher", "Journalist", "Policy Analyst", "Counselor"],
        skills: ["Critical Thinking", "Writing", "Research", "Communication"],
        notes: "Explores history, sociology, psychology and languages — builds strong writing & analysis skills."
      },
      fine_arts: {
        title: "Fine Arts",
        careerIn: "Design, Visual Arts, Performing Arts, Animation",
        roles: ["Artist", "Graphic Designer", "Animator", "Curator", "Performer"],
        skills: ["Creativity", "Visual Composition", "Technical Art Skills"],
        notes: "Practice a portfolio and explore classes in drawing, painting or digital media."
      }
    }
  },

  senior: {
    title: "Senior Secondary (Class 11-12) — Pick a stream",
    options: {
      mathematics: {
        title: "Mathematics Stream",
        careerIn: "Engineering, Computer Science, Data Science, Economics",
        roles: ["Software Engineer", "Data Scientist", "Civil/Mechanical Engineer", "Actuary"],
        skills: ["Advanced Math", "Problem Solving", "Programming Basics"],
        exams: ["JEE (IIT-JEE)", "State Engineering exams", "NDA (for defense aspirants)"],
        notes: "If aiming for engineering, JEE prep starts now. For NDA consider physical & academic prep."
      },
      biology: {
        title: "Biology Stream",
        careerIn: "Medicine, Dentistry, Veterinary, Biotechnology",
        roles: ["Doctor (MBBS)", "Dentist", "Researcher", "Clinical Lab Scientist"],
        skills: ["Biology fundamentals", "Lab techniques", "Memorization skills"],
        exams: ["NEET (UG)", "AIIMS entrance", "State MBBS exams"],
        notes: "NEET is the primary medical entrance — consistent syllabus coverage is key."
      },
      commerce: {
        title: "Commerce Stream",
        careerIn: "Accounting, Finance, Management, Banking",
        roles: ["Chartered Accountant (CA)", "Financial Analyst", "Bank PO", "Business Manager"],
        skills: ["Accounting basics", "Business Studies", "Economics", "Analytical aptitude"],
        exams: ["CA Foundation", "Banking exams (IBPS/SSC/State PO)", "Commerce college entrances"],
        notes: "Begin accounting concepts early if aiming for CA or finance roles."
      },
      humanities: {
        title: "Humanities Stream",
        careerIn: "Law, Civil Services, Journalism, Social Work, Design",
        roles: ["Law aspirant", "Civil Services aspirant", "Writer", "Academic"],
        skills: ["Critical thinking", "Essay writing", "Research"],
        exams: ["CLAT (for UG law)", "Foundation for Civil Services (later)"],
        notes: "Good platform to prepare for CLAT and build a strong reading/writing habit."
      },
      fine_arts: {
        title: "Fine Arts Stream",
        careerIn: "Design, Animation, Performing Arts, Art Direction",
        roles: ["Designer", "Animator", "Performer", "Art Educator"],
        skills: ["Portfolio building", "Technical craft", "Creativity"],
        exams: ["Design entrance tests (NID/NIFT/State design tests)"],
        notes: "Build a portfolio early and enroll in weekend classes if possible."
      }
    }
  },

  undergrad: {
    title: "Undergraduate — Choose degree",
    options: {
      btech: {
        title: "B.Tech / BE",
        careerIn: "Core engineering, product, R&D, startups",
        roles: ["Software Engineer", "System Designer", "Hardware Engineer", "Research Engineer"],
        skills: ["Programming", "Engineering fundamentals", "Project work", "Internships"],
        exams: ["JEE Main/Advanced (for admission)","GATE (later for PG)"],
        notes: "Projects & internships matter. Focus on DS/Algo and system fundamentals."
      },
      bsc: {
        title: "B.Sc",
        careerIn: "Research, higher studies, lab work, data roles",
        roles: ["Research Assistant", "Lab Technician", "Data Analyst (with skills)"],
        skills: ["Research methods", "Statistics", "Domain knowledge"],
        exams: ["UGC/CSIR NET (for research later)"],
        notes: "Good stepping stone for MSc and research careers."
      },
      bcom: {
        title: "B.Com",
        careerIn: "Finance, accounting, corporate roles",
        roles: ["Accountant", "Auditor", "Financial Analyst", "Tax Consultant"],
        skills: ["Accounting", "Taxation basics", "Business communication"],
        exams: ["CA/CS foundation, Bank PO exams"],
        notes: "Combine with internships and certifications (IFRS, taxation) for an edge."
      },
      ba: {
        title: "B.A",
        careerIn: "Media, teaching, research, civil services (with prep)",
        roles: ["Journalist", "Content Creator", "Teacher", "Policy Researcher"],
        skills: ["Writing", "Analysis", "Communication"],
        exams: ["Entrance tests for specific universities, CLAT for law later"],
        notes: "Consider specializations like Economics, Sociology or Political Science."
      },
      b_voc: {
        title: "B.Voc (Vocational)",
        careerIn: "Skill-based employment, industry roles",
        roles: ["Technician", "Skilled Specialist", "Entrepreneur"],
        skills: ["Practical industry skills", "Hands-on training"],
        notes: "Directly industry-focused; good for employability after graduation."
      },
      ballb: {
        title: "BALLB (Integrated Law)",
        careerIn: "Law practice, corporate counsel",
        roles: ["Lawyer", "Legal Counsel", "Litigator"],
        skills: ["Legal reasoning", "Argumentation", "Research"],
        exams: ["CLAT (for most NLUs)"],
        notes: "CLAT is the key gateway for top law schools."
      },
      mbbs: {
        title: "MBBS",
        careerIn: "Medicine, clinical practice, medical research",
        roles: ["Doctor", "Surgeon (after specialization)", "Clinical Researcher"],
        skills: ["Clinical skills", "Patient care", "Medical knowledge"],
        exams: ["NEET-UG (for MBBS admission)"],
        notes: "Highly competitive — consistent study & practical experience required."
      }
    }
  },

  postgrad: {
    title: "Postgraduate — Choose program",
    options: {
      mtech: {
        title: "M.Tech / M.E",
        careerIn: "Advanced engineering, R&D, specialist roles",
        roles: ["Research Engineer", "Senior Developer", "Technical Lead"],
        skills: ["Advanced specialization", "Research methodology"],
        exams: ["GATE (primary)"],
        notes: "Often via GATE; helpful for research or higher-paying technical roles."
      },
      msc: {
        title: "M.Sc",
        careerIn: "Research, academia, specialized industry roles",
        roles: ["Researcher", "Lecturer", "Data Scientist (with skills)"],
        skills: ["Research & lab skills", "Advanced theory"],
        exams: ["CSIR-UGC NET, University specific"],
        notes: "Good path to PhD or research careers."
      },
      mcom: {
        title: "M.Com",
        careerIn: "Corporate finance, research, teaching",
        roles: ["Finance Manager", "Consultant", "Lecturer"],
        skills: ["Advanced finance", "Research"],
        exams: ["NET/SET (for lecturership)"],
        notes: "Combine with certifications (CFA/FRM) for high finance roles."
      },
      ma: {
        title: "MA",
        careerIn: "Academia, policy, research, media",
        roles: ["Lecturer", "Researcher", "Analyst"],
        skills: ["Advanced writing & research"],
        exams: ["NET/SET"],
        notes: "Specialize in fields like economics, sociology, English, etc."
      },
      md_ms: {
        title: "MD / MS (Medical PG)",
        careerIn: "Clinical specialization, hospitals, research",
        roles: ["Specialist Doctor", "Consultant"],
        skills: ["Clinical specialization", "Surgical skills (MS)"],
        exams: ["NEET-PG"],
        notes: "Requires MBBS followed by NEET-PG for admission to MD/MS."
      },
      llm: {
        title: "LLM / MA-LLB (PG in Law)",
        careerIn: "Corporate law, academia, consultancy",
        roles: ["Legal Specialist", "Corporate Counsel"],
        skills: ["Legal specialization", "Research"],
        notes: "LLM can open advanced legal/research roles."
      }
    }
  }
};


/* --------------------------
   Render Career Mapping (columns)
   -------------------------- */
function renderCareerMapping() {
  const container = document.getElementById('levels-grid');
  if (!container) return;
  container.innerHTML = '';

  // We construct columns from the planners keys in order
  const order = [
    { level: "Secondary (Class 10th)", code: "secondary" },
    { level: "Senior Secondary (Class 11-12)", code: "senior" },
    { level: "Under-Graduate", code: "undergrad" },
    { level: "Post-Graduate", code: "postgrad" },
    { level: "PhD / Research", code: "phd" }
  ];

  order.forEach((lvl) => {
    const col = document.createElement('div');
    col.className = 'level-column';
    col.setAttribute('data-level', lvl.code);

    const header = document.createElement('div');
    header.className = 'level-header';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.gap = '8px';
    header.innerHTML = `<div style="display:flex;align-items:center;gap:10px;"><i class="fa-solid fa-layer-group" style="color:var(--accent-2)"></i><span>${lvl.level}</span></div>`;

    // Add a "Plan" button for levels we support dynamically (not for PhD)
    if (lvl.code !== 'phd') {
      const planBtn = document.createElement('button');
      planBtn.className = 'btn';
      planBtn.textContent = 'Plan';
      planBtn.setAttribute('aria-label', `Open planner for ${lvl.level}`);
      planBtn.dataset.level = lvl.code;
      planBtn.addEventListener('click', () => {
        openPlannerModal(lvl.code);
      });
      header.appendChild(planBtn);
    }

    col.appendChild(header);

    // quick sample list: show 2-3 sample fields inside column
    const list = document.createElement('div');
    list.className = 'level-list';

    // pick keys from planners if exist
    const pset = planners[lvl.code];
    if (pset && pset.options) {
      Object.keys(pset.options).slice(0, 3).forEach((k) => {
        const opt = pset.options[k];
        const card = document.createElement('div');
        card.className = 'career-card';
        card.tabIndex = 0;
        card.innerHTML = `
          <div class="icon" style="background: linear-gradient(90deg, rgba(124,58,237,0.9), rgba(110,231,183,0.9));">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
          <div class="content">
            <div class="field-name">${opt.title}</div>
            <div class="field-meta">${Array.isArray(opt.roles) ? opt.roles.slice(0,2).join(', ') : ''}</div>
            <div class="field-meta" style="color:var(--muted); font-size:0.85rem; margin-top:6px;">Click Plan to view full options</div>
          </div>
        `;
        list.appendChild(card);
      });
    } else {
      // Fallback simple message for PhD column
      const card = document.createElement('div');
      card.className = 'career-card';
      card.innerHTML = `
        <div class="icon" style="background: linear-gradient(90deg, rgba(124,58,237,0.9), rgba(110,231,183,0.9));"><i class="fa-solid fa-flask-vial"></i></div>
        <div class="content"><div class="field-name">PhD & Research</div><div class="field-meta">High-level research & academic careers</div></div>
      `;
      list.appendChild(card);
    }

    col.appendChild(list);
    container.appendChild(col);
  });
}

/* --------------------------
   Planner modal generator
   - injects a two-column interactive UI inside your existing modal
   -------------------------- */
function openPlannerModal(levelCode) {
  const data = planners[levelCode];
  if (!data) {
    showModal(`<h3>Planner</h3><p>No planner data available for this level.</p>`);
    return;
  }

  // Build left (options list) and right (details) layout
  let leftHtml = `<div style="display:flex;flex-direction:column;gap:8px;padding:6px;">`;
  Object.keys(data.options).forEach((k, idx) => {
    leftHtml += `<button class="planner-option btn" data-key="${k}" style="text-align:left;">${data.options[k].title}</button>`;
  });
  leftHtml += `</div>`;

  const rightHtml = `
    <div id="planner-details" style="padding:8px;">
      <h3 style="margin-top:0;">${data.title}</h3>
      <p style="color:var(--muted)">Select an option on the left to view details (career paths, roles, skills, exams where relevant).</p>
    </div>
  `;

  const containerHtml = `
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <aside style="width:320px;min-width:220px;max-height:60vh;overflow:auto;border-right:1px solid rgba(255,255,255,0.02);padding-right:8px;">
        ${leftHtml}
      </aside>
      <section style="flex:1;min-width:240px;max-height:60vh;overflow:auto;">
        ${rightHtml}
      </section>
    </div>
  `;

  showModal(containerHtml);

  // attach listeners to the injected buttons
  setTimeout(() => { // slight delay to ensure DOM nodes exist inside modal
    const optionBtns = Array.from(document.querySelectorAll('#modal-body .planner-option'));
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        renderPlannerDetails(levelCode, key);
        // highlight selected
        optionBtns.forEach(b => b.style.boxShadow = '');
        btn.style.boxShadow = '0 8px 20px rgba(124,58,237,0.12)';
      });
    });

    // auto-select first
    if (optionBtns.length) optionBtns[0].click();
  }, 40);
}

function renderPlannerDetails(levelCode, key) {
  const data = planners[levelCode];
  if (!data || !data.options[key]) return;
  const item = data.options[key];

  const examsHtml = item.exams ? `<h4>Relevant Exams</h4><ul>${item.exams.map(e => `<li>${e}</li>`).join('')}</ul>` : '';
  const rolesHtml = item.roles ? `<h4>Roles offered</h4><ul>${item.roles.map(r => `<li>${r}</li>`).join('')}</ul>` : '';
  const skillsHtml = item.skills ? `<h4>Skills developed</h4><ul>${item.skills.map(s => `<li>${s}</li>`).join('')}</ul>` : '';
  const careerHtml = item.careerIn ? `<p><strong>Career in:</strong> ${item.careerIn}</p>` : '';

  const details = `
    <div style="padding:6px;">
      <h3 style="margin-top:0;">${item.title}</h3>
      ${careerHtml}
      ${rolesHtml}
      ${skillsHtml}
      ${examsHtml}
      <h4>Notes</h4>
      <p style="color:var(--muted)">${item.notes || ''}</p>
    </div>
  `;

  const detailsContainer = document.getElementById('planner-details');
  if (detailsContainer) detailsContainer.innerHTML = details;
}

/* --------------------------
   Modal helpers (existing modal)
   -------------------------- */
function showModal(html) {
  const modal = $('#modal');
  const body = $('#modal-body');
  if (!modal || !body) return;
  body.innerHTML = html;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}
function closeModal() {
  const modal = $('#modal');
  if (!modal) return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}
function initModal() {
  const close = $('#modal-close');
  const modal = $('#modal');
  close && close.addEventListener('click', closeModal);
  modal && modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* --------------------------
   Courses: card click -> modal with details
   (kept existing behavior; small helper included)
   -------------------------- */
function initCourses() {
  $$('.card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const course = btn.getAttribute('data-course') || 'course';
      let html = `<h3>${formatCourseName(course)}</h3>`;
      if (course === 'computer_science') {
        html += `<p>Computer Science - topics: Data Structures, Algorithms, ML, Systems.</p>
                 <p><strong>Top recruiters:</strong> Google, Microsoft, Amazon</p>`;
      } else if (course === 'engineering') {
        html += `<p>Engineering - core technical learning with practical labs and projects.</p>`;
      } else if (course === 'finance') {
        html += `<p>Finance - markets, corporate finance, analytics.</p>`;
      } else {
        html += `<p>Explore this course to learn more.</p>`;
      }
      showModal(html);
    });
  });

  function formatCourseName(key){
    return key.split('_').map(s => s[0].toUpperCase()+s.slice(1)).join(' ');
  }
}

/* --------------------------
   College Search (mocked list)
   -------------------------- */
const mockColleges = [
  { name: "Indore Institute of Science & Technology", city: "Indore", courses: ["Computer Science","Engineering"] },
  { name: "Global Business School", city: "Mumbai", courses: ["Finance","Management"] },
  { name: "Art & Design College", city: "Bengaluru", courses: ["Arts & Design"] },
  { name: "National Medical College", city: "Delhi", courses: ["Medicine"] },
];

function initCollegeSearch() {
  const searchBtn = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-location');
  const results = document.getElementById('college-results');

  searchBtn && searchBtn.addEventListener('click', () => {
    const q = (searchInput.value || '').trim().toLowerCase();
    const matched = mockColleges.filter(c => 
      c.city.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.courses.join(' ').toLowerCase().includes(q)
    );
    renderCollegeResults(matched);
    // update metric
    const cs = document.getElementById('college-searches');
    if (cs) cs.textContent = matched.length;
  });

  function renderCollegeResults(list) {
    if (!results) return;
    if (!list.length) {
      results.innerHTML = `<div class="college-card">No results found. Try another city or course.</div>`;
      return;
    }
    results.innerHTML = list.map(c => `
      <div class="college-card" style="padding:12px; border-radius:10px; background:rgba(255,255,255,0.02)">
        <strong>${c.name}</strong><div style="color:var(--muted)"> ${c.city} • Courses: ${c.courses.join(', ')}</div>
      </div>
    `).join('');
  }
}

/* --------------------------
   Chat (simple advisor)
   -------------------------- */
function initChat() {
  const output = document.getElementById('chat-output');
  const input = document.getElementById('chat-input');
  const send = document.getElementById('chat-send');

  function postMessage(text, cls='bot') {
    if (!output) return;
    const el = document.createElement('div');
    el.className = `chat-msg ${cls === 'user' ? 'user' : ''}`;
    el.innerHTML = text;
    output.appendChild(el);
    output.scrollTop = output.scrollHeight;
  }

  send && send.addEventListener('click', () => {
    const txt = (input.value || '').trim();
    if (!txt) return;
    postMessage(txt, 'user');
    input.value = '';
    setTimeout(() => {
      let resp = 'I can help with careers, colleges, and courses. Try: "Best colleges for CS in Mumbai" or "What is finance like?"';
      const q = txt.toLowerCase();
      if (q.includes('college') || q.includes('colleges')) resp = 'Try typing a city or course name in the College Search section — I can show sample matches.';
      else if (q.includes('finance')) resp = 'Finance roles include banking, analysis, and fintech. Look for internships in investment banking or analytics.';
      else if (q.includes('engineering') || q.includes('computer')) resp = 'For CS/Engineering, build projects, internships and prepare data-structure fundamentals.';
      postMessage(resp, 'bot');
    }, 500);
  });

  input && input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') send.click();
  });
}

/* --------------------------
   Quiz logic (kept simple)
   -------------------------- */
function initQuiz() {
  const startBtn = document.getElementById('start-quiz');
  const quizForm = document.getElementById('quiz-form');
  const submitBtn = document.getElementById('submit-quiz');
  const resetBtn = document.getElementById('reset-quiz');
  const progressBar = document.querySelector('#quiz-progress .progress-bar');
  const quizResult = document.getElementById('quiz-result');

  startBtn && startBtn.addEventListener('click', () => {
    quizForm.style.display = 'block';
    quizResult.style.display = 'none';
    document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
  });

  const requiredQs = ['q1','q2','q3','q4'];

  function computeScore(formData){
    let score = 0;
    requiredQs.forEach(k => {
      const v = formData.get(k);
      if (v === 'yes') score += 2;
      else if (v === 'maybe') score += 1;
    });
    return score;
  }

  submitBtn && submitBtn.addEventListener('click', () => {
    const fd = new FormData(quizForm);
    for (const q of requiredQs) {
      if (!fd.get(q)) {
        alert('Please answer all questions.');
        return;
      }
    }
    progressBar.style.width = '40%';
    setTimeout(()=> progressBar.style.width = '80%', 300);
    const score = computeScore(fd);
    setTimeout(()=> {
      progressBar.style.width = '100%';
      displayResult(score);
    }, 700);
  });

  resetBtn && resetBtn.addEventListener('click', () => {
    quizForm.reset();
    progressBar.style.width = '0%';
    quizResult.style.display = 'none';
  });

  function displayResult(score) {
    quizResult.style.display = 'block';
    let text = '';
    let suggested = [];
    if (score >= 7) {
      text = 'High aptitude for analytical & technical fields.';
      suggested = ['Computer Science', 'Engineering', 'Finance'];
    } else if (score >= 4) {
      text = 'Balanced aptitude — consider both analytical and creative options.';
      suggested = ['Arts & Design', 'Psychology', 'Finance'];
    } else {
      text = 'Stronger leaning towards people-oriented or creative fields.';
      suggested = ['Arts & Design', 'Psychology', 'Humanities'];
    }
    quizResult.innerHTML = `
      <div><strong>Your Score:</strong> ${score} / 8</div>
      <p>${text}</p>
      <p><strong>Suggested fields:</strong> ${suggested.join(', ')}</p>
    `;
    const scoreNode = document.getElementById('quiz-score');
    if (scoreNode) scoreNode.textContent = `${score}/8`;
    const cm = document.getElementById('career-matches');
    if (cm) cm.textContent = suggested.length;
  }
}

/* --------------------------
   Nav toggle & init
   -------------------------- */
function initNav() {
  const toggle = $('#nav-toggle');
  const navLinks = $('.nav-links');
  if (toggle) {
    toggle.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
  }
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
}

/* --------------------------
   Init everything on DOMContentLoaded
   -------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  createParticles(22);
  renderCareerMapping();
  initQuiz();
  initCourses();
  initCollegeSearch();
  initChat();
  initModal();
  initNav();

  // attach modal close even if created later
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Login/Signup placeholders
  const login = $('#login-btn');
  const signup = $('#signup-btn');
  login && login.addEventListener('click', () => {
    showModal(`<h3>Login</h3><p>Login modal placeholder. Integrate auth later.</p>`);
  });
  signup && signup.addEventListener('click', () => {
    showModal(`<h3>Signup</h3><p>Signup modal placeholder. Hook up registration flow later.</p>`);
  });
});
