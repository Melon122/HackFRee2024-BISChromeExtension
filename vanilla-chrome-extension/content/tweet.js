function tweetScraper() {
    let tweetElement;
    if(document.querySelector("[data-testid=\"tweetText\"]") != null) {
        tweetElement = document.querySelector("[data-testid=\"tweetText\"]")
    }
    else {
        setTimeout(tweetScraper, 500)
        return null;
    }
    
    let tweetText = tweetElement.textContent.trim()

    console.log("Tweet: " + tweetText)
    return tweetText
}

let tweet = tweetScraper()

// ================================================================
let biasType;
const apiKey = 'AIzaSyA6iI0BsSPSKKLtRRibEM5PMhiBH-5fVow';
const generateContentUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

let prompt = `Tweet:
"""
${tweet}
"""
Please provide ONLY an opposing point or argument to this piece of text from the perspective that it is a social media post by a human/organization with a bias: `;


// "\n Additionally, based on the biased determined previously"

const contents = [{
  "parts": [{
    "text": prompt
  }]
}];

const headers = {
  'Content-Type': 'application/json',
};

fetch(generateContentUrl, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({ contents: contents })
})
.then(response => response.json())
.then(data => biasType = data)
.catch(error => console.error(error));

if (biasType == "LEFT" || biasType == "RIGHT" || biasType == "NEUTRAL") {
    
}
else {
    console.log(`biasType = ${biasType}`)
    console.error("biasType was not LEFT, RIGHT, or NEUTRAL!")
}