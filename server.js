const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (request, response)=> {
    let url = 'https://api.themoviedb.org/3/movie/808?api_key=4e5df50980f54f81c3b6e39dc0133fa4';
    axios.get(url)

    .then(res => {
        let data = res.data;
        let currentYear = new Date().getFullYear();

        let releaseDate = new Date(data.release_date).getFullYear();

        let posterUrl = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`;

        let genresToDisplay = '';
        data.genres.forEach(genre => {
            genresToDisplay = genresToDisplay + `${genre.name}, `;
        });
        let genresUpdated = genresToDisplay.slice(0, -2) + '.';

        response.render('index', 
            {dataToRender: data,
            year: currentYear,
            releaseYear: releaseDate,
            genres: genresUpdated,
            poster: posterUrl
        });


    });
});

app.listen(process.env.PORT || 3000, ()=> {
    console.log('Server is running on port 3000');
});