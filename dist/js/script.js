const sections = document.querySelectorAll("section");
let currentSection = 0;

const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 700,
  speedAsDuration: true,
  clip: true,
  updateURL: false
});

const previewText = () => {
  const previewTitle = document.getElementById("preview-title");
  const textArr = [
    "Dolor sit",
    "Consequatur",
    "Amet consectetur",
    "Adipisicing",
    "Dolores magni",
    "Lorem ipsum"
  ];
  let count = 0;

  const changeText = () => {
    if (count < textArr.length) {
      previewTitle.innerHTML = `<h1 class = "preview-text">${
        textArr[count]
      } </h1>`;
      count++;
    } else count = 0;
  };
  setInterval(() => {
    changeText();
  }, 5000);
};

const generateLinks = () => {
  const navLinks = [];
  Object.keys(sections).forEach(section => {
    const newLink = `<li><a href = '#${section}' id = 'section-${section}-link' class = 'nav-btn'></a></li>`;
    navLinks.push(newLink);
  });
  document.getElementById("nav-links").innerHTML = navLinks.join("");
};

const observeSections = () => {
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.7
  };

  let observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      const id = entry.target.id;
      const element = document.getElementById(`section-${id}-link`);
      if (entry.intersectionRatio > 0.7) {
        element.classList.add("current-link");
        currentSection = parseInt(entry.target.id);
      } else {
        element.classList.remove("current-link");
      }
    });
  }, options);
  sections.forEach(section => observer.observe(section));
};

const scrollBehavior = () => {
  let canScroll = true;
  const trackScroll = () => {
    canScroll = !canScroll;
  };
  document.addEventListener("scrollStart", trackScroll, false);
  document.addEventListener("scrollStop", trackScroll, false);

  window.onresize = () => {
    if (window.innerWidth > 1300) {
      document.getElementById(currentSection).scrollIntoView();
    }
  };

  window.onwheel = e => {
    if (canScroll && window.innerWidth > 1350) {
      if (e.deltaY > 0 && currentSection != sections.length - 1) {
        scroll.animateScroll(sections[currentSection + 1]);
      } else if (e.deltaY < 0 && currentSection != 0) {
        scroll.animateScroll(sections[currentSection - 1]);
      }
    }
  };

  window.onkeydown = e => {
    const keycode = e.keyCode;
    if (canScroll && window.innerWidth > 1350) {
      if (keycode == 38 && currentSection != 0) {
        e.preventDefault();
        scroll.animateScroll(sections[currentSection - 1]);
      } else if (keycode == 40 && currentSection != sections.length - 1) {
        e.preventDefault();
        scroll.animateScroll(sections[currentSection + 1]);
      }
    }
  };
};

previewText();
generateLinks();
observeSections();
scrollBehavior();
