var githubToken = "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"; // Replace with your GitHub token

function fetchUserDataAndShowPopup(username) {
  // GitHub API endpoints
  const userEndpoint = `https://api.github.com/users/${username}`;
  const reposEndpoint = `https://api.github.com/users/${username}/repos`;

  // Fetch user data
  fetch(userEndpoint, { headers: { Authorization: `Bearer ${githubToken}` } })
    .then((response) => response.json())
    .then((userData) => {
      // Update popup content with user data
      document.querySelector(".profile-pic").src = userData.avatar_url;
      document.querySelector(".username").textContent = userData.login;
      document.getElementById("followerCount").textContent = userData.followers;
      document.getElementById("followingCount").textContent =
        userData.following;
    })
    .catch((error) => console.error("Error fetching user data:", error));

  // Fetch user repositories
  fetch(reposEndpoint, { headers: { Authorization: `Bearer ${githubToken}` } })
    .then((response) => response.json())
    .then((reposData) => {
      // Update the repo list in the popup
      const repoList = document.getElementById("repoList");
      repoList.innerHTML = ""; // Clear existing list

      reposData.forEach((repo) => {
        const listItem = document.createElement("li");
        listItem.textContent = repo.name;
        listItem.classList.add("repo-list-item");
        repoList.appendChild(listItem);
      });
    })
    .catch((error) =>
      console.error("Error fetching user repositories:", error)
    );

  // Show the popup
  document.getElementById("popup").style.display = "block";
}

// Attach this function to the onclick event of the table cell
function onUserClick(event) {
  const clickedCell = event.target;
  const username = clickedCell.textContent;
  fetchUserDataAndShowPopup(username);
}
