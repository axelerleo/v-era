$(".portfolio__slider").slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1
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
