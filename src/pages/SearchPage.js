import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MediaCard from '../components/MediaCard';
import { mockMedia } from '../data/mockData';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query) {
            const filteredMedia = mockMedia.filter(media =>
                media.title.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filteredMedia);
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <div className="bg-netflix-black min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-24 px-4 md:px-12">
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">
                    Résultats pour "{query}"
                </h2>

                {results.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {results.map(media => (
                            <MediaCard key={media.id} media={media} />
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-400 text-lg text-center mt-20">
                        Aucun résultat trouvé pour "{query}".
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default SearchPage;
