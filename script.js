// ────────────────── Information About Me ──────────────────
const DATA = {
  name: "Scott Yun Ho",
  tagline: "Software Engineer · Writer · Copy Editor",
  story: `Hi there! I'm <strong>Scott</strong>, a software engineer born and raised in <strong>Toronto</strong> interested in exploring ethical uses of SWE and AI.<br><br>Outside of my career, I love writing and chugging Tim Horton's. <br><br>Thank you for looking through my portfolio site! I developed it with old-school Pokemon games in mind. (In fact, the sprite for Tofu is from the 5th generation of Pokemon games and pops up when Pokemon use the move "Substitute"!) <br><br>I tried my best to incorporate my personality in with my professional experience on here. I hope you enjoy! :)`,
  skills: ["Python","Java","JavaScript","C++","SQL","Go/Golang","SQL","Spring Boot","Pandas","Selenium","Node.js","React.js","Git","Postman","REST APIs","Docker"],
  projects: [
    { title:"Fac(AI)lizer", desc:"A facial emotion identifier.", tag:"C++ · TensorFlow · OpenCV · Computer Vision · AI/ML", href:"https://github.com/ericwang10/facAIlizer" },
    { title:"Whisky Business",  desc:"A web scraper that returns cocktail recipes based on inputted ingredients.", tag:"Python · BeautifulSoup · Selenium", href:"https://github.com/scottyunho/whisky-business" },
    { title:"Flock", desc:"A web platform to share bills and IOUs between users and groups.", tag:"React.js · Node.js · Firebase · NoSQL", href:"https://github.com/celinashen/Flock" },
    { title:"Counter Browser Extension", desc:"A Google Chrome browser extension that creates an in-browser counter. 6000+ installs. Out of order.", tag:"JavaScript · Chrome Storage API", href:"https://github.com/scottyunho/Click-Counter-Extension" },
  ],
  contact: [
    { icon:"@",  label:"Email",    href:"mailto:scottyunho@gmail.com" },
    { icon:"<>", label:"GitHub",   href:"https://github.com/scottyunho" },
    { icon:"in", label:"LinkedIn", href:"https://linkedin.com/in/scottyunho" },
    { icon:"~",  label:"Journalism Work",  href:"https://westerngazette.ca/users/profile/scott%20yun%20ho/" },
  ],
  funfact: `1) Scott used to dog-sit for his brother but is allergic to dogs. (Worth).<br><br>2) Scott has a permanent scar on the right side of his forehead, so like Harry Potter but with a boring scar that's straight and faded.<br><br>3) Scott loves reality TV. The trashier, the better. RuPaul's Drag Race has his heart.`
};
// ────────────────────────────────────────────────────────────────────────

const introDialogue = [
  `Ah, a visitor! Welcome to the portfolio of ${DATA.name}. I'm Tofu, their personal secretary.`,
  "I handle all inquiries with professionalism and the occasional dramatic pause.",
  "What would you like to know? Click a bubble or choose below."
];
let introDialogueIndex = 0, doneIntroDialogue = false, isAnimating = false;

