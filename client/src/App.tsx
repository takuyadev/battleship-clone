import { useBoard } from "@hooks/useBoard";
import GameBoard from "@components/molecules/GameBoard";
import { BOARD_SIZE } from "@data/constants";
import { useOnOff } from "@hooks/useOnOff";
import { TILE } from "@data/constants";
import { BOARD_ACTIONS } from "@data/actions";
import { ONOFF_ACTIONS } from "@data/actions";

const { PLACED } = TILE;
const { ON, OFF, FLIP } = ONOFF_ACTIONS;
const { UPDATE_TILE, ATTACK_TILE } = BOARD_ACTIONS;
const { ROWS, COLUMNS } = BOARD_SIZE;

function App(): JSX.Element {
  const [isEdit, setIsEdit] = useOnOff(true);
  const [playerBoard, setPlayerBoard] = useBoard({
    x: ROWS,
    y: COLUMNS,
  });

  return (
    <div>
      <button onClick={() => setIsEdit({ type: FLIP })}>asdfasdf</button>
      {isEdit ? "true" : "false"}

      {isEdit && (
        <GameBoard
          board={playerBoard}
          onClick={(x: number, y: number) => {
            setPlayerBoard({
              type: UPDATE_TILE,
              payload: { coords: { x, y }, mark: 1 },
            });
          }}
        />
      )}
      {!isEdit && (
        <GameBoard
          board={playerBoard}
          onClick={(x: number, y: number) => {
            setPlayerBoard({
              type: ATTACK_TILE,
              payload: { coords: { x, y }, mark: 1 },
            });
          }}
        />
      )}
    </div>
  );
}

export default App;
