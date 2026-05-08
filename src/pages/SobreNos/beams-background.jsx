import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import styles from "./SobreNos.module.css";

const PROJECT_COLORS = [{ h: 238, s: 67, l: 56 }];

function createBeam(width, height) {
  const angle = -35 + Math.random() * 10;
  const colorIndex = Math.floor(Math.random() * PROJECT_COLORS.length);
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.18 + Math.random() * 0.22,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
    colorIndex,
  };
}

export function BeamsBackground({ intensity = "strong" }) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const beamsRef = useRef([]);
  const animationFrameRef = useRef(0);
  const MINIMUM_BEAMS = 20;

  const opacityMap = { subtle: 0.7, medium: 0.85, strong: 1 };

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = wrapper.clientWidth;
      const h = wrapper.clientHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);

      const totalBeams = MINIMUM_BEAMS * 1.5;
      beamsRef.current = Array.from({ length: totalBeams }, () =>
        createBeam(w, h),
      );
    };

    updateCanvasSize();

    const ro = new ResizeObserver(updateCanvasSize);
    ro.observe(wrapper);

    function resetBeam(beam, index) {
      const w = wrapper.clientWidth;
      const h = wrapper.clientHeight;
      const column = index % 3;
      const spacing = w / 3;

      beam.y = h + 100;
      beam.x =
        column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 100 + Math.random() * 100;
      beam.speed = 0.5 + Math.random() * 0.4;
      beam.colorIndex = index % PROJECT_COLORS.length;
      beam.opacity = 0.2 + Math.random() * 0.15;
      return beam;
    }

    function drawBeam(ctx, beam) {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity =
        beam.opacity *
        (0.8 + Math.sin(beam.pulse) * 0.2) *
        opacityMap[intensity];

      const { h, s, l } = PROJECT_COLORS[beam.colorIndex];
      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
      gradient.addColorStop(0, `hsla(${h}, ${s}%, ${l}%, 0)`);
      gradient.addColorStop(
        0.1,
        `hsla(${h}, ${s}%, ${l}%, ${pulsingOpacity * 0.5})`,
      );
      gradient.addColorStop(0.4, `hsla(${h}, ${s}%, ${l}%, ${pulsingOpacity})`);
      gradient.addColorStop(0.6, `hsla(${h}, ${s}%, ${l}%, ${pulsingOpacity})`);
      gradient.addColorStop(
        0.9,
        `hsla(${h}, ${s}%, ${l}%, ${pulsingOpacity * 0.5})`,
      );
      gradient.addColorStop(1, `hsla(${h}, ${s}%, ${l}%, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    }

    function animate() {
      const w = wrapper.clientWidth;
      const h = wrapper.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.filter = "blur(35px)";

      beamsRef.current.forEach((beam, index) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;
        if (beam.y + beam.length < -100) {
          resetBeam(beam, index);
        }
        drawBeam(ctx, beam);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [intensity, opacityMap]);

  return (
    <div ref={wrapperRef} className={styles.beamsInner}>
      <canvas
        ref={canvasRef}
        className={styles.beamsCanvas}
        aria-hidden="true"
      />
      <motion.div
        className={styles.beamsOverlay}
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </div>
  );
}
