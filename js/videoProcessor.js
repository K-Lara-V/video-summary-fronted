// videoProcessor.js (puedes separar las funciones en este archivo para mejor testeo)

// Variables globales simuladas
let transcripcionGlobal = "Texto de prueba transcripción";
let resumenGlobal = "Texto de prueba resumen";

function descargarTxt(tipo) {
  let contenido = "";
  let nombreArchivo = "";

  if (tipo === "transcripcion") {
    contenido = transcripcionGlobal;
    nombreArchivo = "transcripcion.txt";
  } else if (tipo === "resumen") {
    contenido = resumenGlobal;
    nombreArchivo = "resumen.txt";
  } else {
    throw new Error("Tipo no válido");
  }

  return { contenido, nombreArchivo };
}

module.exports = { descargarTxt, transcripcionGlobal, resumenGlobal };
