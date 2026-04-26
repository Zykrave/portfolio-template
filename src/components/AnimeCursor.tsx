import { useEffect, useRef, useState } from "react";

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  rs: number;
  sz: number;
  life: number;
}

export default function AnimeCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const mx = useRef(0);
  const my = useRef(0);
  const bx = useRef(0);
  const by = useRef(0);
  const angle = useRef(0);
  const flare = useRef(0);
  const petals = useRef<Petal[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    const blob = blobRef.current;
    if (!canvas || !blob) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function onMouseMove(e: MouseEvent) {
      mx.current = e.clientX;
      my.current = e.clientY;

      if (Math.random() > 0.38) {
        petals.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2.8,
          vy: Math.random() * 1.4 + 0.5,
          rot: Math.random() * Math.PI * 2,
          rs: (Math.random() - 0.5) * 0.13,
          sz: Math.random() * 4 + 2,
          life: 1,
        });
      }
    }

    function onClick() {
      flare.current = 1;
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    function drawPoly(
      x: number,
      y: number,
      r: number,
      sides: number,
      rot: number,
      alpha: number,
      lw: number
    ) {
      if (!ctx) return;
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const a = rot + ((Math.PI * 2) / sides) * i;
        i === 0
          ? ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a))
          : ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(180,140,255,${alpha})`;
      ctx.lineWidth = lw;
      ctx.stroke();
    }

    function loop() {
      if (!canvas || !ctx || !blob) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // blob lerp
      bx.current += (mx.current - bx.current) * 0.07;
      by.current += (my.current - by.current) * 0.07;
      blob.style.transform = `translate3d(${bx.current}px, ${by.current}px, 0) translate(-50%, -50%)`;

      // petals
      const ps = petals.current;
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.life * 0.88;
        ctx.beginPath();
        ctx.ellipse(0, -p.sz / 2, p.sz / 2.5, p.sz / 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,145,185,1)";
        ctx.fill();
        ctx.restore();
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rs;
        p.vy += 0.045;
        p.life -= 0.017;
        if (p.life <= 0) ps.splice(i, 1);
      }

      // sigil ring
      angle.current += 0.014;
      if (flare.current > 0) flare.current -= 0.04;
      const R = 20 + flare.current * 30;
      const a = 0.78 + flare.current * 0.22;

      drawPoly(mx.current, my.current, R, 6, angle.current, a, 1);
      drawPoly(mx.current, my.current, R * 0.62, 6, -angle.current * 1.4, a * 0.55, 0.8);

      ctx.beginPath();
      ctx.arc(mx.current, my.current, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,160,255,${a})`;
      ctx.fill();

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* canvas layer — petals + sigil */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />

      {/* blob layer */}
      <div
        ref={blobRef}
        style={{
          position: "fixed",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "rgba(120,80,220,0.28)",
          filter: "blur(20px)",
          pointerEvents: "none",
          zIndex: 9997,
          willChange: "transform",
        }}
      />
    </>
  );
}
