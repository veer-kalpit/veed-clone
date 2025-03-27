"use client";
"use client";

import Image from "next/image";
import { useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const Canvas = ({ media, width, height, startTime, endTime, currentTime }) => {
  const mediaRef = useRef(null);
  const draggableRef = useRef(null); // ✅ Fix for React 18

  if (!media)
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

  const isVisible = currentTime >= startTime && currentTime <= endTime;

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
      {isVisible && (
        <Draggable nodeRef={draggableRef} bounds="parent">
          <div ref={draggableRef}>
            {" "}
            {/* ✅ Prevents findDOMNode error */}
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
                  height={height ||100}   
                />
              ) : (
                <video
                  ref={mediaRef}
                  src={URL.createObjectURL(media)}
                  style={{ width: "100%", height: "100%" }}
                  controls
                />
              )}
            </ResizableBox>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default Canvas;
