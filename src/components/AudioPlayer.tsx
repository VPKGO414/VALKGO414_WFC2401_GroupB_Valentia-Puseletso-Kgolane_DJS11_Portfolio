import React, { useState, useRef } from 'react';
import '../styles/audioPlayer.css';

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying); // Toggle isPlaying state
    if (!isPlaying) {
      audioRef.current?.play(); // If not playing, play audio
    } else {
      audioRef.current?.pause(); // If playing, pause audio
    }
  };

  return (
    <div>
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <audio ref={audioRef} autoPlay={isPlaying}>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
