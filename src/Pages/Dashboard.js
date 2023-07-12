import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { capitalize } from "../utils";
import PokemonCard from "../Components/PokemonCard";


const POKEMON_URL = "https://pokeapi.co/api/v2";

export default function Dashboard() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetchPokemons(`${POKEMON_URL}/pokemon?limit=12&offset=0`).then((pokemons) => {
            setPokemons(pokemons);
        });
    }, []);

    async function fetchPokemons(url) {
        let pokemonsWithDetail = [];
        const response = await fetch(url, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const jsonRes = await response.json();
        const pokemons = jsonRes.results;
        for (let pokemon of pokemons) {
            const detailsResponse = await fetch(pokemon.url, {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const detailsJson = await detailsResponse.json();
            pokemonsWithDetail.push({
                name: capitalize(pokemon.name),
                height: detailsJson.height,
                weight: detailsJson.weight,
                types: detailsJson.types.map((entity) => entity.type.name)
            });
        }
        return pokemonsWithDetail;
    }

    return (
        <div className="body-wrapper">
            <Container>
                <section className="pt-5 d-flex flex-wrap justify-content-between">
                    {pokemons.map((pokemon) => {
                        return <PokemonCard key={pokemon.name} name={pokemon.name} weight={pokemon.weight} height={pokemon.height} type={pokemon.types} />
                    })}
                </section>
            </Container>
        </div>
    );
};