"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";

const FRAME_COUNT = 180;

export default function Hero2() {
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
  // 4 Scroll-linked texts for the bottom left corner
  // Text 0: Leahvigor (Visible immediately on load)
  const text0Opacity = useTransform(frameIndex, [1, 35, 45], [1, 1, 0]);
  const text0Y = useTransform(frameIndex, [1, 45], [0, -20]);

  // Text 1: Digital Marketing
  const text1Opacity = useTransform(frameIndex, [45, 55, 80, 90], [0, 1, 1, 0]);
  const text1Y = useTransform(frameIndex, [45, 90], [20, -20]);

  // Text 2: Talent Acquisition
  const text2Opacity = useTransform(frameIndex, [90, 100, 125, 135], [0, 1, 1, 0]);
  const text2Y = useTransform(frameIndex, [90, 135], [20, -20]);

  // Text 3: Enterprise IT Solutions
  const text3Opacity = useTransform(frameIndex, [135, 145, 175, 180], [0, 1, 1, 0]);
  const text3Y = useTransform(frameIndex, [135, 180], [20, -20]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/herosection/hero2/hero2/ezgif-frame-${paddedIndex}.jpg`;
      
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

    // Force high-quality rendering for the canvas context
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Unified Scroll Jacking & Sync Logic
  useEffect(() => {
    const playAnimationForward = () => {
      isAnimating.current = true;
      animate(frameIndex, FRAME_COUNT, {
        duration: 3.0,
        ease: "linear",
        onComplete: () => {
          window.scrollTo({
            top: window.innerHeight * 0.2,
            behavior: "smooth"
          });
          
          // Delay unlocking the animation state until the smooth scroll has definitely passed 10px.
          // This prevents the native scroll event listener from instantly resetting the animation back to frame 1.
          setTimeout(() => {
            isAnimating.current = false;
          }, 800);
        }
      });
    };

    const playAnimationBackward = () => {
      isAnimating.current = true;
      animate(frameIndex, 1, {
        duration: 3.0,
        ease: "linear",
        onComplete: () => {
          isAnimating.current = false;
        }
      });
    };

    // Native scroll handler for anchor links / logo clicks returning to top
    const handleScroll = () => {
      if (window.scrollY <= 10 && !isAnimating.current) {
        if (frameIndex.get() > 1) {
          // Gracefully play the sequence backwards instead of a jarring snap
          playAnimationBackward();
        }
      }
    };

    // Check initially on mount
    if (window.scrollY > 10) {
      frameIndex.set(FRAME_COUNT);
    }

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }
      const isAtTop = window.scrollY <= 10;
      const current = frameIndex.get();
      
      if (isAtTop && e.deltaY > 0 && current < FRAME_COUNT) {
        e.preventDefault();
        playAnimationForward();
      } else if (isAtTop && e.deltaY < 0 && current > 1) {
        e.preventDefault();
        playAnimationBackward();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating.current) {
        if (window.scrollY <= 10) e.preventDefault();
        return;
      }
      const isAtTop = window.scrollY <= 10;
      const current = frameIndex.get();
      
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        if (isAtTop && current < FRAME_COUNT) {
          e.preventDefault();
          playAnimationForward();
        }
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        if (isAtTop && current > 1) {
          e.preventDefault();
          playAnimationBackward();
        }
      }
    };
    
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

      // Ensure a minimum swipe distance (30px) to prevent accidental triggers
      if (isAtTop && deltaY > 30 && current < FRAME_COUNT) {
        e.preventDefault();
        playAnimationForward();
      } else if (isAtTop && deltaY < -30 && current > 1) {
        e.preventDefault();
        playAnimationBackward();
      }
    };

    // Use passive: false so we can call e.preventDefault() to block native scrolling
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
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
          onAnimationComplete={() => {
            if (canvasRef.current) canvasRef.current.style.filter = "none";
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 4 Scrolling Texts at the Bottom Left */}
        <div className="absolute bottom-12 left-6 md:bottom-16 md:left-12 lg:bottom-24 lg:left-24 pointer-events-none z-20">
          
          <motion.div style={{ opacity: text0Opacity, y: text0Y }} className="absolute bottom-0 left-0">
            <motion.h1 
              initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-white text-5xl md:text-7xl lg:text-8xl uppercase tracking-widest whitespace-nowrap drop-shadow-2xl"
            >
              <span className="relative inline-block">
                LEAH
                <motion.span 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.0, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 -bottom-1 md:-bottom-2 w-full h-[4px] md:h-[6px] bg-gradient-to-r from-indigo-500 via-purple-500 to-violet origin-left rounded-full"
                  style={{ boxShadow: "0px 0px 20px rgba(139, 92, 246, 0.8)" }}
                />
              </span>
              VIGOR
            </motion.h1>
          </motion.div>

          <motion.div style={{ opacity: text1Opacity, y: text1Y }} className="absolute bottom-0 left-0">
            <p className="font-display font-bold text-white text-3xl md:text-4xl lg:text-5xl uppercase tracking-widest whitespace-nowrap drop-shadow-2xl">
              Digital<br/>Marketing
            </p>
          </motion.div>
          
          <motion.div style={{ opacity: text2Opacity, y: text2Y }} className="absolute bottom-0 left-0">
            <p className="font-display font-bold text-white text-3xl md:text-4xl lg:text-5xl uppercase tracking-widest whitespace-nowrap drop-shadow-2xl">
              Talent<br/>Acquisition
            </p>
          </motion.div>
          
          <motion.div style={{ opacity: text3Opacity, y: text3Y }} className="absolute bottom-0 left-0">
            <p className="font-display font-bold text-white text-3xl md:text-4xl lg:text-5xl uppercase tracking-widest whitespace-nowrap drop-shadow-2xl">
              Enterprise<br/>IT Solutions
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
