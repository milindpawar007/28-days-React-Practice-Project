import React from 'react';
import axios from 'axios';

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
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjhhODczZGQ0NWE3Mzk1YWFjNDIxMDdhN2I4ZWVkNiIsIm5iZiI6MTc0NzgwMjg3Ni42NjEsInN1YiI6IjY4MmQ1YWZjNWFmNzA4ZmUwOTllNDFhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HGA6VobXYLoBQRoKQFJYeZyqDEjKhj6RHD6Qwl9J3o0'
                }
            };

            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=true&language=en-US&page=1`,
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
                    style={{
                        padding: '10px 14px',
                        borderRadius: 6,
                        border: '1px solid #ccc',
                        fontSize: 16,
                        width: 260
                    }}
                />
                <button
                    onClick={handelSearch}
                    style={{
                        padding: '10px 18px',
                        borderRadius: 6,
                        border: 'none',
                        background: '#007bff',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: 'pointer'
                    }}
                    disabled={loading}
                >
                    Search
                </button>
            </div>

            {loading && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '40px 0'
                }}>
                    <div className="loader" style={{
                        border: '6px solid #f3f3f3',
                        borderTop: '6px solid #007bff',
                        borderRadius: '50%',
                        width: 48,
                        height: 48,
                        animation: 'spin 1s linear infinite'
                    }} />
                    <style>
                        {`
                        @keyframes spin {
                            0% { transform: rotate(0deg);}
                            100% { transform: rotate(360deg);}
                        }
                        `}
                    </style>
                    <span style={{ marginTop: 16, color: '#007bff', fontWeight: 500, fontSize: 18 }}>Loading movies...</span>
                </div>
            )}

            {error && (
                <div style={{
                    background: '#ffeaea',
                    color: '#d8000c',
                    border: '1px solid #d8000c',
                    borderRadius: 8,
                    padding: '18px 24px',
                    margin: '24px 0',
                    textAlign: 'center',
                    fontWeight: 500,
                    fontSize: 18,
                    boxShadow: '0 2px 8px rgba(216,0,12,0.08)'
                }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: 'middle', marginRight: 8 }}>
                        <circle cx="12" cy="12" r="12" fill="#d8000c" opacity="0.15"/>
                        <path d="M12 7v5M12 16h.01" stroke="#d8000c" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    {error}
                </div>
            )}

            <div className="movie-list" style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
                {!loading && !error && movie && movie.length > 0 ? (
                    movie.map((item, index) => (
                        <div className="movie-card" key={index} style={{
                            background: '#fff',
                            borderRadius: 10,
                            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                            padding: 16,
                            width: 220,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            {item?.poster_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                                    alt={item.title}
                                    style={{ width: 200, height: 300, objectFit: "cover", background: "#000", borderRadius: 8 }}
                                />
                            ) : (
                                <div style={{
                                    width: 200,
                                    height: 300,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "#000",
                                    borderRadius: 8
                                }}>
                                    <svg width="120" height="180" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
                                        <g transform="translate(100, 100)">
                                            <rect x="40" y="40" width="120" height="80" rx="10" fill="white" />
                                            <circle cx="100" cy="80" r="20" fill="black" />
                                            <circle cx="140" cy="60" r="6" fill="black" />
                                            <line x1="0" y1="0" x2="20" y2="0" stroke="white" strokeWidth="6" />
                                            <line x1="0" y1="0" x2="0" y2="20" stroke="white" strokeWidth="6" />
                                            <line x1="160" y1="0" x2="140" y2="0" stroke="white" strokeWidth="6" />
                                            <line x1="160" y1="0" x2="160" y2="20" stroke="white" strokeWidth="6" />
                                            <line x1="0" y1="120" x2="20" y2="120" stroke="white" strokeWidth="6" />
                                            <line x1="0" y1="120" x2="0" y2="100" stroke="white" strokeWidth="6" />
                                            <line x1="160" y1="120" x2="160" y2="100" stroke="white" strokeWidth="6" />
                                            <line x1="160" y1="120" x2="140" y2="120" stroke="white" strokeWidth="6" />
                                        </g>
                                    </svg>
                                </div>
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
                            <div style={{ marginTop: 10, fontWeight: 600, fontSize: 16, textAlign: 'center' }}>{item.title}</div>
                        </div>
                    ))
                ) : null}
            </div>
        </div>
    );
}