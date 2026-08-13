// Datos ficticios — solo para la demo del taller
const partidos = [
  { hora: "20:00", liga: "Liga Local", local: "Tigres FC", visitante: "Halcones", cuotas: [2.10, 3.25, 3.40] },
  { hora: "20:30", liga: "Copa Regional", local: "Cóndores", visitante: "Lobos Norte", cuotas: [1.85, 3.60, 4.20] },
  { hora: "21:00", liga: "Liga Local", local: "Estrella Azul", visitante: "Puma City", cuotas: [2.55, 3.10, 2.70] },
  { hora: "21:45", liga: "Liga Juvenil", local: "Río Verde", visitante: "Atlético Sur", cuotas: [1.95, 3.35, 3.90] },
];

const boardList = document.getElementById("boardList");
const matchCount = document.getElementById("matchCount");
const slipCount = document.getElementById("slipCount");
const tickerTrack = document.getElementById("tickerTrack");

let seleccionadas = 0;

function iniciales(nombre) {
  return nombre.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase();
}

function crearFila(partido) {
  const fila = document.createElement("div");
  fila.className = "match-row";

  fila.innerHTML = `
    <div class="match-row__time">
      HOY<span>${partido.hora}</span>
    </div>
    <div class="match-row__teams">
      <span class="match-row__league">${partido.liga}</span>
      <div class="team"><span class="team__crest">${iniciales(partido.local)}</span>${partido.local}</div>
      <div class="team"><span class="team__crest">${iniciales(partido.visitante)}</span>${partido.visitante}</div>
    </div>
    <div class="odds">
      <button data-label="1"><span>Local</span><strong>${partido.cuotas[0].toFixed(2)}</strong></button>
      <button data-label="X"><span>Empate</span><strong>${partido.cuotas[1].toFixed(2)}</strong></button>
      <button data-label="2"><span>Visitante</span><strong>${partido.cuotas[2].toFixed(2)}</strong></button>
    </div>
  `;

  fila.querySelectorAll(".odds button").forEach(btn => {
    btn.addEventListener("click", () => {
      const yaEstaba = btn.classList.contains("selected");
      btn.classList.toggle("selected");
      seleccionadas += yaEstaba ? -1 : 1;
      slipCount.textContent = seleccionadas;
    });
  });

  return fila;
}

function pintarTablero() {
  partidos.forEach(p => boardList.appendChild(crearFila(p)));
  matchCount.textContent = `${partidos.length} partidos`;
}

function pintarTicker() {
  const items = partidos.map(p => {
    const sube = Math.random() > 0.5;
    return `<span class="${sube ? "up" : ""}">${p.local} vs ${p.visitante} · 1 <b>${p.cuotas[0].toFixed(2)}</b> · X <b>${p.cuotas[1].toFixed(2)}</b> · 2 <b>${p.cuotas[2].toFixed(2)}</b></span>`;
  }).join("");
  // se duplica el contenido para que el scroll continuo no deje espacios en blanco
  tickerTrack.innerHTML = items + items;
}

function activarBotonesCopiar() {
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const texto = btn.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(texto);
        const original = btn.textContent;
        btn.textContent = "copiado";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove("copied");
        }, 1500);
      } catch (e) {
        console.error("No se pudo copiar:", e);
      }
    });
  });
}

pintarTablero();
pintarTicker();
activarBotonesCopiar();
