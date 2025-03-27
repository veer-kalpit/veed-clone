"use client";

import { useState, useEffect, useRef } from "react";
import { Slider } from "@mantine/core";
import Image from "next/image";

const Frames = ({ videoSrc, setStartTime, setEndTime }) => {
  const [frames, setFrames] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoSrc) return;

    const captureFrames = async () => {
      const video = document.createElement("video");
      video.src = videoSrc;
      video.crossOrigin = "anonymous";
      video.currentTime = 0;
      video.muted = true;

      const frameInterval = 1; // Capture every second
      const totalFrames = 10; // Number of thumbnails

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const extractedFrames = [];

      for (let i = 0; i < totalFrames; i++) {
        await new Promise((resolve) => {
          video.onseeked = () => {
            canvas.width = 100;
            canvas.height = 60;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            extractedFrames.push(canvas.toDataURL());
            resolve();
          };
          video.currentTime = i * frameInterval;
        });
      }

      setFrames(extractedFrames);
    };

    captureFrames();
  }, [videoSrc]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <p>Trim Video</p>
      <div style={{ display: "flex", gap: 5, overflowX: "auto" }}>
        {frames.map((frame, index) => (
          <Image
            key={index}
            src={frame}
            alt={`Frame ${index}`}
            style={{ width: 50, height: 30, cursor: "pointer" }}
          />
        ))}
      </div>
      <Slider
        min={0}
        max={10}
        step={1}
        labelAlwaysOn
        defaultValue={[0, 10]}
        onChange={(value) => {
          setStartTime(value[0]);
          setEndTime(value[1]);
        }}
      />
    </div>
  );
};

export default Frames;
