'use strict';

function searchFormEventHandler() {

    // When a user preses on the "Search" button...
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
    // Queries the YouTube API for a list of videos matching the provided search term
    /* TODO: Query the YouTube API for a list of videos matching the provided search term */
    
    // Load processing gif
    loadProcessingImage("https://arkenea.com/blog/wp-content/uploads/2016/04/Ajax-loader.gif");

    /* TODO: Validate/format the search query string (if necessary) */
    /* TODO: Format the search query */
    /* TODO: Execute the search query */
    /* TODO: Return the results */

}
    
    function loadProcessingImage(img) {
        // Load "search in progress" image into search results

        let processingHTML = `
        <img src="${img}"
             class="processing-image js-processing-image"
             alt="Search in progress indicator"/>`;
             
        $('.js-search-results').html(processingHTML);
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