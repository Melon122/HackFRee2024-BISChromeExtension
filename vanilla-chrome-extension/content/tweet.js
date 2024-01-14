async function main() {
    async function delay(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

    let tweet;
    // document.addEventListener("DOMContentLoaded", function() {
    // tweetScraper()
    // });

    async function tweetScraper() {
        await delay(1000)
        let tweetElement = document.querySelector("[data-testid=\"tweetText\"]")
        if (tweetElement) {
        let tweetText = tweetElement.textContent.trim();
        console.log("Tweet: " + tweetText);
        return tweetText; // store the tweet text in the global variable
    } else {
        // If the element is not found, you might want to handle this case
        console.error("Tweet element not found");
    }
    }

    tweet = await tweetScraper()

    console.log("Tweet after timeout: " + tweet)


    // ================================================================
    // Opposing View Point
    // ================================================================

    const apiKey = 'AIzaSyA6iI0BsSPSKKLtRRibEM5PMhiBH-5fVow';
    const generateContentUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    let opposingViewPrompt = `Tweet:
    """
    ${tweet}
    """
    Create a potential tweet that would oppose the viewpoint of this post by a human/organization with a potential bias: `;


    // "\n Additionally, based on the biased determined previously"

    const contents = [{
        "parts": [{
            "text": opposingViewPrompt
        }]
    }];

    const generationConfig = {
        "maxOutputTokens": 200,
    }

    const headers = {
    'Content-Type': 'application/json',
    };

    await fetch(generateContentUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ contents: contents, generationConfig: generationConfig })
    })
    .then(response => response.json())
    .then(data => generateOtherView(data["candidates"][0]["content"]["parts"][0]["text"]))
    .catch(error => console.error(error));

    function generateOtherView(generatedText) {
        console.log("Opposing view: " + generatedText)
        // <div style="padding: 12px 16px;background-color: #2975a9;border-radius: 16px;"></div>
        const contentDiv = document.createElement("div");
        contentDiv.style.padding = "12px 16px";
        contentDiv.style.margin = "0px 0px 16px 0px";
        contentDiv.style.backgroundColor = "#1d9bf0";
        contentDiv.style.borderRadius = "16px";
        
        const h1 = document.createElement("h1");
        h1.textContent = "Through different lens..."
        contentDiv.appendChild(h1)

        const body = document.createElement("p");
        body.textContent = generatedText;
        contentDiv.appendChild(body);

        let tweetElement = document.querySelector("[data-testid=\"tweetText\"]");
        tweetElement.appendChild(contentDiv);

    }

    // ================================================================
    // Objective Summary of Topic
    // ================================================================

    let objectiveViewPrompt = `Tweet:
    """
    ${tweet}
    """
    Please provide solely an objective summary of the general topic of this social media post: `;


    // "\n Additionally, based on the biased determined previously"

    const contents1 = [{
        "parts": [{
            "text": objectiveViewPrompt
        }]
    }];

    const generationConfig1 = {
        "maxOutputTokens": 200,
    }

    const headers1 = {
    'Content-Type': 'application/json',
    };

    await fetch(generateContentUrl, {
        method: 'POST',
        headers: headers1,
        body: JSON.stringify({ contents: contents1, generationConfig: generationConfig1 })
    })
    .then(response => response.json())
    .then(data => generateObjectiveView(data["candidates"][0]["content"]["parts"][0]["text"]))
    .catch(error => console.error(error));

    function generateObjectiveView(generatedText) {
        console.log("Objective View: " + generatedText)
        const contentDiv = document.createElement("div");
        contentDiv.style.padding = "12px 16px";
        contentDiv.style.backgroundColor = "#1d9bf0";
        contentDiv.style.borderRadius = "16px";
        
        const h1 = document.createElement("h1");
        h1.textContent = "The Objective View"
        contentDiv.appendChild(h1)

        const body = document.createElement("p");
        body.textContent = generatedText;
        contentDiv.appendChild(body);

        let tweetElement = document.querySelector("[data-testid=\"tweetText\"]");
        tweetElement.appendChild(contentDiv);
    }
    
}

main()