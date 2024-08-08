let openBtn = document.querySelector(".bi-list");
let closeBtn = document.querySelector(".bi-x-lg");

let menu = document.querySelector(".navbar__menu");

openBtn.addEventListener("click", () => {
  openBtn.classList.toggle("hide");
  closeBtn.classList.toggle("hide");
  menu.classList.toggle("hidden");
});

closeBtn.addEventListener("click", () => {
  closeBtn.classList.toggle("hide");
  openBtn.classList.toggle("hide");
  menu.classList.toggle("hidden");
});

menu.addEventListener("click", (e) => {
  e.target.parentNode.classList.toggle("hidden");
  openBtn.classList.toggle("hide");
  closeBtn.classList.toggle("hide");
});

function SendMail() {
  let params = {
    from_name: document.getElementById("name").value,
    email_id: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };
  emailjs.send("service_gch7k9k", "template_h3vs9a6", params).then(
    function (res) {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      alert("Success!... " + res.status);
    },
    function (error) {
      alert("Failed!.... " + error);
    }
  );
}
// teks bergerak
// set up text to print, each item in array is new line
var aText = new Array("I'm Mohamad Apandi, a Website Developer");
var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ""; // initialise contents variable
var iRow; // initialise current row

function typewriter() {
  sContents = " ";
  iRow = Math.max(0, iIndex - iScrollAt);
  var destination = document.getElementById("shift-content");

  while (iRow < iIndex) {
    sContents += aText[iRow++] + "<br />";
  }
  destination.innerHTML =
    sContents + aText[iIndex].substring(0, iTextPos) + "_";
  if (iTextPos++ == iArrLength) {
    iTextPos = 0;
    iIndex++;
    if (iIndex != aText.length) {
      iArrLength = aText[iIndex].length;
      setTimeout("typewriter()", 500);
    }
  } else {
    setTimeout("typewriter()", iSpeed);
  }
}

typewriter();
