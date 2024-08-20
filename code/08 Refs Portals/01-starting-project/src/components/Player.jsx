import { useRef } from 'react';

export default function Player() {
  const playerName = useRef();

  function handleStart() {
    setTimeout(() => {}, 1000);
  }

  return (
    <section id="player">
      <h2>Welcome {playerName.current ? playerName.current.value : 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
