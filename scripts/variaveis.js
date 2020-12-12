const api_key = API_KEY;
const baseUrl = 'https://api.themoviedb.org/3';
const language = 'pt-BR'
const page = Math.floor(Math.random() * 500) + 1;
const position = Math.floor(Math.random() * 20);
// const adult = confirm("Deseja Visualizar filmes 18 + (contem filmes adultos, terror e similares)");
// const url = `${baseUrl}/discover/movie?api_key=${api_key}&language=${language}&sort_by=popularity.desc&include_adult=${adult}&include_video=false&page=${page}`;
const url = `${baseUrl}/discover/movie?api_key=${api_key}&language=${language}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;
