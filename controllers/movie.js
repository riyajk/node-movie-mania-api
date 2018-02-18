const fs = require('fs'),
  path = require('path'),
  movies = require('../models/movie');

module.exports = (router) => {
  router.get('/', (req, resp) => {

    const startDoc = req.query.start;
    endDoc = req.query.end,
    limit = req.query.limit;

    movies
      .getMovies(startDoc, endDoc,limit)
      .then((movieList) => {

        resp.json({status: true, list: movieList});

      })
      .catch((error) => {
        resp.json({success: false, message: "unable to fetch data.", error});
      })
  });

  router.post('/', (req, resp) => {

    fs.readFile(path.join(__dirname, 'moviedata.json'), 'utf-8', (err, movieJosn) => {
      if (err) {
        resp.json(err);
      } else {
        resp.json(JSON.parse(movieJosn));
        movies.createMoviesFromFile(JSON.parse(movieJosn));

      }

    });

  });
}