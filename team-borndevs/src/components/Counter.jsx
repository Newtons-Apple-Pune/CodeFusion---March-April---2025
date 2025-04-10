import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function Counter({
  from = 0,
  to,
  duration = 1,
  suffix = "",
  
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    let startTime= null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const currentValue = Math.floor(from + (to - from) * progress);
      setValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }

    };
    requestAnimationFrame(animate);
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

