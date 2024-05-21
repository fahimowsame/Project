// Counter.js
import React, { useState, useEffect } from "react";

const Counter = ({ initialCount, targetCount, text }) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const increment = targetCount / 200;
    const updateCounter = () => {
      if (count < targetCount) {
        setCount((prevCount) => Math.ceil(prevCount + increment));
      }
    };

    const interval = setInterval(updateCounter, 1);
    return () => clearInterval(interval);
  }, [count, targetCount]);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="text-2xl font-semibold italic">{count}</div>
      <span className="text-base font-semibold">{text}</span>
    </div>
  );
};

export default Counter;
