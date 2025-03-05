// Array of flash card objects with questions and answers.
const flashCards = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
  ];
  
  let currentCardIndex = 0;
  let showingQuestion = true;
  
  const cardContent = document.getElementById("card-content");
  const flipBtn = document.getElementById("flip-btn");
  const nextBtn = document.getElementById("next-btn");
  const flashCard = document.getElementById("flash-card");
  
  // Display the current flash card.
  function displayCard() {
    if (flashCards.length === 0) {
      cardContent.textContent = "No cards available.";
      return;
    }
    const currentCard = flashCards[currentCardIndex];
    cardContent.textContent = showingQuestion ? currentCard.question : currentCard.answer;
  }
  
  // Function to check if text is selected
function isTextSelected() {
  return window.getSelection().toString().length > 0;
}
  // Flip between question and answer.
  flipBtn.addEventListener("click", () => {
    if (isTextSelected()) return;
    showingQuestion = !showingQuestion;
    displayCard();
  });
  
  // Move to the next flash card.
  nextBtn.addEventListener("click", () => {
    if (isTextSelected()) return;
    currentCardIndex = (currentCardIndex + 1) % flashCards.length;
    showingQuestion = true;
    displayCard();
  });
  
  // Optional: also flip the card when clicking on it.
  flashCard.addEventListener("click", () => {
    if (isTextSelected()) return;
    showingQuestion = !showingQuestion;
    displayCard();
  });

// selected text for the IQ function
  document.addEventListener('selectionchange', function() {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
        // Call your custom function with the selected text
        handleSelection(selectedText);
    }
});

function handleSelection(selectedText) {
    // For example, display the selected text in a div
    document.getElementById('selected-text').innerText = 'You selected: ' + selectedText;
}

  // Initialize with the first card if available.
  if (flashCards.length > 0) {
    displayCard();
  }
  