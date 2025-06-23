# Frontend - Procesador de Videos con Resumen Automático

Este es el frontend web del proyecto **"Procesador de Videos con Resumen Automático"**, desarrollado con HTML, CSS y JavaScript puro. Permite a los usuarios subir un video, enviarlo al backend, y recibir automáticamente una transcripción y un resumen del contenido.

---

## Funcionalidades

- Subida de archivos de video desde el navegador
- Visualización de la transcripción generada por el backend
- Visualización del resumen automático
- Descarga de la transcripción y el resumen en formato `.txt`
- Indicador de procesamiento en tiempo real
- Interfaz amigable, responsiva y estilizada con Bootstrap e íconos SVG

---

## Requisitos

- Navegador moderno (Chrome, Firefox, Edge, etc.)
- Node.js (para ejecutar pruebas)
- Backend activo en `http://localhost:8000`  
  ➤ Ver: [video-summary-backend](https://github.com/tuusuario/video-summary-backend)

---

## Cómo ejecutar el frontend

### Opción 1: Con servidor Python (recomendado para desarrollo rápido)

```bash
cd index
python -m http.server 8001

## Luego abre:
http://127.0.0.1:8001

##Ejecutar las pruebas:
npm install
npm test
