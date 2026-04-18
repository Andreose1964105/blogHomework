let processChart = null;

function generateRademacher() {
  return Math.random() < 0.5 ? -1 : 1;
}

function simulateBrownianPath(n, T) {
  const times = [0];
  const brownian = [0];
  let partialSum = 0;
  let plusCount = 0;
  let minusCount = 0;

  for (let k = 1; k <= n; k++) {
    const step = generateRademacher();
    partialSum += step;

    if (step === 1) {
      plusCount++;
    } else {
      minusCount++;
    }

    times.push(parseFloat(((k * T) / n).toFixed(2)));
    brownian.push(partialSum / Math.sqrt(n));
  }

  return {
    times,
    brownian,
    plusCount,
    minusCount
  };
}

function buildABMAndGBM(times, brownian, mu, sigma, s0) {
  const abm = [];
  const gbm = [];

  for (let i = 0; i < times.length; i++) {
    const t = times[i];
    const w = brownian[i];

    const abmValue = mu * t + sigma * w;
    const gbmValue = s0 * Math.exp((mu - 0.5 * sigma * sigma) * t + sigma * w);

    abm.push(abmValue);
    gbm.push(gbmValue);
  }

  return { abm, gbm };
}

function simulateProcesses() {
  const n = parseInt(document.getElementById("nSteps").value);
  const T = parseFloat(document.getElementById("timeHorizon").value);
  const mu = parseFloat(document.getElementById("muValue").value);
  const sigma = parseFloat(document.getElementById("sigmaValue").value);
  const s0 = parseFloat(document.getElementById("s0Value").value);

  if (
    isNaN(n) || isNaN(T) || isNaN(mu) || isNaN(sigma) || isNaN(s0) ||
    n <= 0 || T <= 0 || sigma <= 0 || s0 <= 0
  ) {
    alert("Inserisci valori validi per n, T, μ, σ e S0.");
    return;
  }

  const brownianResult = simulateBrownianPath(n, T);
  const processResult = buildABMAndGBM(
    brownianResult.times,
    brownianResult.brownian,
    mu,
    sigma,
    s0
  );

  updateResults(n, T, mu, sigma, s0, brownianResult, processResult);
  updateChart(brownianResult.times, processResult.abm, processResult.gbm);
}

function simulateLargeN() {
  document.getElementById("nSteps").value = 1000;
  simulateProcesses();
}

function updateResults(n, T, mu, sigma, s0, brownianResult, processResult) {
  document.getElementById("outN").textContent = n;
  document.getElementById("outT").textContent = T.toFixed(2);
  document.getElementById("outMu").textContent = mu.toFixed(2);
  document.getElementById("outSigma").textContent = sigma.toFixed(2);
  document.getElementById("outS0").textContent = s0.toFixed(2);

  document.getElementById("finalABM").textContent =
    processResult.abm[processResult.abm.length - 1].toFixed(4);

  document.getElementById("finalGBM").textContent =
    processResult.gbm[processResult.gbm.length - 1].toFixed(4);

  document.getElementById("plusCount").textContent = brownianResult.plusCount;
  document.getElementById("minusCount").textContent = brownianResult.minusCount;
}

function updateChart(times, abmValues, gbmValues) {
  const canvas = document.getElementById("processChart");
  if (!canvas) return;

  if (typeof Chart === "undefined") {
    console.error("Chart.js non è stato caricato.");
    return;
  }

  const ctx = canvas.getContext("2d");

  if (processChart) {
    processChart.destroy();
  }

  processChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: times,
      datasets: [
        {
          label: "ABM",
          data: abmValues,
          borderColor: "#51b84d",
          backgroundColor: "transparent",
          tension: 0,
          borderWidth: 2,
          pointRadius: 0
        },
        {
          label: "GBM",
          data: gbmValues,
          borderColor: "#1f3c88",
          backgroundColor: "transparent",
          tension: 0,
          borderWidth: 2,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          labels: {
            font: {
              size: 14
            }
          }
        },
        title: {
          display: true,
          text: "Simulazione di ABM e GBM su [0, T]",
          font: {
            size: 18,
            weight: "bold"
          }
        }
      },
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 10,
            callback: function(value) {
              const label = this.getLabelForValue(value);
              return Number(label).toFixed(2);
            }
          },
          title: {
            display: true,
            text: "Tempo"
          }
        },
        y: {
          title: {
            display: true,
            text: "Valore del processo"
          }
        }
      }
    }
  });
}

function resetChart() {
  if (processChart) {
    processChart.destroy();
    processChart = null;
  }

  document.getElementById("outN").textContent = "-";
  document.getElementById("outT").textContent = "-";
  document.getElementById("outMu").textContent = "-";
  document.getElementById("outSigma").textContent = "-";
  document.getElementById("outS0").textContent = "-";
  document.getElementById("finalABM").textContent = "-";
  document.getElementById("finalGBM").textContent = "-";
  document.getElementById("plusCount").textContent = "-";
  document.getElementById("minusCount").textContent = "-";
}

window.onload = function () {
  simulateProcesses();
};
