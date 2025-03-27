"use client";
import { Button } from "@mantine/core";

const Controls = ({ onPlayPause, isPlaying}) => {
  // ✅ Default time to 0
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Button onClick={onPlayPause}>{isPlaying ? "Pause" : "Play"}</Button>
     
    </div>
  );
};

export default Controls;
