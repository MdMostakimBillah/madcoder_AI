import "./Sidebar.css";
import { assets } from "../../assets/assets.js";
import { useContext } from "react";
import { Context } from "../../context/Context.jsx";
const Sidebar = ({ clickingFunction, toggleNotice }) => {
  const { onSent, previousPrompt, setRecentPrompt, newChat } =
    useContext(Context);

  const loadPrompts = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };
  return (
    <>
      <aside className={`${toggleNotice ? "Hide" : "visible"}`}>
        <div className="top">
          <div className="side-nav">
            <img
              onClick={clickingFunction}
              className="toggle-bar"
              src={assets.navbar_icon}
              alt=""
            />
            <img
              onClick={newChat}
              className="toggle-bar"
              src={assets.edit_icon}
              alt=""
            />
          </div>

          <div className="Recent-prompt">
            <h3>Recent</h3>
            {previousPrompt.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => loadPrompts(item)}
                  className="promps-user"
                >
                  <img src={assets.chat_icon} alt="" />
                  <p>{item.slice(0, 22)}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bottom-div">
          <div className="about bottom">
            <img src={assets.help_icon} alt="" />
            <p>About</p>
          </div>
          <div className="setting bottom">
            <img src={assets.setting_icon} alt="" />
            <p>Setting</p>
          </div>
          <div className="user bottom">
            <img src={assets.user_icon} alt="" />
            <p>Signin</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
