// tests/videoProcessor.test.js
// Este archivo contiene pruebas unitarias para la función descargarTxt
// que genera datos de archivo de transcripción o resumen.

// Importamos la función a testear desde el archivo fuente
const { descargarTxt } = require("../js/videoProcessor");

// Suite de pruebas para la función descargarTxt
describe("Función descargarTxt", () => {
  
  // Caso: tipo "transcripcion"
  test("Debe devolver el contenido y nombre para 'transcripcion'", () => {
    const result = descargarTxt("transcripcion");

    expect(result.nombreArchivo).toBe("transcripcion.txt");     // Verifica nombre correcto
    expect(result.contenido.length).toBeGreaterThan(0);         // Verifica que el contenido no esté vacío
  });

  // Caso: tipo "resumen"
  test("Debe devolver el contenido y nombre para 'resumen'", () => {
    const result = descargarTxt("resumen");

    expect(result.nombreArchivo).toBe("resumen.txt");           // Verifica nombre correcto
    expect(result.contenido.length).toBeGreaterThan(0);         // Verifica que el contenido no esté vacío
  });

  // Caso: tipo inválido
  test("Debe lanzar error para tipo inválido", () => {
    expect(() => descargarTxt("otro")).toThrow("Tipo no válido");  // Espera que se lance un error
  });
});
