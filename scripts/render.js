//basic info
function setMoviePoster(movie) {
    if (movie.poster_path != null) {
        const poster = `http://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        document.getElementById('posterMovie').src = poster;
    } else {
        document.getElementById('posterMovie').src = "img/semimagem.png";
    }
};

function setMovieTitle(movie) {
    const titulo = movie.title;
    document.getElementById('movieName').textContent = titulo;
};

function setMovieYear(movie) {
    const ano = movie.release_date.slice(0, 4);
    document.getElementById('movieYear').textContent = "(" + ano + ")";
};

function setMovieGenre(movie, movieGenres) {
        let generos = movieGenres.filter(generoF => movie.genre_ids.includes(generoF.id)).map(generoM => generoM.name);
        generos = generos.join(', ');
        
        document.getElementById('movieCategory').textContent = generos;
};

//movie summary
function setMovieOverview(movie) {
    const resumo = movie.overview;
    document.getElementById('overview').textContent = resumo;
}

function setMovieVoteAverage(movie) {
    const voteAverage = movie.vote_average;
    document.getElementById('voteAverage').textContent = voteAverage;
}

function setMovieVoteCount(movie) {
    const voteCount = movie.vote_count;
    document.getElementById('voteCount').textContent = voteCount;
}

//cast
function setCastShow(castShow) {
    castShow.forEach(person => {
        const personImage = person.profile_path ? `http://image.tmdb.org/t/p/w300/${person.profile_path}` : 'img/semimagem.png';
        document.getElementById('castDetail').innerHTML +=
            `<div class="col-md-2 col-sm-4 d-flex flex-column align-items-center">
                <a href="ator.html" onclick="setActor('${person.id}')"><img src="${personImage}" alt="${person.name}" class="actorImg"></a>
                <p class="actor-character"><strong>${person.name}</strong><br>${person.character}</p><br>
            </div>`;            
    });
    document.getElementById('castDetail').innerHTML += 
        `<div id="divBtnMoreActors" class="col-md-12 text-center">
            <button id="btnMoreActors" onclick="moreActorsButton()">+</button>
        </div`
    document.getElementById('castDetail').innerHTML += 
        `<div id="moreActorsDiv"></div>`
    document.getElementById('moreActorsDiv').innerHTML += 
        `<div id="moreActors" class="row"></div>`
};

function setCastMore(castMore){
    castMore.forEach(person => {
        const personImage = person.profile_path ? `http://image.tmdb.org/t/p/w300/${person.profile_path}` : 'img/semimagem.png';
        document.getElementById('moreActors').innerHTML +=
            `<div class="col-md-2 col-sm-4 d-flex flex-column align-items-center">
                <a href="ator.html" onclick="setActor('${person.id}')"><img src="${personImage}" alt="${person.name}" class="actorImg"></a>
                <p><strong>${person.name}</strong> é <br>${person.character}</p>
            </div>`;
    });
};

//more movies
function setSimilarMovies(similarMovies){
    similarMovies.forEach(similar => {
        const posterImage = similar.poster_path.length ? `http://image.tmdb.org/t/p/w300/${similar.poster_path}` : 'img/semimagem.png';
        document.getElementById('similarMovies').innerHTML +=
            `<div class="col-lg-4 col-md-6 col-sm-6">
                <a href="relatedMovie.html" onclick="setMovie('${similar.id}')"><img src="${posterImage}" alt="${similar.title}"></a>                    
                <h6>${similar.title}</h6>
                <br>
            </div>`
    });
};

function setMovieRecommendations(movieRecommendations){
    movieRecommendations.forEach(recommendation => {
        const posterImage = recommendation.poster_path ? `http://image.tmdb.org/t/p/w300/${recommendation.poster_path}` : 'img/semimagem.png';
        document.getElementById('recommendationsMovies').innerHTML +=
            `<div class="col-lg-4 col-md-6 col-sm-6">
                <a href="relatedMovie.html" onclick="setMovie('${recommendation.id}')"><img src="${posterImage}" alt="${recommendation.title}"></a>                    
                <h6>${recommendation.title}</h6>
                <br>
            </div>`
    });
};