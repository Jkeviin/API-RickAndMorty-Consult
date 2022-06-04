document.getElementById("box").addEventListener("keyup", () => getData());

const getData = () => {
    let name = document.getElementById("box").value;
    fetch(`https://rickandmortyapi.com/api/character/?name=${name}&status=alive`)
        .then(response => {
            if(response.ok){
                return response.json();
            }else if(response.status === 404) {
                console.clear();
                document.getElementById('infoCharacters').innerHTML = `<h1 class="text-center">No results found</h1>`;
                throw new Error("No se encontraron personajes");
            }else if(response.status === 500) {
                console.clear();
                throw new Error("Error del servidor");
            }else {
                console.clear();
                throw new Error("Error desconocido");
            }
        })
        .then(json => {
            printData(json);
        })
        .catch(error => console.log('ERROR ---->', error));
}

const printData = (data) => {
    let html = "";

    data.results.forEach(c => {
        html += `<div class="col mt-5">`;
            html += `<div class="card" style="width: 13rem;">`;
                html += `<img src="${c.image}" class="card-img-top" alt="...">`;
                html += `<div class="card-body">`;
                    html += `<h5 class="card-title">${c.name}</h5>`;
                    html += `<p class="card-text">Gender: ${c.gender}</p>`;
                    html += `<p class="card-text">Species: ${c.species}</p>`;
                html += `</div>`;
            html += `</div>`;
        html += `</div>`;
    });

    document.getElementById('infoCharacters').innerHTML = html;
}

getData();

// Language: javascript

