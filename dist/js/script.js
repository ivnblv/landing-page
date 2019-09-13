const sections = document.querySelectorAll("section");
let currentSection = 0;
let canScroll = true;

const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1200,
  speedAsDuration: true,
  clip: true,
  updateURL: false,
  easing: "easeInOutQuart"
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

const generateNavBtns = () => {
  Object.keys(sections).forEach(section => {
    const newBtn = document.createElement("button");
    newBtn.id = `section-${section}-link`;
    newBtn.className = "nav-btn";
    newBtn.addEventListener("click", navBtnScroll);
    document.getElementById("nav-btns").appendChild(newBtn);
  });
  document.getElementById("home").addEventListener("click", () => {
    if (canScroll) {
      scroll.animateScroll(document.querySelector("body"));
    }
  });
};
const navBtnScroll = e => {
  const id = e.target.id.replace(/[^0-9]/g, "");
  if (canScroll) {
    scroll.animateScroll(document.getElementById(id));
  }
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

const navigation = () => {
  const trackScroll = () => {
    canScroll = !canScroll;
  };
  document.addEventListener("scrollStart", trackScroll);
  document.addEventListener("scrollStop", trackScroll);

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
generateNavBtns();
observeSections();
navigation();
