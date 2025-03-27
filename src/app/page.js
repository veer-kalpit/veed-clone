"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Canvas from "../components/Canvas";
import Timeline from "../components/Timeline";
import Controls from "../components/Controls";

export default function Home() {
  const [media, setMedia] = useState(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(10);
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
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
        currentTime={currentTime}
      />
      <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Controls
          onPlayPause={(playing) => console.log("Playing:", playing)}
          duration={endTime}
        />
        <Timeline
          duration={endTime}
          currentTime={currentTime}
          onTimeChange={setCurrentTime}
        />
      </div>
    </div>
  );
}
