import React, { useRef, useState } from 'react';
import MediaCard from './MediaCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Row.css';

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
    <div className="row group">
      <h2 className="row__title">
        {title}
      </h2>

      <div className="row__container">
        <FaChevronLeft
          className={`row__chevron row__chevron--left ${!isMoved ? 'hidden' : ''}`}
          onClick={() => handleClick('left')}
        />

        <div
          ref={rowRef}
          className="row__content"
        >
          {mediaList.map((media) => (
            <MediaCard key={media.id} media={media} />
          ))}
        </div>

        <FaChevronRight
          className="row__chevron row__chevron--right"
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
};

export default Row;