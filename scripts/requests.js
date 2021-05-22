async function getMovie(){
    try {
        const response = await fetch(url);
        const data = await response.json();
        const movie = data.results[position];
        console.log(movie);
        localStorage.movieOfTheDay = JSON.stringify(movie);
        return movie;
    } catch (error) {
        console.error(error);
    }
};

async function getMovieCast(movie){
    try {
        const response = await fetch(`${baseUrl}/movie/${movie.id}?api_key=${api_key}&language=${language}&append_to_response=credits`);
        const data = await response.json();
        const cast = data.credits.cast;
        return cast;

    } catch(error){
        console.error('Erro:' + err)
    }
};

async function getMovieSimilar(movie){
    try {
        const response = await fetch(`${baseUrl}/movie/${movie.id}/similar?api_key=${api_key}&language=${language}`);
        const data = await response.json();
        const similares = data.results;
        return similares;
    } catch(error){
        console.error('Erro:' + err)
    }
};

async function getMovieRecommendations(movie){
    try {
        const response = await fetch(`${baseUrl}/movie/${movie.id}/recommendations?api_key=${api_key}&language=${language}`);
        const data = await response.json();
        const recommendations = data.results;
        return recommendations;
    } catch(error){
        console.error('Erro:' + err)
    }
};

async function getMovieGenres(){
    try {
        const response = await fetch(`${baseUrl}/genre/movie/list?api_key=${api_key}&language=${language}`);
        const data = await response.json();
        const genres = data.genres;
        return genres;
    } catch(error){
        console.error('Erro:' + err)
    }
};