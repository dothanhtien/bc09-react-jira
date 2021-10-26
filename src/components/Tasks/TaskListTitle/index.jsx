import React from "react";

const TaskListTitle = ({ title }) => {
  const renderClassesAccordingToTitle = () => {
    const classes =
      "inline-block px-2 py-0.5 mb-1 text-xs font-semibold rounded";

    if (title === "BACKLOG") {
      return classes + " bg-gray-200";
    }

    if (title === "SELECTED FOR DEVELOPMENT") {
      return classes + " bg-indigo-200";
    }

    if (title === "IN PROGRESS") {
      return classes + " bg-blue-200";
    }

    if (title === "DONE") {
      return classes + " bg-green-200";
    }

    return classes;
  };

  return (
    <div>
      <span className={renderClassesAccordingToTitle()}>{title}</span>
    </div>
  );
};

export default TaskListTitle;
