// Nav bar toggler


var animationDuration = 0.3;
var initialopacity = 0.3;
var ease = "Power4.easeOut";


// ***********************
// NAVIGATION TOGGLE
function installMediaQueryWatcher(mediaQuery, layoutChangedCallback) {
  var mql = window.matchMedia(mediaQuery);
  mql.addListener(function (e) {
    return layoutChangedCallback(e.matches);
  });
  layoutChangedCallback(mql.matches);
}
installMediaQueryWatcher("(max-width: 786px)", function (matches) {
  if (matches) {
    $(".navbar-toggler").click(function () {
      $(".main-nav").toggleClass("menu-open");
      $(".nav-burger").toggleClass("open");
      var tl = new TimelineMax().staggerFrom(
        ".menu-open .nav-item a",
        animationDuration, {
          x: -60,
          opacity: 0,
          stagger: 0.1,
        },
        0.5
      );
    });
  }
});

gsap.registerPlugin(ScrollTrigger);

gsap.to(".navbar", {
  scrollTrigger: {
    // markers: true,
    trigger: "html",
    start: "top top",
    end: "bottom 30%",
    toggleClass: {
      targets: ".navbar",
      className: "is-sticked",
    },
  },
});

// ***********************
// BANNER ANIMATION STARTS

var bannertl = new gsap.timeline();
gsap.set(".banner__desc h1", {
  y: +100,
  opacity: 0,
});
gsap.set(".banner__desc p", {
  y: +100,
  opacity: 0,
});
gsap.set(".banner__action", {
  y: +100,
  opacity: 0,
});
gsap.set(".banner__scroll-indicator", {
  opacity: 0,
});
gsap.set(".banner", {
  opacity: 0,
});

bannertl
  .to(".banner", 0.5, {
    opacity: 1,
  })
  .to(".banner__desc h1", 0.5, {
    y: 0,
    opacity: 1,
  })
  .to(".banner__desc p", 0.5, {
    y: 0,
    opacity: 1,
    delay: -0.25,
  })
  .to(".banner__action", 0.5, {
    y: 0,
    opacity: 1,
    delay: -0.25,
  })
  .to(".banner__scroll-indicator", 0.5, {
    opacity: 1,
  });

gsap.to(".banner", {
  duration: 2,
  scrollTrigger: {
    // markers: true,
    trigger: ".banner",
    start: "bottom 40%",
    end: "bottom 70%",
    scrub: 1,
  },
});

// BANNER ANIMATION ENDS
// ***********************


gsap.set(".intro__card, .brands__list > div", {
  y: 100
});

ScrollTrigger.batch(".intro__card, .brands__list > div", {
  interval: 0.2, // time window (in seconds) for batching to occur.
  batchMax: 4, // maximum batch size (targets)
  onEnter: (batch) =>
    gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: {
        each: 0.15,
        grid: [1, 4]
      },
      overwrite: true,
    }),
  onLeave: (batch) => gsap.set(batch, {
    opacity: 0,
    y: 100,
    overwrite: true
  }),
  onEnterBack: (batch) =>
    gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      overwrite: true
    }),
  onLeaveBack: (batch) =>
    gsap.set(batch, {
      opacity: 0,
      y: 100,
      overwrite: true
    }),
  // you can also define things like start, end, etc.
});

ScrollTrigger.addEventListener("refreshInit", () =>
  gsap.set(".intro__card .brands__list > div", {
    y: 0
  })
);


// PANELS ANIMATION ENDS
// ***********************

// ***********************
// TESTIMONIALS ANIMATION STARTS
var blobtl = new gsap.timeline();

blobtl
  .from(".blob-b1", 0.5, {
    x: "-0.5rem",
    opacity: 0.2,
  })
  .from(".blob-b2", 0.5, {
    x: "0.5rem",
    y: "0.5rem",
    opacity: 0.2,
  })
  .from(".blob-b3", 0.5, {
    opacity: 0.2,
    y: "-0.5rem",
  })
  .repeat(-1)
  .yoyo(true);

// SLICK INIT
$(".testimonials__slider").slick({
  dots: true,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
});

// TESTIMONIALS ANIMATION ENDS
// ***********************


// STOP VIDEO ON MODAL CLOSE
$("#videomodal").on("hidden.bs.modal", function () {
  console.log("closed");
  $("#videomodal iframe").attr("src", $("#videomodal iframe").attr("src"));
});



// INITIALIZE ANIMATION ON SCROLL
AOS.init();