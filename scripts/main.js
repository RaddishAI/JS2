import { POSTS_API_URL } from "./constants.js";
import { doFetch } from "../utils/doFetch.js";

const displayContainer = document.getElementById("display-container");

async function getPosts() {
  try {
    const response = await doFetch(POSTS_API_URL, {}, true);

    if (!response || !response.ok || !response.data) {
      console.error("Unexpected response format:", response);
      return [];
    }

    const posts = Array.isArray(response.data.data) ? response.data.data : [];

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

function formatDate(isoString) {
  if (!isoString) return "Unknown date";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function generatePostHtml(post) {
  const postContainer = document.createElement("div");
  postContainer.classList.add("post-container");

  const postTextContainer = document.createElement("div");
  postTextContainer.classList.add("post-text-container");

  const postHeading = document.createElement("h2");
  postHeading.textContent = post.title || "Untitled Post";

  const postBody = document.createElement("p");
  postBody.textContent = post.body || "No content available.";

  postTextContainer.append(postHeading, postBody);

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

function generateAndDisplayPosts(posts) {
  displayContainer.textContent = "";

  if (!Array.isArray(posts) || posts.length === 0) {
    displayContainer.textContent = "No posts available.";
    return;
  }

  posts.forEach((post) => {
    displayContainer.append(generatePostHtml(post));
  });
}

async function main() {
  const posts = await getPosts();
  generateAndDisplayPosts(posts);
}

main();