// Componente presentacional: muestra la informacion de un Pokemon.
export default function PokemonCard({ pokemon }) {
  return (
    <article className="card">
      <h2>{pokemon.nombre}</h2>
      <div className="tag">{pokemon.tipo}</div>
      <p>{pokemon.descripcion}</p>
      <p className="meta">{pokemon.generacion}</p>
    </article>
  );
}
