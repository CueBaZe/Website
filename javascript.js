let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a")

window.onscroll = () => {
            let top = window.scrollY;
            let offsetBuffer = 150; 
            sections.forEach(sec => {
                let offset = sec.offsetTop;
                let height = sec.offsetHeight;
                let id = sec.getAttribute("id");

                if (top + offsetBuffer >= offset && top + offsetBuffer < offset + height) {
                    navLinks.forEach(link => {
                        link.classList.remove("active");
                    });
                    document.querySelector(`header nav a[href*="#${id}"]`).classList.add("active");
                }
            });
        };

let projekter = document.querySelectorAll(".projekt");
let count = 0;
let onNumber = 1;

projekter.forEach(projekt => {
    count++;
    console.log(count);
});


function right() {
    if (onNumber < count) {
        onNumber++;
        console.log(onNumber);
    }
    else {
        onNumber = 1;
        console.log(onNumber);
    }
    moveSlide();
}

function left() {
    if (onNumber > 1) {
        onNumber--;
        console.log(onNumber);
    }
    else {
        onNumber = count;
        console.log(onNumber);
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






