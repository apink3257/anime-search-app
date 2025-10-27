// This represents the main API response for a search query
export interface JikanAnimeSearchResponse {
  data: JikanAnime[];
  pagination: JikanPagination;
}

// This represents a single anime object
export interface JikanAnime {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  title: string;
  title_english: string | null;
  title_japanese: string;
  type: string;
  source: string;
  episodes: number | null;
  status: string;
  airing: boolean;
  score: number | null;
  synopsis: string | null;
  year: number | null;
}

// This represents the pagination object from the API
export interface JikanPagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface JikanAnimeFullResponse {
  data: JikanAnime; // We can reuse the JikanAnime type we already have
}