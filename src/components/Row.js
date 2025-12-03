import React, { useRef, useState } from 'react';
import MediaCard from './MediaCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Row = ({ title, mediaList }) => {
  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!mediaList || mediaList.length === 0) {
    return null;
  }

  return (
    <div className="space-y-0.5 md:space-y-2 mb-8 px-4 md:px-12 group">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl mb-4">
        {title}
      </h2>

      <div className="relative md:-ml-2">
        <FaChevronLeft
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMoved && 'hidden'
            }`}
          onClick={() => handleClick('left')}
        />

        {/* 
            Added 'py-8' and negative margin to allow cards to scale vertically without clipping 
            while keeping the layout tight. 
            'overflow-y-visible' is tricky with 'overflow-x-scroll', so we use padding.
        */}
        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2 py-10 -my-10"
        >
          {mediaList.map((media) => (
            <MediaCard key={media.id} media={media} />
          ))}
        </div>

        <FaChevronRight
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
};

export default Row;