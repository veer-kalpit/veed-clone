"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const MediaItem = ({ media, width, height, setWidth, setHeight }) => {
  const itemRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
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
    <Draggable nodeRef={itemRef} bounds="parent">
      <div
        ref={itemRef}
        style={{ position: "absolute", border: "1px solid #ccc" }}
      >
        <ResizableBox
          width={width}
          height={height}
          lockAspectRatio
          minConstraints={[50, 50]}
          maxConstraints={[800, 600]}
          onResizeStop={(e, data) => {
            setWidth(data.size.width);
            setHeight(data.size.height);
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {media.type.startsWith("image") ? (
              <Image
                src={URL.createObjectURL(media)}
                alt="Uploaded"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : (
              <video
                ref={videoRef}
                src={URL.createObjectURL(media)}
                style={{ width: "100%", height: "100%" }}
                controls
              />
            )}
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default MediaItem;
