import React from "react";

const TimeTrackingIndicator = ({
  originalEstimate,
  timeTrackingSpent,
  timeTrackingRemaining,
  spentWidth,
  barHeight = 4,
}) => {
  return (
    <>
      <div
        className="flex bg-gray-300 rounded overflow-hidden cursor-pointer"
        style={{ height: barHeight }}
      >
        <div
          className="h1 bg-blue-600"
          style={{ width: `${spentWidth}%` }}
        ></div>
      </div>
      <div className="flex justify-between">
        <div>{timeTrackingSpent}m logged</div>
        <div className="text-right">{timeTrackingRemaining}m remaining</div>
      </div>
    </>
  );
};

export default TimeTrackingIndicator;
