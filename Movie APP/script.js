const MOVIE_API = 'https://api.themoviedb.org/3/movie/popular?api_key=4728eb374af81a9fe019f0fa16ada185&language=en-US&page=1';

const IMG_URL = 'https://image.tmdb.org/t/p/w1280'


const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=4728eb374af81a9fe019f0fa16ada185&query="'; // here we use single double quote to concanate a search term from our search box in here as we're going to add a query into here.


const search = document.getElementById('search');

const form = document.getElementById('form');

const main = document.getElementById('main');




// Get initial movies
getMovies(MOVIE_API);

async function getMovies(url){

  const response = await fetch(url) // we need to await as fetch retirns a promise
  const movieDate = await response.json()// return json format

  displayMovies(movieDate.results);
}

function displayMovies(movies){
// lets clear the main the main UI as we want to list movies intially but when we search we don't want to add to them movies already here instead replacing them

main.innerHTML = '';

// we want to fetch the movies and loop 

movies.forEach((movie) => {

  // the movies that passsed in we should able to access it properies

  const{ title, poster_path, vote_average, overview}  = movie// desctructing here


  // create movie element

    const movieElement = document.createElement('div');

    movieElement.classList.add('movie')

    movieElement.innerHTML = ` 
    
    <img src="${IMG_URL + poster_path}" alt="${title}">

      <div class="movie-info">

          <h3>${title}</h3>

          <span class="${sortColorRate(vote_average)}">${vote_average}</span>  <!-- rating based on the color of the text-->

          <div class ="overview">

            <h3>Overview</h3>

            ${overview}

          </div>`;

  main.appendChild(movieElement);

})

}

function sortColorRate(vote){

  if(vote >=8){

    return 'green';
  }


  else if(vote >=5){

    return 'orange';
  }

  else{

    return 'red';

  }


}


// Event listener for search form

form.addEventListener('submit', (e) => {

  e.preventDefault();


  const searchTerm = search.value;

  if(searchTerm && searchTerm !== ''){ // checking searchTerm exist

    getMovies(SEARCH_URL + searchTerm);

    search.value = ''; // to clear the value
  }
  else{ // if we submit without having anything in here, it will just reload the page

    window.location.reload();

  }

})

