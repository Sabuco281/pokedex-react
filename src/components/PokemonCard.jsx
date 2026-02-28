// Componente presentacional: muestra la informacion de un Pokemon.
export default function PokemonCard({ pokemon }) {
  // Usa el primer tipo como referencia visual cuando hay combinaciones (ej. "Planta / Veneno").
  const typeKey = pokemon.tipo.split('/')[0].trim().toLowerCase();

  const typeClassByKey = {
    agua: 'tag--agua',
    fuego: 'tag--fuego',
    planta: 'tag--planta',
    veneno: 'tag--veneno',
    lucha: 'tag--lucha',
    acero: 'tag--acero',
    dragon: 'tag--dragon',
    fantasma: 'tag--fantasma'
  };

  const typeClass = typeClassByKey[typeKey] ?? 'tag--default';

  return (
    <article className="card">
      <h2>{pokemon.nombre}</h2>
      <div className={`tag ${typeClass}`}>{pokemon.tipo}</div>
      <p>{pokemon.descripcion}</p>
      <p className="meta">{pokemon.generacion}</p>
    </article>
  );
}
