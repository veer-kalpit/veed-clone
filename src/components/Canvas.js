"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const Canvas = ({
  media,
  width,
  height,
  startTime,
  endTime,
  isPlaying,
  onTimeUpdate,
}) => {
  const videoRef = useRef(null);
  const draggableRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime; // Start video at startTime when loaded
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, startTime]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const current = videoRef.current.currentTime;
        onTimeUpdate(current);

        if (current >= endTime) {
          videoRef.current.pause();
        }
      }
    };

    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [endTime, onTimeUpdate]);

  if (!media) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Upload a media file
      </div>
    );
  }

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Draggable nodeRef={draggableRef} bounds="parent">
        <div ref={draggableRef}>
          <ResizableBox
            width={width}
            height={height}
            minConstraints={[100, 100]}
            maxConstraints={[800, 600]}
          >
            {media.type.startsWith("image") ? (
              <Image
                src={URL.createObjectURL(media)}
                alt="Uploaded"
                style={{ width: "100%", height: "100%" }}
                width={width || 100}
                height={height || 100}
              />
            ) : (
              <video
                ref={videoRef}
                src={URL.createObjectURL(media)}
                style={{ width: "100%", height: "100%" }}
                controls
              />
            )}
          </ResizableBox>
        </div>
      </Draggable>
    </div>
  );
};

export default Canvas;
