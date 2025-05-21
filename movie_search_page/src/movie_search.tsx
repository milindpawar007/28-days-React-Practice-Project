import React from 'react';
import axios from 'axios';
import ErrorMessage from './error';
import Loader from './Loader';
import ImagePlaceholder from './Imageplaceholder';
import Rating from './Rating';
type Movie = {
    title: string;
    poster_path: string;
    vote_average?: number;
    // add other properties if needed
};

export default function MovieSearch() {
    const [input, setInput] = React.useState('');
    const [movie, setMovie] = React.useState<Movie[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | false>(false);

    const handelSearch = async () => {
        setLoading(true);
        setError(false);
        try {
            const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
            console.log("API_KEY", API_KEY);
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                }
            };

            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=en-US&page=1`,
                options
            );
            setMovie(response.data?.results);
            setLoading(false);
        } catch (error: any) {
            setError("Failed to fetch movies. Please try again later.");
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="serch-bar">
                <input   type="text"  placeholder="Search for a movie..."  onChange={(e) => setInput(e.target.value)} />
                <button onClick={handelSearch}disabled={loading}> Search</button>
            </div>

            {loading && (<Loader /> )}
            {error && <ErrorMessage message={error} />}

            <div className="movie-list" >
                {!loading && !error && movie && movie.length > 0 ? (
                    movie.map((item, index) => (
                        <div className="movie-card" key={index} >
                            {item?.poster_path ? (<img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />) :(<ImagePlaceholder />)}
                            <Rating value={item.vote_average ?? 0} />
                            <h3>{item.title}</h3>
                        </div>
                    ))
                ) : null}
            </div>
        </div>
    );
}