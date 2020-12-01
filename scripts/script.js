//alert('Bem vindo ao Filme do Dia')


const api_key = "3f91f0994a6cd8f151cd33e0d9d76a08";
const page = Math.floor(Math.random() * 500) + 1;
const position = Math.floor(Math.random() * 20);
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;

fetch(url).then(response => response.json()).then(data =>{
    var movie = data.results[position];
    //console.log(movie);

    var titulo = movie.title;
    document.getElementById('movieName').textContent = titulo;

    var ano = movie.release_date.slice(0,4);
    document.getElementById('movieYear').textContent = ano;
    
   
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=pt-BR`).then(response => response.json()).then(data => {
        var generos = data.genres.filter(generoF => movie.genre_ids.includes(generoF.id)).map(generoM => generoM.name);
        document.getElementById('movieCategory').textContent = generos;            
    })
    
    var resumo = movie.overview;
    document.getElementById('overview').textContent = resumo;

    
    if(movie.poster_path != ""){
        var poster = `http://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        document.getElementById('posterMovie').src = poster
    } else {
        document.getElementById('posterMovie').src = "img/semimagem.png"
    }

    var voteAverage = movie.vote_average;
    document.getElementById('voteAverage').textContent = voteAverage;

    var voteCount = movie.vote_count;
    document.getElementById('voteCount').textContent = voteCount;


    async function getProviders(){
        /* {"link":"https://www.themoviedb.org/movie/22907-takers/watch?locale=BR","flatrate":[{"display_priority":4,"logo_path":"/2slPVV21kaPDx0NwjVtcUjdvzXz.jpg","provider_id":31,"provider_name":"HBO Go"}],"buy":[{"display_priority":2,"logo_path":"/q6tl6Ib6X5FT80RMlcDbexIo4St.jpg","provider_id":2,"provider_name":"Apple iTunes"},{"display_priority":3,"logo_path":"/p3Z12gKq2qvJaUOMeKNU2mzKVI9.jpg","provider_id":3,"provider_name":"Google Play Movies"}],"rent":[{"display_priority":2,"logo_path":"/q6tl6Ib6X5FT80RMlcDbexIo4St.jpg","provider_id":2,"provider_name":"Apple iTunes"},{"display_priority":3,"logo_path":"/p3Z12gKq2qvJaUOMeKNU2mzKVI9.jpg","provider_id":3,"provider_name":"Google Play Movies"}]} */

        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=${api_key}`);
        var providers = await response.json();
        console.log(providers.results.BR)
        var allProviders = providers.results.BR

        var buy = allProviders.buy;
        var rent = allProviders.rent;
        var flatrate = allProviders.flatrate;

        var getAllProvidersOnce = [];
        getAllProvidersOnce = getAllProvidersOnce.concat(buy, rent, flatrate).filter(item => item != undefined);

        if (!getAllProvidersOnce.length){
            document.getElementById('ondeAssistir').innerHTML = '<span>sem informação</span>'
        }
        
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
    getProviders();

    
    async function getTrailers(){
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${api_key}&language=en-US`);
        var trailers = await response.json();

        var resultados = trailers.results;

        resultados.forEach(resultado =>{
            if(resultado.site == "YouTube"){
                document.getElementById('trailers').innerHTML +=
                    `<a href="https://www.youtube.com/watch?v=${resultado.key}"><img src="img/youtube.png" alt="YouTube"></a>`
            }
            if(resultado.site == "Vimeo"){
                document.getElementById('trailers').innerHTML +=
                    `<a href="https://vimeo.com/${resultado.key}"><img src="img/vimeo.png" alt="Vimeo"></a>`
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

    getTrailers();



}).catch(err=>console.log('Erro:' + err));



            