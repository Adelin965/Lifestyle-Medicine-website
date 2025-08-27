document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quiz-form");
  const selects = form.querySelectorAll("select");
  const calcBtn = document.getElementById("calc-btn");
  let scorCalculat = false;

  // Inițial, dezactivăm butonul
  calcBtn.disabled = true;
  calcBtn.classList.add("disabled");

  // Verifică dacă toate întrebările au fost completate
  function checkCompletion() {
    if (scorCalculat) return; // Dacă scorul a fost deja calculat, nu mai verificăm

    let toateCompletate = true;
    selects.forEach(select => {
      if (select.value === "") {
        toateCompletate = false;
      }
    });

    if (toateCompletate) {
      calcBtn.disabled = false;
      calcBtn.classList.remove("disabled");
    } else {
      calcBtn.disabled = true;
      calcBtn.classList.add("disabled");
    }
  }

  // Ascultă modificările în fiecare select
  selects.forEach(select => {
    select.addEventListener("change", checkCompletion);
  });

  // Când se apasă pe butonul de calcul
  calcBtn.addEventListener("click", () => {
    if (calcBtn.disabled || scorCalculat) return;

    let total = 0;
    let count = 0;
    let output = "";

    selects.forEach(select => {
      total += parseInt(select.value);
      count++;
    });

    const average = (total / count).toFixed(2);
    output += `<div class="score-line">Scor general: <strong>${average}/5</strong></div>`;

    if (average >= 4) {
      output += "<div class='score-line'>🟢 Stil de viață excelent! Continuă așa.</div>";
    } else if (average >= 3) {
      output += "<div class='score-line'>🟡 Ai o bază bună, dar sunt aspecte de îmbunătățit.</div>";
    } else {
      output += "<div class='score-line'>🔴 E momentul să faci schimbări importante pentru sănătatea ta.</div>";
    }

    document.getElementById("score-output").innerHTML = output;
    document.getElementById("results").style.display = "block";

    // 🔒 Dezactivăm butonul definitiv
    scorCalculat = true;
    calcBtn.disabled = true;
    calcBtn.classList.add("disabled");
  });
});
