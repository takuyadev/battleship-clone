import GameScreen from "./components/organisms/GameScreen";
import { useContext, useEffect } from "react";
import { GameContext } from "./context/GameContext";

function App(): JSX.Element {
  const { boards, updateTile, initializeBoard } = useContext(GameContext);

  useEffect(() => {
    console.log(boards);

    initializeBoard();
  }, []);

    useEffect(() => {
      console.log(boards);

    }, [boards]);

  return <div>{boards && <GameScreen updateTile={updateTile} boards={boards} />}</div>;
}

export default App;
