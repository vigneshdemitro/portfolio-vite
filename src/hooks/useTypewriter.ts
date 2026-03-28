import { useEffect, useRef, useState } from 'react';

export function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!words.length) return;
    const current = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          pauseTimer.current = setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIndex(i => i + 1);
        }
      } else {
        setDisplayed(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex(i => (i + 1) % words.length);
          setCharIndex(0);
        } else {
          setCharIndex(i => i - 1);
        }
      }
    }, deleting ? speed / 2 : speed);

    return () => {
      clearTimeout(timeout);
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
    };
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
}
