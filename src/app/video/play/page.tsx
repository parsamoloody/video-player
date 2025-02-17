import React from "react";

const VideoPlayer = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <video controls className="w-full max-w-2xl rounded-lg shadow-lg">
        <source src="/path/to/video.mp4" type="video/mp4" />
        <track
          src="/path/to/subtitles.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
          default
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
