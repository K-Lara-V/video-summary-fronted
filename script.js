const BACKEND_URL = "http://localhost:8000/upload/";

let transcripcionGlobal = "";
let resumenGlobal = "";

async function procesarVideo() {
  const input = document.getElementById("videoInput");
  const file = input.files[0];

  if (!file) {
    alert("Por favor selecciona un archivo de video.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  document.getElementById("loader").style.display = "block";
  document.getElementById("resultado").style.display = "none";

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      body: formData
    });

    if (!response.ok) throw new Error("Error al procesar el video.");

    const data = await response.json();

    transcripcionGlobal = data.transcription || "No disponible.";
    resumenGlobal = data.summary || "No disponible.";

    document.getElementById("transcripcionOutput").innerText = transcripcionGlobal;
    document.getElementById("resumenOutput").innerText = resumenGlobal;

    document.getElementById("loader").style.display = "none";
    document.getElementById("resultado").style.display = "block";
  } catch (error) {
    console.error(error);
    document.getElementById("loader").style.display = "none";
    alert("❌ Ocurrió un error al procesar el video.");
  }
}

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

  const blob = new Blob([contenido], { type: "text/plain" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = nombreArchivo;
  enlace.click();
}