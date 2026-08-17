"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";

const FRAME_COUNT = 240;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  // We use a MotionValue directly so we can manually animate it
  const frameIndex = useMotionValue(1);
  const isAnimating = useRef(false);

  // 3D text transforms mapped to the frame sequence
  const textScale = useTransform(frameIndex, [1, 150, 240], [1, 1, 1.4]);
  const textOpacity = useTransform(frameIndex, [1, 150, 210, 240], [1, 1, 0, 0]);
  const textRotateX = useTransform(frameIndex, [1, 200, 240], [0, 25, 40]);
  const textY = useTransform(frameIndex, [1, 240], [0, -150]);
  const textBlur = useTransform(frameIndex, [1, 150, 240], ["blur(0px)", "blur(0px)", "blur(15px)"]);

  // Set initial frameIndex based on scroll position
  useEffect(() => {
    if (window.scrollY > 10) {
      frameIndex.set(FRAME_COUNT);
    }
  }, [frameIndex]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/herosection/hero1/ezgif-frame-${paddedIndex}.webp`;
      
      img.onload = () => {
        if (i === 1) {
          window.dispatchEvent(new Event('resize'));
        }
      };
      
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Subscribe to frameIndex changes to draw to canvas
  useEffect(() => {
    return frameIndex.on("change", (latest) => {
      if (!canvasRef.current || images.length === 0) return;
      
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      const currentFrame = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(latest) - 1));
      const img = images[currentFrame];
      
      if (img && img.complete && img.naturalWidth > 0) {
        drawCover(canvasRef.current, ctx, img);
      }
    });
  }, [images, frameIndex]);

  // Handle resize and initial draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      const ctx = canvas.getContext("2d");
      if (!ctx || images.length === 0) return;
      ctx.scale(dpr, dpr);
      
      const currentFrame = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(frameIndex.get()) - 1));
      const img = images[currentFrame] || images[0];
      
      if (img && img.complete && img.naturalWidth > 0) {
        drawCover(canvas, ctx, img);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => window.removeEventListener("resize", handleResize);
  }, [images, frameIndex]);

  const drawCover = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    const canvasRatio = cw / ch;
    const imgRatio = img.width / img.height;

    let drawWidth = cw;
    let drawHeight = ch;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = cw / imgRatio;
      offsetY = (ch - drawHeight) / 2;
    } else {
      drawWidth = ch * imgRatio;
      offsetX = (cw - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Scroll Jacking Logic
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If we are actively animating, block scroll completely
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }

      const isAtTop = window.scrollY <= 10;
      const current = frameIndex.get();

      // If at top of page, and user scrolls down, and we haven't played yet
      if (isAtTop && e.deltaY > 0 && current < FRAME_COUNT) {
        e.preventDefault();
        isAnimating.current = true;
        animate(frameIndex, FRAME_COUNT, {
          duration: 2.5,
          ease: "easeInOut",
          onComplete: () => {
            isAnimating.current = false;
            // Auto-scroll slightly to reveal the next section
            window.scrollTo({
              top: window.innerHeight * 0.2, // Scroll down 20vh
              behavior: "smooth"
            });
          }
        });
      } 
      // If at top of page, and user scrolls up, and we are at the end of the animation
      else if (isAtTop && e.deltaY < 0 && current > 1) {
        e.preventDefault();
        isAnimating.current = true;
        animate(frameIndex, 1, {
          duration: 2.5,
          ease: "easeInOut",
          onComplete: () => {
            isAnimating.current = false;
          }
        });
      }
    };

    // Needs passive: false to allow preventDefault
    window.addEventListener("wheel", handleWheel, { passive: false });
    
    // Also handle touch for mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }
      
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      const isAtTop = window.scrollY <= 10;
      const current = frameIndex.get();

      if (isAtTop && deltaY > 10 && current < FRAME_COUNT) {
        e.preventDefault();
        isAnimating.current = true;
        animate(frameIndex, FRAME_COUNT, {
          duration: 2.5,
          ease: "easeInOut",
          onComplete: () => {
            isAnimating.current = false;
            window.scrollTo({
              top: window.innerHeight * 0.2,
              behavior: "smooth"
            });
          }
        });
      } else if (isAtTop && deltaY < -10 && current > 1) {
        e.preventDefault();
        isAnimating.current = true;
        animate(frameIndex, 1, {
          duration: 2.5,
          ease: "easeInOut",
          onComplete: () => {
            isAnimating.current = false;
          }
        });
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [frameIndex]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative z-10 w-full bg-midnight h-screen" 
      aria-label="Hero scroll sequence"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* The sequence canvas with cinematic entrance */}
        <motion.canvas
          ref={canvasRef}
          initial={{ scale: 1.15, filter: "blur(20px)", opacity: 0 }}
          animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Top-to-bottom dark gradient overlay for text legibility */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(13, 20, 33, 0.4) 0%, transparent 40%, transparent 60%, rgba(13, 20, 33, 0.7) 100%)"
          }}
        />

        {/* Existing LEAHVIGOR text */}
        <motion.div 
          style={{
            scale: textScale,
            opacity: textOpacity,
            rotateX: textRotateX,
            y: textY,
            filter: textBlur,
            transformPerspective: 1000
          }}
          className="absolute inset-0 flex items-center justify-start px-8 lg:px-16 pointer-events-none z-10 max-w-[1400px] mx-auto w-full"
        >
          <motion.div className="relative inline-block">
            <h1
              className="font-display font-medium leading-tight tracking-[0.05em] uppercase flex"
              style={{ 
                fontSize: "clamp(2.5rem, 7vw, 7rem)",
              }}
            >
              {"LEAHVIGOR".split("").map((letter, i) => {
                // We create individual transforms for each letter for a true scroll-linked letter-by-letter exit!
                // LEAHVIGOR has 9 letters. We stagger the exit so L fades first, then E, etc.
                const exitStart = 20 + i * 15;
                const exitEnd = exitStart + 30;
                
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const letterOpacity = useTransform(frameIndex, [1, exitStart, exitEnd], [1, 1, 0]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const letterY = useTransform(frameIndex, [1, exitStart, exitEnd], [0, 0, -50]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const letterScale = useTransform(frameIndex, [1, exitStart, exitEnd], [1, 1, 0.8]);

                return (
                  <motion.span
                    key={i}
                    style={{ 
                      opacity: letterOpacity, 
                      y: letterY, 
                      scale: letterScale 
                    }}
                    className="relative inline-block"
                  >
                    {/* The entrance animation is handled by a wrapper span so it doesn't conflict with useTransform */}
                    <motion.span
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.3 + i * 0.15, // Slow, deliberate letter-by-letter entrance
                        ease: "easeOut" 
                      }}
                      className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-200"
                      style={{
                        // The requested blue around the letters
                        WebkitTextStroke: "1px rgba(99,102,241,0.4)",
                        filter: "drop-shadow(0 0 15px rgba(99,102,241,0.6))"
                      }}
                    >
                      {letter}
                    </motion.span>
                  </motion.span>
                );
              })}
            </h1>
            
            {/* Premium Blue Underline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-1 lg:-bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-600 via-blue-400 to-cyan-400 origin-left rounded-full shadow-[0_0_20px_rgba(96,165,250,0.6)]"
            />
          </motion.div>
        </motion.div>

        {/* Bottom text overlays */}
        <motion.div 
          style={{
            opacity: textOpacity,
            y: textY,
            filter: textBlur,
          }}
          className="absolute bottom-24 left-0 right-0 max-w-[1400px] mx-auto px-8 lg:px-16 w-full z-20 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <h2 className="font-sans text-2xl md:text-3xl lg:text-4xl text-white font-medium tracking-wide leading-tight drop-shadow-md mb-4 flex flex-wrap gap-x-2">
              {"Accelerate your".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 + i * 0.1, ease: "easeOut" }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-400 italic font-display drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]"
              >
                growth.
              </motion.span>
            </h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="font-sans text-sm md:text-base text-slate-300 font-light leading-relaxed max-w-sm"
            >
              Complexity is inevitable. How you harness it defines your future.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Centered Scroll Down Hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-300 drop-shadow-lg z-20 pointer-events-none">
          <motion.span 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-[10px] font-sans tracking-[0.2em] uppercase text-indigo-300"
          >
            [Scroll Down]
          </motion.span>
        </div>
      </div>
    </section>
  );
}
