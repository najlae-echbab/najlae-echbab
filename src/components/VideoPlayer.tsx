import React from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string | undefined;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  return (
    <div className="video-player p-4 ">
      <ReactPlayer url={url} controls={true} width={"100%"} height={"30rem"} />
    </div>
  );
};

export default VideoPlayer;
