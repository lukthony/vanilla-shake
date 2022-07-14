/* ----------------------------- HTML INJECTION ----------------------------- */

/**
 * Function injects specified HTML file to specified HTML
 * node of the current file
 *
 * @param filePath - a path to a source HTML file to inject
 * @param elem - an HTML element to which this content will
 * be injected
 */
async function injectHTML(filePath, elem) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      return;
    }
    const text = await response.text();
    elem.innerHTML = text;
    // reinject all <script> tags
    // for each <script> tag on injected html
    elem.querySelectorAll("script").forEach((script) => {
      // create a new empty <script> tag
      const newScript = document.createElement("script");
      // copy attributes of existing script tag
      // to a new one
      Array.from(script.attributes).forEach((attr) =>
        newScript.setAttribute(attr.name, attr.value)
      );
      // inject a content of existing script tag
      // to a new one
      newScript.appendChild(document.createTextNode(script.innerHTML));
      // replace existing script tag to a new one
      script.parentNode.replaceChild(newScript, script);
    });
  } catch (err) {
    console.error(err.message);
  }
}

/**
 * Function used to process all HTML tags of the following
 * format: <div include="<filename>"></div>
 *
 * This function injects a content of <filename> to
 * each div with the "include" attribute
 */
function injectAll() {
  document.querySelectorAll("div[include]").forEach((elem) => {
    injectHTML(elem.getAttribute("include"), elem);
  });
}

injectAll();

/* ------------------- MODIFY HEADER BACKGROUND ON SCROLL ------------------- */

$(function () {
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 10) {
      $(".header").addClass("active");
    } else {
      //remove the background property so it comes transparent again (defined in your css)
      $(".header").removeClass("active");
    }
  });
});

/* ----------- CALL TO ACTION THAT MODIFIES SOMETHING ON THE PAGE ----------- */
// TODO: implement this

function hideError() {
  err = document.getElementById("errormsg")
  err.innerHTML = "";
  err.style.visibility = "hidden";
  err.style.height = "0";
}

function showError(text, elem) {
  err = document.getElementById("errormsg")
  err.innerHTML = text;
  err.style.visibility = "visible";
  err.style.height = "auto";
  elem.focus();
}

function validateForm() {
  var name = document.forms[0]["name"];
  var email = document.forms["myForm"]["email"];
  var subject = document.forms["myForm"]["subj"];
  var message = document.forms["myForm"]["msg"];

  if (name.value == "") {
    showError("Please enter a valid name", name);
    return false;
  } else {
    hideError();
  }

  if (email.value == "") {
    showError("Please enter a valid email", email);
    return false;
  } else {
    hideError();
  }

  if (email.value.indexOf("@", 0) < 0) {
    showError("Please enter a valid email", email);
    email.focus();
    return false;
  }

  if (email.value.indexOf(".", 0) < 0) {
    showError("Please enter a valid email", email);
    return false;
  }

  if (message.value == "") {
    showError("Please enter a valid message", message);
    return false;
  } else {
    hideError();
  }

  if (subject.value == "") {
    showError("Please enter a valid subject", subject);
    return false;
  } else {
    hideError();
  }

  return true;
}

/* ---------------------------------- MODAL --------------------------------- */

// Arrays of image paths and descriptions
var myPix = new Array("images/shakes/choco.jpg","images/shakes/drippy-oreo.jpg","images/shakes/explosion-berries.jpg","images/shakes/grass.jpg","images/shakes/light-nutty.jpg","images/shakes/pickle-jar.jpg","images/shakes/pink-sprinkle.jpg","images/shakes/settling.jpg","images/shakes/spilling.jpg","images/shakes/tangy.jpg");
var myDesc = new Array("We added a heart-attack-causing chemical to this one so if the three cookies and half liter of chocolate don't get you, this terrifying toxin will!","This one's just a normal shake.","We put plastic explosive in this one! Imagine pop rocks, but, like, more visceral.","Matcha? Seriously? What kind of freak wants to drink grass? Are you a cow? A horse?","This one's made with enough THC to immediately overdose you in a single sip! You'll feel absolutely wild in your last moments, though.","This is just a normal shake, except we poured it into an unwashed pickle jar.","The straw is real bamboo, and the sprinkles are honest-to-goodness crystal methamphetamine. Enjoy our stay-awake shake!","This one tastes really good but it's like, chock-full of laxatives. You'll shit your brains out.","Your hands might get a bit sticky.","There isn't even any milk in this one. Whoops.");

// Randomly choose picture from array
function choosePic() {
  var randomNum = Math.floor(Math.random() * myPix.length);
  document.getElementById("winPic").src = myPix[randomNum];
  document.getElementById("winDesc").innerHTML = myDesc[randomNum];
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal and pick an image and its corresponding text
btn.onclick = function() {
  modal.style.display = "block";
  choosePic()
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}