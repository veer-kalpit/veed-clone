"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Canvas from "../components/Canvas";

import Controls from "../components/Controls";

export default function Home() {
  const [media, setMedia] = useState(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(10);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div style={{ display: "flex", }}>
      <Sidebar
        onMediaUpload={setMedia}
        onSizeChange={(type, value) =>
          type === "width" ? setWidth(value) : setHeight(value)
        }
        onTimeChange={(type, value) =>
          type === "start" ? setStartTime(value) : setEndTime(value)
        }
      />
      <Canvas
        media={media}
        width={width}
        height={height}
        startTime={startTime}
        endTime={endTime}
        isPlaying={isPlaying}
        onTimeUpdate={setCurrentTime}
      />

      <div
        style={{ position: "absolute", bottom: 10, width: "100%", left: 50 }}
      >
        <Controls onPlayPause={setIsPlaying} isPlaying={isPlaying} />
      </div>
    </div>
  );
}
