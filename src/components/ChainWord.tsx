import { useState, useRef, useEffect } from "react";

interface ChainWordProps {
  word: string;
  word_index: number;
  letters_revealed?: number; // Optional number of revealed letters
  onGuessSubmit?: (guess: string, index: number) => void;
}

const ChainWord = ({
  word,
  word_index,
  onGuessSubmit,
  letters_revealed = 0,
}: ChainWordProps) => {
  const inputCount = word ? word.length : 6; // If a word exists, use its length; otherwise, default to 6 OTP boxes
  const [values, setValues] = useState<string[]>(Array(inputCount).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(inputCount).fill(null)
  );

  useEffect(() => {
    //for x letters revealed, set the first x letters of the word
    if (word) {
      const newValues = word
        .split("")
        .map((letter, index) => (index < letters_revealed ? letter : ""));
      setValues(newValues);
    }
  }, [word, letters_revealed]);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValues = [...values];
    newValues[index] = event.target.value.slice(-1); // Only allow one character
    setValues(newValues);

    if (event.target.value && index < inputCount - 1) {
      inputRefs.current[index + 1]?.focus(); // Move focus to next box
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Move focus back on delete
    }

    if (event.key === "Enter" && index === inputCount - 1)
      if (onGuessSubmit) onGuessSubmit(values.join(""), word_index);
  };

  return (
    <div className='word-display'>
      {Array.from({ length: inputCount }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          disabled={index < letters_revealed}
          type='text'
          maxLength={1}
          value={values[index]}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className={
            "letter-box " + (index < letters_revealed ? "correct" : "")
          }
        />
      ))}
    </div>
  );
};

export default ChainWord;
