import React from 'react';
import axios from 'axios';
import ErrorMessage from './error';
import Loader from './Loader';
import ImagePlaceholder from './Imageplaceholder';
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
                    Authorization:`Bearer ${API_KEY}`,
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
            <div className="serch-bar" style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    onChange={(e) => setInput(e.target.value)}
                   
                />
                <button
                    onClick={handelSearch}
                  
                    disabled={loading}
                >
                    Search
                </button>
            </div>

            {loading && (
                <Loader />
            )}

            {error && <ErrorMessage message={error} />}

            <div className="movie-list" style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
                {!loading && !error && movie && movie.length > 0 ? (
                    movie.map((item, index) => (
                        <div className="movie-card" key={index} >
                            {item?.poster_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                                    alt={item.title}

                                />
                            ) : (
                                <ImagePlaceholder />
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                                {Array.from({ length: 5 }).map((_, i) => {
                                    const rating = Math.round((item as any).vote_average / 2);
                                    return (
                                        <svg
                                            key={i}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill={i < rating ? "#FFD700" : "#E0E0E0"}
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{ marginRight: 2 }}
                                        >
                                            <polygon points="10,1.5 12.6,7.5 19,8 14,12.5 15.5,18.5 10,15.2 4.5,18.5 6,12.5 1,8 7.4,7.5" />
                                        </svg>
                                    );
                                })}
                                <span style={{ marginLeft: 6, fontSize: 14, color: "#888" }}>
                                    {(item as any).vote_average?.toFixed(1) ?? "N/A"}
                                </span>
                            </div>
                            <h3>{item.title}</h3>
                        </div>
                    ))
                ) : null}
            </div>
        </div>
    );
}