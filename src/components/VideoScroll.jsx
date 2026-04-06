import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import Navbar from "./Navbar";
import SectionDetailModal from "./SectionDetailModal";
import { getSectionDetail } from "./sectionDetails";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const FRAME_COUNT = 374;
const frames = Array.from({ length: FRAME_COUNT }, (_, i) => {
  const frameNumber = String(i + 1).padStart(3, "0");
  return `${import.meta.env.VITE_S3_ASSETS_URL}/assets/frames/${frameNumber}.webp`;
});

const contentData = [
  {
    id: "home",
    title: "Sync Your Inner World. Transform Your Outer Reality.",
    subtitle:
      "For individuals seeking a quieter alignment between how they think, feel, and act.",
    text: "Bring clarity and steadiness to both inner and outer life.",
    ctaLabel: "Start Your Journey",
    position: "left",
    start: 0.0,
    end: 0.12,
  },
  {
    id: "about",
    title:
      "Everything seems in place. Yet something feels slightly out of alignment.",
    subtitle: "Signals of inner friction that quietly affect daily clarity.",
    text: "A mind that does not settle, unclear direction, emotional fluctuation, repeating patterns, and a sense of untapped depth.",
    ctaLabel: "Learn More",
    isExpandable: true,
    detailKey: "about",
    position: "right",
    start: 0.14,
    end: 0.26,
  },
  {
    id: "individuals",
    title: "A quieter way to bring things into alignment.",
    subtitle:
      "An integrated approach that works across thought patterns, identity shifts, and practical action.",
    text: "Grounded in real-world experience, it connects inner work with external execution.",
    ctaLabel: "Learn More",
    isExpandable: true,
    detailKey: "individuals",
    position: "left",
    start: 0.28,
    end: 0.4,
  },
  {
    id: "offerings",
    title: "Offerings",
    subtitle: "1:1 deep work, structured programs, and group workshop formats.",
    text: "Choose focused support for personal alignment, professional growth, and institutional transformation.",
    ctaLabel: "Learn More",
    isExpandable: true,
    detailKey: "offerings",
    position: "right",
    start: 0.42,
    end: 0.54,
  },
  {
    id: "outcomes",
    title: "What begins to shift",
    subtitle: "Clear and practical changes that show up in real life.",
    text: "Greater decision clarity, steadier emotions, stronger direction, less internal friction, and easier action.",
    ctaLabel: "Learn More",
    isExpandable: true,
    detailKey: "outcomes",
    position: "left",
    start: 0.56,
    end: 0.64,
  },
  {
    id: "testimonials",
    title: "Testimonials",
    subtitle: "Voices from students, professionals, and founders.",
    text: "See how future student, professional, and founder stories can live here in a fuller format.",
    ctaLabel: "Learn More",
    isExpandable: true,
    detailKey: "testimonials",
    position: "right",
    start: 0.66,
    end: 0.76,
  },
  {
    id: "philosophy",
    title: "Philosophy",
    subtitle: "The gap is rarely information; it is alignment.",
    text: "The work brings thought, feeling, and action into quiet coherence instead of adding more noise.",
    ctaLabel: "Learn More",
    isExpandable: true,
    detailKey: "philosophy",
    position: "left",
    start: 0.78,
    end: 0.88,
  },
  {
    id: "contact",
    title: "Start Your Journey",
    subtitle: "Book a Discovery Call",
    text: "Free 15-minute consultation. Let's align.",
    position: "center",
    start: 0.9,
    end: 1.0,
  },
];

const sectionLayout = {
  home: {
    top: "44%",
    width: "42%",
    left: "10%",
  },
  testimonials: {
    top: "50%",
    width: "34%",
    right: "6%",
  },
};

