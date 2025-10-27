<<<<<<< HEAD
## Bonus Implementation

* **UI/UX Enhancements:**
    * **Shimmering Skeleton Loaders:** Implemented a modern "shimmer" loading state instead of a simple pulse for a better "wow" factor.
    * **Themed UI:** Added a custom dark "anime" theme with a full-size background image and dark, blurred UI elements.
    * **Responsive Design:** All pages (Search and Detail) are fully responsive for mobile and tablet devices.
    * **Meaningful States:** The app provides clear, helpful messages for the initial idle state, an empty "no results" state, and an error state.

* **Technical Excellence:**
    * **Race Condition Handling:** The search feature prevents race conditions by canceling any in-flight API requests if the user types a new query. This is achieved by calling `.abort()` on the `promise` returned by the dispatched Redux thunk within the `useEffect` cleanup function.
    * **Error Handling:** Both the search and detail pages properly handle API errors using `try...catch` blocks and `thunk.rejected`, displaying a user-friendly error message.
=======
# anime-search-app
An anime searching web using Jikan API
>>>>>>> d55c3084d08a51ec0f5b225069fdd7eb235370f0
