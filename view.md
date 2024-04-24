---
layout: base
title: View
permalink: /view/
---

# View Quotes

<table>
  <thead>
    <tr>
      <th>Quote</th>
      <th>Author</th>
      <th>Opinion</th>
    </tr>
  </thead>
  <tbody id="quoteTable">
  </tbody>
</table>

<script>
  document.addEventListener("DOMContentLoaded", function() {
      fetchQuotes();
  });

  function fetchQuotes() {
      fetch("http://127.0.0.1:8086/api/quotes/read")
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok.');
              }
              return response.json();
          })
          .then(data => {
              renderQuotesTable(data);
          })
          .catch(error => {
              console.error('Error fetching data:', error);
              document.getElementById("quoteTable").innerHTML = "Error fetching quotes";
          });
  }

  function renderQuotesTable(quotes) {
      let tableBody = '';
      quotes.forEach(quote => {
          tableBody += `
              <tr>
                  <td>${quote.quotename}</td>
                  <td>${quote.quoteauthor}</td>
                  <td>${quote.opinion}</td>
              </tr>
          `;
      });
      document.getElementById("quoteTable").innerHTML = tableBody;
  }
</script>
