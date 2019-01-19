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
  fade: true,
  infinite: true,
  speed: 600,
  autoplay: true,
  autoplaySpeed: 10000,
  pauseOnFocus: false,
  pauseOnHover: false
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
  var arrowsBlock = document.querySelector(".home__arrows");
  var check;
  var coordsY = 0;

  function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;

    if (scrolled > 0) {
      arrowsBlock.classList.add("home__arrows--invisible");
    } else {
      arrowsBlock.classList.remove("home__arrows--invisible");
    }

    if (scrolled > coords) {
      upDownBtn.classList.add("up_down_btn-show");
      upDownBtn.innerHTML = `<svg class="sidebar__arrows">
      
      <path class="a1" d="M0 20 L25 0 L50 20"></path>
    </svg>`;
      upDownBtn.setAttribute("title", "Наверх");
      check = false;
    }
    if (scrolled === 0) {
      upDownBtn.innerHTML = `<svg class="sidebar__arrows">
      <path class="a1" d="M0 0 L25 20 L50 0"></path>
      
    </svg>`;
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
          window.scrollBy(0, -40);
          setTimeout(goTop, 0);
        } else {
          upDownBtn.classList.remove("up_down_btn-disabled");
        }
      })();
      return;
    } else if (check) {
      (function goBottom() {
        var match = Math.ceil(Math.min(coordsY, pageYOffset));

        if (match < coordsY) {
          window.scrollBy(0, Math.min(coordsY - match, 40));
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

//anchor links smooth scroll

$(function() {
  $("a[href*=#]").click(function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var $target = $(this.hash);
      $target =
        ($target.length && $target) || $("[name=" + this.hash.slice(1) + "]");
      if ($target.length) {
        var targetOffset = $target.offset().top;
        $("html,body").animate({ scrollTop: targetOffset }, 100); //скорость прокрутки
        return false;
      }
    }
  });
});
