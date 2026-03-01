import { useEffect, useState } from 'react';
import PokemonCard from './components/PokemonCard';
import { obtenerPokemons } from './data/pokemons';

export default function App() {
  // Estado de UI para resultados, loading inicial y errores de red.
  const [pokemons, setPokemons] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Evita setState si el componente se desmonta antes de terminar fetch.
    let isMounted = true;

    const cargarPokemons = async () => {
      try {
        const resultado = await obtenerPokemons();
        if (isMounted) {
          setPokemons(resultado);
          setError('');
        }
      } catch (error) {
        console.error('Error al cargar Pokemon:', error);
        if (isMounted) {
          setError('No se pudo cargar la informacion desde la API.');
        }
      } finally {
        if (isMounted) {
          setCargando(false);
        }
      }
    };

    cargarPokemons();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="layout">
      <h1>Pokedex en React</h1>
      <p className="subtitle">Tipo, descripcion y generacion de varios Pokemon</p>

      {cargando && <p className="subtitle">Cargando informacion desde la API...</p>}
      {error && <p className="subtitle">{error}</p>}

      {/* Render de tarjetas con los datos normalizados por src/data/pokemons.js */}
      <section className="grid" aria-label="Lista de Pokemon">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.nombre} pokemon={pokemon} />
        ))}
      </section>
    </main>
  );
}
