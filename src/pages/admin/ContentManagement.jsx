import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import './ContentManagement.css';

const ContentManagement = () => {
    const { fetchMovies, createMovie, updateMovie, deleteMovie, fetchCategories } = useAdmin();
    const [movies, setMovies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        genre: '',
        rating: '',
        year: new Date().getFullYear().toString(),
        duration: '',
        posterUrl: '',
        backdropUrl: '',
        videoUrl: '',
        trailerUrl: '',
        tags: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [moviesData, categoriesData] = await Promise.all([
                fetchMovies(),
                fetchCategories()
            ]);
            setMovies(moviesData.data || []);
            setCategories(categoriesData.data || []);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const movieData = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            };

            if (editingMovie) {
                await updateMovie(editingMovie._id, movieData);
            } else {
                await createMovie(movieData);
            }

            setShowModal(false);
            resetForm();
            loadData();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleEdit = (movie) => {
        setEditingMovie(movie);
        setFormData({
            title: movie.title,
            description: movie.description,
            genre: movie.genre,
            rating: movie.rating,
            year: movie.year,
            duration: movie.duration,
            posterUrl: movie.posterUrl,
            backdropUrl: movie.backdropUrl || '',
            videoUrl: movie.videoUrl,
            trailerUrl: movie.trailerUrl || '',
            tags: movie.tags?.join(', ') || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (movieId) => {
        if (window.confirm('Are you sure you want to delete this content?')) {
            try {
                await deleteMovie(movieId);
                loadData();
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const resetForm = () => {
        setEditingMovie(null);
        setFormData({
            title: '',
            description: '',
            genre: '',
            rating: '',
            year: new Date().getFullYear().toString(),
            duration: '',
            posterUrl: '',
            backdropUrl: '',
            videoUrl: '',
            trailerUrl: '',
            tags: ''
        });
    };

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="spinner-large"></div>
                <p>Loading content...</p>
            </div>
        );
    }

    return (
        <div className="content-management">
            <div className="admin-header">
                <div>
                    <h1>Content Management</h1>
                    <p>Manage movies and series in your platform</p>
                </div>
                <button
                    className="add-button"
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    Add Content
                </button>
            </div>

            <div className="search-bar">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="content-table">
                <table>
                    <thead>
                        <tr>
                            <th>Poster</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Rating</th>
                            <th>Year</th>
                            <th>Views</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMovies.map((movie) => (
                            <tr key={movie._id}>
                                <td>
                                    <img src={movie.posterUrl} alt={movie.title} className="table-poster" />
                                </td>
                                <td className="title-cell">{movie.title}</td>
                                <td>{movie.genre}</td>
                                <td><span className="rating-badge">{movie.rating}</span></td>
                                <td>{movie.year}</td>
                                <td>{movie.views || 0}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEdit(movie)}
                                        >
                                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                            </svg>
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(movie._id)}
                                        >
                                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredMovies.length === 0 && (
                    <div className="empty-state">
                        <p>No content found</p>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingMovie ? 'Edit Content' : 'Add New Content'}</h2>
                            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} className="content-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Genre *</label>
                                    <select
                                        name="genre"
                                        value={formData.genre}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select genre</option>
                                        {categories.map(cat => (
                                            <option key={cat._id} value={cat.name}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Description *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Rating</label>
                                    <input
                                        type="text"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 8.5"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Year</label>
                                    <input
                                        type="text"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Duration</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 2h 30m"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Poster URL *</label>
                                <input
                                    type="url"
                                    name="posterUrl"
                                    value={formData.posterUrl}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Backdrop URL</label>
                                <input
                                    type="url"
                                    name="backdropUrl"
                                    value={formData.backdropUrl}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Video URL *</label>
                                <input
                                    type="url"
                                    name="videoUrl"
                                    value={formData.videoUrl}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Trailer URL</label>
                                <input
                                    type="url"
                                    name="trailerUrl"
                                    value={formData.trailerUrl}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Tags (comma-separated)</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                    placeholder="action, adventure, thriller"
                                />
                            </div>

                            <div className="form-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    {editingMovie ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentManagement;
