import { POSTS_API_URL } from "./constants.js";
import { doFetch } from "../utils/doFetch.js";

const displayContainer = document.getElementById("display-container");
const sortSelect = document.getElementById("sort-select");
const paginationContainer = document.getElementById("pagination");

let posts = [];
let currentPage = 1;
const postsPerPage = 10;

/**
 * Fetches posts from the API, ensuring author data is included.
 * @returns {Promise<Array>} - A promise resolving to an array of posts.
 */
async function getPosts() {
  try {
    console.log("Fetching posts from API...");

    // Fetch posts with author information
    const response = await doFetch(`${POSTS_API_URL}?_author=true`, {}, true);

    if (!response || !response.ok || !response.data) {
      console.error("Unexpected API response format:", response);
      return [];
    }

    console.log("API Response Data:", response.data);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

/**
 * Formats an ISO date string into a human-readable format.
 * @param {string} isoString - The ISO date string.
 * @returns {string} - The formatted date in "DD Mon YYYY" format.
 */
function formatDate(isoString) {
  if (!isoString) return "Unknown date";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Generates HTML for a post element.
 * @param {Object} post - The post data.
 * @returns {HTMLElement} - The generated post container element.
 */
function generatePostHtml(post) {
  console.log("Checking post data:", post);

  const postContainer = document.createElement("div");
  postContainer.classList.add("post-container");

  const postTextContainer = document.createElement("div");
  postTextContainer.classList.add("post-text-container");

  const authorName = post.author?.name || "Unknown Author";
  const author = document.createElement("p");
  author.classList.add("post-author");
  author.innerHTML = `Posted by: <a href="profile.html?username=${authorName}" class="author-link">${authorName}</a>`;

  const postHeading = document.createElement("h2");
  postHeading.textContent = post.title || "Untitled Post";

  const postBody = document.createElement("p");
  postBody.textContent = post.body || "No content available.";

  postTextContainer.append(author, postHeading, postBody);

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("post-image-container");

  if (post.media && post.media.url) {
    const image = document.createElement("img");
    image.classList.add("post-image");
    image.src = post.media.url;
    image.alt = post.media.alt || "Post image";
    imageContainer.append(image);
  }

  const postDate = document.createElement("p");
  postDate.classList.add("post-date");
  postDate.textContent = `Updated: ${formatDate(post.updated)}`;
  imageContainer.append(postDate);

  postContainer.append(postTextContainer, imageContainer);
  return postContainer;
}

/**
 * Sorts posts by date.
 * @param {Array} posts - The list of posts.
 * @param {string} order - The sorting order ("newest" or "oldest").
 * @returns {Array} - The sorted list of posts.
 */
function sortPosts(posts, order = "newest") {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.updated);
    const dateB = new Date(b.updated);
    return order === "newest" ? dateB - dateA : dateA - dateB;
  });
}

/**
 * Generates and displays posts with pagination.
 * @param {string} order - The sorting order ("newest" or "oldest").
 */
function generateAndDisplayPosts(order = "newest") {
  displayContainer.textContent = "";

  if (!Array.isArray(posts) || posts.length === 0) {
    displayContainer.textContent = "No posts available.";
    return;
  }

  const sortedPosts = sortPosts(posts, order);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

  paginatedPosts.forEach((post) => {
    displayContainer.append(generatePostHtml(post));
  });

  updatePaginationControls(sortedPosts.length);
}

/**
 * Updates the pagination controls dynamically.
 * @param {number} totalPosts - The total number of posts.
 */
function updatePaginationControls(totalPosts) {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.add("pagination-button");
    if (i === currentPage) button.classList.add("active");
    button.addEventListener("click", () => {
      currentPage = i;
      generateAndDisplayPosts(sortSelect.value);
    });
    paginationContainer.appendChild(button);
  }
}

sortSelect.addEventListener("change", function () {
  currentPage = 1;
  generateAndDisplayPosts(this.value);
});

async function main() {
  posts = await getPosts();
  generateAndDisplayPosts(sortSelect.value);
}

main();