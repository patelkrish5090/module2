var githubToken =
  "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";

var searchEntry = document.getElementById("search_entry");

function searchGitHubUsers(keyword, token) {
  const apiUrl = `https://api.github.com/search/users?q=${encodeURIComponent(
    keyword
  )}`;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  return fetch(apiUrl, { headers })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error(
          `Failed to search GitHub users. Status code: ${response.status}`
        );
        throw new Error("Failed to retrieve matching usernames.");
      }
    })
    .then((searchData) => searchData.items.map((user) => user.login))
    .catch((error) => {
      console.error("Error during GitHub user search:", error.message);
      throw error;
    });
}

function updateTable(usernames) {
  const tableBody = document.getElementById("tableBody");
  const tableHeader = document.getElementById("tableHeader");
  tableBody.innerHTML = "";
  tableHeader.innerHTML = `<tr><th>${usernames.length} users found</th></tr>`;

  usernames.forEach((username) => {
    const row = tableBody.insertRow();
    const cell = row.insertCell(0);

    cell.textContent = username;
    // cell.appendChild(link);

    // Add event listener to open link on click
    cell.addEventListener("click", (event) => {
      const clickedCell = event.currentTarget;
      const username = clickedCell.textContent.trim();
      fetchUserDataAndShowPopup(username);
      // document.getElementById("popup").style.display = "block";
    });
  });
}

// var searchKeyword;

// var searchQuery;

// function search_result(event) {
//   var key = event.which || event.keyCode;
//   if (key == 13) {
//     var searchKeyword = document.getElementById("search_entry").value;
//     searchQuery = searchKeyword;
//     console.log(searchKeyword);
//     window.location.href =
//       "search_result.html?q=" + encodeURIComponent(keyword);
//   }
// }

// // searchKeyword = document.getElementById("search_entry").value;
// // console.log(searchKeyword);

// document.addEventListener("DOMContentLoaded", () => {
//   searchGitHubUsers(searchQuery, githubToken)
//     .then((matchingUsernames) => {
//       console.log("Matching GitHub usernames:", matchingUsernames);
//       updateTable(matchingUsernames);
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
  // Fetch and update the table based on the query parameter in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("q");
  console.log(searchQuery);

  if (searchQuery) {
    searchGitHubUsers(searchQuery, githubToken)
      .then((matchingUsernames) => {
        console.log("Matching GitHub usernames:", matchingUsernames);
        updateTable(matchingUsernames);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
});

function search_result(event) {
  var key = event.which || event.keyCode;
  if (key == 13) {
    var searchKeyword = document.getElementById("search_entry").value;
    console.log(searchKeyword);

    // Update the URL with the search query
    window.location.href =
      "search_result.html?q=" + encodeURIComponent(searchKeyword);
  }
}
