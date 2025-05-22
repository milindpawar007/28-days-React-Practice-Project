import React from 'react';

const Timer: React.FC = () => {
    const [seconds, setSeconds] = React.useState<number>(300000);
    const stopwatch = React.useRef<any>(null);
    const handelStart = () => {
        if (stopwatch.current !== null) return;
        stopwatch.current = setInterval(() => {
            setSeconds((prevSeconds) => {
              if (prevSeconds <= 0) {
                clearInterval(stopwatch.current);
                stopwatch.current = null;
                return 0;
              }
              return prevSeconds - 100;
            });
          }, 100);
    }

    const handelStop = () => {
        clearInterval(stopwatch.current);
        stopwatch.current = null;
    };

    const handelReset = ()=>{
        clearInterval(stopwatch.current);
        stopwatch.current = null;
        setSeconds(50000);
    }

    const formatTime = (milliseconds: number) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      };
      
    return (
        <div className='timer'>
            <div id="timer-display">{formatTime(seconds)}</div>
            <div id="controls" className='controls'>

                <button id="start" onClick={handelStart}>Start</button>
                <button id="stop"  onClick={handelStop}>Stop</button>
                <button id="reset" onClick={handelReset}  disabled={stopwatch.current === null}>Reset</button>
            </div>
        </div>
    );
};

export default Timer;