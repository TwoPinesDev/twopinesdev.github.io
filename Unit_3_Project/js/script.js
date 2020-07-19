///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////PROJECT THREE/////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////SOME FUNCTIONS & GLOBAL VARIABLES/////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

alert("This is the form validation project. To interact, fill out the form and submit when you're finished. The form will generate messages if any information is missing or in an incorrect format, add up the total cost for events, and cancel out overlapping choices. The form will not collect any actual information, this is for example purposes only. Upon submission the page will refresh.");

function changeColor(element, color) {
    return element.css("color", color);
}

//Global Variables
const $paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
$paypal.firstElementChild.innerHTML += "<br>";
bitcoin.firstElementChild.innerHTML += "<br>";
const $payment = $("#payment");

//Flash messages for validation
const $nameFlash = $("<span id='nameWarning'></span").html(
    "Please enter your full name" + "<br>"
);
const $nameFlash2 = $("<span id='nameWarning2'></span").html(
    "Please enter your full name" + "<br>"
);
const $nameFlash3 = $("<span id='nameWarning3'></span").html(
    "Please enter your full name" + "<br>"
);
const $emailFlash = $("<span id='emailWarning'></span").html(
    "Please enter a valid eMail address" + "<br>"
);
const $emailFlash2 = $("<span id='emailWarning2'></span").html(
    "Please enter a valid eMail address" + "<br>"
);
const $emailFlash3 = $("<span id='emailWarning3'></span").html(
    "Please enter a valid eMail address" + "<br>"
);
const $activityFlash = $("<span id='activityFlash'></<span>").html(
    "Please check at least one activity" + "<br>"
);
const $activityFlash2 = $("<span id='activityFlash2'></<span>").html(
    "Please check at least one activity" + "<br>"
);
const $activityFlash3 = $("<span id='activityFlash3'></<span>").html(
    "Please check at least one activity" + "<br>"
);
const $cardFlash = $("<span id='cardWarning'></span").html(
    "Please enter a valid 16 digit card number" + "<br>"
);
const $cardFlash2 = $("<span id='cardWarning2'></span").html(
    "Halfway there!" + "<br>"
);
const $zipFlash = $("<span id='zipWarning'></span").html(
    "Please enter a valid 5 digit ZIP code" + "<br>"
);
const $cvvFlash = $("<span id='cvvWarning'></span").html(
    "Please enter a valid 3 digit CVV" + "<br>"
);

//Designing & appending flash messages
changeColor($nameFlash, "red");
$(".col-6").append($nameFlash);
changeColor($nameFlash2, "red");
$("#paypal p").append($nameFlash2);
changeColor($nameFlash3, "red");
$("#bitcoin p").append($nameFlash3);

changeColor($emailFlash, "red");
$(".col-6").append($emailFlash);
changeColor($emailFlash2, "red");
$("#paypal p").append($emailFlash2);
changeColor($emailFlash3, "red");
$("#bitcoin p").append($emailFlash3);

changeColor($activityFlash, "red");
$(".col-6").append($activityFlash);
changeColor($activityFlash2, "red");
$("#paypal p").append($activityFlash2);
changeColor($activityFlash3, "red");
$("#bitcoin p").append($activityFlash3);

changeColor($cardFlash, "red");
$(".col-6").append($cardFlash);
changeColor($cardFlash2, "green");
$(".col-6").append($cardFlash2);

$zipFlash.css("color", "red");
$(".col-6").append($zipFlash);

changeColor($cvvFlash, "red");
$(".col-6").append($cvvFlash);

//Hiding flash messages
$nameFlash.hide();
$nameFlash2.hide();
$nameFlash3.hide();
$emailFlash.hide();
$emailFlash2.hide();
$emailFlash3.hide();
$activityFlash.hide();
$activityFlash2.hide();
$activityFlash3.hide();
$("#cardWarning").hide();
$("#cardWarning2").hide();
$("#zipWarning").hide();
$("#cvvWarning").hide();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////INITIAL TASKS/////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Focus on first input upon pageload.
$("#name").focus();

