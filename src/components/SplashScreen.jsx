import React, { useState, useRef } from 'react';
import { Sparkles, ArrowRight, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import '../styles/SplashScreen.css';

export default function SplashScreen({ onComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const handleDismiss = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 500); // match fade out transition duration
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`splash-screen-overlay ${isFadingOut ? 'splash-fade-out' : ''}`}>
      {/* 1. Fullscreen / Card Video Player */}
      <video
        ref={videoRef}
        className="splash-video-element"
        src="/splash-video.mp4"
        autoPlay
        muted={isMuted}
        playsInline
        onEnded={handleDismiss}
      />

      {/* 2. Soft Glassmorphic Video Overlay Mask */}
      <div className="splash-video-overlay" />

      {/* 3. Top Action Controls */}
      <div className="splash-top-controls">
        <button 
          className="splash-control-btn" 
          onClick={toggleMute} 
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{isMuted ? "Sound Off" : "Sound On"}</span>
        </button>

        <button 
          className="splash-control-btn" 
          onClick={togglePlay} 
          title={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <button 
          className="splash-skip-btn" 
          onClick={handleDismiss}
          aria-label="Enter InternHub App"
        >
          <span>Enter Platform</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* 4. Centered Logo & Brand Overlay */}
      <div className="splash-content-box video-mode">
        <div className="splash-logo-backdrop">
          <div className="splash-pulse-ring ring-1" />
          <div className="splash-pulse-ring ring-2" />
          <div className="splash-aura-light" />
        </div>

        <div className="splash-logo-container">
          <div className="splash-brand-icon-wrapper">
            <Sparkles size={44} className="splash-sparkle-icon" />
          </div>
          
          <div className="splash-brand-text">
            <span className="splash-title-intern">Intern</span>
            <span className="splash-title-hub">Hub</span>
          </div>
        </div>

        <p className="splash-tagline">
          Internship Management, Simplified
        </p>

        {/* Video Progress Shimmer Bar */}
        <div className="splash-loader-wrapper">
          <div className="splash-loader-bar" />
        </div>
      </div>
    </div>
  );
}
