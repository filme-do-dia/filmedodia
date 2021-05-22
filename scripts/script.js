//--todo: fazer rodar 1x por dia | colocar a data do dia atual | melhorar a escolha do page para caso tenha mais de 500 pages um dia na api

async function runOncePerDay(){
    const movie = await getMovie();
    setMovieInfo(movie);

    /* if(hasOneDayPassed()){
        getMovie();
    } else if(!hasOneDayPassed()){
        const movie = JSON.parse(localStorage.movieOfTheDay)
        setMovieInfo(movie);
    }   */  
}

function setMovieInfo(movie){
    setMovieBaseInfo(movie);
    setMovieSummary(movie);
    handleMovieCast(movie);
    getMovieSimilar(movie);
    getMovieRecommendations(movie);
    setDate();        
}

/* fetch(url).then(response => response.json()).then(data =>{
    const movie = data.results[position];
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

async function handleMovieCast(movie){
    const cast = await getMovieCast(movie)
    const castShow = cast.slice(0,6);
    const castMore = cast.slice(6,cast.length);
    setCastShow(castShow);
    setCastMore(castMore);
}

function setActor(id){
    sessionStorage.setItem('actorId', id);
    /* localStorage.setItem('actorId', id); */
}

function showMoreActors(){
    const divMoreActors = document.getElementById('moreActorsDiv');
    const btnMoreActors = document.getElementById('btnMoreActors');
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
        const similares = data.results;

        similares.forEach(similar => {
            const posterImage = similar.poster_path.length ? `http://image.tmdb.org/t/p/w300/${similar.poster_path}` : 'img/semimagem.png';
            document.getElementById('similarMovies').innerHTML +=
                `<div class="col-lg-4 col-md-6 col-sm-6">
                    <a href="relatedMovie.html" onclick="setMovie('${similar.id}')"><img src="${posterImage}" alt="${similar.title}"></a>                    
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
        const recommendations = data.results;

        recommendations.forEach(recommendation => {
            const posterImage = recommendation.poster_path ? `http://image.tmdb.org/t/p/w300/${recommendation.poster_path}` : 'img/semimagem.png';
            document.getElementById('recommendationsMovies').innerHTML +=
                `<div class="col-lg-4 col-md-6 col-sm-6">
                    <a href="relatedMovie.html" onclick="setMovie('${recommendation.id}')"><img src="${posterImage}" alt="${recommendation.title}"></a>                    
                    <h6>${recommendation.title}</h6>
                    <br>
                </div>`
        })
    }).catch(err=>console.error('Erro:' + err))
}

function setDate(){
    let today = new Date();
    today = formatDate(today);
    //document.getElementById('webTitle').innerHTML += `${today}`;
    const x = today.split("/")
    document.getElementById('webTitle').innerHTML += `${x[0]} <br> ${x[1]} <br> ${x[2]} `;
}

