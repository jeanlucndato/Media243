import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown } from 'react-icons/fa';

const MediaCard = ({ media }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        navigate(`/media/${media.id}`);
    };

    return (
        <div
            className="relative h-28 min-w-[180px] md:h-36 md:min-w-[260px] cursor-pointer transition-all duration-300 ease-in-out z-10 hover:z-50 hover:scale-110"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <img
                src={media.poster_url}
                alt={media.title}
                className="rounded-sm object-cover w-full h-full shadow-md"
            />

            {/* Hover Content */}
            {isHovered && (
                <div className="absolute top-0 left-0 w-full h-full bg-[#141414] rounded-sm shadow-xl transform scale-100 transition-all duration-300 -z-10 animate-fade-in">
                    {/* We duplicate the image here to maintain the base, but in a real Netflix clone, 
                         this would be a video player or a larger image container that expands. 
                         For this simple version, we just overlay details on the scaled card. */}
                    <div className="absolute inset-x-0 -bottom-20 bg-[#141414] p-4 rounded-b-md shadow-xl flex flex-col gap-2 z-50">

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                                <button className="bg-white text-black rounded-full p-1.5 hover:bg-gray-200 transition">
                                    <FaPlay size={12} />
                                </button>
                                <button className="border-2 border-gray-400 text-white rounded-full p-1.5 hover:border-white hover:text-white transition">
                                    <FaPlus size={12} />
                                </button>
                                <button className="border-2 border-gray-400 text-white rounded-full p-1.5 hover:border-white hover:text-white transition">
                                    <FaThumbsUp size={12} />
                                </button>
                            </div>
                            <button className="border-2 border-gray-400 text-white rounded-full p-1.5 hover:border-white hover:text-white transition ml-auto">
                                <FaChevronDown size={12} />
                            </button>
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center space-x-2 text-[10px] font-semibold text-gray-400 mt-1">
                            <span className="text-green-400">98% Match</span>
                            <span className="border border-gray-500 px-1">16+</span>
                            <span>{media.year || '2024'}</span>
                        </div>

                        {/* Genres */}
                        <div className="flex items-center space-x-1 text-[10px] text-white">
                            <span className="after:content-['•'] after:ml-1 after:text-gray-500">Drama</span>
                            <span className="after:content-['•'] after:ml-1 after:text-gray-500">African</span>
                            <span>Suspense</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaCard;