import { useEffect, useContext } from 'react';
import { useOnOff } from '@hooks/useOnOff';
import GameOptions from '@components/organisms/app/GameOptions';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '@context/GameContext';
import { OnOffEnum } from '@hooks/models/_index';

const Play = () => {
  const [showOptions, setShowOptions] = useOnOff(true);
  const { config, setConfig } = useContext(GameContext);
  const navigate = useNavigate();

  // On complete, clear options off the page
  const onComplete = () => {
    setShowOptions({ type: OnOffEnum.OFF });
  };

  // Reset options on page load back
  useEffect(() => {
    setShowOptions({ type: OnOffEnum.ON });
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
          config={config}
          setConfig={setConfig}
          onComplete={onComplete}
        />
      )}

      {!showOptions && <Outlet />}
    </div>
  );
};

export default Play;
