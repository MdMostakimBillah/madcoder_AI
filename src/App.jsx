import { useState } from "react";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  const [extend, setExtend] = useState(true);

  const oparetionClick = () => {
    setExtend((preValue) => !preValue);
    console.log(extend);
  };

  return (
    <>
      <Sidebar clickingFunction={oparetionClick} toggleNotice={extend} />
      <Main clickingFunction={oparetionClick} toggleNotice={extend} />
    </>
  );
};

export default App;
