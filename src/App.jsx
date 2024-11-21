// // src/App.jsx
// import React, { useState, useEffect } from "react";
// import "./App.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

// function PomodoroClock() {
//   const [time, setTime] = useState(25 * 60); // Store time in seconds
//   const [isRunning, setIsRunning] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     let intervalId;
//     if (isRunning) {
//       intervalId = setInterval(() => {
//         setTime(time - 1);
//         if (time === 0) {
//           setIsRunning(false);
//         }
//       }, 1000);
//     }
//     return () => clearInterval(intervalId);
//   }, [isRunning, time]);

//   const handleStartStop = () => {
//     setIsRunning(!isRunning);
//   };

//   const handleDarkModeToggle = () => {
//     setIsDarkMode(!isDarkMode);
//     document.body.classList.toggle("dark-mode");
//   };

//   const minutes = Math.floor(time / 60); // Calculate minutes
//   const seconds = time % 60; // Calculate seconds

//   return (
//     <div>
//       <button className="dark-mode-toggle" onClick={handleDarkModeToggle}>
//         <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
//       </button>
//       <div className="pomodoro-clock">
//         <h1>Pomodoro Clock</h1>
//         <div className="time-display">
//           {minutes}:{seconds.toString().padStart(2, "0")}
//         </div>
//         <button
//           className={`start-stop-button ${isRunning ? "stop" : "start"}`}
//           onClick={handleStartStop}
//         >
//           {isRunning ? "Stop" : "Start"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PomodoroClock;

