document.querySelectorAll("[data-quiz]").forEach((quiz) => {
  const buttons = quiz.querySelectorAll("button[data-choice]");
  const feedback = quiz.querySelector("[data-feedback]");
  const answer = quiz.getAttribute("data-answer");
  const correctText = quiz.getAttribute("data-correct") || "Correct.";
  const incorrectText =
    quiz.getAttribute("data-incorrect") || "Not quite. Re-read the previous paragraph and try again.";

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const isCorrect = button.getAttribute("data-choice") === answer;

      buttons.forEach((candidate) => {
        candidate.classList.remove("correct", "incorrect");
        candidate.setAttribute("aria-pressed", "false");
      });

      button.classList.add(isCorrect ? "correct" : "incorrect");
      button.setAttribute("aria-pressed", "true");

      if (feedback) {
        feedback.textContent = isCorrect ? correctText : incorrectText;
      }
    });
  });
});
