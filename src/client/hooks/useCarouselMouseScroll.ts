import { useRef } from 'react';

const useCarouselMouseScroll = () => {
  const mouseScrollRef = useRef<HTMLUListElement>(null);

  let isScroll = false;
  let mouseClickOffsetLeft = 0;
  let refLeftScroll = 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (mouseScrollRef.current) {
      isScroll = true;
      mouseScrollRef.current.style.scrollSnapType = 'unset';
      mouseClickOffsetLeft = e.pageX - mouseScrollRef.current.offsetLeft;
      refLeftScroll = mouseScrollRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    if (mouseScrollRef.current) {
      isScroll = false;
      mouseScrollRef.current.style.scrollSnapType = 'x mandatory';
    }
  };

  const handleMouseUp = () => {
    if (mouseScrollRef.current) {
      isScroll = false;
      mouseScrollRef.current.style.scrollSnapType = 'x mandatory';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseScrollRef.current && isScroll) {
      e.preventDefault();
      const scrollOffsetLeft = e.pageX - mouseScrollRef.current.offsetLeft;
      const dragDistance = scrollOffsetLeft - mouseClickOffsetLeft;
      mouseScrollRef.current.scrollLeft = refLeftScroll - dragDistance;
    }
  };

  return { mouseScrollRef, handleMouseDown, handleMouseLeave, handleMouseUp, handleMouseMove };
};

export default useCarouselMouseScroll;
