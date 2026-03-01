const TOTAL_POKEMON_DISPONIBLES = 1025;
const CANTIDAD_POKEMONS = 6;

// Traduccion parcial para mostrar tipos comunes en espanol.
const traduccionTipos = {
  water: 'Agua',
  fire: 'Fuego',
  grass: 'Planta',
  poison: 'Veneno',
  fighting: 'Lucha',
  steel: 'Acero',
  dragon: 'Dragon',
  ghost: 'Fantasma'
};

const generacionRomana = {
  'generation-i': 'I',
  'generation-ii': 'II',
  'generation-iii': 'III',
  'generation-iv': 'IV',
  'generation-v': 'V',
  'generation-vi': 'VI',
  'generation-vii': 'VII',
  'generation-viii': 'VIII',
  'generation-ix': 'IX'
};

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function limpiarTexto(texto) {
  return texto.replace(/[\n\f]/g, ' ');
}

function obtenerDescripcion(entries) {
  // Priorizamos descripcion en espanol; si no existe, usamos ingles.
  const entradaEs = entries.find((entry) => entry.language.name === 'es');
  if (entradaEs) return limpiarTexto(entradaEs.flavor_text);

  const entradaEn = entries.find((entry) => entry.language.name === 'en');
  if (entradaEn) return limpiarTexto(entradaEn.flavor_text);

  return 'Sin descripcion disponible.';
}

async function obtenerPokemon(nombre) {
  // Hacemos ambas consultas en paralelo para reducir tiempo total.
  const [pokemonResponse, speciesResponse] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${nombre}`)
  ]);

  if (!pokemonResponse.ok || !speciesResponse.ok) {
    throw new Error(`No se pudo obtener ${nombre}`);
  }

  const pokemonData = await pokemonResponse.json();
  const speciesData = await speciesResponse.json();

  // Respetamos orden de tipos segun "slot" (primario/secundario).
  const tipo = pokemonData.types
    .sort((a, b) => a.slot - b.slot)
    .map((item) => traduccionTipos[item.type.name] ?? capitalizar(item.type.name))
    .join(' / ');

  const imagen =
    pokemonData.sprites?.other?.['official-artwork']?.front_default ??
    pokemonData.sprites?.front_default ??
    '';

  const descripcion = obtenerDescripcion(speciesData.flavor_text_entries);
  const generacion = `Generacion ${generacionRomana[speciesData.generation.name] ?? '?'}`;

  return {
    nombre: capitalizar(pokemonData.name),
    tipo,
    descripcion,
    generacion,
    imagen
  };
}

function generarIdsUnicos(cantidad, maximo) {
  const ids = new Set();

  while (ids.size < cantidad) {
    const id = Math.floor(Math.random() * maximo) + 1;
    ids.add(id);
  }

  return [...ids];
}

export async function obtenerPokemons() {
  // Cada recarga pide IDs aleatorios para evitar resultados fijos.
  const idsAleatorios = generarIdsUnicos(CANTIDAD_POKEMONS, TOTAL_POKEMON_DISPONIBLES);
  return Promise.all(idsAleatorios.map(obtenerPokemon));
}
