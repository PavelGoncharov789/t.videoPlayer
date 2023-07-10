import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { GET_DATA } from "./store/actionTypes";

import "./App.css";

function App() {
  const [progress, setProgress] = useState(0);
  const videoRef: any = useRef(null);
  const dispatch = useDispatch();
  const figureArray = useSelector((state: any) => state.coordinates);
  console.log("figureArray", figureArray);
  

  useEffect(() => {
    dispatch({ type: GET_DATA });
  }, []);

  const handleProgress = () => {
    const duration = videoRef.current.duration;
    const currentTime = videoRef.current.currentTime;
    const progress = (currentTime / duration) * 100;
    setProgress(progress);
  };

  const handleTime = () => {
    videoRef.current.currentTime = 200.0;
  };

  return (
    <div className="App">
      <div className="video_container">
        <video
          width="1100px"
          height="800px"
          controls
          ref={videoRef}
          onTimeUpdate={handleProgress}
        >
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />{" "}
        </video>
      </div>
      <div className="timeCode_container">
        <button onClick={handleTime}>Кнопашка</button>
      </div>
    </div>
  );
}

export default App;
