import { useState, useEffect } from 'react';

const UseTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [onEnd, setOnEnd] = useState(() => {});
  
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      onEnd();
    }
    speechSynthesis.speak(utterance);
  }

  useEffect(() => {
    return () => {
      // Cancel any ongoing speech when the component unmounts
      speechSynthesis.cancel();
    }
  }, []);

  return {
    isSpeaking,
    onEnd: setOnEnd,
    Speak: speak,
  };
};

export default UseTextToSpeech;
