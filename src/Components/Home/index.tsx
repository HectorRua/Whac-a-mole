import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTexts } from "../../Hooks/useTexts";
import { TEXTS } from "../../Languages";
import Options from "../Options";
import GROUND_IMG from "../../Assets/Img/ground.png";
import MOLE_IMG from "../../Assets/Img/mole.png";
import "./home.css";
import TextInput from "../Commons/TextInput";

const Home: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { getText } = useTexts();

  const [userName, setUserName] = useState<string>("");
  const [userNameEmptyError, setUserNameEmptyError] = useState<boolean>(false);

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setUserNameEmptyError(false);
  };

  const handleClickPlay = () => {
    if (userName !== "") {
      navigate("/game", { state: { userName: userName } });
    } else {
      setUserNameEmptyError(true);
    }
  };

  return (
    <div className="home-content">
      <div>
        <img
          src={GROUND_IMG}
          alt={getText(TEXTS.GROUND)}
          className="home-title-img"
        />
        <img
          src={GROUND_IMG}
          alt={getText(TEXTS.GROUND)}
          className="home-title-img"
        />
        <img
          src={GROUND_IMG}
          alt={getText(TEXTS.GROUND)}
          className="home-title-img"
        />
        <img
          src={GROUND_IMG}
          alt={getText(TEXTS.GROUND)}
          className="home-title-img"
        />
        <img
          src={GROUND_IMG}
          alt={getText(TEXTS.GROUND)}
          className="home-title-img"
        />
        <img
          src={GROUND_IMG}
          alt={getText(TEXTS.GROUND)}
          className="home-title-img"
        />
      </div>
      <div>
        <img
          src={MOLE_IMG}
          alt={getText(TEXTS.MOLE)}
          className="home-title-img"
        />
        <h1 className="home-title-text" data-testid="app-title">
          {getText(TEXTS.APP_TITLE)}
        </h1>
        <img
          src={MOLE_IMG}
          alt={getText(TEXTS.MOLE)}
          className="home-title-img"
        />
      </div>
      <div>
        <img
          src={GROUND_IMG}
          alt={getText(TEXTS.GROUND)}
          className="home-title-img"
        />
        <img
          src={GROUND_IMG}
          alt={getText(TEXTS.GROUND)}
          className="home-title-img"
        />
        <img
          src={GROUND_IMG}
          alt={getText(TEXTS.GROUND)}
          className="home-title-img"
        />
        <img
          src={GROUND_IMG}
          alt={getText(TEXTS.GROUND)}
          className="home-title-img"
        />
        <img
          src={GROUND_IMG}
          alt={getText(TEXTS.GROUND)}
          className="home-title-img"
        />
        <img
          src={GROUND_IMG}
          alt={getText(TEXTS.GROUND)}
          className="home-title-img"
        />
      </div>
      <TextInput
        data-testid="player-name-input"
        title={getText(TEXTS.PLAYER_NAME)}
        value={userName}
        onChange={handleChangeUserName}
        errorText={
          userNameEmptyError
            ? getText(TEXTS.ERROR_EMPTY_PLAYER_NAME)
            : undefined
        }
      />
      <div>
        <button
          data-testid="play-button"
          className="home-button"
          onClick={handleClickPlay}
        >
          {getText(TEXTS.PLAY)}
        </button>
        <Options data-testid="options-button" classNameButton="home-button" />
      </div>
    </div>
  );
};

export default Home;
