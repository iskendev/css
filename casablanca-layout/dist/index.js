$('.menu a').on('click', function (e) {
  if (this.hash !== '') {
    e.preventDefault();

    const hash = this.hash;

    $('html, body')
      .animate({
        scrollTop: $(hash).offset().top
      },800);
  }
});



$(document).ready(function () {
  $('.header_slider__slider').slick({
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: true,
      speed: 1000,

  });
});
