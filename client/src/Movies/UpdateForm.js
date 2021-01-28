import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';

const UpdateForm = (props) => {
    const [newMovie, setNewMovie] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: [],
    });
    const params = useParams();
    const { push } = useHistory();

     useEffect(() => {
        if (props && props.movieList) {
            const movie = props.movieList.filter(
                (movie) => parseInt(movie.id) === parseInt(params.id)
            );

             if (movie.length) {
                setNewMovie({
                    ...newMovie,
                    title: movie[0].title,
                    director: movie[0].director,
                    metascore: parseInt(movie[0].metascore),
                    stars: movie[0].stars,
                });
            }
        }
    }, [props]);

     const onChange = (e) => {
        if (e.target.name === 'stars') {
            const starsList = e.target.value.split(',');
            setNewMovie({
                ...newMovie,
                stars: starsList,
            });
        } else if (e.target.name === 'metascore') {
            setNewMovie({
                ...newMovie,
                metascore: parseInt(e.target.value),
            });
        } else {
            setNewMovie({
                ...newMovie,
                [e.target.name]: e.target.value,
            });
        }
    };

     const submitAddedMovie = (e) => {
        e.preventDefault();
        const data = newMovie;
        if(props && props.updateMovie && params.id) {
            const id = parseInt(params.id);
            data.id= id;
            props.updateMovie(data, id);
            push('/');
        } else{
            props.addNewMovie(data);
            push('/')
        }
    };


     return(
        <div>
            <form onSubmit={submitAddedMovie}>
                <label>
                    Title:
                    <input 
                        name='title'
                        type='string'
                        value ={newMovie.title}
                        onChange={onChange}
                        />
                </label>
                <label>
                    Director:
                    <input 
                        name='director'
                        type='string'
                        value ={newMovie.director}
                        onChange={onChange}
                        />
                </label>
                 <label>
                     Metascore:
                    <input 
                        name='metascore'
                        type='string'
                        value ={newMovie.metascore}
                        onChange={onChange}
                        />
                </label>
                 <label>
                     Stars:
                    <input 
                        name='stars'
                        type='string'
                        value ={newMovie.stars}
                        onChange={onChange}
                        />
                </label>
                <button>Add</button>
            </form>
        </div>
    )
}

 export default UpdateForm; 