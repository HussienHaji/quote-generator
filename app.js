const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authoreText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API
async function getQuote() {
  // Start Loader
  loading()
  try {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();

    //if author is blenk add unknown
    if (data.author === "") {
      authoreText.innerText = "Unknown";
    } else {
      authoreText.innerText = data.author;
    }
    // reduce font size for long quotes
    if (data.content.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.content;
    console.log(data);
    // Stop loader
    complete()

  } catch (error) {
    console.log(error);
  }

}

//Tweet Quote
function twettQuote() {
  const quote = quoteText.innerText;
  const author = authoreText.innerText;
  const twitterUrl = `https://twitter.com/share?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", twettQuote);

// on load
getQuote();