const responses = {
  story:      ["Fetching Scott's origin story! Just one second...",
               "All set! Here's a brief bio he left for me to show you!"],
  skills:     ["Good pick! I'll have that ready for you in a jiffy! One moment...",
               "Below I've listed technologies he's worked with. He's always open to a quick chat if you want to know more about his specific experiences with them!"],
  funfact:    ["Fun facts! I love a fun fact!",
               "Did you know honey is so good at not going bad that it was used to preserve mummies?!! Sorry, I get excited. Anyways, here are some fun facts about Scott below."],
  projects:   ["Portfolio review! Right this way...",
               "Just click on one of the cards below to open up the corresponding project repository!"],
  contact:    ["A potential collaborator! I'll pull up the contact sheet right away...",
               "He's always open to connecting! The most surefire way of getting in touch is email or LinkedIn. (I've linked both below, and also added some other relevant links!)"],
  about_tofu: ["About me? I thought you'd never ask!",
               "I'm Tofu, Scott's trusty portfolio secretary. I handle visitor inquiries, refill the humidifier, and also enjoy a head pat or two (try clicking me!). I've been working for Scott since the very beginning — before the portfolio even had a dialogue box. I remember when this whole place was just a blank white screen. Those were simpler times. I also water the plants, organize Scott's schedule, and alphabetize the Skills section every week or so. (Don't tell on me but I haven't done it yet this week.) I was born in the Canadian wilderness to two tofu blocks. I'm not sure how my parents ended up in the wilderness, but I never really asked. I also never asked why I'm not shaped like a Tofu block like them. Life's mysterious, huh! I studied at Rice University because rice goes well with tofu, and I thought it'd be funny. Scott went to the University of Western Ontario, so we actually didn't meet until 2024 in a T&T Supermarket soy products section. I'm thinking of picking up crocheting, but I worry I won't have the dexterity to do all that. Oh! And one time, I ate 75 pieces of salmon sashimi at an all-you-can-eat buffet. Good times.",
               "...Ahem. Sorry, I got a little carried away there. Is there anything else I can help you with?"],
};

// ── Dialogue queue: waits for click or keypress to advance ──
let dialogueQueue = [];
let waitingForInput = false;
let inputLocked = false;

// Only used in petTofu function.
let pets = 0;
const petLines = [
  "Just click one of the bubbles and I can give you more info!",
  "I'm Scott's secretary! If there's anything I can help you with, please let me know!",
  "Appreciate the head pats. :D",
];


// Update dialogue box text. Adds a blinking cursor at the end.
function updateDialogueBox(t) {
  document.getElementById('dialogueText').innerHTML = t + '<span class="cursor"></span>';
}


// Queue up incoming dialogue after selecting a bubble.
function setIncomingDialogue(steps) {
  dialogueQueue = steps;
  inputLocked = true;
  nextDialogue();
  // Unlock after a short delay. Otherwise, clicking on the bubble auto-skips to second dialogue message because it counts the initial click as a click to advance dialogue.
  setTimeout(() => { inputLocked = false; }, 200);
}


// Move up in dialogue queued up from setIncomingDialogue function.
function nextDialogue() {
  if (dialogueQueue.length === 0) { 
    waitingForInput = false; 
    return; 
  }
  // New dialogue step. Update dialogue box and show advance arrow if there's more dialogue to go through.
  const currentDialogue = dialogueQueue.shift();
  updateDialogueBox(currentDialogue.text);

  // Perform extra page update (such as expanding dialogue box) if specified upon call. 
  if (currentDialogue.extraPageUpdate) currentDialogue.extraPageUpdate();

  // Show advance arrow if there's more dialogue to go through. 
  if (dialogueQueue.length > 0) {
    document.getElementById('advanceArrow').style.display = 'block';
    waitingForInput = true;
  } else {
    document.getElementById('advanceArrow').style.display = 'none';
    waitingForInput = false;
  }
}


// Handle click input. 
function handleAdvanceInput() {
  if (inputLocked) return;
  if (waitingForInput) {  // If in the middle of a bubble dialogue queue.
    nextDialogue();
    return;
  }
  if (doneIntroDialogue) return;

  // Move up in intro dialogue queue.
  introDialogueIndex++;
  // Update dialogue box if there's more intro dialogue to go through.
  if (introDialogueIndex < introDialogue.length) {
    updateDialogueBox(introDialogue[introDialogueIndex]);
  }
  // Finish dialogue if intro dialogue is exhausted.
  if (introDialogueIndex >= introDialogue.length - 1) {
    doneIntroDialogue = true;
    document.getElementById('advanceArrow').style.display = 'none';
  }
}