//Hide "other job" text input.
$("#other-title").hide();

//Variable containing all the color options, to be looped through.
const $options = $("#colors-js-puns option");

//Function to hide shirt color options being used upon page load.
hideShirts();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////JOB ROLE SECTION/////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Conditional statement to check if "other" value was chosen in drop-down. If so, it shows a text input, if not it's hidden.

$("#title").change(function() {
    if ($("#title").val() === "other") {
        $("#other-title").show();
    } else {
        $("#other-title").hide();
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////SHIRT COLOR SECTION///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Function to remove all shirt color options.
function hideShirts() {
    for (let i = 0; i < $options.length; i++) {
        const $chosenOption = $options[i];
        //Removing all options, and hiding the label & dropdown
        $chosenOption.remove();
        $("#colors-js-puns").addClass("is-hidden");
    }
}

//Function to append the shirt options corresponding to "JS puns".
function showShirts_puns() {
    for (let i = 0; i < $options.length; i++) {
        //Removing hidden class
        $("#colors-js-puns").removeClass("is-hidden");
        //Appending correct options
        $("#color").append($options[2]);
        $("#color").append($options[1]);
        $("#color").append($options[0]);
    }
}

//Function to append the shirt options corresponding to "I heart JS".
function showShirts_love() {
    for (let i = 0; i < $options.length; i++) {
        //Removing hidden class
        $("#colors-js-puns").removeClass("is-hidden");
        //Appending correct options
        $("#color").append($options[5]);
        $("#color").append($options[4]);
        $("#color").append($options[3]);
    }
}

//Method in which when a design is chosen, the corresponding color options will appear.
$("#design").change(function() {
    if ($("#design").val() === "js puns") {
        hideShirts();
        showShirts_puns();
    } else if ($("#design").val() === "heart js") {
        hideShirts();
        showShirts_love();
    } else {
        hideShirts();
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////ACTIVITIES SECTION//////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////CALCULATE TOTAL///////////////////////////////////////////////////////////////////////
//

let $total = 0;

//Method set up so that for every box checked, an input is added to dateArray and the $total is changed.
$(".activities input").on("change", function(event) {
    //Variable used to call upon $totalDiv, and a conditional statement to see if it exists yet. Deletes clone divs when checking multiple boxes.
    const $divCheck = $("#divCheck");
    if ($divCheck !== null) {
        $divCheck.remove();
    }

    const $check = event.target;
    const isChecked = $check.checked;
    //Conditional statements checking:
    //1: if checkbox has name "all", upon checking 200 is added to total and entry is added to array.
    if ($check.name === "all" && isChecked) {
        $total += 200;
        //2: if checkbox had name "all" and is already checked, upon unchecking 200 is deducted from total and entry is deleted from array.
    } else if ($check.name === "all") {
        $total -= 200;
        //3: if a checkbox is unchecked, upon checking 100 is added to the total and the entry is added to the array.
    } else if (isChecked) {
        $total += 100;
        //4: if a checkbox is already checked, upon unchecking 100 is deducted from total and the entry is deleted from the array.
    } else {
        $total -= 100;
    }

    if ($total === 0) {
        $activityFlash.show();
    } else {
        $activityFlash.hide();
    }

    //Div is created upon clicking that displays $total.
    let $totalDiv = "<div id='divCheck'>" + "$" + $total + "</div>";
    $(".activities").append($totalDiv);

    /////////////////////////////////////////////////CHECKBOX FUNCTIONALITY////////////////////////////////////////////////////////////////
    //

    const $checkboxes = $(".activities input");
    for (let k = 0; k < $checkboxes.length; k++) {
        let $chosenBox = $checkboxes[k];
        let $chosenLabel = $(".activities label")[k];
        let $checkboxData = $chosenBox.dataset.dayAndTime;

        if ($check.dataset.cost < 200) {
            if ($check.dataset.dayAndTime === $checkboxData) {
                if ($chosenBox.checked != true) {
                    $chosenBox.disabled = true;
                    $chosenLabel.style.color = "red";
                    if ($check.checked != true) {
                        $chosenBox.disabled = false;
                        $chosenLabel.style.color = "";
                    }
                }
            }
        }
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////PAYMENT SECTION///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////PAYMENT METHODS//////////////////////////////////////////////////////////////////////
//

//Setting default selection as "credit card"
$("#payment option")
    .eq(1)
    .attr("selected", true);
$("#payment option")
    .eq(0)
    .remove();

//Initially hiding Paypal & Bitcoin options
$("#paypal").hide();
$("#bitcoin").hide();

//Function to hide or show payment options based on selection in dropdown
$payment.on("change", function() {
    if ($payment.val() === "credit card") {
        $("#credit-card").show();
        $("#paypal").hide();
        $("#bitcoin").hide();
    } else if ($payment.val() === "paypal") {
        $("#credit-card").hide();
        $("#bitcoin").hide();
        $("#paypal").show();
    } else if ($payment.val() === "bitcoin") {
        $("#credit-card").hide();
        $("#paypal").hide();
        $("#bitcoin").show();
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////VALIDATION SECTION////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////NAME//////////////////////////////////////////////////////////////////////////
//
//RegEx for name input
const regExName = /^[a-z\s]+$/i;

//Keyup event for name validation
$("#name").on("keyup", function(e) {
    if (
        !$("#name")
            .val()
            .match(regExName)
    ) {
        $("#name").css("border-color", "red");
        $nameFlash.show();
    } else {
        $("#name").css("border-color", "rgb(111, 157, 220)");
        $nameFlash.hide();
    }
});

//////////////////////////////////////////////////////////////////////EMAIL/////////////////////////////////////////////////////////////////
//
//RegEx for email input
const regExEmail = /^[^@]+@[^@.]+.[a-z]+$/i;

//Keyup event for email validation
$("#mail").on("keyup", function(e) {
    if (
        !$("#mail")
            .val()
            .match(regExEmail)
    ) {
        $("#mail").css("border-color", "red");
        $emailFlash.show();
    } else {
        $("#mail").css("border-color", "rgb(111, 157, 220)");
        $emailFlash.hide();
    }
});

/////////////////////////////////////////////////////////////////CREDIT CARD///////////////////////////////////////////////////////////////////
//
//RegEx for credit card input
const regExCard = /^(\d{4})\D*(\d{4})\D*(\d{4})\D*(\d{4})$/;

//Keyup event for credit card validation
$("#cc-num").on("keyup", function(e) {
    //If value doesn't match RegEx, flash message is displayed
    if ($("#cc-num").val().length > 7 && $("#cc-num").val().length < 16) {
        $cardFlash2.show();
        $cardFlash.hide();
    } else if (
        !$("#cc-num")
            .val()
            .match(regExCard) &&
        $("#cc-num").val().length < 8
    ) {
        $cardFlash.show();
        $cardFlash2.hide();
    } else {
        $cardFlash.hide();
        $cardFlash2.hide();
    }
});

//Function to reformat credit card number to "xxxx xxxx xxxx xxxx"
function reformatCredit(text) {
    const regex = /^(\d{4})\D*(\d{4})\D*(\d{4})\D*(\d{4})$/g;
    return text.toString().replace(regex, "$1 $2 $3 $4");
}

//Blur event to initiate reformatting function
$("#cc-num").on("blur", function(e) {
    e.target = $("#cc-num");
    //If no value is entered upon blur event, placeholder is changed
    if (!$("#cc-num").val()) {
        $("#cc-num").attr("placeholder", "Please enter a card number");
        $cardFlash.show();
    } else {
        $("#cc-num").val(reformatCredit($("#cc-num").val()));
    }
});

//RegEx for zip code input
const regExZip = /^\d{5}$/;

//Keyup event for zip code validation
$("#zip").on("keyup", function(e) {
    if (
        !$("#zip")
            .val()
            .match(regExZip)
    ) {
        $zipFlash.show();
    } else {
        $zipFlash.hide();
    }
});

//Blur function that changes placeholder if no numbers entered upon blur event
$("#zip").on("blur", function(e) {
    if (!$("#zip").val()) {
        $("#zip").attr("placeholder", "ZIP Required");
    }
});

//RegEx for CVV input
const regExCVV = /^\d{3}$/;

//Keyup event for CVV validation
$("#cvv").on("keyup", function(e) {
    if (
        !$("#cvv")
            .val()
            .match(regExCVV)
    ) {
        $cvvFlash.show();
    } else {
        $cvvFlash.hide();
    }
});

//Blur event that changes the placeholder if no numbers are entered
$("#cvv").on("blur", function(e) {
    if (!$("#cvv").val()) {
        $("#cvv").attr("placeholder", "CVV Required");
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////SUBMIT BUTTON///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("button").on("click", function(e) {
    ////////////////////////////////////////////////////////////////CREDIT CARD INFO///////////////////////////////////////////////////////////
    //
    if ($("#payment").val() === "credit card") {
        $cardFlash2.hide();
        if (
            !$("#name")
                .val()
                .match(regExName)
        ) {
            e.preventDefault();
            $nameFlash.show();
            $("#name").css("border-color", "red");
        } else {
            $nameFlash.hide();
            $("#name").css("border-color", "rgb(111, 157, 220)");
        }
        if (
            !$("#mail")
                .val()
                .match(regExEmail)
        ) {
            e.preventDefault();
            $emailFlash.show();
            $("#mail").css("border-color", "red");
        } else {
            $emailFlash.hide();
            $("#mail").css("border-color", "rgb(111, 157, 220)");
        }
        if ($total === 0) {
            e.preventDefault();
            $activityFlash.show();
        } else {
            $activityFlash.hide();
        }
        if (
            !$("#cc-num")
                .val()
                .match(regExCard)
        ) {
            e.preventDefault();
            $cardFlash.show();
        } else {
            $cardFlash.hide();
        }
        if (
            !$("#zip")
                .val()
                .match(regExZip)
        ) {
            e.preventDefault();
            $zipFlash.show();
        } else {
            $zipFlash.hide();
        }
        if (
            !$("#cvv")
                .val()
                .match(regExCVV)
        ) {
            e.preventDefault();
            $cvvFlash.show();
        } else {
            $cvvFlash.hide();
        }
        //////////////////////////////////////////////////////////////PAYPAL///////////////////////////////////////////////////////////////////
        //
    } else if ($("#payment").val() === "paypal") {
        if (
            !$("#name")
                .val()
                .match(regExName)
        ) {
            e.preventDefault();
            $nameFlash2.show();
            $("#name").css("border-color", "red");
        } else {
            $nameFlash2.hide();
            $("#name").css("border-color", "rgb(111, 157, 220)");
        }
        if (
            !$("#mail")
                .val()
                .match(regExEmail)
        ) {
            e.preventDefault();
            $emailFlash2.show();
            $("#mail").css("border-color", "red");
        } else {
            $emailFlash2.hide();
            $("#mail").css("border-color", "rgb(111, 157, 220)");
        }
        if ($total === 0) {
            e.preventDefault();
            $("#activityFlash2").show();
        } else {
            $("#activityFlash2").hide();
        }
        ////////////////////////////////////////////////////////////////BITCOIN////////////////////////////////////////////////////////////////
        //
    } else if ($("#payment").val() === "bitcoin") {
        if (
            !$("#name")
                .val()
                .match(regExName)
        ) {
            e.preventDefault();
            $nameFlash3.show();
            $("#name").css("border-color", "red");
        } else {
            $nameFlash3.hide();
            $("#name").css("border-color", "rgb(111, 157, 220)");
        }
        if (
            !$("#mail")
                .val()
                .match(regExEmail)
        ) {
            e.preventDefault();
            $emailFlash3.show();
            $("#mail").css("border-color", "red");
        } else {
            $emailFlash3.hide();
            $("#mail").css("border-color", "rgb(111, 157, 220)");
        }
        if ($total === 0) {
            e.preventDefault();
            $("#activityFlash3").show();
        } else {
            $("#activityFlash3").hide();
        }
    }
});
