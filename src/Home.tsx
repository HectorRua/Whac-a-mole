import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Options from "./Options";

const Home: React.FC<{}> = () => {
  const navigate = useNavigate();

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
    <div>
      <h1>HOME</h1>
      <Options disabledOpen={false} />
      <input type="text" onChange={handleChangeUserName} />
      <button onClick={handleClickPlay}>PLAY</button>
      {userNameEmptyError && <span>ERROR USUARIO VACIO</span>}
    </div>
  );
};

export default Home;
