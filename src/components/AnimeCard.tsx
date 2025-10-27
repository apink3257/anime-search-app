// src/components/AnimeCard.tsx
import { Link } from 'react-router-dom';
import type { JikanAnime } from '../types/jikan';
import { useState } from 'react'; 

interface AnimeCardProps {
  anime: JikanAnime;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  // 1. Add 'isFlipped' state to each card
  const [isFlipped, setIsFlipped] = useState(false);

  // 2. Handle the flip click
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // 3. Handle the link click (prevents the card from flipping)
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    // 4. Add the main click handler here
    <div className="anime-card" onClick={handleFlip}>
      {/* 5. Add an 'inner' div to handle the 3D rotation */}
      <div className={`anime-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
        
        {/* --- FRONT OF CARD --- */}
        <div className="anime-card-front">
          <img src={anime.images.jpg.image_url} alt={anime.title} />
          <h3>{anime.title}</h3>
          {/* 6. Add the stopPropagation click handler to the link */}
          <Link
            to={`/anime/${anime.mal_id}`}
            onClick={handleLinkClick}
          >
            View details
          </Link>
        </div>

        {/* --- BACK OF CARD --- */}
        <div className="anime-card-back">
          <h3>{anime.title}</h3>
          <div className="details-list">
            <p><strong>Score:</strong> {anime.score || 'N/A'}</p>
            <p><strong>Episodes:</strong> {anime.episodes || 'N/A'}</p>
            <p><strong>Status:</strong> {anime.status || 'N/A'}</p>
            <p><strong>Year:</strong> {anime.year || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};