let count = 0;

const carouselBehaviour = function () {
  let prevButtonNode = document.querySelector(".carousel-control-prev");
  let nextButtonNode = document.querySelector(".carousel-control-next");
  if (count > 0) {
    let carouselNode = document.querySelector(".carousel");
    carouselNode.classList.add("carousel-left");
    prevButtonNode.classList.add("carousel-control-prev-left");
    nextButtonNode.classList.add("carousel-control-next-right");
  }
  count++;
};

window.onload = carouselBehaviour;
