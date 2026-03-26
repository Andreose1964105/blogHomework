function generaRandomWalk() {
  const steps = parseInt(document.getElementById("steps").value);
  const startValue = parseInt(document.getElementById("startValue").value);

  let valori = [startValue];
  let x = startValue;

  for (let i = 1; i <= steps; i++) {
    const salto = Math.random() < 0.5 ? -1 : 1;
    x = x + salto;
    valori.push(x);
  }

  document.getElementById("valoreIniziale").textContent = startValue;
  document.getElementById("valoreFinale").textContent = x;
  document.getElementById("numeroPassi").textContent = steps;

  disegnaGrafico(valori);
}

function disegnaGrafico(valori) {
  const canvas = document.getElementById("graficoRandomWalk");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 40;
  const width = canvas.width - 2 * padding;
  const height = canvas.height - 2 * padding;

  const minVal = Math.min(...valori);
  const maxVal = Math.max(...valori);

  function scaleX(i) {
    return padding + (i / (valori.length - 1)) * width;
  }

  function scaleY(val) {
    return padding + height - ((val - minVal) / (maxVal - minVal || 1)) * height;
  }

  ctx.beginPath();
  ctx.strokeStyle = "#cccccc";
  ctx.lineWidth = 1;

  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, padding + height);
  ctx.lineTo(padding + width, padding + height);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "#2d6cdf";
  ctx.lineWidth = 2;

  for (let i = 0; i < valori.length; i++) {
    const x = scaleX(i);
    const y = scaleY(valori[i]);

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
}

window.onload = generaRandomWalk;
