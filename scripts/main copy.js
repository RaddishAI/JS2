import { POSTS_API_URL } from "./constants.js";
import { doFetch } from "../utils/doFetch.js";

const displayContainer = document.getElementById('display-container');

async function getPosts() {
  try {
      const { ok, data } = await doFetch(POSTS_API_URL, {}, true);

      // ✅ Log the raw API response before doing anything
      console.log("📜 Raw API Response Data:", data);

      if (!ok) {
          console.error("❌ Failed to fetch posts:", data);
          alert("⚠️ Unable to fetch posts. You may need to log in again.");
          return [];
      }

      console.log("✅ Fetched posts:", data);
      return data;

  } catch (error) {
      console.error("❌ Error fetching posts:", error);
      return [];
  }
}

/* async function getPosts() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    const fetchOptions = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'X-Noroff-API-Key': '6e54d12e-08ba-4cc9-8b34-0f28fbd9acf8',
        },
    };

    const response = await doFetch(POSTS_API_URL, fetchOptions);
    const json = await response.json();
    console.log(json); */
/*     return response.data; */
/*   } catch (error) {
    console.log(error);
  }
} */

function generatePostHtml(post) {
  const postContainer = document.createElement('div');
  postContainer.classList.add('post-container');

  const postTextContainer = document.createElement('div');
  postTextContainer.classList.add('post-text-container');

  const postHeading = document.createElement('h2');
  postHeading.textContent = post.title;

  const postBody = document.createElement('p');
  postBody.textContent = post.body;

  const tagsContainer = document.createElement('div');

  const tagsHeading = document.createElement('h3');
  tagsHeading.textContent = 'Tags:';

  tagsContainer.append(tagsHeading);

  for (let i = 0; i < post.tags.length; i++) {
    const tag = document.createElement('span');
    tag.textContent = post.tags[i];
    tagsContainer.append(tag);
  }

  postTextContainer.append(postHeading, postBody, tagsContainer);

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('post-image-container');

  const image = document.createElement('img');
  image.classList.add('post-image');
  image.src =
    post.media?.url ??
    'https://plus.unsplash.com/premium_photo-1672242577338-d30fb40e1d95?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  image.alt = post.media?.alt ?? 'Generic image';

  imageContainer.append(image);

  // Create all of the HTML for the post
  postContainer.append(postTextContainer, imageContainer);
  return postContainer;
}

function generateAndDisplayPosts(posts) {
  displayContainer.textContent = '';
  for (let i = 0; i < posts.length; i++) {
    const postHtml = generatePostHtml(posts[i]);
    displayContainer.append(postHtml);
  }
}

async function main() {
  const posts = await getPosts();
  generateAndDisplayPosts(posts);
}

main();
