import { useEffect, useState } from "react";
import useSound from "use-sound";
import countdown from "../assets/countdown.m4a";

export default function Timer({ setStop, questionNumber, isPaused = false }) {
  const [timer, setTimer] = useState(30);
  const [playCountdown, { stop: stopCountdown }] = useSound(countdown, {
    volume: 0.6,
  });

  useEffect(() => {
    playCountdown();
  }, [playCountdown, questionNumber]);

  useEffect(() => {
    if (isPaused) {
      stopCountdown();
    }
  }, [isPaused, stopCountdown]);

  useEffect(() => {
    if (timer === 0) return setStop(true);
    if (isPaused) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setStop, timer, isPaused]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);

  return timer;
}