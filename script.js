const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterButton = document.querySelector("#twitter");
const quoteButton = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

// Show and hide the loading spinner

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Get quote from API

async function getTheQuote() {
  showLoadingSpinner();
  const proxyURL = "https://ancient-hollows-64688.herokuapp.com/";
  const apiURL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyURL + apiURL);
    const data = await response.json();
    // Reduce fontsize for long quotes
    if (data.quoteText.length > 100) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    // If Author is blank then replace with unknown
    if (data.quoteAuthor === " ") {
      authorText.innerHTML = "Unknown";
    } else {
      authorText.innerText = "- " + data.quoteAuthor;

      // Stop the loading spinner
      removeLoadingSpinner();
    }
  } catch (error) {
    getTheQuote();
    // Try getting the quote again after it fails
    console.log("Sorry couldnt get quote", error);
  }
}

// Tweet quote

function tweetTheQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterURL = `https://twitter.com/intent/tweet?text=${quote} ${author}`;
  window.open(twitterURL, "_blank");
}

// Button event listeners
twitterButton.addEventListener("click", tweetTheQuote);
quoteButton.addEventListener("click", getTheQuote);

// On page load run the function to get the quote
getTheQuote();
