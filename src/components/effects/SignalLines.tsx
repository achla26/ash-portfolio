"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsFinePointer } from "@/hooks/useIsFinePointer";

interface SignalNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  pulseSpeed: number;
  pulseOffset: number;
  velocityX: number;
  velocityY: number;
  mass: number;
  isAttracted: boolean;
}

interface SignalPath {
  points: { x: number; y: number; baseX: number; baseY: number }[];
  color: string;
  width: number;
  speed: number;
  offset: number;
  flowPos: number;
  isActive: boolean;
  pulseIntensity: number;
}

export function SignalLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const reduced = useReducedMotion();
  const fine = useIsFinePointer();
  const animFrameRef = useRef<number>(0);
  const nodesRef = useRef<SignalNode[]>([]);
  const pathsRef = useRef<SignalPath[]>([]);
  const timeRef = useRef(0);
  const clickRef = useRef<{ x: number; y: number; time: number }[]>([]);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string }[]>([]);
  const pathConnectionsRef = useRef<[number, number][]>([]);

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createNetwork();
    };

    const createNetwork = () => {
      const startX = width * 0.25;
      const nodes: SignalNode[] = [];

      // More nodes spread across the canvas
      const nodePositions = [
        // Left side
        { x: 0.15, y: 0.2 },
        { x: 0.12, y: 0.45 },
        { x: 0.18, y: 0.7 },
        { x: 0.2, y: 0.88 },
        // Upper cluster
        { x: 0.35, y: 0.12 },
        { x: 0.55, y: 0.08 },
        { x: 0.75, y: 0.1 },
        { x: 0.9, y: 0.15 },
        // Middle cluster
        { x: 0.3, y: 0.3 },
        { x: 0.45, y: 0.25 },
        { x: 0.6, y: 0.28 },
        { x: 0.78, y: 0.32 },
        { x: 0.92, y: 0.35 },
        // Center
        { x: 0.35, y: 0.48 },
        { x: 0.5, y: 0.45 },
        { x: 0.65, y: 0.47 },
        { x: 0.8, y: 0.5 },
        // Lower cluster
        { x: 0.28, y: 0.65 },
        { x: 0.42, y: 0.68 },
        { x: 0.58, y: 0.65 },
        { x: 0.75, y: 0.7 },
        { x: 0.88, y: 0.72 },
        // Bottom
        { x: 0.3, y: 0.85 },
        { x: 0.45, y: 0.88 },
        { x: 0.6, y: 0.82 },
        { x: 0.78, y: 0.88 },
        { x: 0.9, y: 0.82 },
      ];

      const colors = [
        "212,162,76",  // amber
        "232,201,138", // amber-soft
        "155,122,140", // mauve
        "127,169,160", // signal
        "180,140,200", // purple
        "100,200,255", // cyan
      ];

      nodePositions.forEach((pos, i) => {
        const nx = pos.x * width;
        const ny = pos.y * height;
        nodes.push({
          x: nx,
          y: ny,
          baseX: nx,
          baseY: ny,
          radius: 2 + Math.random() * 3,
          color: colors[i % colors.length],
          pulseSpeed: 0.005 + Math.random() * 0.015,
          pulseOffset: Math.random() * Math.PI * 2,
          velocityX: (Math.random() - 0.5) * 0.2,
          velocityY: (Math.random() - 0.5) * 0.2,
          mass: 0.5 + Math.random() * 0.5,
          isAttracted: false,
        });
      });

      nodesRef.current = nodes;

      // More extensive path connections
      const pathConnections: [number, number][] = [
        // Left to upper
        [0, 4], [1, 8], [2, 13], [3, 17],
        // Upper network
        [4, 5], [5, 6], [6, 7],
        [4, 8], [5, 9], [6, 10], [7, 11],
        [8, 9], [9, 10], [10, 11], [11, 12],
        // Middle network
        [8, 13], [9, 14], [10, 15], [11, 16],
        [13, 14], [14, 15], [15, 16], [16, 12],
        [13, 17], [14, 18], [15, 19], [16, 20],
        // Lower network
        [17, 18], [18, 19], [19, 20], [20, 21],
        [17, 22], [18, 23], [19, 24], [20, 25],
        [22, 23], [23, 24], [24, 25],
        // Cross connections
        [4, 13], [6, 16], [7, 12],
        [8, 18], [10, 20], [14, 24],
        [0, 9], [2, 15], [3, 19],
        [5, 14], [9, 23], [11, 25],
        // Long connections
        [0, 13], [4, 18], [6, 23],
        [1, 14], [8, 24], [12, 25],
      ];
      
      pathConnectionsRef.current = pathConnections;

      const pathColors = [
        "212,162,76",  // amber
        "232,201,138", // amber-soft
        "155,122,140", // mauve
        "127,169,160", // signal
        "180,140,200", // purple
        "100,200,255", // cyan
      ];

      const paths: SignalPath[] = pathConnections.map(([a, b], i) => {
        const na = nodes[a];
        const nb = nodes[b];

        const midX = (na.x + nb.x) / 2;
        const midY = (na.y + nb.y) / 2;
        const perpX = -(nb.y - na.y) * (0.15 + Math.random() * 0.2) * (Math.random() > 0.5 ? 1 : -1);
        const perpY = (nb.x - na.x) * (0.15 + Math.random() * 0.2) * (Math.random() > 0.5 ? 1 : -1);
        const ctrlX = midX + perpX;
        const ctrlY = midY + perpY;

        const numPoints = 30;
        const points = [];
        for (let t = 0; t <= 1; t += 1 / numPoints) {
          const px =
            (1 - t) * (1 - t) * na.x +
            2 * (1 - t) * t * ctrlX +
            t * t * nb.x;
          const py =
            (1 - t) * (1 - t) * na.y +
            2 * (1 - t) * t * ctrlY +
            t * t * nb.y;
          points.push({ x: px, y: py, baseX: px, baseY: py });
        }

        return {
          points,
          color: pathColors[i % pathColors.length],
          width: 0.6 + Math.random() * 0.8,
          speed: 0.002 + Math.random() * 0.005,
          offset: Math.random() * Math.PI * 2,
          flowPos: Math.random(),
          isActive: true,
          pulseIntensity: 0.5 + Math.random() * 0.5,
        };
      });

      pathsRef.current = paths;
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking with velocity
    let mouseVelocityX = 0;
    let mouseVelocityY = 0;
    let lastMouseX = -1000;
    let lastMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (lastMouseX !== -1000) {
        mouseVelocityX = (x - lastMouseX) * 0.1;
        mouseVelocityY = (y - lastMouseY) * 0.1;
      }
      lastMouseX = x;
      lastMouseY = y;
      
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.active = false;
      lastMouseX = -1000;
      lastMouseY = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create ripple effect
      clickRef.current.push({ x, y, time: timeRef.current });
      
      // Spawn particles
      const colors = ["212,162,76", "232,201,138", "155,122,140", "127,169,160"];
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 4;
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 60 + Math.random() * 60,
          maxLife: 120,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      
      // Attract nodes to click
      nodesRef.current.forEach(node => {
        const dx = node.x - x;
        const dy = node.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300) {
          node.isAttracted = true;
          node.velocityX += (dx / dist) * 2;
          node.velocityY += (dy / dist) * 2;
        }
      });
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    const cursorRadius = 250;

    const animate = () => {
      timeRef.current += 1;
      const t = timeRef.current;
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hasMouse = fine && mx > 0 && my > 0;

      // Update particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.vy += 0.02; // slight gravity
        p.life--;
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      // Update nodes with physics
      nodesRef.current.forEach((node, index) => {
        // Spring back to base position
        const dx = node.baseX - node.x;
        const dy = node.baseY - node.y;
        node.velocityX += dx * 0.01 * node.mass;
        node.velocityY += dy * 0.01 * node.mass;
        
        // Damping
        node.velocityX *= 0.95;
        node.velocityY *= 0.95;
        
        // Node-node repulsion
        nodesRef.current.forEach((other, otherIndex) => {
          if (index === otherIndex) return;
          const dx2 = node.x - other.x;
          const dy2 = node.y - other.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < 50 && dist2 > 0) {
            const force = (50 - dist2) / 50 * 0.3;
            node.velocityX += (dx2 / dist2) * force;
            node.velocityY += (dy2 / dist2) * force;
          }
        });
        
        node.x += node.velocityX;
        node.y += node.velocityY;
        
        // Decay attraction
        if (node.isAttracted) {
          node.isAttracted = false;
        }

        // Mouse influence
        if (hasMouse) {
          const dx2 = node.x - mx;
          const dy2 = node.y - my;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          
          if (dist2 < cursorRadius && dist2 > 10) {
            const force = (cursorRadius - dist2) / cursorRadius;
            const angle = Math.atan2(dy2, dx2);
            // Push away from mouse with some randomness
            node.velocityX += Math.cos(angle + Math.sin(t * 0.01 + index) * 0.5) * force * 0.5;
            node.velocityY += Math.sin(angle + Math.cos(t * 0.01 + index) * 0.5) * force * 0.5;
            
            // Mouse velocity adds swirl
            node.velocityX += mouseVelocityX * force * 0.1;
            node.velocityY += mouseVelocityY * force * 0.1;
          }
        }
      });

      // Update path points based on node positions
      const pathConnections = pathConnectionsRef.current;
      pathsRef.current.forEach((path, pathIndex) => {
        // Rebuild path from node positions
        const [a, b] = pathConnections[pathIndex] || [0, 1];
        const na = nodesRef.current[a];
        const nb = nodesRef.current[b];
        if (!na || !nb) return;

        const midX = (na.x + nb.x) / 2;
        const midY = (na.y + nb.y) / 2;
        const perpX = -(nb.y - na.y) * 0.2;
        const perpY = (nb.x - na.x) * 0.2;
        
        // Add wave to control points
        const waveAmount = 20 + Math.sin(t * 0.005 + pathIndex) * 10;
        const ctrlX = midX + perpX + Math.sin(t * 0.003 + pathIndex * 0.5) * waveAmount * 0.3;
        const ctrlY = midY + perpY + Math.cos(t * 0.004 + pathIndex * 0.7) * waveAmount * 0.3;

        const numPoints = 30;
        const newPoints = [];
        for (let i = 0; i <= numPoints; i++) {
          const p = i / numPoints;
          const px =
            (1 - p) * (1 - p) * na.x +
            2 * (1 - p) * p * ctrlX +
            p * p * nb.x;
          const py =
            (1 - p) * (1 - p) * na.y +
            2 * (1 - p) * p * ctrlY +
            p * p * nb.y;
          newPoints.push({ x: px, y: py, baseX: px, baseY: py });
        }
        path.points = newPoints;

        // Path activity based on node proximity
        const dist = Math.sqrt(
          Math.pow(na.x - nb.x, 2) + 
          Math.pow(na.y - nb.y, 2)
        );
        path.isActive = dist < width * 0.7;
        path.pulseIntensity = Math.max(0.3, Math.min(1, 1 - dist / (width * 0.7)));
      });

      // Draw paths
      pathsRef.current.forEach((path) => {
        if (!path.isActive || path.points.length < 2) return;

        path.flowPos = (path.flowPos + path.speed * path.pulseIntensity) % 1;

        const adjustedPoints = path.points;

        // Draw main path with gradient
        const gradient = ctx.createLinearGradient(
          adjustedPoints[0].x, adjustedPoints[0].y,
          adjustedPoints[adjustedPoints.length - 1].x,
          adjustedPoints[adjustedPoints.length - 1].y
        );
        gradient.addColorStop(0, `rgba(${path.color}, 0.02)`);
        gradient.addColorStop(0.5, `rgba(${path.color}, ${0.06 * path.pulseIntensity})`);
        gradient.addColorStop(1, `rgba(${path.color}, 0.02)`);
        
        ctx.beginPath();
        ctx.moveTo(adjustedPoints[0].x, adjustedPoints[0].y);
        for (let i = 1; i < adjustedPoints.length; i++) {
          ctx.lineTo(adjustedPoints[i].x, adjustedPoints[i].y);
        }
        ctx.strokeStyle = gradient;
        ctx.lineWidth = path.width * path.pulseIntensity;
        ctx.stroke();

        // Flow pulse with trail
        const flowIndex = Math.floor(path.flowPos * adjustedPoints.length);
        const trailLength = 15;
        
        for (let i = 0; i < trailLength; i++) {
          const idx = (flowIndex - i + adjustedPoints.length) % adjustedPoints.length;
          const nextIdx = (idx + 1) % adjustedPoints.length;
          const progress = 1 - i / trailLength;
          const alpha = progress * progress * 0.5 * path.pulseIntensity;
          
          ctx.beginPath();
          ctx.moveTo(adjustedPoints[idx].x, adjustedPoints[idx].y);
          ctx.lineTo(adjustedPoints[nextIdx].x, adjustedPoints[nextIdx].y);
          ctx.strokeStyle = `rgba(${path.color}, ${alpha})`;
          ctx.lineWidth = path.width * (1 + progress * 0.5) * path.pulseIntensity;
          ctx.stroke();
        }

        // Glow at flow head with pulsating
        if (flowIndex < adjustedPoints.length) {
          const fp = adjustedPoints[flowIndex];
          const glowRadius = 8 + Math.sin(t * 0.1 + path.offset) * 4;
          const glow = ctx.createRadialGradient(
            fp.x, fp.y, 0,
            fp.x, fp.y, glowRadius
          );
          const glowAlpha = 0.15 * path.pulseIntensity * (1 + Math.sin(t * 0.05 + path.offset) * 0.3);
          glow.addColorStop(0, `rgba(${path.color}, ${glowAlpha})`);
          glow.addColorStop(1, `rgba(${path.color}, 0)`);
          ctx.beginPath();
          ctx.arc(fp.x, fp.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
      });

      // Draw node connections (dynamic based on proximity)
      nodesRef.current.forEach((node, i) => {
        nodesRef.current.forEach((other, j) => {
          if (i >= j) return;
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.15;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(212,162,76, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      nodesRef.current.forEach((node) => {
        const pulse = Math.sin(t * node.pulseSpeed + node.pulseOffset);
        const alpha = 0.4 + pulse * 0.2;
        const size = node.radius + pulse * 0.5;

        // Outer glow
        const glowSize = size * 8;
        const glow = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowSize
        );
        glow.addColorStop(0, `rgba(${node.color}, ${alpha * 0.4})`);
        glow.addColorStop(0.5, `rgba(${node.color}, ${alpha * 0.1})`);
        glow.addColorStop(1, `rgba(${node.color}, 0)`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot with brightness variation
        const brightness = 0.7 + Math.sin(t * 0.02 + node.pulseOffset) * 0.3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${node.color}, ${alpha * brightness})`;
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.arc(node.x - size * 0.2, node.y - size * 0.2, size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${node.color}, ${brightness * 0.5})`;
        ctx.fill();
      });

      // Draw particles
      particlesRef.current.forEach((p) => {
        const lifeRatio = p.life / p.maxLife;
        const size = 2 * lifeRatio;
        const alpha = lifeRatio * 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
        ctx.fill();
        
        // Particle glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3);
        glow.addColorStop(0, `rgba(${p.color}, ${alpha * 0.3})`);
        glow.addColorStop(1, `rgba(${p.color}, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      });

      // Click ripples
      clickRef.current = clickRef.current.filter(click => t - click.time < 60);
      clickRef.current.forEach(click => {
        const age = t - click.time;
        const progress = age / 60;
        const radius = 20 + progress * 100;
        const alpha = 0.3 * (1 - progress);
        ctx.beginPath();
        ctx.arc(click.x, click.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212,162,76, ${alpha})`;
        ctx.lineWidth = 2 * (1 - progress);
        ctx.stroke();
      });

      // Mouse interactive glow with trails
      if (hasMouse) {
        // Mouse glow
        const glowRadius = 80 + Math.sin(t * 0.03) * 20;
        const glow = ctx.createRadialGradient(
          mx, my, 0,
          mx, my, glowRadius
        );
        glow.addColorStop(0, "rgba(212,162,76, 0.08)");
        glow.addColorStop(0.5, "rgba(212,162,76, 0.03)");
        glow.addColorStop(1, "rgba(212,162,76, 0)");
        ctx.beginPath();
        ctx.arc(mx, my, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Mouse trail (smoke effect)
        const trailLength = 20;
        for (let i = 0; i < trailLength; i++) {
          const progress = i / trailLength;
          const alpha = (1 - progress) * 0.03;
          const trailRadius = 5 + progress * 30;
          const angle = t * 0.02 + i * 0.3;
          const tx = mx + Math.cos(angle + i) * progress * 40;
          const ty = my + Math.sin(angle * 0.7 + i * 0.5) * progress * 30;
          const glow2 = ctx.createRadialGradient(tx, ty, 0, tx, ty, trailRadius);
          glow2.addColorStop(0, `rgba(212,162,76, ${alpha})`);
          glow2.addColorStop(1, `rgba(212,162,76, 0)`);
          ctx.beginPath();
          ctx.arc(tx, ty, trailRadius, 0, Math.PI * 2);
          ctx.fillStyle = glow2;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
    };
  }, [reduced, fine]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "auto", cursor: "crosshair" }}
      aria-hidden="true"
    />
  );
}