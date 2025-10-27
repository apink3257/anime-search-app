import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { JikanAnime, JikanAnimeFullResponse } from '../types/jikan';
import './DetailPage.css'; 

// (Helper component for the skeleton loader)
const DetailSkeleton = () => (
  <div className="skeleton-loader">
    <div className="skeleton-image-box" />
    <div className="skeleton-info">
      <div className="skeleton-title" />
      <div className="skeleton-meta">
        <div className="skeleton-meta-item" />
        <div className="skeleton-meta-item" />
        <div className="skeleton-meta-item" />
      </div>
      <div className="skeleton-text" style={{ width: '90%' }} />
      <div className="skeleton-text" />
      <div className="skeleton-text" style={{ width: '80%' }} />
      <div className="skeleton-text short" />
    </div>
  </div>
);

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<JikanAnime | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);

    if (!id) return;
    const fetchAnimeDetails = async () => {
      setStatus('loading');
      setError(null);
      try {
        // Add a small delay to see the loader
        // await new Promise(res => setTimeout(res, 500)); 
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
        if (!response.ok) {
          throw new Error(`Anime not found (Status: ${response.status})`);
        }
        const data: JikanAnimeFullResponse = await response.json();
        setAnime(data.data);
        setStatus('succeeded');
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setStatus('failed');
      }
    };
    fetchAnimeDetails();
  }, [id]);

  // --- Render logic ---

  const renderContent = () => {
    // 1. Loading State
    if (status === 'loading' || status === 'idle') {
      return <DetailSkeleton />;
    }

    // 2. Error State
    if (status === 'failed') {
      return (
        <div className="detail-status-container">
          <h1>Error</h1>
          <p>{error}</p>
          <Link to="/">Go back to Search</Link>
        </div>
      );
    }

    // 3. Not Found State
    if (status === 'succeeded' && !anime) {
      return (
        <div className="detail-status-container">
          <h1>Not Found</h1>
          <p>Could not find details for this anime.</p>
          <Link to="/">Go back to Search</Link>
        </div>
      );
    }

    // 4. Success State
    return (
      <div className="detail-content-wrapper">
        <div className="detail-image">
          <img src={anime?.images.jpg.large_image_url} alt={anime?.title} />
        </div>
        <div className="detail-info">
          <h1 className="detail-title">{anime?.title_english || anime?.title}</h1>
          <div className="detail-meta">
            <p className="meta-item">
              <strong>{anime?.score || 'N/A'}</strong>
              <span>Score</span>
            </p>
            <p className="meta-item">
              <strong>{anime?.episodes || 'N/A'}</strong>
              <span>Episodes</span>
            </p>
            <p className="meta-item">
              <strong>{anime?.status || 'N/A'}</strong>
              <span>Status</span>
            </p>
            <p className="meta-item">
              <strong>{anime?.year || 'N/A'}</strong>
              <span>Year</span>
            </p>
          </div>
          <div className="detail-synopsis">
            <h3>Synopsis</h3>
            <p>{anime?.synopsis || 'No synopsis available.'}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">
        &larr; Back to Search
      </Link>
      {renderContent()}
    </div>
  );
};