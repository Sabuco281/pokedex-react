# Pokedex en React

Aplicacion web hecha con React y Vite para mostrar una pokedex simple consumiendo datos en tiempo real desde PokeAPI.

## Estado actual (2026-03-01)

- Muestra 6 Pokemon aleatorios y unicos en cada carga.
- Cada tarjeta muestra imagen, nombre, tipo, descripcion y generacion.
- Al refrescar la pagina, aparecen Pokemon distintos.
- Los datos ya no vienen de un dataset fijo: se consultan por API.

## Tecnologias

- React 18
- Vite 5
- CSS puro
- PokeAPI (servicio externo)

## Scripts

- `npm run dev`: inicia el entorno de desarrollo.
- `npm run build`: genera build de produccion.
- `npm run preview`: previsualiza el build generado.

## Flujo de datos

1. `App.jsx` llama a `obtenerPokemons()` al montar el componente.
2. `obtenerPokemons()` genera 6 IDs aleatorios no repetidos.
3. Por cada ID se consultan en paralelo:
- `https://pokeapi.co/api/v2/pokemon/{id}`
- `https://pokeapi.co/api/v2/pokemon-species/{id}`
4. Se transforma la respuesta al formato de UI:
- `nombre`
- `tipo` (traducido al espanol cuando aplica)
- `descripcion` (prioriza `es`, fallback `en`)
- `generacion` (en numeros romanos)
- `imagen` (official artwork, fallback sprite basico)
5. `PokemonCard.jsx` renderiza la tarjeta y muestra placeholder si falta imagen.

## Estructura principal

- `src/App.jsx`: manejo de carga inicial, estados `cargando`, `error` y render de grilla.
- `src/components/PokemonCard.jsx`: tarjeta visual de cada Pokemon.
- `src/data/pokemons.js`: capa de acceso y transformacion de datos de PokeAPI.
- `src/styles.css`: estilos globales y estilos de tarjetas/imagenes.
- `docs/RETORNO_PROYECTO.md`: bitacora detallada para retomar el proyecto.

## Parametros rapidos a modificar

- Cantidad de tarjetas:
- Editar `CANTIDAD_POKEMONS` en `src/data/pokemons.js`.
- Rango maximo de IDs:
- Editar `TOTAL_POKEMON_DISPONIBLES` en `src/data/pokemons.js`.
- Tipos traducidos:
- Editar `traduccionTipos` en `src/data/pokemons.js`.

## Notas operativas

- Si PokeAPI falla, la app muestra mensaje de error y no rompe UI.
- Si no hay artwork oficial, se usa `sprites.front_default`.
- El build de produccion fue validado despues de los cambios.
