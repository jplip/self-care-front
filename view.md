---
layout: base
title: View
permalink: /view/
---

<h1>View Quotes</h1>
<div id="quotes-container"></div>

<script>
fetch('http://localhost:8086/quote-repository')
    .then(response => response.json())
    .then(quotes => {
        const quotesContainer = document.getElementById('quotes-container');
        
        if (quotes.quotes && quotes.quotes.length > 0) {
            quotes.quotes.forEach(quote => {
                const quoteElement = document.createElement('div');
                quoteElement.innerHTML = `
                    <p><strong>Quote:</strong> ${quote.quote_text}</p>
                    <p><strong>Quote By:</strong> ${quote.quote_author}</p>
                    <p><strong>Opinion:</strong> ${quote.user_opinion}</p>
                    <hr>
                `;
                quotesContainer.appendChild(quoteElement);
            });
        } else {
            quotesContainer.innerHTML = "<p>No quotes available.</p>";
        }
    })
    .catch(error => console.error('Error:', error));
</script>