// src/App.jsx
import React, { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

function PomodoroClock() {
  const [selectedDuration, setSelectedDuration] = useState("pomodoro");
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pomodoroDuration, setPomodoroDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);

  useEffect(() => {
    switch (selectedDuration) {
      case "pomodoro":
        setTime(pomodoroDuration * 60);
        break;
      case "shortBreak":
        setTime(shortBreakDuration * 60);
        break;
      case "longBreak":
        setTime(longBreakDuration * 60);
        break;
      default:
        break;
    }
  }, [
    selectedDuration,
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
  ]);

  useEffect(() => {
    let intervalId;
    if (isRunning && !isPaused) {
      intervalId = setInterval(() => {
        setTime(time - 1);
        if (time === 0) {
          setIsRunning(false);
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time, isPaused]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  // const handlePauseResume = () => {
  //   setIsPaused(!isPaused);
  // };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setSelectedDuration("pomodoro");
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };

  const handleDurationInputChange = (e, durationType) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      switch (durationType) {
        case "pomodoro":
          setPomodoroDuration(value);
          break;
        case "shortBreak":
          setShortBreakDuration(value);
          break;
        case "longBreak":
          setLongBreakDuration(value);
          break;
        default:
          break;
      }
    }
  };

  const minutes = Math.floor(time / 60); // Calculate minutes
  const seconds = time % 60; // Calculate seconds

  return (
    <div>
      <button className="dark-mode-toggle" onClick={handleDarkModeToggle}>
        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
      </button>
      <div className="pomodoro-clock">
        <h1>Pomodoro Clock</h1>
        <div className="time-display">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
        <div className="duration-buttons">
          <button onClick={() => handleDurationChange("pomodoro")}>
            Pomodoro
            {/* <input
              type="number"
              value={pomodoroDuration}
              onChange={(e) => handleDurationInputChange(e, "pomodoro")}
            /> */}
          </button>
          <button onClick={() => handleDurationChange("shortBreak")}>
            Short Break
            {/* <input
              type="number"
              value={shortBreakDuration}
              onChange={(e) => handleDurationInputChange(e, "shortBreak")}
            /> */}
          </button>
          <button onClick={() => handleDurationChange("longBreak")}>
            Long Break
            {/* <input
              type="number"
              value={longBreakDuration}
              onChange={(e) => handleDurationInputChange(e, "longBreak")}
            /> */}
          </button>
        </div>
        <div className="control-buttons">
          <button
            className={`start-stop-button ${isRunning ? "stop" : "start"}`}
            onClick={handleStartStop}
          >
            {isRunning ? "Stop" : "Start"}
          </button>

          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default PomodoroClock;

// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
// function PomodoroClock() {
//   const [selectedDuration, setSelectedDuration] = useState("pomodoro");
//   const [time, setTime] = useState(25 * 60);
//   const [isRunning, setIsRunning] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     switch (selectedDuration) {
//       case "pomodoro":
//         setTime(25 * 60);
//         break;
//       case "shortBreak":
//         setTime(5 * 60);
//         break;
//       case "longBreak":
//         setTime(15 * 60);
//         break;
//       default:
//         break;
//     }
//   }, [selectedDuration]);

//   useEffect(() => {
//     let intervalId;
//     if (isRunning && !isPaused) {
//       intervalId = setInterval(() => {
//         setTime(time - 1);
//         if (time === 0) {
//           setIsRunning(false);
//         }
//       }, 1000);
//     }
//     return () => clearInterval(intervalId);
//   }, [isRunning, time, isPaused]);

//   const handleStartStop = () => {
//     setIsRunning(!isRunning);
//   };

//   const handlePauseResume = () => {
//     setIsPaused(!isPaused);
//   };

//   const handleReset = () => {
//     setIsRunning(false);
//     setIsPaused(false);
//     switch (selectedDuration) {
//       case "pomodoro":
//         setTime(25 * 60);
//         break;
//       case "shortBreak":
//         setTime(5 * 60);
//         break;
//       case "longBreak":
//         setTime(15 * 60);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleDarkModeToggle = () => {
//     setIsDarkMode(!isDarkMode);
//     document.body.classList.toggle("dark-mode");
//   };

//   const handleDurationChange = (duration) => {
//     setSelectedDuration(duration);
//   };

//   const minutes = Math.floor(time / 60); // Calculate minutes
//   const seconds = time % 60; // Calculate seconds

//   return (
//     <div>
//       <button className="dark-mode-toggle" onClick={handleDarkModeToggle}>
//         <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
//       </button>
//       <div className="pomodoro-clock">
//         <h1>Pomodoro Clock</h1>
//         <div className="time-display">
//           {minutes}:{seconds.toString().padStart(2, "0")}
//         </div>
//         <div className="duration-buttons">
//           <button onClick={() => handleDurationChange("pomodoro")}>
//             Pomodoro (25min)
//           </button>
//           <button onClick={() => handleDurationChange("shortBreak")}>
//             Short Break (5min)
//           </button>
//           <button onClick={() => handleDurationChange("longBreak")}>
//             Long Break (15min)
//           </button>
//         </div>
//         <div className="control-buttons">
//           <button
//             className={`start-stop-button ${isRunning ? "stop" : "start"}`}
//             onClick={handleStartStop}
//           >
//             {isRunning ? "Stop" : "Start"}
//           </button>
//           <button className="reset-button" onClick={handleReset}>
//             Reset
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PomodoroClock;

// function PomodoroClock() {
//   const [selectedDuration, setSelectedDuration] = useState("pomodoro");
//   const [time, setTime] = useState(25 * 60);
//   const [isRunning, setIsRunning] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     switch (selectedDuration) {
//       case "pomodoro":
//         setTime(25 * 60);
//         break;
//       case "shortBreak":
//         setTime(5 * 60);
//         break;
//       case "longBreak":
//         setTime(15 * 60);
//         break;
//       default:
//         break;
//     }
//   }, [selectedDuration]);

//   useEffect(() => {
//     let intervalId;
//     if (isRunning) {
//       intervalId = setInterval(() => {
//         setTime(time - 1);
//         if (time === 0) {
//           setIsRunning(false);
//         }
//       }, 1000);
//     }
//     return () => clearInterval(intervalId);
//   }, [isRunning, time]);

//   const handleStartStop = () => {
//     setIsRunning(!isRunning);
//   };

//   const handleDarkModeToggle = () => {
//     setIsDarkMode(!isDarkMode);
//     document.body.classList.toggle("dark-mode");
//   };

//   const handleDurationChange = (duration) => {
//     setSelectedDuration(duration);
//   };

//   const minutes = Math.floor(time / 60); // Calculate minutes
//   const seconds = time % 60; // Calculate seconds

//   return (
//     <div>
//       <button className="dark-mode-toggle" onClick={handleDarkModeToggle}>
//         <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
//       </button>
//       <div className="pomodoro-clock">
//         <h1>Pomodoro Clock</h1>
//         <div className="time-display">
//           {minutes}:{seconds.toString().padStart(2, "0")}
//         </div>
//         <div className="duration-buttons">
//           <button onClick={() => handleDurationChange("pomodoro")}>
//             Pomodoro (25min)
//           </button>
//           <button onClick={() => handleDurationChange("shortBreak")}>
//             Short Break (5min)
//           </button>
//           <button onClick={() => handleDurationChange("longBreak")}>
//             Long Break (15min)
//           </button>
//         </div>
//         <button
//           className={`start-stop-button ${isRunning ? "stop" : "start"}`}
//           onClick={handleStartStop}
//         >
//           {isRunning ? "Stop" : "Start"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PomodoroClock;
