import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";
import Markdown from "react-markdown";
const Main = ({ clickingFunction, toggleNotice }) => {
  const {
    onSent,
    input,
    setInput,
    recentPrompt,
    showResult,
    loading,
    resultData,
    newChat,
  } = useContext(Context);

  const submitPrompt = (e) => {
    e.preventDefault();
    onSent();
    setInput(""); //input fied become empty
  };

  return (
    <>
      <div className={`main ${toggleNotice ? "Overlap" : "ShowSidebar"}`}>
        <nav>
          <div className="main-logo">
            <div
              className={`toggle-icon ${
                toggleNotice ? "ButtonVisible" : "ButtonHide"
              }`}
            >
              <img
                onClick={clickingFunction}
                className="toggle-bar"
                src={assets.navbar_icon}
                alt=""
              />
              <img
                onClick={newChat}
                className="toggle-bar edit"
                src={assets.edit_icon}
                alt=""
              />
            </div>
            <h3>MadCoder</h3>
          </div>
          <img className="user_user" src={assets.user_user} alt="" />
        </nav>
        <div className="main-content">
          {!showResult ? (
            <div className="welcome">
              <h1>MadCoder AI</h1>
            </div>
          ) : (
            <div className="result">
              <div className="result-title">
                <img src={assets.user_user} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.myAi} alt="" />
                {loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr className="last-line-loading" />
                  </div>
                ) : (
                  <p>
                    <Markdown>{resultData}</Markdown>
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="main-bottom">
            <form action="" onSubmit={submitPrompt}>
              <div className="search-box">
                <input
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  type="text"
                  placeholder="Enter Prompt here..."
                  required
                />
                <button type="submit">
                  <img src={assets.sent_icon} alt="" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
