import PokemonCard from './components/PokemonCard';
import { pokemons } from './data/pokemons';

export default function App() {
  return (
    <main className="layout">
      <h1>Pokedex en React</h1>
      <p className="subtitle">Tipo, descripcion y generacion de varios Pokemon</p>

      {/* Recorre la lista de datos y genera una tarjeta por cada Pokemon. */}
      <section className="grid" aria-label="Lista de Pokemon">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.nombre} pokemon={pokemon} />
        ))}
      </section>
    </main>
  );
}
