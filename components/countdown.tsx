import { useEffect, useState } from "react";
import useCountDown from "react-countdown-hook";

export default function Countdown({ second, callback }: { second: number, callback: () => void }) {
  const initialTime = second * 1000;
  const interval = 1000;
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(initialTime, interval);
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    if (!isStart) {
      start();
      setIsStart(true);
    }
    if (timeLeft === 0 && isStart) {
      callback();
    }
  }, [timeLeft]);

  if (timeLeft === 0 && isStart) {
    return (<></>)
  }

  return (
    <>
      {timeLeft ? timeLeft / 1000 : timeLeft}
    </>
  )
}