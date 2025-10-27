import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { JikanAnime, JikanPagination, JikanAnimeSearchResponse } from '../types/jikan'

interface AnimeState {
  list: JikanAnime[];
  pagination: JikanPagination | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentPage: number;
}

const initialState: AnimeState = {
  list: [],
  pagination: null,
  status: 'idle',
  error: null,
  currentPage: 1,
};

// fetchAnime thunk with the 'limit' fix
export const fetchAnime = createAsyncThunk(
  'anime/fetchAnime',
  async (args: { page: number; query: string; limit: number }, thunkApi) => {
    const { page, query, limit } = args;
    
    // THIS IS THE FIX: The URL now uses the 'limit' variable
    const url = `https://api.jikan.moe/v4/anime?q=${query}&page=${page}&limit=${limit}`;
    
    const response = await fetch(url, { signal: thunkApi.signal });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: JikanAnimeSearchResponse = await response.json();
    
    return {
      list: data.data,
      pagination: data.pagination,
    };
  }
);

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    clearAnimeList: (state) => {
      state.list = [];
      state.pagination = null;
      state.status = 'idle';
      state.error = null;
      state.currentPage = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnime.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAnime.fulfilled, (state, action: PayloadAction<{ list: JikanAnime[], pagination: JikanPagination }>) => {
        state.status = 'succeeded';
        state.list = action.payload.list;
        state.pagination = action.payload.pagination;
        state.currentPage = action.payload.pagination.current_page;
      })
      .addCase(fetchAnime.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch anime';
      });
  },
});

export const { clearAnimeList, setPage } = animeSlice.actions;
export const selectAnimeList = (state: RootState) => state.anime.list;
export const selectAnimeStatus = (state: RootState) => state.anime.status;
export const selectAnimeError = (state: RootState) => state.anime.error;
export const selectAnimePagination = (state: RootState) => state.anime.pagination;
export const selectAnimeCurrentPage = (state: RootState) => state.anime.currentPage;

export default animeSlice.reducer;