import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
  fetchAnime,
  clearAnimeList,
  setPage,
  selectAnimeList,
  selectAnimeStatus,
  selectAnimeError,
  selectAnimePagination,
  selectAnimeCurrentPage,
} from '../store/animeSlice';
import type { JikanAnime, JikanAnimeSearchResponse } from '../types/jikan'; // Import types
import { AnimeCard } from '../components/AnimeCard';
import { PaginationControls } from '../components/PaginationControls';
import { SkeletonCard } from '../components/SkeletonCard';
import './SearchPage.css';

export const SearchPage = () => {
  // --- Search State ---
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 250);

  // --- New State ---
  // Default limit is now 5
  const [limit, setLimit] = useState(5);
  const [topAnime, setTopAnime] = useState<JikanAnime[]>([]); // State for Top 3
  const [topAnimeStatus, setTopAnimeStatus] = useState<'idle' | 'loading' | 'succeeded'>('idle');

  // --- Redux State ---
  const dispatch = useAppDispatch();
  const animeList = useAppSelector(selectAnimeList);
  const status = useAppSelector(selectAnimeStatus);
  const error = useAppSelector(selectAnimeError);
  const pagination = useAppSelector(selectAnimePagination);
  const currentPage = useAppSelector(selectAnimeCurrentPage);

  // New useEffect to fetch Top 3 Anime on mount
  useEffect(() => {
    const fetchTopAnime = async () => {
      setTopAnimeStatus('loading');
      try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing&limit=3');
        if (!response.ok) throw new Error('Failed to fetch top anime');
        const data: JikanAnimeSearchResponse = await response.json();
        setTopAnime(data.data);
        setTopAnimeStatus('succeeded');
      } catch (err) {
        console.error(err);
      }
    };
    fetchTopAnime();
  }, []); // Empty array ensures this runs only once

  // Updated useEffect for handling search
  useEffect(() => {
    if (debouncedQuery.trim() === '') {
      dispatch(clearAnimeList());
      return;
    }
    
    const promise = dispatch(
      fetchAnime({ query: debouncedQuery, page: currentPage, limit: limit })
    );
    
    return () => {
      promise.abort();
    };
  }, [debouncedQuery, currentPage, limit, dispatch]); // Add 'limit' to dependency array

  // --- Event Handlers ---
  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  // Handler for the new dropdown
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    dispatch(setPage(1)); // Reset to page 1 when limit changes
  };

  // --- Render Logic ---
  const renderContent = () => {
    if (status === 'loading') {
      return (
        <div className="results-grid">
          {/* Show skeletons based on the 'limit' state */}
          {Array.from({ length: limit }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      );
    }

    if (status === 'failed') {
      return (
        <div className="status-container">
          <h3>Oops! Something went wrong.</h3>
          <p>{error}</p>
        </div>
      );
    }

    if (status === 'succeeded' && animeList.length > 0) {
      return (
        <div className="results-grid">
          {animeList.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      );
    }

    if (status === 'succeeded' && animeList.length === 0 && debouncedQuery.trim() !== '') {
      return (
        <div className="status-container">
          <h3>No Results Found</h3>
          <p>We couldn't find any anime matching "{debouncedQuery}".</p>
        </div>
      );
    }

    // Updated "Idle" state to show Top 3 Anime
    return (
      <div className="top-anime-container">
        <h2>Top 3 Airing Anime</h2>
        {topAnimeStatus === 'loading' ? (
          <div className="results-grid">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="results-grid">
            {topAnime.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="search-page">
      <h1>Anime Search</h1>

      {/* Search Controls Wrapper */}
      <div className="search-controls">
        <input
          type="text"
          placeholder="Search your favourite anime here..."
          className="search-input"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            dispatch(setPage(1)); // Reset page on new search
          }}
        />
        
        <div className="limit-selector">
          <label htmlFor="limit-select">Results:</label>
          
          <select id="limit-select" value={limit} onChange={handleLimitChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
      </div>

      {renderContent()}

      {/* Pagination (only show if we have results AND more than one page) */}
      {status === 'succeeded' && pagination && pagination.last_visible_page > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={pagination.last_visible_page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};