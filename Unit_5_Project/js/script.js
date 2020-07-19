const randomUser = "https://randomuser.me/api/?results=12&nat=us";
let userArray = [];
let currentItem = 0;

const lighter = "rgb(240, 245, 253)";
const light = "rgb(204, 217, 243)";
const dark = "rgb(115, 141, 193)";
const greenish = "rgb(56, 146, 71)";

alert("This project will fetch API data and append it to each person's card. Click on any person to create a modal window with further details. Enter a name into the search bar to narrow results.");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////API SECTION//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//This function fetches the JSON data, stores it in the userArray[], and also calls the personalData function to display the data on-screen, as well as the cardAppendage() function to append divs, etc. for formatting the data
function getJSON(url) {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            const jsonData = json.results;
            userArray = [...jsonData];
            personalData(userArray);
        })
        .then(cardAppendage());
}

//Function to format birthdays
function regEx(date) {
    //RegExp function to limit string to one set of numbers + - + set of numbers + - + set of numbers
    let expression = /(\d+)(-)(\d+)(-)(\d+)/;
    //Using .replace method to take the values between the "-"s and rearrange them, adding "/"s to replace the "-"s
    let newString = date.replace(expression, "$3" + "/" + "$5" + "/" + "$1");
    //Returning the string that's been reformatted to 00/00/0000 and has now cut off the extra data on the end, beyond 0-8
    return newString.substr(0, 8);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////CARD SECTION/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//This function is to format the data, looping through to create and append divs with placeholders, etc. for each person, and to give the data somewhere to be displayed
//Ran into some trouble at one point; the <div> was appending to $(".card) as text. I found the eq() solution: https://stackoverflow.com/questions/40462236/jquery-appends-as-text-instead-of-html
function cardAppendage() {
    for (let i = 0; i < 12; i++) {
        $("#gallery").append("<div class='card'></div>");
        $(".card")
            .eq(i)
            .append("<div class='card-img-container'></div>");
        $(".card")
            .eq(i)
            .append("<div class='card-info-container'></div>");
        $(".card-img-container")
            .eq(i)
            .append(
                "<img class='card-img' src='https://placehold.it/90x90' alt='profile picture'>"
            );
        $(".card-info-container")
            .eq(i)
            .append("<h3 id='name' class='card-name cap'>first last</h3>");
        $(".card-info-container")
            .eq(i)
            .append("<p class='card-text'>email</p>");
        $(".card-info-container")
            .eq(i)
            .append("<p class='card-text cap'>city, state</p>");
    }
    $("h3").css("color", dark);
    $(".card").attr("id", function(arr) {
        return arr;
    });
}

//Invoked within the getJSON() function; selects certain data to replace the placeholders used in cardAppendage() function
function personalData(data) {
    for (let k = 0; k < data.length; k++) {
        $(".card-name")
            .eq(k)
            .text(data[k].name.first + " " + data[k].name.last);
        $(".card-img")
            .eq(k)
            .attr("src", data[k].picture.large);
        $("h3")
            .next()
            .eq(k)
            .text(data[k].email);
        $("p")
            .next()
            .eq(k)
            .text(data[k].location.city);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////MODAL SECTION////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function modalColors() {
    $(".modal").css("backgroundColor", light);
    $(".modal-btn-container").css("backgroundColor", light);
    $(".modal-info-container").css("backgroundColor", lighter);
    $(".modal-name").css("color", dark);
}

//Function to append the placeholder template for the modal window
function modalAppendage() {
    $("body").append("<div class='modal-container'></div>");
    $(".modal-container").append("<div class='modal'></div>");
    $(".modal").append(
        "<button type='button' id='modal-close-btn' class='modal-close-btn'><strong>X</strong></button>"
    );
    $(".modal").append(
        "<img class='modal-img' src='https://placehold.it/125x125' alt='profile picture'>"
    );
    $(".modal").append("<div class='modal-info-container'></div>");
    $(".modal-info-container").append(
        "<img class='modal-img' src='https://placehold.it/125x125' alt='profile picture>'"
    );
    $(".modal-info-container").append(
        "<h3 id='name' class='modal-name cap'>name</h3>"
    );
    $(".modal-info-container").append("<p class='modal-text'>email</p>");
    $(".modal-info-container").append("<p class='modal-text cap'>city</p>");
    $(".modal-info-container").append("<hr>");
    $(".modal-info-container").append(
        "<p class='modal-text'>(555) 555-5555</p>"
    );
    $(".modal-info-container").append(
        "<p class='modal-text'>123 Portland Ave., Portland, OR 97204</p>"
    );
    $(".modal-info-container").append(
        "<p class='modal-text'>Birthday: 10/21/2015</p>"
    );
    $(".modal-container").append("<div class='modal-btn-container'>");
    $(".modal-btn-container").append(
        "<button type='button' id='modal-prev' class='modal-prev btn'>Prev</button>"
    );
    $(".modal-btn-container").append(
        "<button type='button' id='modal-next' class='modal-next btn'>Next</button>"
    );
    modalColors();
}

//Function to append data that corresponds to .card to the modal window. Formats birthday data as well
function modalData(id) {
    const name = $("#name.modal-name");
    const email = name.next();
    const city = email.next();
    const phone = city.next().next();
    const address = phone.next();
    const birthday = address.next();
    $(".modal-img").attr("src", userArray[currentItem].picture.large);
    name.text(
        userArray[currentItem].name.first +
            " " +
            userArray[currentItem].name.last
    );
    email.text(userArray[currentItem].email);
    city.text(userArray[currentItem].location.city);
    phone.text(userArray[currentItem].phone);
    address.text(
        userArray[currentItem].location.street.number +
            " " +
            userArray[currentItem].location.street.name +
            " " +
            userArray[currentItem].location.city +
            ", " +
            userArray[currentItem].location.state +
            " " +
            userArray[currentItem].location.postcode
    );
    birthday.text("Birthday: " + regEx(userArray[currentItem].dob.date));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////CLICK EVENTS AND FUNCTION INVOCATION/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Calling on function
getJSON(randomUser);

//I found this article very helpful when it came to setting up the modal:
//https://www.w3schools.com/howto/howto_css_modals.asp
//This is a click event set on .card that when clicked, the whole modal window pops up with placeholders. Also sets currentItem variable to be used with "previous" and "next" buttons
$(".card").click(e => {
    currentItem = e.currentTarget.id;
    modalAppendage();
    modalData(userArray[currentItem]);
    //This is a click event for the "X" button to remove the modal window
    $("#modal-close-btn").click(() => {
        $(".modal-container").remove();
    });
    //This is a click event adding functionality to the "next" modal button
    $("#modal-next").click(e => {
        if (currentItem < 11) {
            currentItem++;
            modalData(userArray[currentItem]);
        } else {
            currentItem === 0;
        }
    });
    //This is a click event adding functionality to the "prev" modal button
    $("#modal-prev").click(e => {
        if (currentItem > 0) {
            currentItem--;
            modalData(userArray[currentItem]);
        } else {
            currentItem === 0;
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////SEARCH BAR///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("header").append("<form action='#' method='get'></form>");
$("form").append(
    "<input type='search' id='search-input' class='search-input' placeholder='Search...'>"
);
$("form").append(
    "<input type='submit' value='&#x1F50D;' id='search-submit' class='search-submit'>"
);

$("#search-input").keyup(e => {
    //Filterlist necessary for border styling
    let filterList = [];
    const $submit = $("#search-input").val();
    //Looping through the cards, hiding those that don't match
    for (let t = 0; t < $(".card").length; t++) {
        $(".card")
            .eq(t)
            .hide();
        //Declaring a variable to select the text from the .card #name
        let $name = $(".card-name")
            .eq(t)
            .prop("innerHTML")
            .toLowerCase();
        //Conditional saying if what is searched matches a .card #name, show that card and push it to filterList
        if ($name.includes($submit.toLowerCase())) {
            $(".card")
                .eq(t)
                .show();
            filterList.push($(".card"));
            //Once the search has found the .card being searched for, the card will acquire a green border
            if (filterList.length === 1) {
                $(".card")
                    .eq(t)
                    .css("border", "3px solid rgb(96, 178, 110)");
            } else {
                $(".card").css("border", "none");
            }
        }
    }
});
