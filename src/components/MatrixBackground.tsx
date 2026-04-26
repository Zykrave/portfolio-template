import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const kanjiSequence = ['罪', '夜', '苦', '雷', '亜', '舞', '影'];
    const fontSize = 28;
    const columns = Math.ceil(width / (fontSize + 7));
    const rows = Math.ceil(height / (fontSize + 7));

    // Pre-calculate character grid
    const grid: string[] = [];
    for (let i = 0; i < columns * rows; i++) {
        grid.push(kanjiSequence[i % kanjiSequence.length]);
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px "Reggae One", "Courier New", monospace`;
      ctx.textAlign = 'center';
      const time = performance.now() / 1000;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          const i = r * columns + c;
          const char = grid[i];
          
          let alpha = 0.25;
          let glow = 0;
          let color = 'rgba(140, 0, 0, ';

          // Replicate the complex nth-child pulse logic in JS
          // Examples: 19n+2, 29n+1, 11n, etc.
          const pulseFactors = [
            { mod: 19, rem: 2, scale: 3.5, off: 0.2 },
            { mod: 29, rem: 1, scale: 4.1, off: 0.7 },
            { mod: 11, rem: 0, scale: 2.9, off: 1.1, special: true },
            { mod: 37, rem: 10, scale: 5.3, off: 1.5 },
            { mod: 41, rem: 1, scale: 3.9, off: 0.4 }
          ];

          for(const p of pulseFactors) {
            if (i % p.mod === p.rem) {
                const s = (Math.sin(time * (Math.PI * 2 / p.scale) + p.off) + 1) / 2;
                alpha = Math.max(alpha, 0.4 + s * 0.6);
                glow = Math.max(glow, s * 20);
                if (p.special) {
                    color = 'rgba(180, 30, 30, ';
                }
                break;
            }
          }

          ctx.shadowBlur = glow;
          ctx.shadowColor = 'rgba(255, 0, 0, 0.5)';
          ctx.fillStyle = color + alpha * 0.6 + ')';
          ctx.fillText(char, c * (fontSize + 7) + fontSize / 2, r * (fontSize + 7) + fontSize);
        }
      }
      requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    const raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none bg-[#050000] overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full opacity-60"
        style={{ mixBlendMode: 'plus-lighter' }}
      />
    </div>
  );
}

export default MatrixBackground;
