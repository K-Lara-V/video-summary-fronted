//  videoProcessor.js
// Este módulo contiene funciones reutilizables para manejar transcripción y resumen de videos.
// Está diseñado para facilitar el testeo unitario con Jest.

//  Variables globales simuladas para pruebas
let transcripcionGlobal = "Texto de prueba transcripción";
let resumenGlobal = "Texto de prueba resumen";

//  Función para generar archivo .txt con contenido de transcripción o resumen
function descargarTxt(tipo) {
  let contenido = "";
  let nombreArchivo = "";

  // Selección del contenido según el tipo recibido
  if (tipo === "transcripcion") {
    contenido = transcripcionGlobal;
    nombreArchivo = "transcripcion.txt";

  } else if (tipo === "resumen") {
    contenido = resumenGlobal;
    nombreArchivo = "resumen.txt";

  } else {
    // Si el tipo no es válido, lanza un error para testeo
    throw new Error("Tipo no válido");
  }

  // Devuelve un objeto con el contenido y el nombre del archivo
  return { contenido, nombreArchivo };
}

//  Exportación para pruebas con Jest u otras integraciones
module.exports = {
  descargarTxt,
  transcripcionGlobal,
  resumenGlobal
};
