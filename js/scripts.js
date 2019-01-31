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

$("#modal__exteriors").slick({
  // arrows: false,
  fade: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1
});

$("#modal__interiors").slick({
  // arrows: false,
  fade: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1
});

$(".main-parallax").each(function() {
  let img = $(this);
  let imgParent = $(this).parent();
  function parallaxImg() {
    let speed = img.data("speed");
    let coords = img.data("coords") || 50;

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
      var imgPercent = (imgBottom / imgTop) * 100 + (coords - speed * 50);
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

  let portfolioPreviewImages = document.querySelectorAll(".portfolio-preview"),
    index,
    image;

  for (index = 0; index < portfolioPreviewImages.length; index++) {
    image = portfolioPreviewImages[index];
    // image.addEventListener("click", clickHandler);

    let flag = 0;
    image.addEventListener(
      "mousedown",
      function() {
        flag = 0;
      },
      false
    );
    image.addEventListener(
      "mousemove",
      function() {
        flag = 1;
      },
      false
    );
    image.addEventListener(
      "mouseup",
      function(event) {
        if (flag === 0) {
          // console.log("click");
          let modalId = this.getAttribute("data-modal");
          let modalClass = this.getAttribute("class-modal");
          let modalContainer = document.querySelector(".modal");
          let slickTrack = document.querySelector(
            "#modal__" + modalClass + " .slick-track"
          );

          slickTrack.setAttribute("style", "opacity: 1; width: 10000px;");
          event.preventDefault();
          let modalSlider = $("#modal__" + modalClass);

          modalContainer.classList.add("active");
          modalSlider[0].classList.add("active");

          modalSlider.slick("slickGoTo", modalId, true);
        } else if (flag === 1) {
          // console.log("drag");
        }
      },
      false
    );
  }

  function clickHandler(event) {
    let modalId = this.getAttribute("data-modal");
    let modalClass = this.getAttribute("class-modal");
    let modalContainer = document.querySelector(".modal");
    let slickTrack = document.querySelector(
      "#modal__" + modalClass + " .slick-track"
    );

    slickTrack.setAttribute("style", "opacity: 1; width: 10000px;");
    event.preventDefault();
    let modalSlider = $("#modal__" + modalClass);

    modalContainer.classList.add("active");
    modalSlider[0].classList.add("active");

    modalSlider.slick("slickGoTo", modalId, true);
  }

  let closeBtn = document.querySelector(".js-modal-close");

  closeBtn.addEventListener("click", function(e) {
    let modalContainer = document.querySelector(".modal.active");
    let modalExteriors = $("#modal__exteriors");
    let modalInteriors = $("#modal__interiors");

    modalContainer.classList.remove("active");
    modalExteriors[0].classList.remove("active");
    modalInteriors[0].classList.remove("active");
  });

  document.body.addEventListener(
    "keyup",
    function(e) {
      var key = e.keyCode;

      if (key == 27) {
        let modalContainer = document.querySelector(".modal.active");
        let modalExteriors = $("#modal__exteriors");
        let modalInteriors = $("#modal__interiors");

        modalContainer.classList.remove("active");
        modalExteriors[0].classList.remove("active");
        modalInteriors[0].classList.remove("active");
      }
    },
    false
  );
})();
/* end Up-Down button  */

//anchor links smooth scroll

$(function() {
  $("a[href^='#']").click(function() {
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
        $("html,body").animate({ scrollTop: targetOffset }, 700); //скорость прокрутки
        return false;
      }
    }
  });
});

// $(function() {
//   var $window = $(window); //Window object

//   var scrollTime = 1.2; //Scroll time
//   var scrollDistance = 300; //Distance. Use smaller value for shorter scroll and greater value for longer scroll

//   $window.on("mousewheel DOMMouseScroll", function(event) {
//     event.preventDefault();

//     var delta =
//       event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
//     var scrollTop = $window.scrollTop();
//     var finalScroll = scrollTop - parseInt(delta * scrollDistance);

//     TweenMax.to($window, scrollTime, {
//       scrollTo: { y: finalScroll, autoKill: true },
//       ease: Power1.easeOut, //For more easing functions see https://api.greensock.com/js/com/greensock/easing/package-detail.html
//       autoKill: true,
//       overwrite: 5
//     });
//   });
// });

// $(function() {
//   $("html").niceScroll({ smoothscroll: true });
// });

$(function() {
  // Custom Easing
  jQuery.scrollSpeed(200, 1200, "easeOutSine");
});

window.addEventListener("load", function() {
  $(".lang-btn").on("click", function() {
    $(".lang-btn").removeClass("border");
    $(this).addClass("border");
  });

  $(".eng-btn").click(function() {
    $(".rus").hide(0);
    $(".english").show(0);
  });
  $(".rus-btn").click(function() {
    $(".english").hide(0);
    $(".rus").show(0);
  });
});
