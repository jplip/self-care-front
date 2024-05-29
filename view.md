---
layout: base
title: View
permalink: /view
---

<div class="container">
  <h2>View Quotes</h2>
  <label for="ratingFilter">Filter by Rating:</label>
  <select id="ratingFilter" onchange="fetchAndSortQuotes()">
    <option value="all">All</option>
    <option value="5">5 Stars</option>
    <option value="4">4 Stars</option>
    <option value="3">3 Stars</option>
    <option value="2">2 Stars</option>
    <option value="1">1 Star</option>
  </select>
  <button class="filter-button" onclick="fetchAndSortQuotes()">Sort</button>

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
</div>

<script>
  // Function to fetch quotes and sort them based on the selected rating
  function fetchAndSortQuotes() {
    const selectedRating = document.getElementById("ratingFilter").value;

    // Fetch the quotes from the backend
    fetch("http://127.0.0.1:8432/api/quotes/read")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Fetch response not ok');
          throw new Error('Fetch response not ok');
        }
      })
      .then(quotes_json_list => {
        // If a specific rating is selected, sort the quotes
        if (selectedRating !== "all") {
          quotes_json_list = selectionSortQuotes(quotes_json_list, selectedRating);
        }
        // Display the sorted quotes
        showQuotesTable(quotes_json_list);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById("quotes_list").innerHTML = "Error fetching quotes";
      });
  }
function selectionSortQuotes(quotes, rating) {
    // Get the number of quotes
    let n = quotes.length;
    
    // Selection sort algorithm to sort quotes by rating in descending order
    for (let i = 0; i < n; i++) {
        // Assume the current position is the maximum
        let maxIdx = i;
        
        // Find the maximum element in the unsorted part of the array
        for (let j = i + 1; j < n; j++) {
            // If the current element has a higher rating, update maxIdx
            if (quotes[j].rating > quotes[maxIdx].rating) {
                maxIdx = j;
            }
        }
        
        // If the maximum element is not already in the current position, swap them
        if (maxIdx !== i) {
            let temp = quotes[i]; // Temporarily store the current element
            quotes[i] = quotes[maxIdx]; // Move the maximum element to the current position
            quotes[maxIdx] = temp; // Move the current element to the maximum element's position
        }
    }
    
    // Filter the sorted quotes to prioritize those with the selected rating
    // First, get all quotes with the selected rating
    let sortedQuotes = quotes.filter(quote => quote.rating == rating);
    
    // Then, add all other quotes that do not have the selected rating
    sortedQuotes = sortedQuotes.concat(quotes.filter(quote => quote.rating != rating));
    
    // Return the sorted and prioritized list of quotes
    return sortedQuotes;
}

  // Function to display quotes in the table
  function showQuotesTable(quotes_json_list) {
    let tblBody = '';
    quotes_json_list.forEach(quote => {
      tblBody += `
        <tr>
          <td>${quote.quotename}</td>
          <td>${quote.quoteauthor}</td>
          <td>${quote.opinion}</td>
          <td>${'★'.repeat(quote.rating)}</td>
        </tr>
      `;
    });
    document.getElementById("quotes_list").innerHTML = tblBody;
  }
</script>
