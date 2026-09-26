import React, { useState, useEffect } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const GLYPHS = '01#%&_<>~^/[]{}*+=XY';

export function ScrambleText({ text, className = '', delay = 300 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let iteration = 0;
    let timer: NodeJS.Timeout;

    const timeout = setTimeout(() => {
      timer = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) {
                return text[index];
              }
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          setIsDone(true);
          clearInterval(timer);
        }

        iteration += 1 / 2; // Smooth gradual resolve
      }, 35);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(timer);
    };
  }, [text, delay]);

  return (
    <span className={`${className} inline-block font-mono tracking-wider`}>
      {displayText || text}
      {!isDone && <span className="inline-block w-2 h-4 bg-cyan-accent ml-1 animate-pulse" />}
    </span>
  );
}
