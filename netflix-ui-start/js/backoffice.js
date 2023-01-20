
let url = "https://striveschool-api.herokuapp.com/api/movies"
let params = new URLSearchParams(location.search)
let id = params.get("id")
let category = params.get("category")


let currentMovieToEdit = {}

window.onload = async () => {
    try {
        await displayMoviesTable()

        if (id !== null) {
            let addButtonNode = document.querySelector(".btn-primary");
            addButtonNode.remove();

            document.querySelector(".backoffice-link").classList.replace("d-none", "d-block")

            let moviesList = document.querySelector("table");
            moviesList.style.visibility = "hidden"

            let response = await fetch(url + "/" + category, {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2RlZmU3MzczODAwMTUzNzQzOWEiLCJpYXQiOjE2NzQxMzI5NzYsImV4cCI6MTY3NTM0MjU3Nn0.Cj7au6cWrGlbwHOg8ITb0psSHPW6cdDE58ySVLXQL5E"
                }
            })
            let moviesPerCategory = await response.json()
            let result = moviesPerCategory.filter(({ _id }) => {
                return _id === id
            });

            currentMovieToEdit = result[0];
            // console.log(currentMovieToEdit)


            if (response.ok) {
                let { name, description, category, imageUrl } = currentMovieToEdit;
                document.querySelector("#movie-name").value = name;
                document.querySelector("#movie-description").value = description;
                document.querySelector("#movie-category").value = category;
                document.querySelector("#movie-image").value = imageUrl;
            }
            else {
                throw response.status + " " + response.statusText
            }

        } else {
            let saveChangesButtonNode = document.querySelector("form .btn-success");
            saveChangesButtonNode.remove();
        }

    } catch (error) {
        handleError(error)
    }

}


const addMovie = async (addEvent) => {
    try {
        addEvent.preventDefault()
        let newMovie = {
            name: document.querySelector("#movie-name").value,
            description: document.querySelector("#movie-description").value,
            category: document.querySelector("#movie-category").value,
            imageUrl: document.querySelector("#movie-image").value
        }

        let options = {
            method: "POST",
            headers: new Headers({
                "Content-type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2RlZmU3MzczODAwMTUzNzQzOWEiLCJpYXQiOjE2NzQxMzI5NzYsImV4cCI6MTY3NTM0MjU3Nn0.Cj7au6cWrGlbwHOg8ITb0psSHPW6cdDE58ySVLXQL5E"
            }),
            body: JSON.stringify(newMovie)
        }

        let response = await fetch(url, options);
        if (response.ok) {
            handleSuccess("Movie added!")
            displayMoviesTable();
        }

        else {
            throw response.status + " " + response.statusText
        }
    } catch (error) {
        handleError(error)
    }
}


const editMovie = async (editEvent) => {
    try {

        editEvent.preventDefault();

        const newMovie = {
            name: document.querySelector("#movie-name").value,
            description: document.querySelector("#movie-description").value,
            category: document.querySelector("#movie-category").value,
            imageUrl: document.querySelector("#movie-image").value,
        }

        let options = {
            method: "PUT",
            headers: new Headers({
                "Content-type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2RlZmU3MzczODAwMTUzNzQzOWEiLCJpYXQiOjE2NzQxMzI5NzYsImV4cCI6MTY3NTM0MjU3Nn0.Cj7au6cWrGlbwHOg8ITb0psSHPW6cdDE58ySVLXQL5E"
            }),
            body: JSON.stringify(newMovie)
        }

        let response = await fetch(url + "/" + id, options);
        let data = await response.json()
        console.log(data)
        let moviesList = document.querySelector("table");
        moviesList.style.visibility = "visible";
        if (response.ok) {
            await displayMoviesTable()
            handleSuccess("Movie information updated.")
        }
        else {
            throw response.status + " " + response.statusText
        }

    } catch (error) {
        handleError(error)
    }
}

const deleteMovie = async (idToDelete) => {
    try {
        let response = await fetch(url + "/" + idToDelete, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2RlZmU3MzczODAwMTUzNzQzOWEiLCJpYXQiOjE2NzQxMzI5NzYsImV4cCI6MTY3NTM0MjU3Nn0.Cj7au6cWrGlbwHOg8ITb0psSHPW6cdDE58ySVLXQL5E"
            }
        })
        if (response.ok) {
            await displayMoviesTable()
            handleSuccess("Movie deleted.")
        }

        else {
            throw response.status + " " + response.statusText
        }
    } catch (error) {
        handleError(error)
    }
}


const displayMoviesTable = async () => {
    try {
        let tbodyNode = document.querySelector("tbody");

        tbodyNode.innerHTML = "";

        let response = await fetch(url, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2RlZmU3MzczODAwMTUzNzQzOWEiLCJpYXQiOjE2NzQxMzI5NzYsImV4cCI6MTY3NTM0MjU3Nn0.Cj7au6cWrGlbwHOg8ITb0psSHPW6cdDE58ySVLXQL5E"
            }
        });

        let moviesArray = await response.json();

        moviesArray.forEach(async (movie) => {

            let res = await fetch(url + "/" + movie, {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2RlZmU3MzczODAwMTUzNzQzOWEiLCJpYXQiOjE2NzQxMzI5NzYsImV4cCI6MTY3NTM0MjU3Nn0.Cj7au6cWrGlbwHOg8ITb0psSHPW6cdDE58ySVLXQL5E"
                }
            })

            let movieInfo = await res.json()
            movieInfo.forEach(({ _id, name, category }) => {
                tbodyNode.innerHTML += `<tr>
                <th scope="row">${_id}</th>
                <td>${name}</td>
                <td>${category}</td>
                <td>
                    <a onclick="deleteMovie('${_id}')" class="btn btn-outline-danger">Delete</a>
                    <a href="backoffice.html?id=${_id}&category=${category}" class="btn btn-success">Edit</a>
                </td>
            </tr>`
            });
        });

    } catch (error) {
        handleError(error)
    }

}


const handleError = (error) => {
    let alert = document.querySelector(".alert-danger")
    let existingAlert = document.querySelector(".alert-success")

    if (existingAlert !== null) {
        existingAlert.classList.replace("d-block", "d-none")
    }
    alert.querySelector("span").innerText = error
    alert.classList.replace("d-none", "d-block")
}

const handleSuccess = (text) => {
    let alert = document.querySelector(".alert-success")
    let existingAlert = document.querySelector(".alert-danger")

    if (existingAlert !== null) {
        existingAlert.classList.replace("d-block", "d-none")
    }
    alert.querySelector("span").innerText = text
    alert.classList.replace("d-none", "d-block")
}