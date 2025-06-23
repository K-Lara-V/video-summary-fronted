// URL del backend para subir y procesar el video
const BACKEND_URL = "http://localhost:8000/upload/";

// Variables globales para almacenar los textos recibidos del backend
let transcripcionGlobal = "";
let resumenGlobal = "";

// Referencias a elementos DOM
const videoInput = document.getElementById("videoInput");
const dropArea = document.getElementById("dropArea");
const previewVideo = document.getElementById("previewVideo");
const fileInfo = document.getElementById("fileInfo");
const botonSubir = document.getElementById("botonSubir");

// -------------------------------------------------------------
// 1. Manejo de selección de archivo por input tradicional
// -------------------------------------------------------------
videoInput.addEventListener("change", () => {
  const file = videoInput.files[0];

  if (file) {
    // Mostrar nombre y tamaño del video
    document.getElementById("videoName").innerText = file.name;
    document.getElementById("videoSize").innerText = `${(file.size / 1048576).toFixed(2)} MB`;

    // Mostrar info del archivo seleccionado
    fileInfo.style.display = "block";

    // Ocultar área de selección (dropArea)
    dropArea.style.display = "none";

    // Crear URL temporal para mostrar el video en miniatura
    const url = URL.createObjectURL(file);

    // Configurar y mostrar el video en miniatura
    previewVideo.src = url;
    previewVideo.muted = true;
    previewVideo.playsInline = true;
    previewVideo.autoplay = false;

    // Avanzar al segundo 1 para capturar un frame como miniatura (si el video dura más de 1 segundo)
    previewVideo.addEventListener("loadedmetadata", () => {
      if (previewVideo.duration > 1) {
        previewVideo.currentTime = 1;
      }
    });

    // Pausar el video tras actualizar el tiempo para mostrar solo un frame fijo
    previewVideo.addEventListener("timeupdate", function pauseOnce() {
      previewVideo.pause();
      previewVideo.removeEventListener("timeupdate", pauseOnce);
    });
  }
});

// -------------------------------------------------------------
// 2. Manejo Drag & Drop para subir archivo
// -------------------------------------------------------------
// Evitar comportamiento por defecto y propagación en eventos de drag & drop
["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
  dropArea.addEventListener(eventName, e => {
    e.preventDefault();
    e.stopPropagation();
  }, false);
});

// Añadir clase visual al área cuando arrastran un archivo
["dragenter", "dragover"].forEach(eventName => {
  dropArea.addEventListener(eventName, () => {
    dropArea.classList.add("border-info", "bg-light");
  }, false);
});

// Remover clase visual cuando dejan de arrastrar o sueltan el archivo
["dragleave", "drop"].forEach(eventName => {
  dropArea.addEventListener(eventName, () => {
    dropArea.classList.remove("border-info", "bg-light");
  }, false);
});

// Cuando sueltan un archivo dentro del área, asignarlo al input y disparar evento change
dropArea.addEventListener("drop", e => {
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    videoInput.files = files;
    videoInput.dispatchEvent(new Event("change"));
  }
});

// Permitir clic en el área para abrir el selector de archivos
dropArea.addEventListener("click", () => {
  videoInput.click();
});

// -------------------------------------------------------------
// 3. Función para procesar el video: subirlo al backend y mostrar resultados
// -------------------------------------------------------------
async function procesarVideo() {
  const file = videoInput.files[0];

  if (!file) {
    // Mostrar alerta si no hay archivo seleccionado
    const alerta = document.getElementById("alertaArchivo");
    alerta.style.display = "block";
    alerta.innerText = "⚠️ Por favor, selecciona un archivo de video antes de continuar.";
    return;
  } else {
    // Ocultar alerta si el archivo está seleccionado
    document.getElementById("alertaArchivo").style.display = "none";
  }

  // Preparar FormData para enviar el archivo
  const formData = new FormData();
  formData.append("file", file);

  // Mostrar loader y ocultar mensajes previos
  document.getElementById("loader").style.display = "block";
  document.getElementById("error").style.display = "none";
  document.getElementById("success").style.display = "none";
  document.getElementById("resultado").style.display = "none";

  try {
    // Enviar archivo al backend
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Error al procesar el video.");

    // Parsear JSON con transcripción y resumen
    const data = await response.json();

    transcripcionGlobal = data.transcription || "No disponible.";
    resumenGlobal = data.summary || "No disponible.";

    // Mostrar resultados en textarea
    document.getElementById("transcripcionOutput").value = transcripcionGlobal;
    document.getElementById("resumenOutput").value = resumenGlobal;

    // Mostrar mensaje de éxito y resultados
    document.getElementById("loader").style.display = "none";
    document.getElementById("error").style.display = "none";
    document.getElementById("success").style.display = "block";
    document.getElementById("resultado").style.display = "block";

    // Ocultar botón de subir y área de selección para evitar nuevas cargas
    botonSubir.style.display = "none";
    dropArea.style.display = "none";
  } catch (error) {
    console.error(error);

    // Mostrar error y ocultar loader y mensaje de éxito
    document.getElementById("loader").style.display = "none";
    document.getElementById("error").style.display = "block";
    document.getElementById("success").style.display = "none";
  }
}

// -------------------------------------------------------------
// 4. Función para descargar texto (transcripción o resumen)
// -------------------------------------------------------------
function descargarTxt(tipo) {
  let contenido = "";
  let nombreArchivo = "";

  if (tipo === "transcripcion") {
    contenido = transcripcionGlobal;
    nombreArchivo = "transcripcion.txt";
  } else if (tipo === "resumen") {
    contenido = resumenGlobal;
    nombreArchivo = "resumen.txt";
  }

  // Crear blob de texto y simular clic para descargar
  const blob = new Blob([contenido], { type: "text/plain" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = nombreArchivo;
  enlace.click();
}
