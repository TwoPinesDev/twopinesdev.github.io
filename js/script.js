const footer_div = document.getElementsByClassName("footer_div");
const footer_div_2 = document.getElementsByClassName("footer_div_2");
const y = document.getElementById("css_switch");
const themes = document.getElementById("themes");
function center_shit() {
    for (let i = 0; i < footer_div_2.length; i++) {
        footer_div_2[i].setAttribute("align", "center");
    }
}

function colorize_2() {
    for (let i = 0; i < footer_div_2.length; i++) {
        footer_div_2[i].style.color = "black";
        footer_div_2[i].setAttribute("align", "center");
    }
}

function colorize_3() {
    for (let i = 0; i < footer_div_2.length; i++) {
        footer_div_2[i].style.color = "rgb(42, 65, 47)";
        footer_div_2[i].setAttribute("align", "center");
    }
}

for (let i = 0; i < footer_div.length; i++) {
    footer_div[i].style.fontSize = "1.25em";
    footer_div[0].innerHTML = "Address";
    footer_div[0].className = "footer_div_2";
}

for (let i = 0; i < footer_div_2.length; i++) {
    footer_div_2[i].style.fontSize = "1.25em";
    footer_div_2[0].innerHTML = "Address";
    footer_div_2[1].innerHTML = "Email";
    footer_div_2[2].innerHTML = "Phone";
}

for (let i = 0; i < footer_div_2.length; i++) {
    let footer = footer_div_2[i];
    let thing = document.getElementById("background_img");
    footer.addEventListener("click", () => {
        if (footer === footer_div_2[0]) {
            footer.innerHTML =
                "<a>" +
                "2629 Hampshire Rd, Uppr" + "<br>" +
                "Cleveland Hts, OH 44106" +
                "</a>";
            footer.style.fontSize = "1em";
            footer.classList.add("bottom");
                    if (document.getElementById("background_img").src === "img/pines_2.jpg") {
            footer.innerHTML =
                "<a class='footer_item''>" +
                "2629 Hampshire Rd Uppr, " + 
                "Cleveland Hts, OH 44106" +
                "</a>";
            footer.style.fontSize = "1em";
            footer.classList.add("bottom");
        }
        }
        if (footer === footer_div_2[1]) {
            footer.innerHTML =
                "<a class='footer_item' target='_blank' href = 'mailto: TwoPinesDev@gmail.com'>" +
                "TwoPinesDev@gmail.com" +
                "</a>";
            footer.style.fontSize = "1em";
        } 
        if (footer === footer_div_2[2]) {
            footer.innerHTML =
                "<a class='footer_item'>" + "1-440-749-2093" + "</a>";
            footer.style.fontSize = "1em";
        }
    });
}

function switcheroo() {
    let x = Math.floor(Math.random() * 4);
    if (x === 0) {
        theme_2();
    } else if (x === 1) {
        theme_3();
    } else if (x === 2) {
        theme_4();
    } else if (x === 3){
        theme_1();
    }
}

function theme_1() {
    document.getElementById("background_img").src = "img/pines_4.jpg";
    y.href = "css/style1.css";
    document.getElementById("insta").src = "img/logo-instagram-1.png";
    center_shit();
}

function theme_2() {
    document.getElementById("background_img").src = "img/pines_1.jpg";
    y.href = "css/style2.css";
    document.getElementById("insta").src = "img/logo-instagram-1.png";
    center_shit();
}

function theme_3() {
    document.getElementById("background_img").src = "img/pines_2.jpg";
    y.href = "css/style3.css";
    center_shit();
}

function theme_4() {
    document.getElementById("background_img").src = "img/pines_3.jpg";
    y.href = "css/style4.css";
    center_shit();
}

$("#theme_submission").click(() => {
    if ($("#themes").val() === "theme_1") {
        theme_1();
    } else if ($("#themes").val() === "theme_2") {
        theme_2();
    } else if ($("#themes").val() === "theme_3") {
        theme_3();
    } else if ($("#themes").val() === "theme_4") {
        theme_4();
    }
});

switcheroo();
//theme_1();
//theme_2();
//theme_3();
//theme_4();
//Temp function
