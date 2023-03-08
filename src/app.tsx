import { startGame } from "./game";
import BOARD_SIZE from "./game/data/board_size.json";
import { useState, useEffect } from "react";

function App(): JSX.Element {

  useEffect(()=>{
    startGame(BOARD_SIZE);
  },[])
  
  return <div>Battleship Clone</div>;
}

export default App;
