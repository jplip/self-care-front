---
layout: base
title: View
permalink: /view
---


# View Quotes


<table>
  <thead>
    <tr>
      <th>Quote</th>
      <th>Author</th>
      <th>Opinion</th>
      <th>Rating</th>
    </tr>
  </thead>
  <tbody id="quotes_list">
  </tbody>
</table>


<script>
  document.addEventListener("DOMContentLoaded", function() {
      fetchQuotes();
  });


  function fetchQuotes() {
      fetch("http://127.0.0.1:8086/api/quotes/read")
          .then(response => {            
            if (response.ok) {
                return response.json();
                }
            else {
                console.error('Fetch response not ok');
                throw new Error('Fetch response not ok');
            }
          })
          .then(quotes_json_list => {
              showQuotesTable(quotes_json_list);
          })
          .catch(error => {
              console.error('Error fetching data:', error);
              document.getElementById("quotes_list").innerHTML = "Error fetching quotes";
          });
  }


  function showQuotesTable(quotes_json_list) {
      let tblBody = '';
      quotes_json_list.forEach(quote => {
          tblBody += `
              <tr>
                  <td>${quote.quotename}</td>
                  <td>${quote.quoteauthor}</td>
                  <td>${quote.opinion}</td>
                  <td>${quote.rating}</td>
              </tr>
          `;
      });
      document.getElementById("quotes_list").innerHTML = tblBody;
  }
</script>
