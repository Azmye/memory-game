'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Card from '@/components/card';

const cardImages = [
  { src: '/img/helmet-1.png', matched: false },
  { src: '/img/potion-1.png', matched: false },
  { src: '/img/ring-1.png', matched: false },
  { src: '/img/scroll-1.png', matched: false },
  { src: '/img/shield-1.png', matched: false },
  { src: '/img/sword-1.png', matched: false },
];

type Card = {
  id: number;
  src: string;
  matched: boolean;
};

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
    setFeedback(null);
  };

  // handling choice
  const handleChoice = (card: any) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
        setCards((prevCards: any) => {
          return prevCards.map((card: Card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choice & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  // start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  //the game when finished
  useEffect(() => {
    const checkMatched = cards.every((card) => card.matched === true);
    console.log(checkMatched);

    if (checkMatched && turns >= 6 && turns < 7) {
      setFeedback('Perfect');
    } else if (checkMatched && turns > 6 && turns < 12) {
      setFeedback('Good One!');
    } else if (checkMatched && turns > 12 && turns < 100) {
      setFeedback('Nice Try!');
    }
  }, [cards, turns]);

  return (
    <div className="flex flex-col justify-center py-5">
      <h1 className="text-center text-4xl font-bold text-white">Magic Match</h1>
      <button onClick={shuffleCards} className="border border-white w-fit mx-auto mt-5 text-white py-1 px-2 hover:bg-red-700">
        New Game
      </button>

      <div className="lg:px-96 lg:py-10 md:px-52 md:py-10 px-5 py-5 grid md:grid-cols-4 grid-cols-3 gap-5">
        {cards.map((card) => (
          <Card card={card} key={card.id} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} />
        ))}
      </div>
      <p className="text-center text-white">Turns: {turns}</p>
      {feedback && <p className="text-center text-3xl text-white">{feedback}</p>}
    </div>
  );
}
