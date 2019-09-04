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
var buttons = ["Rainbow"];
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
    }).then(function(response) {

        //***CHECK THE GIPHY DOCS FOR THIS!!
        var rating = response.Rated;

        //create a p tag to hold the rating info
        var pRating = $("<p>").text("Rating: " + rating);
        //render the p tage by appending to my div
        $("#gif-section").append(pRating);

        


    }
}



// ***** ***** ***** ***** ***** ***** *****