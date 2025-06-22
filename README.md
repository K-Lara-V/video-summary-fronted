# Frontend - Procesador de Videos con Resumen Automático

Este es el frontend web del proyecto *"Procesador de Videos con Resumen Automático"*, desarrollado con HTML, CSS y JavaScript puro. Permite a los usuarios subir un archivo de video, enviarlo al backend y obtener una transcripción y un resumen automático.

---

## Funcionalidades

- Carga de archivos de video desde el navegador
- Visualización de transcripción generada
- Visualización del resumen automático
- Botones para descargar ambos resultados en archivos .txt
- Indicador de procesamiento (barra de carga textual)
- Interfaz amigable con íconos y estilo responsivo (Bootstrap)

---

## Requisitos

- Un navegador moderno (Chrome, Firefox, Edge, etc.)
- Backend ejecutándose en http://localhost:8000  
  (Ver: [video-summary-backend](https://github.com/tuusuario/video-summary-backend))

---

## Cómo ejecutar el frontend

### Opción 1: Abrir directamente

1. Abre el archivo index.html con doble clic.
2. Cargará en el navegador automáticamente.

> ⚠ Algunas versiones de navegador bloquean fetch() desde file://. Si te da error, usa la opción 2.

---

### Opción 2: Usar servidor local (recomendado)

#### Con Python (3.x):
```bash
python -m http.server 8001

#Para correr el programa
http://127.0.0.1:8001/