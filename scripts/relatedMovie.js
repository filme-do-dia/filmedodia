async function getRelatedMovie(){
    try {
        const relatedMovieId = sessionStorage.getItem('movieId');
        /* const relatedMovieId = localStorage.getItem('movieId') */
        const response = await fetch(`${baseUrl}/movie/${relatedMovieId}?api_key=${api_key}&language=${language}&append_to_response=credits`);
        const data = await response.json();
        const movie = data;
        console.log(movie)
    
        setMovieBaseInfo(movie);
        setRelatedMovieGenre(movie)
        setMovieSummary(movie);
        handleMovieCast(movie);
        handleSimilarMovies(movie);
        handleMovieRecommendations(movie);
        //setDate();
        document.title = movie.title;
        
    } catch (error) {
        console.error(error)
    }

}
function setRelatedMovieGenre(movie) {
    const getGeneros = movie.genres;
    let generos = [];
    getGeneros.forEach(genero => {
        generos.push(genero.name)
    })
    generos = generos.join(', ');
    document.getElementById('movieCategory').textContent = generos;
}