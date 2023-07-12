import React, {
  useState,
  useRef,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";

import { GET_DATA } from "./store/actionTypes";

import "./App.css";

type coordinatesType = {
  id: number,
  duration: number,
  timestamp: number,
  time?: string,
  zone: {
    height: number,
    left: number,
    top: number,
    width: number,
  } 
};

function App() {
  const [renderTimeCodes, setRenderTimeCode] = useState([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useDispatch();
  const timeCodes = useSelector((state: any) => state.coordinates);


  useEffect(() => {
    dispatch({ type: GET_DATA });
  }, []);

  function msToTime(duration: number) {
    let milliseconds = Math.floor((duration % 1000));
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);

    return minutes + ":" + seconds + ":" + milliseconds;
  }

  useEffect(() => {
    timeCodes.map((item: coordinatesType) => {
      item.time = msToTime(item.timestamp);
    });

    timeCodes.sort((a:any, b :any) => a.timestamp - b.timestamp)
    setRenderTimeCode(timeCodes);
  }, [timeCodes]);

  const handleTime = (time: number) => {
    let seconds = Math.floor((time / 1000));
    let milliseconds = Math.floor((time % 1000));
    if (videoRef.current) {
      videoRef.current.currentTime = Number(seconds + "." + milliseconds);
    }
  };

  return (
    <div className="App">
      <div className="video_container">
        <video
          width="1100px"
          height="800px"
          controls
          ref={videoRef}
        >
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />{" "}
        </video>
      </div>
      <div className="timeCode_container">
        {renderTimeCodes.map((item: coordinatesType) => {
          return  <button className="button-time" onClick = {() => handleTime(item?.timestamp)}>{item?.time}</button>
        })}
      </div>
    </div>
  );
}

export default App;
