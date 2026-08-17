"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  glowing: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = ["#3B82F6", "#6366F1", "#8B5CF6", "#60A5FA"];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initNodes();
      initParticles();
    };

    const initNodes = () => {
      const count = window.innerWidth < 768 ? 20 : 35;
      nodesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        glowing: Math.random() > 0.7,
      }));
    };

    const initParticles = () => {
      const count = window.innerWidth < 768 ? 15 : 25;
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const drawConnections = (nodes: Node[]) => {
      const mouse = mouseRef.current;
      const maxDist = 160;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            // Mouse proximity boost
            const mDx = mouse.x - (nodes[i].x + nodes[j].x) / 2;
            const mDy = mouse.y - (nodes[i].y + nodes[j].y) / 2;
            const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
            const mouseBoost = Math.max(0, 1 - mDist / 300);

            const opacity = (1 - dist / maxDist) * 0.2 * (1 + mouseBoost * 1.5);

            const gradient = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y
            );
            gradient.addColorStop(0, `rgba(99,102,241,${opacity})`);
            gradient.addColorStop(0.5, `rgba(59,130,246,${opacity * 1.2})`);
            gradient.addColorStop(1, `rgba(139,92,246,${opacity})`);

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    const drawNodes = (nodes: Node[]) => {
      const mouse = mouseRef.current;
      nodes.forEach((node) => {
        const mDx = mouse.x - node.x;
        const mDy = mouse.y - node.y;
        const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
        const proximity = Math.max(0, 1 - mDist / 200);

        const radius = node.radius * (1 + proximity * 1.5);
        const opacity = node.opacity * (1 + proximity);

        if (node.glowing) {
          const grd = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 6);
          grd.addColorStop(0, `rgba(99,102,241,${opacity * 0.4})`);
          grd.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius * 6, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${opacity})`;
        ctx.fill();
      });
    };

    const drawParticles = (particles: Particle[]) => {
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(")", `,${p.opacity})`).replace("rgb(", "rgba(");
        // Simple hex to rgba approach
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    };

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const particles = particlesRef.current;

      if (!reducedMotion.current) {
        nodes.forEach((node) => {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > w) node.vx *= -1;
          if (node.y < 0 || node.y > h) node.vy *= -1;
        });

        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        });
      }

      drawConnections(nodes);
      drawNodes(nodes);
      drawParticles(particles);

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
