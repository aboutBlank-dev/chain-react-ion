import { useEffect, useRef, useState } from "react";
import ChainWord from "./ChainWord";

type ChainReactionGameProps = {
  words: string[];
};

const ChainReactionGame = ({ words }: ChainReactionGameProps) => {
  const [lettersRevealed, setLettersRevealed] = useState<number[]>([]);
  const [inputWords, setInputWords] = useState<number[]>([]);

  const leftOverWords = useRef(words.length - 2);

  useEffect(() => {
    leftOverWords.current = words.length - 2;

    const newLettersRevealed = words.map((word, index) => {
      //Fully reveal first and last word
      if (index === 0 || index === words.length - 1) {
        return word.length;
        //reveal first letter of second and penultimate word
      } else if (index === 1 || index === words.length - 2) {
        return 1;
        //fully hide all other words
      } else {
        return 0;
      }
    });
    setLettersRevealed(newLettersRevealed);
    setInputWords([1, words.length - 2]);
  }, [words]);

  const handleGuess = (guess: string, index: number) => {
    if (words[index].toLowerCase() === guess.toLowerCase()) {
      //fully reveal guessed word
      const newLettersRevealed = [...lettersRevealed];
      newLettersRevealed[index] = words[index].length;

      leftOverWords.current -= 1;
      if (leftOverWords.current === 0) {
        console.log("Congratulations! You've completed the game!");
        setLettersRevealed(newLettersRevealed);
        return;
      }

      if (inputWords.indexOf(index) == 0) {
        setInputWords([inputWords[0] + 1, inputWords[1]]);
        newLettersRevealed[index + 1] = 1;
      } else {
        setInputWords([inputWords[0], inputWords[1] - 1]);
        newLettersRevealed[index - 1] = 1;
      }

      setLettersRevealed(newLettersRevealed);
    } else {
      console.log("Incorrect guess. Try again.");
    }
  };

  return (
    <div className='chain-reaction-game'>
      {words.map((word, index) => (
        <ChainWord
          key={word}
          word={word}
          word_index={index}
          letters_revealed={lettersRevealed[index]}
          onGuessSubmit={handleGuess}
        />
      ))}
    </div>
  );
};

export default ChainReactionGame;
