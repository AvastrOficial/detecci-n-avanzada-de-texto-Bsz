// URL de la API (coloca aquí tu endpoint real si lo tienes)
const API_URL = 'https://api.example.com/detect';

async function analyzeText() {
  const text = document.getElementById('inputText').value;
  const resultsDiv = document.getElementById('results');
  
  if (!text.trim()) {
    alert('Por favor, ingresa un texto para analizar.');
    return;
  }

  resultsDiv.innerHTML = '<p>Analizando... 🔍</p>';

  try {
    // Simulación de solicitud a la API (reemplaza esto por fetch real)
    const response = await fakeApiResponse(text);
    displayResults(response);

  } catch (error) {
    resultsDiv.innerHTML = '<p style="color:red;">Ocurrió un error al analizar el texto.</p>';
  }
}

function displayResults(data) {
  const resultsDiv = document.getElementById('results');
  const output = data.data.output;

  let html = `<h3>Resultados:</h3>`;
  html += `<div class="result-block"><strong>Total de caracteres:</strong> ${output.input.count_chars}</div>`;
  html += `<div class="result-block"><strong>Total de palabras:</strong> ${output.input.count_words}</div>`;
  html += `<div class="result-block"><strong>Probabilidad de ser humano:</strong> ${(output.probability_real * 100).toFixed(2)}%</div>`;
  html += `<div class="result-block"><strong>Probabilidad de ser IA:</strong> ${(output.probability_fake * 100).toFixed(2)}%</div>`;

  html += `<h4>Detalles por proveedor:</h4>`;
  output.batches[0].providers.forEach(provider => {
    html += `<div class="result-block">
      <strong>${provider.name}</strong><br>
      Prob. humano: ${(provider.probability_real * 100).toFixed(2)}%<br>
      Prob. IA: ${(provider.probability_fake * 100).toFixed(2)}%
    </div>`;
  });

  resultsDiv.innerHTML = html;
}

// Simulación de API (para pruebas sin servidor real)
function fakeApiResponse(text) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        "data": {
          "output": {
            "input": {
              "count_chars": text.length,
              "count_words": text.split(/\s+/).length
            },
            "probability_real": 0.93,
            "probability_fake": 0.07,
            "batches": [
              {
                "providers": [
                  { "name": "DistilBERT", "probability_real": 0.95, "probability_fake": 0.05 },
                  { "name": "GLTR", "probability_real": 0.92, "probability_fake": 0.08 },
                  { "name": "Perplexity", "probability_real": 0.91, "probability_fake": 0.09 }
                ]
              }
            ]
          }
        }
      });
    }, 1000);
  });
}
