import React from "react";
import "./messagePreview.scss";

const MessagePreview = ({ friend }) => {
  return (
    <div className="preview">
      <div className="text">
        <h2>{friend.username}</h2>
        <h3>Hey! I noticed..</h3>
      </div>
      <div className="status-box">
        <div className={friend.is_online === 1 ? "online" : "offline"} />
      </div>
    </div>
  );
};

export default MessagePreview;
