const init = () => {
  const slides = document.querySelectorAll(".slide");
  const section = document.querySelectorAll("section");

  let current = 0;
  let scrollSlide = 0;

  slides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
      changeDots(slide);

      nextSlide(index);
      scrollSlide = index;
    });
  });

  const changeDots = dot => {
    slides.forEach(slide => {
      slide.classList.remove("active");
    });
    dot.classList.add("active");
  };

  const nextSlide = pageNumber => {
    const nextPage = section[pageNumber];
    const currentPage = section[current];
    // const nextLeft = nextPage.querySelector(".hero .model-left");
    // const nextRight = nextPage.querySelector(".hero .model-right");
    // const currentLeft = currentPage.querySelector(".hero .model-left");
    // const currentRight = currentPage.querySelector(".hero .model-right");
    // const nextText = nextPage.querySelector(".details");
    const content = nextPage.querySelector(".content");
    const circle = document.querySelector(".circle");

    const tl = gsap.timeline({
      defaults: {
        duration: 0.5,
        ease: "power1.inOut"
      },
      onStart: function() {
        slides.forEach(slide => {
          slide.style.pointerEvents = "none";
        });
      },
      onComplete: function() {
        slides.forEach(slide => {
          slide.style.pointerEvents = "all";
        });
        slides[current].style.pointerEvents = "none";
      }
    });

    tl.to(".showcase img", 0, { rotate: "0deg" }, "-=0.5");
    tl.to(".showcase h1", 0, { opacity: 0, x: "200px" }, "-=0.5");
    tl.to(circle, 0, { scale: 0.1 }, "-=0.5");
    tl.fromTo(
      currentPage,
      { opacity: 1, pointerEvents: "all" },
      { opacity: 0, pointerEvents: "none" }
    );
    tl.fromTo(
      nextPage,
      { opacity: 0, pointerEvents: "none" },
      { opacity: 1, pointerEvents: "all" },
      "-=0.5"
    );
    tl.fromTo(content, 1, { scale: 0.5 }, { scale: 1.1 }, "-=.5");
    tl.to(circle, 1, { scale: 1 }, "-=1.3");
    tl.to(content, 0.3, { scale: 1 });
    tl.from(".soon h1", 1, { opacity: 0 }, "-=0.5");

    tl.to(".showcase img", 0.5, { rotate: "20deg" });
    tl.to(".showcase h1", 0.5, { opacity: 1, x: "-50px" }, "-=0.5");

    current = pageNumber;
  };

  const switchDots = dotNumber => {
    const activeDot = document.querySelectorAll(".slide")[dotNumber];
    slides.forEach(slide => {
      slide.classList.remove("active");
    });
    activeDot.classList.add("active");
  };

  const scrollChange = e => {
    if (e.deltaY > 0) {
      scrollSlide += 1;
    } else {
      scrollSlide -= 1;
    }
    if (scrollSlide > 2) {
      scrollSlide = 0;
    }
    if (scrollSlide < 0) {
      scrollSlide = 2;
    }
    switchDots(scrollSlide);
    nextSlide(scrollSlide);
    console.log(scrollSlide);
  };

  document.addEventListener("wheel", throttle(scrollChange, 1500));
  document.addEventListener("touchmove", throttle(scrollChange, 1500));
};

const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// let tl = gsap.timeline({ defaults: { duration: 1.5 } });
// tl.fromTo(".showcase img", { y: 1000 }, { y: -50 });
// tl.to(".showcase img", 0.5, { y: 0 });
// // tl.fromTo(".showcase h1", 1, { opacity: 0 }, { x: "200px" }, "-=1");
// tl.to(".showcase img", { rotate: "20deg" });
// tl.to(".showcase h1", { opacity: 1, x: "-50px" }, "-=1.5");
// tl.from([".info, .pages"], { opacity: 0 });
init();
