let slideIndex = 0 
showSlides(slideIndex)

function showSlides() {
  let slides = document.getElementsByClassName("slideElem");
  let dots = document.getElementsByClassName("dot");

  for(let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"
  }
  slideIndex++;

  if(slideIndex > slides.length) slideIndex = 1

  slides[slideIndex-1].style.display = "block";

  setTimeout(showSlides, 2500); // Change image every 2 seconds
}
