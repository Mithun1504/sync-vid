import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import Navbar from './Navbar';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const FRAME_COUNT = 374;
const frames = Array.from({ length: FRAME_COUNT }, (_, i) => {
    const frameNumber = String(i + 1).padStart(3, '0');
    return `${import.meta.env.VITE_S3_ASSETS_URL}/assets/frames/${frameNumber}.webp`;
});

const contentData = [
    {
        id: 'home',
        title: "Aligning your worlds.",
        subtitle: "Bridging psychological depth and spiritual expansion.",
        text: "Sync Method: Integration of Mind + Body + Spirit.",
        position: 'left',
        start: 0,
        end: 0.15,
    },
    {
        id: 'about',
        title: "About Sync",
        subtitle: "Metamorphosis Blueprint",
        text: "Founded on clinical expertise and intuitive experience. We guide you through deep alignment.",
        position: 'right',
        start: 0.20,
        end: 0.35,
    },
    {
        id: 'individuals',
        title: "For Individuals",
        subtitle: "Safety, Reassurance, Connection",
        text: "1:1 Alignment Sessions, Psycho-spiritual counseling, Shadow work, and Retreats.",
        position: 'left',
        start: 0.40,
        end: 0.55,
    },
    {
        id: 'professionals',
        title: "For Professionals",
        subtitle: "Authority, Structure, ROI",
        text: "Certification Programs, Sync Facilitator training, and Corporate Consulting.",
        position: 'right',
        start: 0.60,
        end: 0.75,
    },
    {
        id: 'library',
        title: "Library",
        subtitle: "Science of Spirit",
        text: "Explore our blog, guided meditations, and recommended reading on psychology and spirituality.",
        position: 'left',
        start: 0.80,
        end: 0.90,
    },
    {
        id: 'contact',
        title: "Start Your Journey",
        subtitle: "Book a Discovery Call",
        text: "Free 15-minute consultation. Let's align.",
        position: 'center',
        start: 0.92,
        end: 1.0,
    }
];

const VideoScroll = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const imagesRef = useRef([]); // Use ref to store images without re-renders
    const [fadeOut, setFadeOut] = useState(false);
    const [loaderVisible, setLoaderVisible] = useState(true);

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
                if (!imagesLoaded && (loadedCount === MIN_FRAMES_TO_START || loadedCount === frames.length)) {
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
                if (!imagesLoaded && (loadedCount === MIN_FRAMES_TO_START || loadedCount === frames.length)) {
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
            const x = (w - (imgW * scale)) / 2;
            const y = (h - (imgH * scale)) / 2;

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

    useGSAP((context, contextSafe) => {
        if (!imagesLoaded) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Initial render
        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(0, ctx, canvas);
        };

        window.addEventListener('resize', updateCanvasSize);
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
                id: "master-scrub"
            }
        });

        // 1. FRAME SCRUBBING
        tl.to(frameState, {
            current: totalFrames,
            duration: 1.0,
            ease: "none",
            onUpdate: () => {
                // Pass float value for interpolation
                renderFrame(frameState.current, ctx, canvas);
            }
        }, 0);

        // 2. CONTENT ANIMATIONS
        const sections = gsap.utils.toArray('.content-section');
        sections.forEach((section, i) => {
            const data = contentData[i];

            // Initial State
            if (i === 0) {
                gsap.set(section, { opacity: 1, y: 0 });
                // Only fade out
                tl.to(section, { opacity: 0, y: -50, duration: 0.05 }, data.end);
            } else {
                // Fade In
                tl.fromTo(section,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" },
                    data.start
                );
                // Fade Out
                tl.to(section,
                    { opacity: 0, y: -50, duration: 0.05 },
                    data.end
                );
            }
        });

        return () => window.removeEventListener('resize', updateCanvasSize);

    }, { scope: containerRef, dependencies: [imagesLoaded] });

    const handleNavigate = (id) => {
        const item = contentData.find(d => d.id === id);
        if (!item) return;

        const st = ScrollTrigger.getById("master-scrub");
        if (st) {
            const totalDistance = st.end - st.start;
            const targetPos = st.start + (totalDistance * item.start);

            // Calculate duration based on distance to keep speed roughly consistent, but cap it
            // Or just use a fixed "fast but smooth" duration as requested
            gsap.to(window, {
                scrollTo: targetPos,
                duration: 4.5, // 2.5s to traverse. Adjust as needed.
                ease: "power2.inOut"
            });
        }
    };

    return (
        <div ref={containerRef} className="video-scroll-container">
            <Navbar onNavigate={handleNavigate} />

            {loaderVisible && (
                <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
                    <img src="/assets/images/favicon.png" alt="Loading..." className="loading-logo" />
                    <p>Loading Experience...</p>
                </div>
            )}

            <canvas
                ref={canvasRef}
                className="scroll-canvas"
            />

            <div className="video-overlay-gradient"></div>

            <div className="content-overlay-container">
                {contentData.map((item) => (
                    <div key={item.id} className={`content-section position-${item.position}`}>
                        <h2 className="content-title">{item.title}</h2>
                        <h3 className="content-subtitle">{item.subtitle}</h3>
                        <p className="content-text">{item.text}</p>
                        <button className="cta-button">Learn More</button>
                    </div>
                ))}
            </div>

            <div className="scroll-indicator">
                Scroll to Explore
            </div>
        </div>
    );
};

export default VideoScroll;
