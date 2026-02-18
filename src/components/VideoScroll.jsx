import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
// Correct path to video asset
import videoSrc from '../../assets/video.mp4';
import Navbar from './Navbar';

gsap.registerPlugin(ScrollTrigger);

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
    const videoRef = useRef(null);
    const videoState = useRef({ currentTime: 0 });

    useGSAP((context, contextSafe) => {
        const video = videoRef.current;
        if (!video) return;

        const setupAnimation = contextSafe(() => {
            if (!video.duration) return;

            // MASTER TIMELINE
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=10000",
                    scrub: 1,
                    pin: true,
                    markers: false,
                    id: "master-scrub"
                }
            });

            // 1. VIDEO SCRUBBING
            tl.to(videoState.current, {
                currentTime: video.duration,
                duration: 1.0,
                ease: "none",
                onUpdate: () => {
                    if (Math.abs(video.currentTime - videoState.current.currentTime) > 0.05) {
                        video.currentTime = videoState.current.currentTime;
                    }
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
        });

        if (video.readyState >= 1) {
            setupAnimation();
        } else {
            video.onloadedmetadata = setupAnimation;
        }

        return () => {
            video.onloadedmetadata = null;
        };

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="video-scroll-container">
            <Navbar />
            <video
                ref={videoRef}
                className="scroll-video"
                src={videoSrc}
                muted
                playsInline
                preload="auto"
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
