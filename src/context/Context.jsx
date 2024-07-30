import { createContext, useState } from "react";
import run from "../config/madcoder";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState();
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setShowResult(""); //1st result data will reset, previous data will be removed
    setLoading(true); //2nd fetch the data form database here need some time so that loading is true
    setShowResult(true); //3rd result will be show when it loaded done

    let response;

    if (prompt !== undefined) {
      setRecentPrompt(prompt);
      response = await run(prompt);
    } else {
      setRecentPrompt(input); //when show result true then display the prompt in result page

      setPreviousPrompt((prev) => [...prev, input]); //store here all previous prompt and current input data also

      response = await run(input); //4th response data will store here
    }

    let newResponseArray = response.split(" "); //store all word here
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    // setResultData(response); //5th show the result

    setLoading(false); //6th loading animation hide
    setInput(""); //7th input filed will be empty
    setResultData("");
  };

  const contextValue = {
    onSent,
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    previousPrompt,
    setPreviousPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
