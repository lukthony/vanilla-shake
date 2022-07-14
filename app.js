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
