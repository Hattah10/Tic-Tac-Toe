import React, { useRef } from "react";
import "../Settings.css";
import "boxicons";

export default function Settings({ audioClickRef }) {
//   const audioClickRef = useRef(false);

  return (
    <div className="volume-box">
      <box-icon name="volume-full"></box-icon>
      <div>
        <box-icon name="music"></box-icon>
        <audio
          ref={audioClickRef}
          autoPlay={false}
          src="/media/video-game-retro-click.wav"
        ></audio>
      </div>
    </div>
  );
}
