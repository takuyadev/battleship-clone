// import { ChangeEvent, useContext, useEffect, useState } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import { io, Socket } from 'socket.io-client';
// import { GameContext } from '@context/GameContext';
// import { useOnOff } from '@hooks/useOnOff';
// import { isAllShipsPlaced } from '@utils/_index';
// import { GameEnum, OnOffEnum } from '@hooks/models/_index';
// import { slideLeft } from '@data/anim';
// import { Coordinate } from '@models/_index';
// import EditBoard from '@components/organisms/app/EditBoard';
// import OnlineBoard from '@components/organisms/app/OnlineBoard';
// import PageTransition from '@components/atoms/ui/PageTransition';
// import Button from '@components/atoms/buttons/Button';
// import InputLabel from '@components/molecules/form/InputLabel';

// const socket = io('http://localhost:8080');

// const Online = () => {
//   const { player, opponent, setGame, game, config } = useContext(GameContext);
//   const [isEdit, setIsEdit] = useState('player');
//   const [roomId, setRoomId] = useState('');
//   const [isDone, setIsDone] = useOnOff(false);

//   // Handlers for player
//   const onPlayerEdit = () => setIsEdit('loading');

//   // Listens to is edit, and determines if they can proceed to next step
//   useEffect(() => {
//     const condition = isAllShipsPlaced(player.ships);
//     return condition
//       ? setIsDone({ type: OnOffEnum.ON })
//       : setIsDone({ type: OnOffEnum.OFF });
//   }, [player.board, opponent.board, isEdit]);

//   const [players, setPlayers] = useState([]);
//   const [playerId, setPlayerid] = useState<number>(-1);
//   const [start, setStart] = useState(false);

//   useEffect(() => {
//     socket.on('start_game', (data) => {
//       setStart(true);
//       console.log(data)
//     });

//     socket.on('player_id', (id) => {
//       setPlayerid(id);
//     });

//     socket.on('player_attack', (coords: Coordinate) => {
//       setGame({
//         type: GameEnum.PLAYER_ATTACK,
//         payload: { coords },
//       });
//       setGame({
//         type: GameEnum.OPPONENT_TURN,
//         payload: null,
//       });
//     });

//     socket.on('opponent_attack', (coords: Coordinate) => {
//       setGame({
//         type: GameEnum.OPPONENT_ATTACK,
//         payload: { coords },
//       });
//       setGame({
//         type: GameEnum.PLAYER_TURN,
//         payload: null,
//       });
//     });
//   }, [socket]);

//   useEffect(() => {
//     console.log(playerId);
//   }, [playerId]);
//   //
//   return (
//     <div className='flex justify-center w-full'>
//       <AnimatePresence>
//         {isEdit === 'player' && (
//           <motion.div
//             key='player'
//             className='flex flex-col gap-2'
//             // @ts-ignore -- typescript bug with framer-motion
//             variants={slideLeft}
//             animate='animate'
//             initial='initial'
//             exit='exit'
//           >
//             <EditBoard
//               playerName={game.player.name}
//               board={player.board}
//               setBoard={player.setBoard}
//               ships={player.ships}
//               setShips={player.setShips}
//               boardSize={config.boardSize}
//               setName={(e) => {
//                 setGame({
//                   type: GameEnum.UPDATE_PLAYER_NAME,
//                   payload: {
//                     name: e.target.value,
//                     coords: { x: 0, y: 0 },
//                   },
//                 });
//               }}
//             />
//             <Button
//               className='mt-8'
//               disabled={!isDone}
//               onClick={onPlayerEdit}
//               text='Next'
//             />
//           </motion.div>
//         )}

//         {isEdit === 'loading' && (
//           <motion.div
//             key='opponent'
//             className='flex flex-col gap-2'
//             // @ts-ignore -- typescript bug with framer-motion; no noticeable bug
//             variants={slideLeft}
//             animate='animate'
//             initial='initial'
//             exit='exit'
//           >
//             <InputLabel
//               label='room id'
//               htmlFor='id'
//               name='room-id'
//               onChange={(e: ChangeEvent) => {
//                 setRoomId(e.target.value);
//               }}
//             />
//             <Button
//               onClick={() => {
//                 setIsEdit('end');
//                 socket.emit('join_game', {
//                   username: game.player.name,
//                   id: roomId,
//                 });
//                 socket.on('player_number', (data) => {
//                   setPlayerid(data);
//                 });
//               }}
//               text='Join room'
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//       {isEdit === 'end' && (
//         <PageTransition className='w-full'>
//           <OnlineBoard start={start} socket={socket} />
//         </PageTransition>
//       )}
//     </div>
//   );
// };

// export default Online;
