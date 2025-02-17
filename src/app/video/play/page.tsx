"use client";

import { useState, useRef } from "react";
import { BiRightArrow, BiCheckbox, BiBracket  } from "react-icons/bi";

export const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Range from 0 to 1
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newVolume = parseFloat(e.target.value);
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime =
        (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  const handleFullscreenToggle = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const updateProgressBar = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-gray-900 p-6">
      {!submitted ? (
        <div className="flex flex-col items-center gap-6 max-w-md w-full">
          <h2 className="text-2xl text-white font-semibold mb-4">
            Enter Video URL
          </h2>
          <input
            type="text"
            placeholder="Enter video URL"
            className="p-3 w-full border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-400 transition-all"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <button
            onClick={() => setSubmitted(true)}
            disabled={!videoUrl.trim()}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg transition-all transform hover:bg-blue-500 active:scale-95 disabled:opacity-50"
          >
            Play Video
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 max-w-3xl w-full">
          <video
            ref={videoRef}
            controls={false}
            onTimeUpdate={updateProgressBar}
            className="w-full max-w-2xl rounded-xl shadow-lg bg-black"
          >
            <source src={videoUrl} type="video/mp4" />
            <track
              src="/subtitles.vtt"
              kind="subtitles"
              srcLang="en"
              label="English"
              default
            />
            Your browser does not support the video tag.
          </video>
          <div className="flex flex-col items-center gap-4 mt-4 w-full max-w-2xl">
            {/* Progress Bar */}
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full"
            />
            <div className="flex justify-between w-full">
              {/* Volume Control */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-32"
              />
              {/* Play/Pause Button */}
              <button
                onClick={handlePlayPause}
                className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all"
              >
                {isPlaying ? <BiCheckbox  />
 : <BiRightArrow />
                }
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={handleFullscreenToggle}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all"
              >
                <BiBracket />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
