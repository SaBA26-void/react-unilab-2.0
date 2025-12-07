import { useState, useEffect } from "react";

interface CountdownTimerProps {
  initialHours?: number;
}

const CountdownTimer = ({ initialHours = 24 }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const randomOffset = Math.floor(Math.random() * 12);
    return {
      hours: initialHours - randomOffset,
      minutes: Math.floor(Math.random() * 60),
      seconds: Math.floor(Math.random() * 60),
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="text-center mb-4">
      <p className="text-sm lato-bolder text-muted-foreground mb-3">
        Deal of the Day
      </p>
      <div className="flex items-center justify-center gap-2">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-foreground">
            {formatNumber(timeLeft.hours)}
          </span>
          <span className="text-xs text-muted-foreground mt-1">hour</span>
        </div>
        <span className="text-2xl font-bold text-foreground mb-4">:</span>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-foreground">
            {formatNumber(timeLeft.minutes)}
          </span>
          <span className="text-xs text-muted-foreground mt-1">min</span>
        </div>
        <span className="text-2xl font-bold text-foreground mb-4">:</span>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-foreground animate-countdown">
            {formatNumber(timeLeft.seconds)}
          </span>
          <span className="text-xs text-muted-foreground mt-1">sec</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
