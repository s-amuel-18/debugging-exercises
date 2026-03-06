/**
 * Slug Generator
 *
 * Convierte un título arbitrario en un slug URL-friendly.
 * Pasos: normalizar acentos → minúsculas → reemplazar no alfanuméricos
 * por guion → colapsar guiones consecutivos → recortar extremos.
 */

/**
 * Convierte un título en un slug URL-friendly.
 * @param {string} title
 * @returns {string}
 */
function generateSlug(title) {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')   // eliminar diacríticos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')       // reemplazar no alfanuméricos por guion
    // CORREGIDO: el cuantificador '+' colapsa uno o más guiones consecutivos
    // en un solo guion. Sin '+', solo reemplaza un guion a la vez y deja
    // los guiones adicionales intactos.
    .replace(/-+/g, '-')               // colapsar guiones consecutivos
    .replace(/^-|-$/g, '');            // eliminar guiones en extremos
}

module.exports = { generateSlug };
