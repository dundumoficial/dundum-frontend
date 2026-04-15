import { useEffect, useRef, useState } from "react";

interface ScrollExpandMediaProps {
  mediaSrc: string;
  posterSrc?: string;
  title?: string;
  scrollToExpand?: string;
}

const ScrollExpandMedia = ({
  mediaSrc,
  posterSrc,
  title,
  scrollToExpand,
}: ScrollExpandMediaProps) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollHeight = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.min(Math.max(scrolled / scrollHeight, 0), 1);
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const vwNow = isMobile ? 90 : 25 + progress * 54;
  const vhNow = isMobile ? 25 : 30 + progress * 48;

  const titleOpacity = Math.max(1 - progress * 3, 0);
  const titleLeft = `translateX(-${progress * (isMobile ? 50 : 40)}vw)`;
  const titleRight = `translateX(${progress * (isMobile ? 50 : 40)}vw)`;

  const words = title ? title.split(" ") : [];
  const firstWord = words[0] ?? "";
  const restOfTitle = words.slice(1).join(" ");

  const blurValue = Math.max(8 - progress * 12, 0);

  return (
    <section
      ref={containerRef}
      style={{ height: isMobile ? "250vh" : "300vh", position: "relative" }}
    >
      <figure
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background gradiente */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #1b1f3b, #454ade)",
            zIndex: 0,
          }}
        />

        {/* Preto que aparece conforme scrolla */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#000000",
            opacity: progress,
            zIndex: 0,
          }}
        />

        {/* Título */}
        {title && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              pointerEvents: "none",
              fontFamily: "var(--font-garet)",
              opacity: titleOpacity,
              width: "100%",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                display: "block",
                transform: titleLeft,
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 700,
                color: "white",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}
            >
              {firstWord}
            </h2>
            {restOfTitle && (
              <h2
                style={{
                  display: "block",
                  transform: titleRight,
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  fontWeight: 700,
                  color: "white",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                }}
              >
                {restOfTitle}
              </h2>
            )}
            {scrollToExpand && progress < 0.05 && (
              <p
                style={{
                  marginTop: 12,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                ↓ {scrollToExpand}
              </p>
            )}
          </div>
        )}

        {/* Vídeo */}
        <div
          style={{
            width: `${vwNow}vw`,
            height: `${vhNow}vh`,
            borderRadius: `${Math.max(20 - progress * 18, 2)}px`,
            overflow: "hidden",
            position: "relative",
            background: "transparent",
            boxShadow:
              "0 20px 30px rgba(0,0,0,0.9), 0 10px 30px rgba(0,0,0,0.9)",
          }}
        >
          <video
            src={mediaSrc}
            poster={posterSrc}
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: `blur(${blurValue}px)`,
            }}
          />
        </div>
      </figure>
    </section>
  );
};

export default ScrollExpandMedia;
