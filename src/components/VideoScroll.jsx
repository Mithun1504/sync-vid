import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
// Correct path to video asset (assuming src/components/VideoScroll.jsx relative to root assets/video.mp4)
import videoSrc from '../../assets/video.mp4';

gsap.registerPlugin(ScrollTrigger);

const VideoScroll = () => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);

    useGSAP((context, contextSafe) => {
        const video = videoRef.current;
        if (!video) return;

        // Wrap with contextSafe so these animations are cleaned up automatically
        const setupAnimation = contextSafe(() => {
            if (!video.duration) return;

            // Use a proxy object to decouple the scroll position from the video.currentTime
            // This allows us to use GSAP's internal ticker for smoother updates
            const videoState = { currentTime: 0 };

            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=10000", // Huge scroll distance (10,000 pixels) to accommodate 32s video
                    scrub: 1, // Smooth scrubbing (1s catch-up)
                    pin: true,
                    markers: false,
                }
            })
                .to(videoState, {
                    currentTime: video.duration,
                    ease: "none",
                    onUpdate: () => {
                        // Optimized update: check if value significantly changed
                        if (Math.abs(video.currentTime - videoState.currentTime) > 0.05) {
                            video.currentTime = videoState.currentTime;
                        }
                    }
                });
        });

        if (video.readyState >= 1) {
            setupAnimation();
        } else {
            video.onloadedmetadata = setupAnimation;
        }

        /* 
           Cleanup logic handled by useGSAP for GSAP objects.
           We might want to remove the event listener manually on unmount, 
           but since 'setupAnimation' is contextSafe, it's bound.
           To remove listener:
        */
        return () => {
            video.onloadedmetadata = null;
        };

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="video-scroll-container">
            <video
                ref={videoRef}
                className="scroll-video"
                src={videoSrc}
                muted
                playsInline
                preload="auto"
            />
            <div className="scroll-indicator">
                Scroll to Play
            </div>
        </div>
    );
};

export default VideoScroll;
