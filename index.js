const movieNameRef = document.getElementById("movie_name");
const searchBtn = document.getElementById("search_btn");
const result = document.getElementById("result");


//fetch data from API
let getMovie = () => {
    let movieName = movieNameRef.value;
    let apiUrl = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    //IF input field is empty
    if(movieName.length <= 0){
        result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
    }
    // if not empty
    else{
        fetch(apiUrl)
        .then((resp) => resp.json())
        .then((data) => {
            //if movie exist in database

            if(data.Response == 'True'){
                result.innerHTML = `
                <div class="info">
                    <img src=${data.Poster} class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                                <img src="star.png">
                                <h4>${data.imdbRating}</h4>
                        </div>
                        <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                        </div>
                        <div class="genre">
                                <div> ${data.Genre. split(",").join("</div><div>")}</div>
                        </div>
                    </div>            
                </div>
                <h3>Plot:</h3>
                <p>${data.Plot}</P>
                <h3>Cast:</h3>
                <p>${data.Actors}</P>
                `;
            }
            //if movie doesnt Exist in database
            else{
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
        //if error occurs

        .catch(() => {
            result.innerHTML =`<h3 class="msg">Error Occured</h3>`;
        });
    }

};
searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);