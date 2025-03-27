" use client";
import { useState } from "react";
import { Button, FileInput, NumberInput } from "@mantine/core";

const Sidebar = ({ onMediaUpload, onSizeChange, onTimeChange }) => {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(10);

  return (
    <div
      style={{ width: "250px", padding: "10px", borderRight: "1px solid #ccc" }}
    >
      <h3>Add Media</h3>
      <FileInput
        placeholder="Upload Video/Image"
        accept="video/*,image/*"
        onChange={(file) => onMediaUpload(file)}
      />

      <h4>Adjust Size</h4>
      <NumberInput
        label="Width"
        value={width}
        onChange={(val) => {
          setWidth(val);
          onSizeChange("width", val);
        }}
      />
      <NumberInput
        label="Height"
        value={height}
        onChange={(val) => {
          setHeight(val);
          onSizeChange("height", val);
        }}
      />

      <h4>Set Time</h4>
      <NumberInput
        label="Start Time"
        value={startTime}
        onChange={(val) => {
          setStartTime(val);
          onTimeChange("start", val);
        }}
      />
      <NumberInput
        label="End Time"
        value={endTime}
        onChange={(val) => {
          setEndTime(val);
          onTimeChange("end", val);
        }}
      />
    </div>
  );
};

export default Sidebar;
