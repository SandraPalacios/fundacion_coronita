// When the user scrolls the page, execute myFunction 
// Get the navbar
var navbar = document.getElementsByClassName("header");
// Get the offset position of the navbar
//var sticky = navbar[0].offsetTop;
window.onscroll = function() {
    if (window.pageYOffset > 0) {
        navbar[0].classList.add("sticky");
        $("#btn-menu").css("padding-top","0px");
      } else {
        navbar[0].classList.remove("sticky");
        $("#btn-menu").css("padding-top","20px");
      }
};
