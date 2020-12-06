//--todo: fazer rodar 1x por dia | colocar a data do dia atual | melhorar a escolha do page para caso tenha mais de 500 pages um dia na api

/* function runOncePerDay(){
    if(!hasOneDayPassed() ) return false;
  
    
    getMovie();
} */

async function getMovie(){
    try {
        const response = await fetch(url);
        var data = await response.json();
        var movie = data.results[position];
        console.log(movie)
    
        setMovieBaseInfo(movie);
        setMovieSummary(movie);
        getMovieCast(movie);
        getMovieSimilar(movie);
        getMovieRecommendations(movie);
        setDate();
        
    } catch (error) {
        console.error(error)
    }
}

/* fetch(url).then(response => response.json()).then(data =>{
    var movie = data.results[position];
    //console.log(movie);
}).catch(err=>console.log('Erro:' + err)); */

function setMovieBaseInfo(movie) {
    setMoviePoster(movie);
    setMovieTitle(movie);
    setMovieYear(movie);
    setMovieGenre(movie);
}

function setMovieSummary(movie) {
    setMovieOverview(movie);
    setMovieVoteAverage(movie);
    setMovieVoteCount(movie);
    getProviders(movie);
    getTrailers(movie);
}

function getMovieCast(movie){
    fetch(`${baseUrl}/movie/${movie.id}?api_key=${api_key}&language=${language}&append_to_response=credits`).then(response => response.json()).then(data => {
        var cast = data.credits.cast;
        console.log(cast)
        var castShow = cast.slice(0,6);
        var castMore = cast.slice(6,cast.length);

        castShow.forEach(person => {
            var personImage = person.profile_path ? `http://image.tmdb.org/t/p/w300/${person.profile_path}` : 'img/semimagem.png';
            document.getElementById('castDetail').innerHTML +=
                `<div class="col-md-4 col-sm-4 d-flex flex-column align-items-center">
                    <a href="ator.html" onclick="setActor('${person.id}')"><img src="${personImage}" alt="${person.name}" class="actorImg"></a>
                    <p><strong>${person.name}</strong> é <br>${person.character}</p>
                </div>`;            
        });
        document.getElementById('castDetail').innerHTML += 
            `<div class="col-md-12">
                <button id="btnMoreActors" onclick="showMoreActors()">+</button>
            </div`
        document.getElementById('castDetail').innerHTML += 
            `<div id="moreActorsDiv"></div>`
        document.getElementById('moreActorsDiv').innerHTML += 
            `<div id="moreActors" class="row"></div>`
        castMore.forEach(person => {
            var personImage = person.profile_path ? `http://image.tmdb.org/t/p/w300/${person.profile_path}` : 'img/semimagem.png';
            document.getElementById('moreActors').innerHTML +=
                `<div class="col-md-4 col-sm-4 d-flex flex-column align-items-center">
                    <a href="ator.html" onclick="setActor('${person.id}')"><img src="${personImage}" alt="${person.name}" class="actorImg"></a>
                    <p><strong>${person.name}</strong> é <br>${person.character}</p>
                </div>`;
        })

    }).catch(err=>console.error('Erro:' + err))
}

function setActor(id){
    sessionStorage.setItem('actorId', id);
    /* localStorage.setItem('actorId', id); */
}

function showMoreActors(){
    var divMoreActors = document.getElementById('moreActorsDiv');
    var btnMoreActors = document.getElementById('btnMoreActors');
    if(divMoreActors.style.display == 'none' || divMoreActors.style.display == ''){
        divMoreActors.style.display = 'block';
        btnMoreActors.innerHTML = '-';
    } else {
        divMoreActors.style.display = 'none';
        btnMoreActors.innerHTML = '+';
    }
}

function getMovieSimilar(movie){
    fetch(`${baseUrl}/movie/${movie.id}/similar?api_key=${api_key}&language=${language}`).then(response => response.json()).then(data => {
        var similares = data.results;

        similares.forEach(similar => {
            var posterImage = similar.poster_path.length ? `http://image.tmdb.org/t/p/w300/${similar.poster_path}` : 'img/semimagem.png';
            document.getElementById('similarMovies').innerHTML +=
                `<div class="col-lg-4 col-md-6 col-sm-6">
                    <a href="novoFilme.html" onclick="setMovie('${similar.id}')"><img src="${posterImage}" alt="${similar.title}"></a>                    
                    <h6>${similar.title}</h6>
                    <br>
                </div>`
        })
    }).catch(err=>console.error('Erro:' + err))
}

