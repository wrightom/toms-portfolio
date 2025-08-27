import { useState } from 'react';

export default function LetterAnimation() {
  const [animate, setAnimate] = useState(false);
  
  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <style>{`
        .letter-bounce {
          animation: bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        @keyframes bounce {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
      <h1 onClick={handleClick} className="text-6xl font-bold cursor-pointer select-none">
        {"Click Me!".split('').map((letter, i) => (
          <span
            key={i}
            className={animate ? 'letter-bounce' : ''}
            style={{ 
              display: 'inline-block',
              animationDelay: `${i * 80}ms`
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </h1>
    </div>
  );
}