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
            <button id="btnMoreActors" onclick="showMoreActors()">+</button>
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