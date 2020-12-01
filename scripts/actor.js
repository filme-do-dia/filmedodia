function getActor(){
    var actor = localStorage.getItem('actorId')
    fetch(`${baseUrl}/person/${actor}?api_key=${api_key}&language=${language}&append_to_response=credits`).then(response => response.json()).then(data => {
        var actor = data;
        console.log(actor)
        setActorBaseInfo(actor)
        setActorPhoto(actor);
        setActorName(actor);
        setActorYearOfBirth(actor);
        setActorActorNationality(actor);
        setActorBiography(actor);
        setActorMovies(actor);

    }).catch(err=>console.error('Erro:' + err))
}

function setActorBaseInfo(actor){
    setActorPhoto(actor);
    setActorName(actor);
    setActorYearOfBirth(actor);
    setActorActorNationality(actor);
}

function setActorPhoto(actor) {
    var actorImage = actor.profile_path ? `http://image.tmdb.org/t/p/w500/${actor.profile_path}` : 'img/semimagem.png';
    document.getElementById('actorImage').src = actorImage;
}

function setActorName(actor) {
    document.getElementById('actorName').textContent = actor.name;
}

function setActorYearOfBirth(actor) {
    document.getElementById('actorYearOfBirth').textContent = actor.birthday.slice(0, 4);
}

function setActorActorNationality(actor) {
    document.getElementById('actorNationality').textContent = actor.place_of_birth;
}

function setActorBiography(actor){
    document.getElementById('biography').textContent = actor.biography;
}

function setActorMovies(actor){
    var actorMovies = actor.credits.cast;

    actorMovies.forEach(movie => {
        var movieImage = movie.poster_path ? `http://image.tmdb.org/t/p/w300/${movie.poster_path}` : 'img/semimagem.png';
            document.getElementById('actorMovies').innerHTML +=
                `<div class="col-lg-4 col-md-6 col-sm-6">
                    <img src="${movieImage}" alt="${movie.title}">
                    <h6>${movie.title}</h6>
                    <p>como ${movie.character}</p>
                    <br>
                </div>`
    })
}

function voltarIndex(){
    window.history.back();
}

