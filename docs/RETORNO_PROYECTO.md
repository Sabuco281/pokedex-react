# Retorno Del Proyecto

Este documento resume lo implementado, por que se hizo, y que revisar primero al retomar el proyecto.

## Objetivo alcanzado

Pasamos de una pokedex con datos locales fijos a una pokedex conectada a PokeAPI, con imagenes y contenido dinamico.

## Historial de cambios

### 1. Estado inicial

- La app mostraba una lista fija de 5 Pokemon desde `src/data/pokemons.js`.
- Cada tarjeta renderizaba nombre, tipo, descripcion y generacion.
- No habia integracion con API externa ni imagenes remotas.

### 2. Integracion de imagenes por API

- Se agrego consumo de `https://pokeapi.co/api/v2/pokemon/{nombre}`.
- Se incluyo `imagen` en cada item para renderizar artwork oficial.
- Se agrego placeholder visual cuando una imagen no esta disponible.

### 3. Migracion completa de dataset local a API

- `src/data/pokemons.js` dejo de exportar un array local.
- Ahora exporta `obtenerPokemons()` y funciones auxiliares de transformacion.
- Se incorporo una segunda consulta a `pokemon-species` para descripcion y generacion.
- `src/App.jsx` paso a usar estados de carga y error para flujo asincrono real.

### 4. Lista dinamica y aleatoria en cada refresh

- Se reemplazo la lista fija por IDs aleatorios.
- Se configuro cantidad en 6 (`CANTIDAD_POKEMONS = 6`).
- Se garantiza que no se repitan en la misma carga usando `Set`.

## Arquitectura funcional actual

1. `App.jsx` inicia carga de datos al montar.
2. `obtenerPokemons()` genera 6 IDs unicos entre `1` y `1025`.
3. Por cada ID se llaman en paralelo:
- endpoint `pokemon`
- endpoint `pokemon-species`
4. Se normaliza la respuesta para la UI.
5. `PokemonCard.jsx` renderiza tarjeta final.

## Contrato de datos de UI

Cada objeto Pokemon que consume la UI tiene:

- `nombre`: string capitalizado.
- `tipo`: string (ejemplo: `Planta / Veneno`).
- `descripcion`: string, preferencia idioma `es`.
- `generacion`: string (ejemplo: `Generacion I`).
- `imagen`: URL string o vacio.

## Archivos tocados

- `src/App.jsx`
- `src/components/PokemonCard.jsx`
- `src/data/pokemons.js`
- `src/styles.css`
- `README.md`

## Decisiones tecnicas

- Se mantuvo React sin librerias adicionales para HTTP.
- Se usa `fetch` nativo por simplicidad.
- Se usan dos endpoints para completar informacion funcional:
- `pokemon` no trae descripcion por especie.
- `pokemon-species` si trae flavor text y generacion.
- Se priorizo resiliencia con fallbacks:
- descripcion en `es` con fallback `en`.
- artwork oficial con fallback sprite basico.

## Limitaciones conocidas

- El nombre se capitaliza simple; no corrige casos especiales con guion.
- No hay boton de "recargar Pokemon" sin refrescar pagina.
- No hay cache local; cada carga consulta API.
- Si la API esta lenta, puede demorar la visualizacion inicial.

## Checklist al retomar

1. Ejecutar `npm install` y `npm run dev`.
2. Verificar que cargan 6 tarjetas distintas al refrescar.
3. Verificar que las imagenes y descripciones aparecen.
4. Probar `npm run build` antes de cambios grandes.
5. Si PokeAPI cambia volumen total, actualizar `TOTAL_POKEMON_DISPONIBLES`.

## Proximas mejoras recomendadas

1. Agregar boton `Cambiar Pokemon` para pedir nueva tanda sin refresh manual.
2. Añadir indicador visual de carga por tarjeta (skeletons).
3. Incorporar filtro por tipo y buscador por nombre.
4. Agregar pruebas de transformacion en `src/data/pokemons.js`.
