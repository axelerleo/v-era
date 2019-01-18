$(".portfolio__slider").slick({
  // infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  // dots: true

  infinite: true,
  speed: 300,

  variableWidth: true
});

$(".home__slider").slick({
  dots: true,
  arrows: false,
  fade: true
});

$(".main-parallax").each(function() {
  let img = $(this);
  let imgParent = $(this).parent();
  function parallaxImg() {
    let speed = img.data("speed");
    let imgY = imgParent.offset().top;
    let winY = $(this).scrollTop();
    let winH = $(this).height();
    let parentH = imgParent.innerHeight();

    // The next pixel to show on screen
    var winBottom = winY + winH;

    // If block is shown on screen
    if (winBottom > imgY && winY < imgY + parentH) {
      // Number of pixels shown after block appear
      var imgBottom = (winBottom - imgY) * speed;
      // Max number of pixels until block disappear
      var imgTop = winH + parentH;
      // Porcentage between start showing until disappearing
      var imgPercent = (imgBottom / imgTop) * 100 + (50 - speed * 50);
    }
    img.css({
      top: imgPercent + "%",
      transform: "translate(-50%, -" + imgPercent + "%)"
    });
  }
  $(document).on({
    scroll: function() {
      parallaxImg();
    },
    ready: function() {
      parallaxImg();
    }
  });
});

/* begin Up-Down button  */
(function() {
  "use strict";

  var upDownBtn = document.querySelector(".up_down_btn");
  var check;
  var coordsY = 0;

  function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      upDownBtn.classList.add("up_down_btn-show");
      upDownBtn.innerHTML = "&uarr;";
      upDownBtn.setAttribute("title", "Наверх");
      check = false;
    }
    if (scrolled === 0) {
      upDownBtn.innerHTML = "&darr;";
      upDownBtn.setAttribute("title", "Вниз");
      check = true;
    }
  }

  function backToTop() {
    upDownBtn.classList.add("up_down_btn-disabled");

    if (!check) {
      coordsY = pageYOffset;
      (function goTop() {
        if (window.pageYOffset !== 0) {
          window.scrollBy(0, -30);
          setTimeout(goTop, 0);
        } else {
          upDownBtn.classList.remove("up_down_btn-disabled");
        }
      })();
      return;
    } else if (check) {
      (function goBottom() {
        var match = Math.ceil(Math.min(coordsY, pageYOffset));
        console.log("coordsY " + coordsY);
        console.log("current " + match);
        if (match < coordsY) {
          window.scrollBy(0, Math.min(coordsY - match, 30));
          setTimeout(goBottom, 0);
        } else {
          upDownBtn.classList.remove("up_down_btn-disabled");
        }
      })();
      return;
    }
  }

  window.addEventListener("scroll", trackScroll);
  upDownBtn.addEventListener("click", backToTop);
})();
/* end Up-Down button  */
