document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    let offsetBuffer = 150; // Adjust for fixed navbar height

    window.onscroll = () => {
        let top = window.scrollY;

        sections.forEach((section) => {
            let offset = section.offsetTop;
            let height = section.offsetHeight;
            let id = section.getAttribute("id");

            if (top + offsetBuffer >= offset && top + offsetBuffer < offset + height) {
                navLinks.forEach((link) => link.classList.remove("active"));

                const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    };
});



let projekter = document.querySelectorAll(".projekt");
let count = 0;
let onNumber = 1;

projekter.forEach(projekt => {
    count++;
});


function right() {
    if (onNumber < count) {
        onNumber++;
    }
    else {
        onNumber = 1;
    }
    moveSlide();
}

function left() {
    if (onNumber > 1) {
        onNumber--;
    }
    else {
        onNumber = count;
    }
    moveSlide();
}

function moveSlide() {
    projekter.forEach(projekt => {
        id = projekt.getAttribute("id");
        if (id == onNumber) {
            projekt.classList.add("activated");
            projekt.classList.remove("deactivated");
        } else {
            projekt.classList.remove("activated");
            projekt.classList.add("deactivated");
        }
    });
}

var number1;
var number2;

function makeCaptchaNumbers() {
    const captchaItem = document.getElementById('captcha');


    number1 = Math.floor(Math.random() * 10);
    number2 = Math.floor(Math.random() * 10);

    captchaItem.placeholder = "Hvad er " + number1 + " " + "+ " + number2 + "?";
}

document.getElementById("submitbtn").addEventListener('click', function (event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const emailInfo = document.getElementById('emailInfo').value.trim();
    const besked = document.getElementById('besked').value.trim();
    const captchaInput = document.getElementById('captcha').value.trim();

    if (!firstName) {
        alert('Fornavn er påkrævet.');
        return;
    }

    if (!emailInfo) {
        alert('E-mail er påkrævet.');
        return;
    }

    if (!besked) {
        alert('Besked er påkrævet.');
        return;
    }

    if (parseInt(captchaInput) !== number1 + number2) {
        alert("Captcha er forkert prøv igen");
    } else {
        event.target.form.submit();
    }
}) 






