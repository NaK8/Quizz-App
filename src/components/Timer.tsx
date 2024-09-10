import { useEffect } from "react";
import type { DispatchFuncType } from "../types";

interface TimerProps {
  Dispatch: DispatchFuncType;
  secondsRemaining: number | null;
}

const Timer = ({ Dispatch, secondsRemaining }: TimerProps) => {
  const mins = Math.floor(secondsRemaining! / 60);
  const seconds = secondsRemaining! % 60;

  useEffect(() => {
    const id = setInterval(() => {
      Dispatch({ type: "Tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [Dispatch]);
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
};

export default Timer;
