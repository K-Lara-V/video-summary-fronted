const BACKEND_URL = "http://localhost:8000/upload/";

async function procesarVideo() {
  const input = document.getElementById("videoInput");
  const file = input.files[0];

  if (!file) {
    alert("Por favor selecciona un archivo de video.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  document.getElementById("output").innerText = "Procesando...";

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Error al procesar el video.");
    }

    const data = await response.json();

    let textoResultado = "";

    if (data.transcription) {
      textoResultado += `Transcripción:\n${data.transcription}\n\n`;
    }

    if (data.summary) {
      textoResultado += `Resumen:\n${data.summary}`;
    }

    document.getElementById("output").innerText = textoResultado;
  } catch (error) {
    console.error(error);
    document.getElementById("output").innerText = "Ocurrió un error al procesar el video.";
  }
}
