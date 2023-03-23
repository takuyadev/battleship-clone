import { useEffect, useContext } from 'react';
import { useOnOff } from '@hooks/useOnOff';
import GameOptions from '@components/organisms/app/GameOptions';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '@context/GameContext';

const Play = () => {
  const [showOptions, setShowOptions] = useOnOff(true);
  const { config, setConfig } = useContext(GameContext);
  const navigate = useNavigate();

  // On complete, clear options off the page
  const onComplete = () => {
    setShowOptions({ type: 'off' });
  };

  // Reset options on page load back
  useEffect(() => {
    setShowOptions({ type: 'on' });
  }, []);

  // Navigate to selected page
  useEffect(() => {
    if (!showOptions) {
      navigate(`/play/${config.gameFormat}`);
    }
  }, [showOptions]);

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      {showOptions && (
        <GameOptions
          setConfig={setConfig}
          onComplete={onComplete}
          config={config}
        />
      )}

      {!showOptions && <Outlet />}
    </div>
  );
};

export default Play;
