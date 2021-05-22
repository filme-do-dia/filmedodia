function getActor(){
    const actor = sessionStorage.getItem('actorId');
    /* const actor = localStorage.getItem('actorId') */
    // fetch(`${baseUrl}/person/${actor}?api_key=${api_key}&language=en-US&append_to_response=credits`).then(response => response.json()).then(data => {
        fetch(`${baseUrl}/person/${actor}?api_key=${api_key}&language=pt-BR&append_to_response=credits`).then(response => response.json()).then(data => {
        const actor = data;
        console.log(actor)
        setActorBaseInfo(actor)
        setActorPhoto(actor);
        setActorName(actor);
        setActorBirthday(actor);
        setActorActorNationality(actor);
        setActorBiography(actor);
        setActorMovies(actor);

        document.title = actor.name;

    }).catch(err=>console.error('Erro:' + err))
}

function setActorBaseInfo(actor){
    setActorPhoto(actor);
    setActorName(actor);
    setActorBirthday(actor);
    setActorActorNationality(actor);
}

function setActorPhoto(actor) {
    const actorImage = actor.profile_path ? `http://image.tmdb.org/t/p/w500/${actor.profile_path}` : 'img/semimagem.png';
    document.getElementById('actorImage').src = actorImage;
}

function setActorName(actor) {
    document.getElementById('actorName').textContent = actor.name;
}

function setActorBirthday(actor) {
    const ano = actor.birthday.slice(0,4);
    const mes = actor.birthday.slice(5,7);
    const dia = actor.birthday.slice(8, actor.birthday.length);

    document.getElementById('actorYearOfBirth').textContent = `${dia}/${mes}/${ano}`;
}

function setActorActorNationality(actor) {
    document.getElementById('actorNationality').textContent = actor.place_of_birth;
}

function setActorBiography(actor){
    if(actor.biography != ""){
        document.getElementById('biography').textContent = actor.biography;
    } else {
        document.getElementById('biography').innerHTML = "<i>Indisponível em português</i>";
    }
}

function setActorMovies(actor){
    const actorMovies = actor.credits.cast;

    actorMovies.forEach(movie => {
        const movieImage = movie.poster_path ? `http://image.tmdb.org/t/p/w300/${movie.poster_path}` : 'img/semimagem.png';
            document.getElementById('actorMovies').innerHTML +=
                `<div class="col-lg-4 col-md-6 col-sm-6">
                    <a href="relatedMovie.html" onclick="setMovie('${movie.id}')"><img src="${movieImage}" alt="${movie.title}"></a>
                    <p class="actorCasting"><strong>${movie.title}</strong></p>
                    <p>${movie.character}</p>
                    <br>
                </div>`
    })
}

