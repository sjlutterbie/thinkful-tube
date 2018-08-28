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
            queryYouTubeAPI(searchTerm, receiveSearchResults);
        
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

function queryYouTubeAPI(searchTerm, callback) {
    // Queries the YouTube API for a list of videos matching the provided search term

    // Load processing gif
    loadProcessingImage("https://arkenea.com/blog/wp-content/uploads/2016/04/Ajax-loader.gif");

    // Specify search query terms
    const searchURL = "https://www.googleapis.com/youtube/v3/search";
    const APIKey = "AIzaSyBN-LJx3IzCrevK2yJd-TBcL3vuenEk4BQ";
    
    //Build search query
    const query = {
        q: `${searchTerm}`,
        part: 'snippet',
        key: `${APIKey}`
    };
    
    // Execute search query
    $.getJSON(searchURL, query, callback);

}
    
    function loadProcessingImage(img) {
        // Load "search in progress" image into search results

        let processingHTML = `
        <img src="${img}"
             class="processing-image js-processing-image"
             alt="Search in progress indicator"/>`;
             
        $('.js-search-results').html(processingHTML);
    }
    
    function hideProcessingImage() {
        //Hide the "search processing" image
        
        $('.processing-image').hide();
    }
    
    function receiveSearchResults(data) {
        // When a search result is returned, process the search results
        
        console.log(`"receiveSearchResults" was called.`);
        
        data.items.map((item, index) => renderSearchResult(item));
        
    }
    
function renderSearchResult(item) {

    // Hide processing image
    hideProcessingImage();

    // Extract relevant result information
    let videoID = item.id.videoId;
        let videoURL = `https://www.youtube.com/watch?v=${videoID}`;
    let videoTitle = item.snippet.title;
    let videoDesc = item.snippet.description;
    let videoThumbnail = item.snippet.thumbnails.medium.url;
    let channelID = item.snippet.channelId;
        let channelURL = `https://www.youtube.com/channel/${channelID}`;
    let channelTitle = item.snippet.channelTitle;

    // Build result HTML
    let resultHTML = `
        <div class="search-result">
            <div class="thumbnail">
                <a href="${videoURL}" title="YouTube: ${videoTitle}">
                    <img src="${videoThumbnail}"
                         alt="Link to YouTube video, ${videoTitle}"
                         style="width: 200px"/>
                </a>
            </div>
            <div class="search-result-info">
                <p class="search-result-title">
                    <a href="${videoURL}" target="_blank">${videoTitle}</a>
                </p>
                <p class="search-result-channel"> Channel:&nbsp;
                    <a href="${channelURL}">${channelTitle}</a>
                </p>
            </div>
         </div>
    `;
    
    // Render result
    $('.js-search-results').append(resultHTML);
    
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