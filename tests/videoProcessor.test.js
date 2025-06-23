const { descargarTxt } = require("../js/videoProcessor");

describe("Función descargarTxt", () => {
  test("Debe devolver el contenido y nombre para 'transcripcion'", () => {
    const result = descargarTxt("transcripcion");
    expect(result.nombreArchivo).toBe("transcripcion.txt");
    expect(result.contenido.length).toBeGreaterThan(0);
  });

  test("Debe devolver el contenido y nombre para 'resumen'", () => {
    const result = descargarTxt("resumen");
    expect(result.nombreArchivo).toBe("resumen.txt");
    expect(result.contenido.length).toBeGreaterThan(0);
  });

  test("Debe lanzar error para tipo inválido", () => {
    expect(() => descargarTxt("otro")).toThrow("Tipo no válido");
  });
});
