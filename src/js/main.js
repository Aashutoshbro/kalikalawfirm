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
      $(".main-nav").toggleClass("menu-open showing");
      $(".nav-burger").toggleClass("open ");
      $("body").toggleClass("overflow-hidden");
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
// INITIALIZE ANIMATION ON SCROLL
AOS.init({ disable: "mobile" });