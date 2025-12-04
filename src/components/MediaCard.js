import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown } from 'react-icons/fa';
import './MediaCard.css';

const MediaCard = ({ media }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        navigate(`/media/${media.id}`);
    };

    return (
        <div
            className="media-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <img
                src={media.poster_url}
                alt={media.title}
                className="media-card__image"
            />

            {/* Hover Content */}
            {isHovered && (
                <div className="media-card__hover-content">
                    <div className="media-card__details">

                        {/* Action Buttons */}
                        <div className="media-card__actions">
                            <div className="media-card__action-buttons">
                                <button className="media-card__icon-btn">
                                    <FaPlay size={12} />
                                </button>
                                <button className="media-card__icon-btn outlined">
                                    <FaPlus size={12} />
                                </button>
                                <button className="media-card__icon-btn outlined">
                                    <FaThumbsUp size={12} />
                                </button>
                            </div>
                            <button className="media-card__icon-btn outlined more">
                                <FaChevronDown size={12} />
                            </button>
                        </div>

                        {/* Metadata */}
                        <div className="media-card__metadata">
                            <span className="media-card__match">98% Match</span>
                            <span className="media-card__rating">16+</span>
                            <span>{media.year || '2024'}</span>
                        </div>

                        {/* Genres */}
                        <div className="media-card__genres">
                            <span className="media-card__genre">Drama</span>
                            <span className="media-card__genre">African</span>
                            <span className="media-card__genre">Suspense</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaCard;