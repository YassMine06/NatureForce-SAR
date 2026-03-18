import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;
    let raf;

    const onMove = (e) => {
      dotX = e.clientX;
      dotY = e.clientY;
      if (dot) {
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';
      }
    };

    const animate = () => {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;
      if (ring) {
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnterClickable = () => {
      if (dot) { dot.style.width = '20px'; dot.style.height = '20px'; dot.style.background = '#ff6b00'; }
      if (ring) { ring.style.width = '50px'; ring.style.height = '50px'; ring.style.borderColor = 'rgba(255,107,0,0.5)'; }
    };

    const onLeaveClickable = () => {
      if (dot) { dot.style.width = '12px'; dot.style.height = '12px'; dot.style.background = '#00d4ff'; }
      if (ring) { ring.style.width = '32px'; ring.style.height = '32px'; ring.style.borderColor = 'rgba(0,212,255,0.4)'; }
    };

    document.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);

    const updateListeners = () => {
      document.querySelectorAll('button, a, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnterClickable);
        el.addEventListener('mouseleave', onLeaveClickable);
      });
    };
    updateListeners();
    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor" />
      <div ref={ringRef} className="cursor-trail" />
    </>
  );
}
