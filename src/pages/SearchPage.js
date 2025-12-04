import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MediaCard from '../components/MediaCard';
import { mockMedia } from '../data/mockData';
import './SearchPage.css';

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
        <div className="search-page">
            <Header />
            <main className="search-page__content">
                <h2 className="search-page__title">
                    Résultats pour "{query}"
                </h2>

                {results.length > 0 ? (
                    <div className="search-page__results">
                        {results.map(media => (
                            <MediaCard key={media.id} media={media} />
                        ))}
                    </div>
                ) : (
                    <div className="search-page__empty">
                        Aucun résultat trouvé pour "{query}".
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default SearchPage;
