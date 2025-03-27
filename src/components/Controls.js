"use client"

import { useState, useEffect } from "react";
import { Button } from "@mantine/core";

const Controls = ({ onPlayPause, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev < duration ? prev + 0.1 : 0));
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Button
        onClick={() => {
          setIsPlaying(!isPlaying);
          onPlayPause(!isPlaying);
        }}
      >
        {isPlaying ? "Pause" : "Play"}
      </Button>
      <span>{currentTime.toFixed(1)}s</span>
    </div>
  );
};

export default Controls;
