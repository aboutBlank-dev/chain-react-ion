import { useEffect, useState } from "react";
import "./App.css";
import ChainReactionGame from "./components/ChainReactionGame";
import word_list from "./word_list";

function App() {
  const [wordList, setWordList] = useState<string[]>([]);
  const [inputWords, setInputWords] = useState<number[]>([]);

  useEffect(() => {
    if (wordList == null || wordList.length === 0) {
      const randomWordList =
        word_list[Math.floor(Math.random() * word_list.length)];

      setWordList(randomWordList);
    }
  }, []);

  return <ChainReactionGame words={wordList} />;
}

export default App;