const VideoScroll = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef([]); // Use ref to store images without re-renders
  const [fadeOut, setFadeOut] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [activeDetailSection, setActiveDetailSection] = useState(null);
  const lastTriggerRef = useRef(null);
  const isModalOpen = Boolean(activeDetailSection);
  const activeDetailContent = activeDetailSection
    ? getSectionDetail(activeDetailSection)
    : null;

  useEffect(() => {
    if (!isModalOpen) return undefined;

    const root = document.documentElement;
    const { body } = document;
    const originalStyle = {
      rootOverflow: root.style.overflow,
      rootOverscrollBehavior: root.style.overscrollBehavior,
      overflow: body.style.overflow,
      overscrollBehavior: body.style.overscrollBehavior,
    };

    const preventScroll = (event) => {
      if (event.target.closest(".section-detail-body")) return;
      event.preventDefault();
    };

    const preventScrollKeys = (event) => {
      const scrollKeys = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ];

      if (!scrollKeys.includes(event.key)) return;
      if (event.target.closest(".section-detail-body")) return;

      event.preventDefault();
    };

    gsap.killTweensOf(window);
    root.style.overflow = "hidden";
    root.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventScrollKeys, { passive: false });

    return () => {
      root.style.overflow = originalStyle.rootOverflow;
      root.style.overscrollBehavior = originalStyle.rootOverscrollBehavior;
      body.style.overflow = originalStyle.overflow;
      body.style.overscrollBehavior = originalStyle.overscrollBehavior;
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventScrollKeys);
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen || !lastTriggerRef.current) return;
    lastTriggerRef.current.focus();
  }, [isModalOpen]);

  // Preload images progressively
  useEffect(() => {
    let loadedCount = 0;
    const MIN_FRAMES_TO_START = 50;

    // Initialize array to preserve order
    imagesRef.current = new Array(frames.length);

    frames.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imagesRef.current[index] = img;
        loadedCount++;

        // Start experience if we have enough frames OR if we're done
        if (
          !imagesLoaded &&
          (loadedCount === MIN_FRAMES_TO_START || loadedCount === frames.length)
        ) {
          setImagesLoaded(true);
          setFadeOut(true);
          setTimeout(() => {
            setLoaderVisible(false);
          }, 500);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load frame ${index}`);
        loadedCount++;
        // Still count errors so we don't hang if everything fails
        if (
          !imagesLoaded &&
          (loadedCount === MIN_FRAMES_TO_START || loadedCount === frames.length)
        ) {
          setImagesLoaded(true);
          setFadeOut(true);
          setTimeout(() => {
            setLoaderVisible(false);
          }, 500);
        }
      };
    });
  }, []);

  // Render logic with interpolation
  const renderFrame = (index, context, canvas) => {
    if (!canvas || !context) return;
    const images = imagesRef.current; // Use ref instead of state

    const w = canvas.width;
    const h = canvas.height;
    context.clearRect(0, 0, w, h);

    // Get integer parts
    const idx1 = Math.floor(index);
    const idx2 = Math.min(idx1 + 1, FRAME_COUNT - 1);
    const alpha = index - idx1; // fractional part for opacity

    const drawImage = (img, opacity) => {
      if (!img) return;
      const imgW = img.width;
      const imgH = img.height;
      const scale = Math.max(w / imgW, h / imgH);
      const x = (w - imgW * scale) / 2;
      const y = (h - imgH * scale) / 2;

      context.globalAlpha = opacity;
      context.drawImage(img, x, y, imgW * scale, imgH * scale);
      context.globalAlpha = 1.0; // Reset
    };

    // Draw current frame
    drawImage(images[idx1], 1);

    // Blend next frame if needed
    if (alpha > 0 && idx1 !== idx2) {
      drawImage(images[idx2], alpha);
    }
  };

  useGSAP(
    (context, contextSafe) => {
      if (!imagesLoaded) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Initial render
      const updateCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        renderFrame(0, ctx, canvas);
      };

      window.addEventListener("resize", updateCanvasSize);
      updateCanvasSize();

      const frameState = { current: 0 };
      const totalFrames = FRAME_COUNT - 1;

      // MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=20000",
          scrub: 3,
          pin: true,
          markers: false,
          id: "master-scrub",
        },
      });

      // 1. FRAME SCRUBBING
      tl.to(
        frameState,
        {
          current: totalFrames,
          duration: 1.0,
          ease: "none",
          onUpdate: () => {
            // Pass float value for interpolation
            renderFrame(frameState.current, ctx, canvas);
          },
        },
        0,
      );

      // 2. CONTENT ANIMATIONS
      const sections = gsap.utils.toArray(".content-section");
      sections.forEach((section, i) => {
        const data = contentData[i];
        const nextData = contentData[i + 1];
        const layoutPosition =
          data.id === "testimonials" ? "right" : data.position;
        const isCentered = layoutPosition === "center";
        const isRight = layoutPosition === "right";
        const isLeft = layoutPosition === "left";
        const customLayout = sectionLayout[data.id] || {};
        const fadeDuration = 0.03;
        const fadeOutStart = nextData
          ? Math.max(nextData.start - fadeDuration, data.start + 0.015)
          : Math.max(data.end - fadeDuration, data.start + 0.015);

        gsap.set(section, {
          top: customLayout.top || "50%",
          left:
            customLayout.left || (isCentered || isLeft ? (isCentered ? "50%" : "10%") : "auto"),
          right: customLayout.right || (isRight ? "10%" : "auto"),
          width: customLayout.width || (isCentered ? "60%" : "40%"),
          textAlign: isCentered ? "center" : isRight ? "right" : "left",
          yPercent: -50,
          xPercent: isCentered ? -50 : 0,
        });

        // Initial State
        if (i === 0) {
          gsap.set(section, { autoAlpha: 1, y: 0 });
          // Only fade out
          tl.to(
            section,
            { autoAlpha: 0, y: -50, duration: fadeDuration },
            fadeOutStart,
          );
        } else {
          // Fade In
          tl.fromTo(
            section,
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: fadeDuration, ease: "power2.out" },
            data.start,
          );
          // Fade Out
          tl.to(
            section,
            { autoAlpha: 0, y: -50, duration: fadeDuration },
            fadeOutStart,
          );
        }
      });

      return () => window.removeEventListener("resize", updateCanvasSize);
    },
    { scope: containerRef, dependencies: [imagesLoaded] },
  );

  const handleNavigate = (id) => {
    const item = contentData.find((d) => d.id === id);
    if (!item) return;

    const st = ScrollTrigger.getById("master-scrub");
    if (st) {
      const totalDistance = st.end - st.start;
      const targetPos = st.start + totalDistance * item.start;

      // Calculate duration based on distance to keep speed roughly consistent, but cap it
      // Or just use a fixed "fast but smooth" duration as requested
      gsap.to(window, {
        scrollTo: targetPos,
        duration: 4.5, // 2.5s to traverse. Adjust as needed.
        ease: "power2.inOut",
      });
    }
  };

  const openSectionDetail = (id, triggerElement) => {
    const detail = getSectionDetail(id);
    if (!detail) return;

    lastTriggerRef.current = triggerElement;
    setActiveDetailSection(id);
  };

  const closeSectionDetail = () => {
    setActiveDetailSection(null);
  };

  return (
    <div
      ref={containerRef}
      className={`video-scroll-container ${isModalOpen ? "modal-open" : ""}`}
    >
      <Navbar onNavigate={handleNavigate} />

      {loaderVisible && (
        <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>
          <img
            src="/assets/images/favicon.png"
            alt="Loading..."
            className="loading-logo"
          />
          <p>Loading Experience...</p>
        </div>
      )}

      <canvas ref={canvasRef} className="scroll-canvas" />

      <div className="video-overlay-gradient"></div>

      <div className="content-overlay-container">
        {contentData.map((item) => (
          <div
            key={item.id}
            className={`content-section position-${item.id === "testimonials" ? "right" : item.position}`}
          >
            <h2 className="content-title">{item.title}</h2>
            <h3 className="content-subtitle">{item.subtitle}</h3>
            <p className="content-text">{item.text}</p>
            <button
              type="button"
              className="cta-button"
              aria-haspopup={item.isExpandable ? "dialog" : undefined}
              aria-expanded={
                item.isExpandable
                  ? activeDetailSection === item.detailKey
                  : undefined
              }
              onClick={
                item.isExpandable
                  ? (event) => openSectionDetail(item.detailKey, event.currentTarget)
                  : undefined
              }
            >
              {item.ctaLabel || "Learn More"}
            </button>
          </div>
        ))}
      </div>

      <SectionDetailModal
        isOpen={isModalOpen}
        section={activeDetailContent}
        onClose={closeSectionDetail}
      />

      <div className="scroll-indicator">Scroll to Explore</div>
    </div>
  );
};

export default VideoScroll;
