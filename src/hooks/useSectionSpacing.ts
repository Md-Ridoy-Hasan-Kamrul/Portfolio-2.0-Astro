import { useEffect, useState } from "react";

function interpolate(width: number, points: [number, number][]): number {
  if (width <= points[0][0]) return points[0][1];
  const last = points[points.length - 1];
  if (width >= last[0]) return last[1];
  for (let i = 0; i < points.length - 1; i++) {
    const [w1, v1] = points[i];
    const [w2, v2] = points[i + 1];
    if (width <= w2) {
      const t = (width - w1) / (w2 - w1);
      return Math.round(v1 + t * (v2 - v1));
    }
  }
  return last[1];
}

// Stays tight through tablet/laptop widths, then ramps sharply only in the final stretch to hit the full desktop size exactly at 1920px.
const PY_POINTS: [number, number][] = [[375, 56], [768, 64], [1024, 72], [1280, 80], [1440, 92], [1920, 144]];
const MB_POINTS: [number, number][] = [[375, 35], [768, 40], [1024, 45], [1280, 50], [1440, 58], [1920, 96]];

function getWidth() {
  return typeof window === "undefined" ? 1024 : window.innerWidth;
}

export function useSectionSpacing() {
  const [py, setPy] = useState(() => interpolate(getWidth(), PY_POINTS));
  const [mb, setMb] = useState(() => interpolate(getWidth(), MB_POINTS));

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPy(interpolate(w, PY_POINTS));
      setMb(interpolate(w, MB_POINTS));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return { py, mb };
}
