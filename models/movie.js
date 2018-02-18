const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
        "year" : Number,
        "title":String,
        "info" : {
                "directors": [String],
                "release_date" : String,
                "rating" : Number,
                "genres": [String],
                "image_url" : String,
                "plot" : String,
                "rank" : Number,
                "running_time_secs" : Number,
                "actors" : [String]
        }

});

const Movie = mongoose.model('Movie',MovieSchema);

const createMoviesFromFile = (jsonMovie)=>{

        let objMovie = undefined;
        jsonMovie.forEach((oneMovie)=>{

                objMovie = new Movie(oneMovie);
                objMovie.save();
        })
        
}


const getMovies = (start,end,limit)=>{

       return new Promise((resolve,reject)=>{

                Movie.find({}).skip(Number(start)).limit(Number(limit)).exec((err,movieJson)=>{
                        
                        if(err){
                                reject(err);
                        }else{
                                resolve(movieJson);
                        }
                })
        })
        
}
module.exports = {
        createMoviesFromFile,
        getMovies
}