import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";

import { GET_DATA } from "./store/actionTypes";

import "./App.css";

type coordinatesType = {
  id: number;
  duration: number;
  timestamp: number;
  time?: string;
  range?: {beginning: number, end: number};
  zone: {
    height: number;
    left: number;
    top: number;
    width: number;
  };
};

function App() {
  const [renderTimeCodes, setRenderTimeCode] = useState([]);
  const timeCodes = useSelector((state: any) => state.coordinates);
  const [action, setAction] = useState<coordinatesType[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_DATA });
  }, []);

  function msToTime(duration: number) {
    let milliseconds = Math.floor(duration % 1000);
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);

    return minutes + ":" + seconds + ":" + milliseconds;
  }

  useEffect(() => {
    timeCodes.map((item: coordinatesType) => {
      item.time = msToTime(item.timestamp);
      item.range = {
        beginning: item.timestamp,
        end: item.timestamp + item.duration,
      };
    });

    timeCodes.sort((a: coordinatesType, b: coordinatesType) => a.timestamp - b.timestamp);
    setRenderTimeCode(timeCodes);
  }, [timeCodes]);

  const handleTime = (time: number) => {
    let seconds = Math.floor(time / 1000);
    let milliseconds = Math.floor(time % 1000);
    if (videoRef.current) {
      videoRef.current.currentTime = Number(seconds + "." + milliseconds);
    }
  };

  const deleteElement = (item: coordinatesType) => {
    const deleteItem = () => {
      const result = action.filter((el) => el.id !== item.id);
      return result;
    };
    setTimeout(() => setAction(deleteItem()), item.duration);
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const actionData = timeCodes.find((item: any) => {
        return (
          item.timestamp === Math.floor(currentTime * 1000) ||
          (item.range.beginning < Math.floor(currentTime * 1000) &&
          Math.floor(currentTime * 1000) < item.range.end)
          );
        });
        
        if (actionData && !action.includes(actionData))
        setAction([...action, actionData]);
      }
  };

  return (
    <div className="App">
      <div className="video_container">
        <video
          width="1280"
          height="720"
          controls
          ref={videoRef}
          onTimeUpdate={handleProgress}
        >
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />{""}
        </video>
        {action.length ?
          action.map((item) => {
            deleteElement(item);
            return (
              < div
                key={item.id}
                className="rectangle"
                style={{
                  left: `${item?.zone?.left}px`,
                  top: `${item?.zone?.top}px`,
                  width: `${item?.zone?.width}px`,
                  height: `${item?.zone?.height}px`,
                }}
              />
            );
          }): null}
      </div>
      <div className="timeCode_container">
        {renderTimeCodes.map((item: coordinatesType) => {
          return (
            <button
              key={item.id}
              className="button-time"
              onClick={() => handleTime(item?.timestamp)}
            >
              {item?.time}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
