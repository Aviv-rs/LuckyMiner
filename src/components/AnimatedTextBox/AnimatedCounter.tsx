import { useEffect, useRef } from "react";
import styles from "./AnimatedCounter.module.css";

interface AnimatedCounterProps {
  countTo: number;
}

export const AnimatedCounter = ({ countTo }: AnimatedCounterProps) => {
  const countElementRef = useRef<HTMLSpanElement | null>(null);
  const requestAnimationRef = useRef<number | null>(null);
  const countValueRef = useRef(0);

  useEffect(() => {
    const progressionRate = 10;
    if (countValueRef.current === countTo) return;

    const animationClass = styles["animated-counter-done"];
    const currentClassList = countElementRef.current?.classList;
    if (currentClassList && currentClassList.contains(animationClass)) {
      currentClassList.remove(animationClass);
    }
    const animate = () => {
      if (!countElementRef.current) return;
      const currentCount = +countElementRef.current.innerText;
      if (currentCount === countTo) {
        countValueRef.current = countTo;
        if (countValueRef.current !== 0) {
          const currentClassList = countElementRef.current.classList;
          currentClassList.add(animationClass);
        }
        return;
      }
      const sign = currentCount > countTo ? -1 : 1;
      let increment = progressionRate * sign;
      if (increment + currentCount < 0) increment = sign * currentCount;
      const newValue = currentCount + increment;

      countElementRef.current.innerText = newValue.toString();
      requestAnimationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (!requestAnimationRef.current) return;
      cancelAnimationFrame(requestAnimationRef.current);
    };
  }, [countTo]);

  return <span ref={countElementRef}>0</span>;
};
