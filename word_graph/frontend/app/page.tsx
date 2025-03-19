"use client";
import { useState, useEffect } from 'react';

type FlashCard = {
  question: string;
  answer: string;
};

export default function Home() {
  const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [showingQuestion, setShowingQuestion] = useState<boolean>(true);
  const [selectedText, setSelectedText] = useState<string>('');
  const [buttonPosition, setButtonPosition] = useState<{ top: number; left: number } | null>(null);


  // Fetch the flashcards from the flask backend
  // Fetch flash cards from backend
  useEffect(() => {
    const fetchFlashCards = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/flashcards");
        const data = await response.json();
        setFlashCards(data);
      } catch (error) {
        console.error("Error fetching flash cards:", error);
      }
    };

    fetchFlashCards();
  }, []);

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

  // Function to handle the selected text and sent the request to backend with text
  const handleSendSelectedText = async (): Promise<void> => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/selected-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedText }),
      });
      const result = await response.json();
      console.log("Response from backend:", result);
      // Optionally clear selection or provide user feedback here
    } catch (error) {
      console.error("Error sending selected text:", error);
    }
  };
  

  // Listen for selection changes and update the displayed selected text
    useEffect(() => {
      const handleSelectionChange = (): void => {
        const selection = window.getSelection();
        const text = selection?.toString() || '';
        setSelectedText(text);
    
        if (text) {
          const range = selection!.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          console.log(rect.top, rect.right);
          // Position the button a little to the right of the selection
          setButtonPosition({
            top: rect.top,
            left: rect.right + 5,
          });
        } else {
          setButtonPosition(null);
        }
      };
    
      document.addEventListener("selectionchange", handleSelectionChange);
      return () => document.removeEventListener("selectionchange", handleSelectionChange);
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
    {buttonPosition && (
      <button
        style={{
          position: "absolute",
          top: `${buttonPosition.top}px`,
          left: `${buttonPosition.left}px`,
          zIndex: 1000,
        }}
        onClick={handleSendSelectedText}
      >
        Send
      </button>
    )}
  </div>
);

}
