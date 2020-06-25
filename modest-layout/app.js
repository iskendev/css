// Slider config

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


// Responsive Hamburger menu

function myFunction() {  
  
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
      x.className += " responsive";
    } else {
        x.className = "topnav";
      }
}