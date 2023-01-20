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

let count2 = 0
const carouselTwoBehaviour = function () {
  let prevButtonNode = document.querySelector("#prev-watch-again");
  let nextButtonNode = document.querySelector("#next-watch-again");
  let carouselNode = document.querySelector("#carousel-watch-again");

  if (count2 > 0) {

    carouselNode.classList.add("carousel-left");
    prevButtonNode.classList.add("carousel-control-prev-left");
    nextButtonNode.classList.add("carousel-control-next-right");
  }
  count2++;
};

let count3 = 0
const carouselThreeBehaviour = function () {
  let prevButtonNode = document.querySelector("#prev-new-releases");
  let nextButtonNode = document.querySelector("#next-new-releases");
  let carouselNode = document.querySelector("#carousel-new-releases");

  if (count3 > 0) {

    carouselNode.classList.add("carousel-left");
    prevButtonNode.classList.add("carousel-control-prev-left");
    nextButtonNode.classList.add("carousel-control-next-right");
  }
  count3++;
};

window.onload = async () => {
  carouselBehaviour()
  carouselTwoBehaviour()
  carouselThreeBehaviour()
  await getMovies()
}


let url = "https://striveschool-api.herokuapp.com/api/movies"
let options = {
  headers: new Headers({
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2RlZmU3MzczODAwMTUzNzQzOWEiLCJpYXQiOjE2NzQxMzI5NzYsImV4cCI6MTY3NTM0MjU3Nn0.Cj7au6cWrGlbwHOg8ITb0psSHPW6cdDE58ySVLXQL5E"
  })
}

const getMovies = async () => {
  try {
    let response = await fetch(url, options)
    let genres = await response.json()
    genres.forEach(async (genre) => {
      let res = await fetch(url + "/" + genre, options)
      let movies = await res.json();
      displayMovies(movies)
    });

  }
  catch (error) {
    console.log(error)
  }
}

const displayMovies = (movies) => {
  let rowNode = document.querySelector("#top-movies .row")
  for (let movie of movies) {
    // console.log(movie)
    rowNode.innerHTML += `<div class="col-12 col-sm-6 col-md-4 col-lg-2 movie-img">
    <div class="card">
      <img
        src="${movie.imageUrl}"
        class="card-img-top" alt="Movie Image">
      <div class="card-body">
        <div class="volume">
          <i class="bi bi-volume-up"></i>
        </div>
        <div class="d-flex">
          <div class="d-flex">
            <div class="icon mr-2 icon-special">
              <div class="right-triangle"></div>
            </div>
            <div class="icon mr-2"><i class="bi bi-plus-lg"></i></div>
            <div class="icon mr-2"><i class="bi bi-hand-thumbs-up"></i></div>
          </div>
          <div class="ml-auto">
            <div class="icon"><i class="bi bi-chevron-down"></i></div>
          </div>
        </div>
        <div class="d-flex flex-column my-2">
          <div class="d-flex my-2 align-items-center">
            <span class="match mr-1">98% Match</span>
            <div class="age mr-1 px-1">16</div>
            <span class="limited mr-1">Limited Series</span>
            <i class="bi bi-badge-hd text-white"></i>
          </div>
          <p class="limited line-clamp">${movie.description}</p>
        </div>
        <div class="text-white genre">
        ${movie.category.charAt(0).toUpperCase() + movie.category.slice(1)}
        </div>
      </div>
    </div>
  </div>`
  }


}