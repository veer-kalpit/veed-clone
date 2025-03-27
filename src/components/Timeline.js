const Timeline = ({ duration, currentTime, onTimeChange }) => {
  return (
    <div
      style={{
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: "1px solid #ccc",
      }}
    >
      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={(e) => onTimeChange(parseFloat(e.target.value))}
      />
      <span>{currentTime.toFixed(1)}s</span>
    </div>
  );
};

export default Timeline;
