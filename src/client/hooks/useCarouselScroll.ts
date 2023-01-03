import { useRef, useState } from 'react';

interface Props {
  dragDistanceForScroll: number;
}

const useCarouselScroll = ({ dragDistanceForScroll }: Props) => {
  let initRefScrollLeft = 0;

  const carouselUlRef = useRef<HTMLUListElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleClick = (index: number) => () => {
    if (!carouselUlRef.current) return;

    const elOffsetWidth = carouselUlRef.current.offsetWidth;
    setCurrentPage(index);
    carouselUlRef.current.scrollLeft = elOffsetWidth * index;
  };

  const handleTouchStart = () => {
    if (!carouselUlRef.current) return;

    initRefScrollLeft = carouselUlRef.current.scrollLeft;
  };

  const handleTouchEnd = () => {
    if (!carouselUlRef.current) return;

    const scrollDistance = carouselUlRef.current.scrollLeft - initRefScrollLeft;
    const elOffsetWidth = carouselUlRef.current.offsetWidth;
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

  return { currentPage, carouselUlRef, handleClick, handleTouchStart, handleTouchEnd };
};

export default useCarouselScroll;