function setMoviePoster(movie) {
    if (movie.poster_path != null) {
        const poster = `http://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        document.getElementById('posterMovie').src = poster;
    } else {
        document.getElementById('posterMovie').src = "img/semimagem.png";
    }
}

function setMovieTitle(movie) {
    const titulo = movie.title;
    document.getElementById('movieName').textContent = titulo;
}

function setMovieYear(movie) {
    const ano = movie.release_date.slice(0, 4);
    document.getElementById('movieYear').textContent = "(" + ano + ")";
}

function setMovieGenre(movie) {
    fetch(`${baseUrl}/genre/movie/list?api_key=${api_key}&language=${language}`).then(response => response.json()).then(data => {
        let generos = data.genres.filter(generoF => movie.genre_ids.includes(generoF.id)).map(generoM => generoM.name);
        generos = generos.join(', ');
        
        document.getElementById('movieCategory').textContent = generos;
    }).catch(err=>console.error('Erro:' + err));
}

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

async function getProviders(movie){
    /* {"link":"https://www.themoviedb.org/movie/22907-takers/watch?locale=BR","flatrate":[{"display_priority":4,"logo_path":"/2slPVV21kaPDx0NwjVtcUjdvzXz.jpg","provider_id":31,"provider_name":"HBO Go"}],"buy":[{"display_priority":2,"logo_path":"/q6tl6Ib6X5FT80RMlcDbexIo4St.jpg","provider_id":2,"provider_name":"Apple iTunes"},{"display_priority":3,"logo_path":"/p3Z12gKq2qvJaUOMeKNU2mzKVI9.jpg","provider_id":3,"provider_name":"Google Play Movies"}],"rent":[{"display_priority":2,"logo_path":"/q6tl6Ib6X5FT80RMlcDbexIo4St.jpg","provider_id":2,"provider_name":"Apple iTunes"},{"display_priority":3,"logo_path":"/p3Z12gKq2qvJaUOMeKNU2mzKVI9.jpg","provider_id":3,"provider_name":"Google Play Movies"}]} */

    const response = await fetch(`${baseUrl}/movie/${movie.id}/watch/providers?api_key=${api_key}`);
    const providers = await response.json();
    const allProviders = providers.results.BR
    if (allProviders == undefined){
        document.getElementById('ondeAssistir').innerHTML = '<span><i>Indisponível no Brasil</i></span>'
    }

    const buy = allProviders.buy ? allProviders.buy : "";
    const rent = allProviders.rent ? allProviders.rent : "";
    const flatrate = allProviders.flatrate;

    let getAllProvidersOnce = [];
    getAllProvidersOnce = getAllProvidersOnce.concat(buy, rent, flatrate).filter(item => item != undefined);

    const ids = getAllProvidersOnce.reduce((unique, item) => unique.includes(item.provider_id) ? unique : [...unique, item.provider_id], []);
    const logos = getAllProvidersOnce.reduce((unique, item) => unique.includes(item.logo_path) ? unique : [...unique, item.logo_path], []);
    const providersNames = getAllProvidersOnce.reduce((unique, item) => unique.includes(item.provider_name) ? unique : [...unique, item.provider_name], []);

    const allProvidersOnce = {};
    ids.forEach((id, index) => allProvidersOnce[id] = {
        logo: logos[index],
        name: providersNames[index]
    });

    for(item in allProvidersOnce){
        document.getElementById('ondeAssistir').innerHTML += 
        `<div class="thumbProvider"><img class="whichProvider" src="http://image.tmdb.org/t/p/w92${allProvidersOnce[item].logo}" alt="${allProvidersOnce[item].name}"><span class="info-provider">${allProvidersOnce[item].name}</span></div>`;
    }

    const infoProvider = document.getElementById('info-provider');
    const whichProvider = document.querySelectorAll('.whichProvider');
    
    //--melhoria: fazer com o click para mobile
/*    whichProvider.forEach(providerImg => {
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
    const trailers = await response.json();

    const resultados = trailers.results;

    // resultados.forEach(resultado => {
        
    //     if(resultado.site == "YouTube"){
    //         document.getElementById('trailers').innerHTML +=
    //             `<a target="_blank" href="https://www.youtube.com/watch?v=${resultado.key}"><img src="img/youtube.png" alt="YouTube"></a>`
    //     }
    //     if(resultado.site == "Vimeo"){
    //         document.getElementById('trailers').innerHTML +=
    //             `<a target="_blank" href="https://vimeo.com/${resultado.key}"><img src="img/vimeo.png" alt="Vimeo"></a>`
    //     }
    // })
    // if(!resultados.length){
    //     document.getElementById('trailers').innerHTML += '<p>sem trailer</p>'
    // }

    resultados.forEach(function (resultado, limitador) {
        
        if (limitador < 3) {
        
            if (resultado.site == "YouTube") {
                document.getElementById('trailers').innerHTML +=
                    `<a target="_blank" href="https://www.youtube.com/watch?v=${resultado.key}"><img src="img/youtube.png" alt="YouTube"></a>`
            }
            if (resultado.site == "Vimeo") {
                document.getElementById('trailers').innerHTML +=
                    `<a target="_blank" href="https://vimeo.com/${resultado.key}"><img src="img/vimeo.png" alt="Vimeo"></a>`
            }
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
    
    /* const buy = trailers.results.BR.buy;
    const rent = trailers.results.BR.rent;
    const flatrate = trailers.results.BR.flatrate;

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
            