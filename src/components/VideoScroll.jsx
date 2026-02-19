import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Navbar from './Navbar';

gsap.registerPlugin(ScrollTrigger);

// Import all frames
const frameModules = import.meta.glob('../../assets/frames/*.png', { eager: true });
const frames = Object.keys(frameModules).sort((a, b) => {
    // Extract numbers from filenames for correct sorting (e.g. 001.png vs 010.png)
    const numA = parseInt(a.match(/(\d+)\.png$/)[1]);
    const numB = parseInt(b.match(/(\d+)\.png$/)[1]);
    return numA - numB;
}).map(path => frameModules[path].default);

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
    const [images, setImages] = useState([]);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const totalFrames = frames.length;
        const loadedImages = [];

        //console.log(`Starting to load ${totalFrames} frames...`);

        frames.forEach((src, index) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedCount++;
                loadedImages[index] = img;
                if (loadedCount === totalFrames) {
                    setImages(loadedImages);
                    setImagesLoaded(true);
                    //console.log("All frames loaded");
                }
            };
            img.onerror = () => {
                // console.error(`Failed to load frame: ${src}`);
                loadedCount++; // Still count to avoid hanging
                if (loadedCount === totalFrames) {
                    setImages(loadedImages);
                    setImagesLoaded(true);
                }
            }
        });
    }, []);

    // Render logic
    const renderFrame = (index, context, canvas) => {
        if (!images[index] || !canvas || !context) return;

        // Calculate "cover" dimensions
        const img = images[index];
        const w = canvas.width;
        const h = canvas.height;
        const imgW = img.width;
        const imgH = img.height;

        const scale = Math.max(w / imgW, h / imgH);
        const x = (w - (imgW * scale)) / 2;
        const y = (h - (imgH * scale)) / 2;

        context.clearRect(0, 0, w, h);
        context.drawImage(img, x, y, imgW * scale, imgH * scale);
    };

    useGSAP((context, contextSafe) => {
        if (!imagesLoaded || images.length === 0) return;

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
        const totalFrames = images.length - 1;

        // MASTER TIMELINE
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=30000",
                scrub: 1, // Increase scrub time for smoother feel with individual frames if needed
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
                const frameIndex = Math.round(frameState.current);
                renderFrame(frameIndex, ctx, canvas);
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

    return (
        <div ref={containerRef} className="video-scroll-container">
            <Navbar />

            {!imagesLoaded && (
                <div className="loading-screen">
                    <div className="loader"></div>
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
