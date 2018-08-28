//When a user clicks on the "Search" button...

function searchFormEventHandler() {
    $('main').on('click', '.js-search-submit', function(e) {
        e.preventDefault()
    
        // Store the search term
        let searchTerm = $('#searchTerm').val()
    
        // If search term doesn't exist...
        if (!searchTerm) {
            //Alert the user
            alert("Search term required!");
            
            //Exit the function
            return;
        }
    
        // If search term exists...
    
            //Clear the search form
            $('#searchTerm').val('');
    
            //Clear search results
            clearSearchResults();
            
            // Call the search query function
            queryYouTubeAPI(searchTerm);
        
    });
}

function clearSearchResults() {
    // Clears the search results display and hides the prev/next nav buttons

    //Clear existing search results
    $('.js-search-results').html('');
    
    //Hide search navigation links
    $('.js-search-nav-prev').hide();
    $('.js-search-nav-next').hide();
        
}

function queryYouTubeAPI(searchTerm) {
    /* TODO: Query the YouTube API for a list of videos matching the provided search term */
        /* TODO: (If responses slow), load processing gif */
        /* TODO: Validate/format the search query string (if necessary) */
        /* TODO: Format the search query */
        /* TODO: Execute the search query */
        /* TODO: Return the results */

}
    
    
/* TODO: When a search result is return, render the search results */
    /* TODO: Show the "Search results" header, if hidden */

    /* TODO: Process the search query result, summarizing the overall contents */
        /* TODO: Number of results, pev/next links, etc. */
    
    /* TODO: Extract the relevant data from a YouTube API search result */
    
    /* TODO: Render the search result HTML for a given result */
    
    /* TODO: Update the prev/next navigation buttons */
        /* TODO: If page=1, hide "prev" button */
        /* TODO: If page=last(?), hide "next" button */
        
/* TODO: When the user clicks on a video thumbnail... */
    /* TODO: Play the video in a lightbox */
    
/* TODO: When the user clicks outside the lightbox... */
    /* Make the video stop and the lightbox disappear */
    
function handleSearchApp() {
    //Load event handlers
    searchFormEventHandler();
}

/* TODO: App Launch Code! */
$(handleSearchApp);