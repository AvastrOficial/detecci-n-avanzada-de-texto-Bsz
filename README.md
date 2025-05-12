# Deteccion Avanzada De Texto Bsz

> Sistema web que permite detectar si un texto fue generado por una inteligencia artificial, con una precisión simulada del **93%**. Permite analizar hasta **4096 caracteres** de forma gratuita.
> Api Utilizado : ```html https://zerogpt.net/es/api-integration```
---

## 📂 Estructura HTML (Interfaz de usuario)

```html
<header>
  <h1>Detección de IA - BSZ</h1>
</header>

<div class="container">
  <p>Este sistema detecta textos generados por IA con una precisión del 93% y permite analizar hasta 4096 caracteres de forma gratuita.</p>

  <textarea id="inputText" placeholder="Pega o escribe tu texto aquí..."></textarea>

  <button onclick="analyzeText()">Analizar Texto</button>

  <div id="results"></div>
</div>
```

## Elementos :
> Título principal: Detección de IA - BSZ
> Descripción: Explicación de la función del sistema.
> Textarea: Campo para ingresar el texto (id="inputText").
> Botón: Ejecuta analyzeText() para iniciar el análisis.
> Div de resultados: Muestra los resultados (id="results").

---

## ⚙️ Lógica JavaScript (Funcionamiento)

```html
const API_URL = 'https://api.example.com/detect';
```
> URL de referencia para las solicitudes (actualmente es solo un ejemplo).

---
## 1️⃣ analyzeText() — Función principal
> Obtiene el texto desde el textarea.
> Si el campo está vacío, muestra una alerta.
> Muestra el mensaje 
```html
 "Analizando..." 
```
> en la sección de resultados.

```html
fakeApiResponse()
```
> para simular la respuesta de API.
> Si recibe respuesta correcta, llama a displayResults() para mostrar los datos.
> Si ocurre un error, muestra un mensaje rojo.
```html
function analyzeText() {
  const text = document.getElementById('inputText').value;
  const resultsDiv = document.getElementById('results');

  if (!text.trim()) {
    alert('Por favor, ingresa un texto para analizar.');
    return;
  }

  resultsDiv.innerHTML = 'Analizando... 🔍';

  fakeApiResponse(text)
    .then(data => displayResults(data))
    .catch(() => {
      resultsDiv.innerHTML = '<span style="color: red;">Error al analizar el texto.</span>';
    });
}
2️⃣ displayResults(data) — Mostrar resultados
Recibe los datos simulados.
```
---
## Muestra:
> Total de caracteres
> Total de palabras
> Probabilidad de ser humano (%)
> Probabilidad de ser IA (%)
> Detalles por proveedor: DistilBERT, GLTR, Perplexity

```html
function displayResults(data) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `
    <p><strong>Total de caracteres:</strong> ${data.characterCount}</p>
    <p><strong>Total de palabras:</strong> ${data.wordCount}</p>
    <p><strong>Probabilidad de ser humano:</strong> ${data.humanProbability}%</p>
    <p><strong>Probabilidad de ser IA:</strong> ${data.aiProbability}%</p>
    <h3>Detalles por proveedor:</h3>
    <ul>
      ${data.providers.map(provider => `
        <li><strong>${provider.name}:</strong> Humano ${provider.human}% / IA ${provider.ai}%</li>
      `).join('')}
    </ul>
  `;
}
3️⃣ fakeApiResponse(text) — Simulación de API
Simula una respuesta tras 1 segundo usando setTimeout.
```
---
## Calcula:
> Longitud del texto (caracteres y palabras)
> Probabilidades simuladas (ejemplo fijo: 93% humano, 7% IA)
> Resultados de 3 modelos: DistilBERT, GLTR, Perplexity

```html
function fakeApiResponse(text) {
  return new Promise(resolve => {
    setTimeout(() => {
      const words = text.trim().split(/\s+/).length;
      resolve({
        characterCount: text.length,
        wordCount: words,
        humanProbability: 93,
        aiProbability: 7,
        providers: [
          { name: 'DistilBERT', human: 90, ai: 10 },
          { name: 'GLTR', human: 95, ai: 5 },
          { name: 'Perplexity', human: 94, ai: 6 },
        ]
      });
    }, 1000);
  });
}
```
---
## 🧩 Flujo general
> El usuario escribe o pega un texto.
> Pulsa el botón "Analizar Texto".
> Se muestra el mensaje "Analizando... 🔍".
> Se simula el análisis (1 segundo).
> Se muestran las métricas y las probabilidades, incluyendo los detalles por proveedor.



![image](https://github.com/user-attachments/assets/0f9fb879-8414-44b8-9aa1-2a390976b868)
