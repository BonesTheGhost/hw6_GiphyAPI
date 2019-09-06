//Javascript Link Test
console.log("*** Giphy API -- script.js attached! ***")


// ===== ===== ===== API STUFF ===== ===== =====

//The API base address. All queries begin with a "?" ???
var api = "https://api.giphy.com/v1/gifs/search?";
//My custome key for the API provided by the developer account that I signed up for.
var apiKey = "&api_key=dVEhj3UXigqQgcr4tnFlTClyMXCEgZhZ";
//My SEARCH query.
var query = "&q="

// ===== ===== ===== ===== ===== ===== =====



// ----- ----- ----- VARIABLES ----- ----- -----
var buttons = ["rainbow", "taco", "hearthstone"];


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

    updateQuery(myGif);

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

        var divAddress = ["column1-a", "column1-b", "column1-c", "column2-a", "column2-b", "column2-c", "column3-a", "column3-b", "column3-c", "column4-a", "column4-b", "column4-c"];

        //clear the columns
        for (a = 0; a < 10; a++) {
            $("#"+divAddress[a]).empty();
        }

        for (i = 0; i < 10; i++) {

            console.log("[AJAX RESPONSE] :: ", response);
            //for holding a single 'gif' and its associated information
            var gifDiv = $("<div class='gif'>");

            //***CHECK THE GIPHY DOCS FOR THIS!!
            var rating = response.data[i].rating;
            console.log("[RATING] :: ", rating);

            //create a p tag to hold the rating info
            var pRating = $("<p>").text("Rating: " + rating);
            //render the p tage by appending to my div
            gifDiv.append(pRating);


            //Attemnpting to get the original gif from the response and store the URL from dot notation
            var gifURL = response.data[i].images.fixed_height_small.url;
            console.log("Current GIF URL :: ", gifURL);

            var image = $("<img>").attr("src", gifURL);

            gifDiv.append(image);

            //Adding the GIF above the other GIFs
            //Attempting to add the Gif to its own column container in the table based on the array divAddress
            //$("#column1-a").append(gifDiv);
            //console.log("*TARGET* :: ", divAddress[i], " appended with gifDiv containing: ", gifDiv);

            $("#"+divAddress[i]).append(gifDiv);

            console.log("Exiting the ajax call.");
        }
    });
    console.log("Exited the ** showGif() ** function.");
}

function updateQuery(myGif) {

    console.log("Entered the ** updateQuery() ** function.");

    //reset the query!
    query = "&q=";



    console.log("Attempting to update the search query with >>data-name<<");
    //console.log($(this).attr("data-name"));
    //query += $(this).attr("data-name");
    console.log("myGif");
    query += myGif;
    console.log("[NEW QUERY] :: ", myGif);

    console.log("Exited the ** updateQuery() ** function.");
}

//This handles where the search button is clicked.
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    userSearch = $("#gif-input").val().trim();
    console.log("User's search :: ", userSearch);

    // Adding movie from the textbox to our array
    buttons.push(userSearch);
    console.log("[ BUTTONS[] ] :: ", buttons);

    // Calling renderButtons which handles the processing of our movie array
    drawButtons();
  });



// This handles events where a button is clicked.
$(".gif-button").on("click", function (event) {
    console.log("CLICK LOGGED");
    event.preventDefault();

    showGif();

});

// Adding a click event listener to all elements with a class of gif-button.
$(document).on("click", ".gif-button", showGif);

// Calling the renderButtons function to display the intial buttons
drawButtons();



// ***** ***** ***** ***** ***** ***** *****