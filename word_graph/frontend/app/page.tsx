"use client";
import { useState, useEffect } from 'react';

type FlashCard = {
  question: string;
  answer: string;
};

const flashCards: FlashCard[] = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 2 + 2?", answer: "4" },
  { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
];

export default function Home() {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [showingQuestion, setShowingQuestion] = useState<boolean>(true);
  const [selectedText, setSelectedText] = useState<string>('');

  // Check if any text is selected
  const isTextSelected = (): boolean => {
    const selection = window.getSelection();
    return selection ? selection.toString().length > 0 : false;
  };
  

  // Handle flipping the card (switch between question and answer)
  const handleFlip = (): void => {
    if (isTextSelected()) return;
    setShowingQuestion((prev) => !prev);
  };

  // Handle going to the next card
  const handleNext = (): void => {
    if (isTextSelected()) return;
    setCurrentCardIndex((prev) => (prev + 1) % flashCards.length);
    setShowingQuestion(true);
  };

  // Listen for selection changes and update the displayed selected text
  useEffect(() => {
    const handleSelectionChange = (): void => {
      const text = window.getSelection()?.toString() || '';
      setSelectedText(text);
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);

  const currentCard: FlashCard = flashCards[currentCardIndex];
  const cardContent: string = flashCards.length
    ? showingQuestion
      ? currentCard.question
      : currentCard.answer
    : "No cards available.";

  return (
    <div className="container">
      <div id="flash-card" className="card" onClick={handleFlip}>
        <div id="card-content">{cardContent}</div>
      </div>
      <div className="buttons">
        <button id="flip-btn" onClick={handleFlip}>Flip</button>
        <button id="next-btn" onClick={handleNext}>Next</button>
      </div>
      <div id="selected-text">
        {selectedText && `You selected: ${selectedText}`}
      </div>
    </div>
  );
}
