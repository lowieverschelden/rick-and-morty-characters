let movies = [];
let page = 1;
const lijst = document.getElementById('character-list');
const buttons = document.getElementsByClassName('boton');

Array.from(buttons).forEach(button => {
    button.addEventListener('click', () => {
      if (button.id === 'next-page') {
        if(page<totalPages) {
            page += 1; 
        }
      } else if (button.id === 'prev-page') {
        if(page===1) {
            page = totalPages;
        }
        else {
            page-=1;
        }
   
      }
      getData(page);
    });
  });

async function getData(whichpage) {
  const url = `https://rickandmortyapi.com/api/character/?page=${whichpage}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    movies = json.results;
    totalPages = json.info.pages;
    console.log(movies);
    lijst.innerHTML ='';
    movies.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="movie-block">
        <img src="${movie.image}" alt="${movie.name} Image"/>
        <h3><strong>Name:</strong> ${movie.name}</h3>
        <p><strong>Species:</strong> ${movie.species}</p></div>`;
        lijst.appendChild(listItem);
    });
  } catch (error) {
    console.error(error.message);
  }
}

getData(page);
