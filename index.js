'use strict';

function searchFormEventHandler() {

    // When a user preses on the "Search" button...
    $('html').on('click', '.js-search-submit', function(e) {
        e.preventDefault();
    
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
        $('.js-search-nav').hide();

    }

function queryYouTubeAPI(searchTerm, callback, pageToken) {
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
    
    if (pageToken) {
        query.pageToken = `${pageToken}`;
    }
    
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
        
        console.log(data);
        
        // Collect etag and pageTokens for future navigation
        let nextPageToken = data.nextPageToken;
        let prevPageToken = data.prevPageToken;
        
        //Render search results
        
        data.items.map((item, index) =>
            renderSearchResult(item)
        );
        
        //Render navigation buttons
        if (prevPageToken) {
            renderNavButton('Prev', 'js-search-nav', prevPageToken);
        }
        
        if (nextPageToken) {
            renderNavButton('Next', 'js-search-nav', nextPageToken);
        
        }

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
        <div class="md-whiteframe-4dp search-result">
            <div class="thumbnail">
                    <img src="${videoThumbnail}"
                         alt="Play YouTube video, ${videoTitle}"
                         data-videoid="${videoID}"/>
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

function renderNavButton (text, jsClass, pageToken) {
    // Render a "Prev" button
    
    // Build 
    let buttonHTML = `
        <button class="search-nav-button ${jsClass}"
            data-pageToken="${pageToken}">
                ${text}</button>
    `;
    
    // Render HTML
    $('.search-nav').append(buttonHTML);
    
}

function queryYouTubeAPINav(eTag, pageToken, callback) {
    // For navigation: Run a YouTube API search query when eTag and pageToken are known
    
    // Load processing gif
    loadProcessingImage("https://arkenea.com/blog/wp-content/uploads/2016/04/Ajax-loader.gif");

    // Specify search query terms
    const searchURL = "https://www.googleapis.com/youtube/v3/search";
    const APIKey = "AIzaSyBN-LJx3IzCrevK2yJd-TBcL3vuenEk4BQ";
    
    //Build search query
    const query = {
        etag: `${eTag}`,
        pageToken: `${pageToken}`,
        part: 'snippet',
        key: `${APIKey}`
    };
    

    // Execute search query
    $.getJSON(searchURL, query, callback);
    
}

function searchResultsEventHandler() {
    
    // When a user clicks on a search nav button...
    $('html').on('click', '.js-search-nav', function(e) {
        e.preventDefault();
        

        // Extract eTag and pageToken from link
        let pageToken = e.currentTarget.dataset.pagetoken;
        
        // Clear search results
        clearSearchResults();
        
        let searchTerm = $('#searchTerm').val()
        
        // query YouTube API
        queryYouTubeAPI(searchTerm, receiveSearchResults, pageToken);
        
    });
    
    $('main').on('click', '.thumbnail img', function(e) {
       e.preventDefault();
       
       // Extract video source from image dataset
       let videoID = e.currentTarget.dataset.videoid;
       
       // Set iframe src
       renderLightBox(videoID);
        
    });
    
}


/* TODO: When the user clicks on a video thumbnail... */
    /* TODO: Play the video in a lightbox */

function renderLightBox(videoID) {
    
    // Create the iframe HTML
    let iframeHTML = `
        <iframe id="player" type="text/html"
            src="https://www.youtube.com/embed/${videoID}?enablejsapi=1&origin=${window.location.href}""
            frameborder="0"></iframe>
    `;
    
    // Render the HTML
    $('.embed-container').html(iframeHTML);
    
    
    // Display the lightbox
    $('.js-lightbox').show();
    
}

function lightBoxHandler() {
    
    //When the user clicks on the lightBox...
    $('html').on('click', '.lightbox', function(e) {
       e.preventDefault();
       
       // Hide lightbox
       $('.lightbox').hide();
       
       //Remove iframe (stop video)
       $('.embed-container iframe').attr('src', null);

    });
    
}



/* TODO: When the user clicks outside the lightbox... */
    /* Make the video stop and the lightbox disappear */
    
function handleSearchApp() {
    //Load event handlers
    searchFormEventHandler();
    searchResultsEventHandler();
    lightBoxHandler();
    
}

/* TODO: App Launch Code! */
$(handleSearchApp);