function setMovie(id){
    sessionStorage.setItem('movieId', id);
    /* localStorage.setItem('movieId', id); */
}

function getMovieRecommendations(movie){
    fetch(`${baseUrl}/movie/${movie.id}/recommendations?api_key=${api_key}&language=${language}`).then(response => response.json()).then(data => {
        var recommendations = data.results;

        recommendations.forEach(recommendation => {
            var posterImage = recommendation.poster_path ? `http://image.tmdb.org/t/p/w300/${recommendation.poster_path}` : 'img/semimagem.png';
            document.getElementById('recommendationsMovies').innerHTML +=
                `<div class="col-lg-4 col-md-6 col-sm-6">
                    <a href="novoFilme.html" onclick="setMovie('${recommendation.id}')"><img src="${posterImage}" alt="${recommendation.title}"></a>                    
                    <h6>${recommendation.title}</h6>
                    <br>
                </div>`
        })
    }).catch(err=>console.error('Erro:' + err))
}

function setDate(){
    var today = new Date();
    today = formatDate(today);
    document.getElementById('webTitle').innerHTML += ` - ${today}`;
}

function setMoviePoster(movie) {
    if (movie.poster_path != null) {
        var poster = `http://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        document.getElementById('posterMovie').src = poster;
    } else {
        document.getElementById('posterMovie').src = "img/semimagem.png";
    }
}

function setMovieTitle(movie) {
    var titulo = movie.title;
    document.getElementById('movieName').textContent = titulo;
}

function setMovieYear(movie) {
    var ano = movie.release_date.slice(0, 4);
    document.getElementById('movieYear').textContent = ano;
}

function setMovieGenre(movie) {
    fetch(`${baseUrl}/genre/movie/list?api_key=${api_key}&language=${language}`).then(response => response.json()).then(data => {
        var generos = data.genres.filter(generoF => movie.genre_ids.includes(generoF.id)).map(generoM => generoM.name);
        document.getElementById('movieCategory').textContent = generos;
    }).catch(err=>console.error('Erro:' + err));
}

function setMovieOverview(movie) {
    var resumo = movie.overview;
    document.getElementById('overview').textContent = resumo;
}

function setMovieVoteAverage(movie) {
    var voteAverage = movie.vote_average;
    document.getElementById('voteAverage').textContent = voteAverage;
}

function setMovieVoteCount(movie) {
    var voteCount = movie.vote_count;
    document.getElementById('voteCount').textContent = voteCount;
}

async function getProviders(movie){
    /* {"link":"https://www.themoviedb.org/movie/22907-takers/watch?locale=BR","flatrate":[{"display_priority":4,"logo_path":"/2slPVV21kaPDx0NwjVtcUjdvzXz.jpg","provider_id":31,"provider_name":"HBO Go"}],"buy":[{"display_priority":2,"logo_path":"/q6tl6Ib6X5FT80RMlcDbexIo4St.jpg","provider_id":2,"provider_name":"Apple iTunes"},{"display_priority":3,"logo_path":"/p3Z12gKq2qvJaUOMeKNU2mzKVI9.jpg","provider_id":3,"provider_name":"Google Play Movies"}],"rent":[{"display_priority":2,"logo_path":"/q6tl6Ib6X5FT80RMlcDbexIo4St.jpg","provider_id":2,"provider_name":"Apple iTunes"},{"display_priority":3,"logo_path":"/p3Z12gKq2qvJaUOMeKNU2mzKVI9.jpg","provider_id":3,"provider_name":"Google Play Movies"}]} */

    const response = await fetch(`${baseUrl}/movie/${movie.id}/watch/providers?api_key=${api_key}`);
    var providers = await response.json();
    var allProviders = providers.results.BR
    if (allProviders == undefined){
        document.getElementById('ondeAssistir').innerHTML = '<span>sem informação</span>'
    }

    var buy = allProviders.buy;
    var rent = allProviders.rent;
    var flatrate = allProviders.flatrate;

    var getAllProvidersOnce = [];
    getAllProvidersOnce = getAllProvidersOnce.concat(buy, rent, flatrate).filter(item => item != undefined);

    var ids = getAllProvidersOnce.reduce((unique, item) => unique.includes(item.provider_id) ? unique : [...unique, item.provider_id], []);
    var logos = getAllProvidersOnce.reduce((unique, item) => unique.includes(item.logo_path) ? unique : [...unique, item.logo_path], []);
    var providersNames = getAllProvidersOnce.reduce((unique, item) => unique.includes(item.provider_name) ? unique : [...unique, item.provider_name], []);

    var allProvidersOnce = {};
    ids.forEach((id, index) => allProvidersOnce[id] = {
        logo: logos[index],
        name: providersNames[index]
    });

    for(item in allProvidersOnce){
        document.getElementById('ondeAssistir').innerHTML += 
        `<img class="whichProvider" src="http://image.tmdb.org/t/p/w92${allProvidersOnce[item].logo}" alt="${allProvidersOnce[item].name}">`;
    }

    var infoProvider = document.getElementById('info-provider');
    var whichProvider = document.querySelectorAll('.whichProvider');
    
    //--melhoria: fazer com o click para mobile
    whichProvider.forEach(providerImg => {
        providerImg.addEventListener('mouseover', () => {                
            infoProvider.style.display = 'block';
            infoProvider.innerHTML = providerImg.alt;
        })
        providerImg.addEventListener('mouseleave', () => {
            infoProvider.style.display = 'none';
        })
    })
   
    /* if(buy){
        buy.forEach(item => document.getElementById('ondeAssistir').innerHTML += 
            `<img src="http://image.tmdb.org/t/p/w92${item.logo_path}" alt="${item.provider_name}">`);
    } 
    if (rent){
        rent.forEach(item => document.getElementById('ondeAssistir').innerHTML += 
            `<img src="http://image.tmdb.org/t/p/w92${item.logo_path}" alt="${item.provider_name}">`);
    }
    if(flatrate){
        flatrate.forEach(item => document.getElementById('ondeAssistir').innerHTML += 
            `<img src="http://image.tmdb.org/t/p/w92${item.logo_path}" alt="${item.provider_name}">`);
    }
    else {
        document.getElementById('ondeAssistir').src = `<img src="img/semimagem.png">`;
    } */
}

async function getTrailers(movie){
    const response = await fetch(`${baseUrl}/movie/${movie.id}/videos?api_key=${api_key}&language=en-US`);
    var trailers = await response.json();

    var resultados = trailers.results;

    resultados.forEach(resultado =>{
        if(resultado.site == "YouTube"){
            document.getElementById('trailers').innerHTML +=
                `<a target="_blank" href="https://www.youtube.com/watch?v=${resultado.key}"><img src="img/youtube.png" alt="YouTube"></a>`
        }
        if(resultado.site == "Vimeo"){
            document.getElementById('trailers').innerHTML +=
                `<a target="_blank" href="https://vimeo.com/${resultado.key}"><img src="img/vimeo.png" alt="Vimeo"></a>`
        }
    })
    if(!resultados.length){
        document.getElementById('trailers').innerHTML += '<p>sem trailer</p>'
    }

    /* Trailer URL
        Just add the Key in the respective URL:
        YouTube: https://www.youtube.com/watch?v=
        Vimeo: https://vimeo.com/

        For example:
        Youtube: https://www.youtube.com/watch?v=h6hZkvrFIj0
        Vimeo: https://vimeo.com/282875052 */
    
    /* var buy = trailers.results.BR.buy;
    var rent = trailers.results.BR.rent;
    var flatrate = trailers.results.BR.flatrate;

    if(buy){
        buy.forEach(item => document.getElementById('ondeAssistir').innerHTML += 
            `<img src="http://image.tmdb.org/t/p/w92${item.logo_path}" alt="${item.provider_name}">`);
    } 
    if (rent){
        rent.forEach(item => document.getElementById('ondeAssistir').innerHTML += 
            `<img src="http://image.tmdb.org/t/p/w92${item.logo_path}" alt="${item.provider_name}">`);
    }
    if(flatrate){
        flatrate.forEach(item => document.getElementById('ondeAssistir').innerHTML += 
            `<img src="http://image.tmdb.org/t/p/w92${item.logo_path}" alt="${item.provider_name}">`);
    }
    else {
        document.getElementById('ondeAssistir').src = `<img src="img/semimagem.png">`;
    } */
}

function voltarIndex(){
    window.location.href="index.html"
    /* window.history.back(); */
}
            