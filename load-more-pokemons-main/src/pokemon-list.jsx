// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0

import { useEffect, useState } from "react";
const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
};
const PokemonList = () => {
    const [result, setResult] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        const fetchPokemons = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=5&offset=0')
            const data = await response.json();

            setResult(data.results)
            setCount(data.count)
        }
        fetchPokemons()
    }, [])

    const handelLoadMore = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${result.length}`)
        const data = await response.json();

        setResult((prev) => [...prev, ...data.results])
    }
    return (
        <>
            <div style={containerStyle}>
                <h1>Pokemon List</h1>


                <ul>{result.map((pokeman) => <li key={pokeman.name}>{pokeman.name}</li>)}</ul>

                <h5>Displaying {result.length} of {count} results</h5>

                {result.length !== count && <button onClick={handelLoadMore}>Load more</button>}

            </div>
        </>

    )
};

export default PokemonList;
