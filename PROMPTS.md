The AI that I use to help me code throughout this project is Gemini 2.5 Pro model.

1. Prompt: How do I force the Vite dev server to run on a specific port like 4000?
Context: Configuring vite.config.ts for the port 4000 requirement.

2. Prompt: Give me the Redux Toolkit boilerplate for an async thunk using TypeScript to fetch from 'https://api.jikan.moe/v4/anime'. Include handling for 'pending', 'fulfilled', and 'rejected' states.
Context: Scaffolding animeSlice.ts API call logic.

3. Prompt: How do I add AbortController signal support to a createAsyncThunk for request cancellation?
Context: Implementing race condition handling in the thunk.

4. Prompt: Generate a custom React hook 'useDebounce' in TypeScript.
Context: Creating the useDebounce.ts hook.

5. Prompt: Show me the correct 'useEffect' implementation for a debounced search that also cancels the previous in-flight fetch. I'm using an async thunk that accepts an 'abortSignal'.
Context: Wiring up debounce, thunk, and cancellation in SearchPage.tsx.

6. Prompt: How can I make a CSS-only card flip effect? I need a front face and a back face.
Context: Generating CSS for card flip in Components.css.

7. Prompt: Give me the CSS for a "shimmer" skeleton loader effect using a CSS gradient and @keyframes.
Context: Creating the shimmer loading state CSS.

8. Prompt: My CSS grid items are aligning left. How do I center them?
Context: Debugging grid layout centering in SearchPage.css.

9. Prompt: How do I correctly type the event handler for a select dropdown in React TypeScript? 
Context: Getting the type right for handleLimitChange in SearchPage.tsx.

10. Prompt: What's the best way to handle API errors in createAsyncThunk and display them in my component? 
Context: Ensuring errors from fetchAnime are correctly caught and shown in SearchPage.tsx.

11. Prompt: How can I optimize the SearchPage component to prevent unnecessary re-renders when the animeList state changes in Redux? Should I use React.memo on AnimeCard or is there a better way with useSelector? 
Context: Ensuring the search results list renders efficiently, especially when dealing with potentially large lists or frequent updates.