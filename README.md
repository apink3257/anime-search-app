Bonus Implementation

This section highlights features implemented beyond the core requirements:

UI/UX Enhancements:

Interactive Flip Cards: Anime cards on the search page flip on click to show details, with a hover effect (blur + central icon) to indicate interactivity.

Themed UI: Features a custom dark "anime" theme with a full-screen parallax background image and cohesive styling.

Shimmering Skeleton Loaders: Implemented a modern "shimmer" loading state for both search results and the detail page loading state.

Responsive Design: All pages (Search and Detail) are fully responsive and adapt to mobile, tablet, and desktop screen sizes.

Meaningful States: Provides clear states for initial load (showing Top 3 Airing), loading search results, empty "no results", and API error states.

Custom Scrollbar: Includes a themed scrollbar matching the dark UI.

Top 3 Airing Anime: Added a section showcasing the current top 3 airing anime before a search is performed.

Results Per Page Control: Implemented a dropdown allowing users to control the number of search results displayed per page.

Technical Excellence:

Race Condition Handling: The instant search feature prevents race conditions by canceling previous in-flight API requests if the user types a new query before the old one completes. This is achieved using the AbortController signal passed via the Redux thunk's thunkApi.

Error Handling: Both the search (fetchAnime thunk's rejected state) and detail page (try...catch) properly handle potential API errors and display user-friendly messages.