// Handle clicking one of the bubble options.
function bubblePick(k) {
  if (isAnimating) return;
  if (inputLocked) return;

  doneIntroDialogue = true;
  document.querySelectorAll('.bubble').forEach(b => b.classList.remove('active'));  // Unselect/un-highlight any previously-selected bubbles.
  const bubbleElement = document.getElementById('b-' + k);
  if (bubbleElement) bubbleElement.classList.add('active');  // Select/highlight new bubble.
  document.getElementById('contentPanel').className = 'content-panel';
  document.getElementById('dialogueBox').classList.remove('expanded')

  const [r0, r1, r2] = responses[k];
  const expandDialogue = k === 'about_tofu';
  
  let steps;
  // Special three-step dialogue for About Tofu dialogue option.
  if (expandDialogue) {
    steps = [
      { text: r0 },
      { text: '', extraPageUpdate: () => {
          updateDialogueBox(''); // Set dialogue box text to empty string so the message can be rapidly concatenated to it.
          document.getElementById('dialogueBox').classList.add('expanded');
          isAnimating = true;
          // Word-by-word rapid reveal
          const words = r1.split(' ');
          let i = 0;
          const bubbleElement = document.getElementById('dialogueText');
          const dialogueBox = document.getElementById('dialogueBox');
          window.currentInterval = null;
          window.currentEl = bubbleElement;
          window.currentDialogueBox = dialogueBox;
          window.currentR1 = r1;
          // Concatenates one word every 10 ms to dialogue box.
          window.currentInterval = setInterval(() => {
            if (i < words.length) {
              bubbleElement.innerHTML = words.slice(0, i + 1).join(' ') + '<span class="cursor"></span>';
              i++;
            } else {
              bubbleElement.innerHTML = r1;
              clearInterval(window.currentInterval);
              isAnimating = false;
            }
          }, 10);
        }
      },
      { text: r2, extraPageUpdate: () => document.getElementById('dialogueBox').classList.remove('expanded') },
    ];
  // Default two-step dialogue.
  } else {
    steps = [
      { text: r0 },
      { text: r1, extraPageUpdate: renderContent(k) },
    ];
  }
  setIncomingDialogue(steps);
}


function renderContent(k) {
  const p = document.getElementById('contentPanel');
  p.className = 'content-panel visible';
  if (k === 'story')
    p.innerHTML = `<p class="story-text">${DATA.story}</p>`;
  else if (k === 'skills')
    p.innerHTML = `<div class="skills-grid">${DATA.skills.map(s => `<div class="skill-tag">${s}</div>`).join('')}</div>`;
  else if (k === 'projects')
    p.innerHTML = `<div class="projects-grid">${DATA.projects.map(pr =>
      `<a href="${pr.href}" target="_blank" rel="noopener noreferrer"><div class="project-card">
        <div class="project-title">${pr.title}</div>
        <div class="project-desc">${pr.desc}</div>
        <div class="project-tag">${pr.tag}</div>
      </div></a>`).join('')}</div>`;
  else if (k === 'contact')
    p.innerHTML = `<div class="contact-links">${DATA.contact.map(c =>
      `<a href="${c.href}" class="contact-link" target="_blank">${c.icon} ${c.label}</a>`).join('')}</div>`;
  else if (k === 'funfact')
    p.innerHTML = `<p class="story-text">${DATA.funfact}</p>`;
}


function petTofu() {
  updateDialogueBox(petLines[pets % petLines.length]);
  pets++;
  document.getElementById('advanceArrow').style.display = 'none';
  if (!isAnimating) document.getElementById('contentPanel').className = 'content-panel';
  if (dialogueQueue.length == 0) document.querySelectorAll('.bubble').forEach(b => b.classList.remove('active'));  // Only remove active status for a bubble if queued dialogue is finished. 
}


// Init
updateDialogueBox(introDialogue[0]);
document.getElementById('advanceArrow').style.display = 'block';

// Global click advance
document.addEventListener('click', (e) => {
  const tag = e.target.tagName;
  if (tag === 'BUTTON' || tag === 'A') return;  // Prevent new dialogue from being queued if user clicks interactive element (e.g. pet Tofu during dialogue sequence).
  if (isAnimating) {  // Skip message (fill the rest of dialogue message) if user clicks before animation finishes.  
    clearInterval(window.currentInterval);  // To-do: block content block from popping up if a new bubble is clicked in the middle of animating. 
    window.currentEl.innerHTML = window.currentR1;
    isAnimating = false;
    return;
  }
  handleAdvanceInput();
});
