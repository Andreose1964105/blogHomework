function cambiaTesto() {
    // 1. Puntiamo agli elementi che vogliamo modificare
    const box = document.getElementById("box");
    const testo = document.getElementById("testo-dinamico");
    
    // 2. Manipolazione del contenuto (Testo e HTML)
    testo.innerHTML = "<strong>Successo!</strong> Il contenuto è stato cambiato tramite JS esterno.";
    
    // 3. Manipolazione dello stile (CSS)
    box.style.backgroundColor = "#e8f5e9"; // Un verde chiaro piacevole
    box.style.border = "2px solid #4CAF50"; // Bordo verde scuro
    box.style.padding = "30px"; // Cambiamo anche la spaziatura interna
    
    // 4. Feedback visivo sul bottone
    // Possiamo anche cambiare il testo del bottone stesso!
    const bottone = event.target; 
    bottone.innerText = "Modificato!";
    bottone.style.opacity = "0.7";
}
