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