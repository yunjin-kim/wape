import { useRef, useState } from 'react';

interface Props {
  dragDistanceForScroll: number;
}

const useCarouselScroll = ({ dragDistanceForScroll }: Props) => {
  let initRefScrollLeft = 0;

  const carouselUlRef = useRef<HTMLUListElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleTouchStart = () => {
    if (!carouselUlRef.current) return;

    initRefScrollLeft = carouselUlRef.current.scrollLeft;
  };

  const handleTouchEnd = () => {
    if (!carouselUlRef.current) return;

    const elOffsetWidth = carouselUlRef.current.offsetWidth;
    const scrollDistance = carouselUlRef.current.scrollLeft - initRefScrollLeft;
    if (scrollDistance > dragDistanceForScroll) {
      setCurrentPage((prev) => prev + 1);
      carouselUlRef.current.scrollLeft = elOffsetWidth * (currentPage + 1);
    } else if (scrollDistance < -dragDistanceForScroll) {
      setCurrentPage((prev) => prev - 1);
      carouselUlRef.current.scrollLeft = elOffsetWidth * (currentPage - 1);
    } else {
      carouselUlRef.current.scrollLeft = elOffsetWidth * currentPage;
    }
  };

  return { carouselUlRef, handleTouchStart, handleTouchEnd };
};

export default useCarouselScroll;
