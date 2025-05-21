import React from 'react';

export default function MovieSearch() {

    const [input, setInput] = React.useState('');


    return (
        <div>
            <div className="serch-bar">
                    <input type="text" placeholder="Search for a movie..." onChange={(e)=>{setInput(e.target.value)}} />
                    <button>Search</button>
                </div>
            <div className="movie-list">
                {input && <h2> "{input}"</h2>}
            </div>
        </div>
    );
}