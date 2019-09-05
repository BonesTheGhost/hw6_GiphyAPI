//Javascript Link Test
console.log("*** Giphy API -- script.js attached! ***")


// ===== ===== ===== API STUFF ===== ===== =====

//The API base address. All queries begin with a "?" ???
var api = "https://api.giphy.com/v1/gifs/search?";
//My custome key for the API provided by the developer account that I signed up for.
var apiKey = "&api_key=dVEhj3UXigqQgcr4tnFlTClyMXCEgZhZ";
//My SEARCH query.
var query = "&q=taco"

// ===== ===== ===== ===== ===== ===== =====



// ----- ----- ----- VARIABLES ----- ----- -----
var buttons = ["Rainbow","Taco","Hearthstone"];
var userSearch = "";


// ----- ----- ----- ----- ----- ----- -----



// ***** ***** ***** FUNCTIONS ***** ***** *****

function drawButtons() {

    //Clear the old junk.
    $("#button-section").empty();

    // Looping through the initial buttons.
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
}



function showGif() {

    var myGif = $(this).attr("data-name");
    var queryURL = api + query + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        //for holding a single 'gif' and its associated information
        var gifDiv = $("<div class='gif'>");

        //***CHECK THE GIPHY DOCS FOR THIS!!
        var rating = response.Rated;

        //create a p tag to hold the rating info
        var pRating = $("<p>").text("Rating: " + rating);
        //render the p tage by appending to my div
        gifDiv.append(pRating);


        //Attemnpting to get the original gif from the response and store the URL from dot notation
        var gifURL = response.data[0].images.original.url;

        var image = $("<img>").attr("src", gifURL);

        gifDiv.append(image);

        //Adding the GIF above the other GIFs
        $("#gif-section").prepend(gifDiv);
    });
}



// This function handles events where a button is clicked.
$(".gif-button").on("click", function (event) {
    event.preventDefault();
    
    showGif();

});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".gif-button", showGif);

// Calling the renderButtons function to display the intial buttons
drawButtons();



// ***** ***** ***** ***** ***** ***** *****