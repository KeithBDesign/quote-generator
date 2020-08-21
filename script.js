const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterButton = document.querySelector("#twitter");
const quoteButton = document.querySelector("#new-quote");

// Get quote from API

async function getTheQuote() {
  const proxyURL = "https://ancient-hollows-64688.herokuapp.com/";
  const apiURL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyURL + apiURL);
    const data = await response.json();
    quoteText.innerText = data.quoteText;
    quoteAuthor.innerText = data.authorText;
  } catch (error) {
    // getTheQuote();
    // Try getting the quote again after it fails
    console.log("Sorry couldnt get quote", error);
  }
}

// On page load run the function to get the quote
getTheQuote();
