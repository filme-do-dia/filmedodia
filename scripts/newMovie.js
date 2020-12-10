async function getNewMovie(){
    try {
        var newMovieId = sessionStorage.getItem('movieId');
        /* var newMovieId = localStorage.getItem('movieId') */
        const response = await fetch(`${baseUrl}/movie/${newMovieId}?api_key=${api_key}&language=${language}&append_to_response=credits`);
        var data = await response.json();
        var movie = data;
        console.log(movie)
    
        setMovieBaseInfo(movie);
        setNewMovieGenre(movie)
        setMovieSummary(movie);
        getMovieCast(movie);
        getMovieSimilar(movie);
        getMovieRecommendations(movie);
        //setDate();
        document.title = movie.title;
        
    } catch (error) {
        console.error(error)
    }

}
    function setNewMovieGenre(movie) {
        var getGeneros = movie.genres;
        var generos = [];
        getGeneros.forEach(genero => {
            generos.push(genero.name)
        })
        generos = generos.join(', ');
        document.getElementById('movieCategory').textContent = generos;
    }