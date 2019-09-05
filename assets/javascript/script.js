//Javascript Link Test
console.log("*** Giphy API -- script.js attached! ***")


// ===== ===== ===== API STUFF ===== ===== =====

//The API base address. All queries begin with a "?" ???
var api = "https://api.giphy.com/v1/gifs/search?";
//My custome key for the API provided by the developer account that I signed up for.
var apiKey = "&api_key=dVEhj3UXigqQgcr4tnFlTClyMXCEgZhZ";
//My SEARCH query.
var query = "&q=rainbow"

// ===== ===== ===== ===== ===== ===== =====



// ----- ----- ----- VARIABLES ----- ----- -----
var buttons = ["rainbow","taco","hearthstone"];
var userSearch = "";


// ----- ----- ----- ----- ----- ----- -----



// ***** ***** ***** FUNCTIONS ***** ***** *****

function drawButtons() {

    //Clear the old junk.
    $("#button-section").empty();
    console.log("Cleared the old buttons.");

    // Looping through the initial buttons.
    console.log("Entering the button draw loop.");
    for (var i = 0; i < buttons.length; i++) {

        //Dynamically create a button.
        var b = $("<button>");
        // Add class of gif-button to the button
        b.addClass("gif-button");
        // Adding a data-attribute to hold the name (i.e the search term)
        b.attr("data-name", buttons[i]);
        // Providing the initial button text
        b.text(buttons[i]);
        // Adding the button to the buttons-view div
        $("#button-section").append(b);
    }
    console.log("Exited the button draw loop.");
}



function showGif() {

    console.log("Entered the ** showGif() ** function.");

    var myGif = $(this).attr("data-name");
    var queryURL = api + query + apiKey;
    console.log("[API] :: ", api);
    console.log("[Query] :: ", query);
    console.log("[apiKey] :: ", apiKey);
    console.log("[queryURL] :: ", queryURL);


    console.log("Entering the ajax call.");

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log("[AJAX RESPONSE] :: ", response);
        //for holding a single 'gif' and its associated information
        var gifDiv = $("<div class='gif'>");

        //***CHECK THE GIPHY DOCS FOR THIS!!
        var rating = response.Rated;
        console.log("[RATING] :: ", rating);

        //create a p tag to hold the rating info
        var pRating = $("<p>").text("Rating: " + rating);
        //render the p tage by appending to my div
        gifDiv.append(pRating);


        //Attemnpting to get the original gif from the response and store the URL from dot notation
        var gifURL = response.data[0].images.original.url;
        console.log("Current GIF URL :: ", gifURL);

        var image = $("<img>").attr("src", gifURL);

        gifDiv.append(image);

        //Adding the GIF above the other GIFs
        $("#gif-section").append(gifDiv);

        console.log("Exiting the ajax call.");
    });
    console.log("Exited the ** showGif() ** function.");
}

function updateQuery(query) {

    console.log("Entered the ** updateQuery() ** function.");


    console.log("Attempting to update the search query with >>data-name<<");
    console.log(this.data-name);
    query = query.concat(this.data-name);
    console.log("[NEW QUERY] :: ", query);


    console.log("Exited the ** updateQuery() ** function.");
}



// This function handles events where a button is clicked.
$(".gif-button").on("click", function (event) {
    event.preventDefault();

    updateQuery(query);
    
    showGif();

});

// Adding a click event listener to all elements with a class of gif-button.
$(document).on("click", ".gif-button", showGif);

// Calling the renderButtons function to display the intial buttons
drawButtons();



// ***** ***** ***** ***** ***** ***** *****