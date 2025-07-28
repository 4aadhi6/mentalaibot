import React from "react";
import "./HeartbeatBackground.css"; // The CSS file will be updated next

const HeartbeatBackground: React.FC = () => {
  return (
    <div className="heartbeat-bg" aria-hidden="true">
      {/* 
        This is the single container that holds all three lines (main, before, after).
        This is the ONLY element we will animate, which is much more reliable.
      */}
      <div className="heartbeat-scroller" />
    </div>
  );
};

export default HeartbeatBackground;
