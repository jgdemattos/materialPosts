const api = process.env.REACT_APP_CONTACTS_API_URL || "http://localhost:3001";

let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token
};

export function getInitialData() {
  return Promise.all([getCategories(), getPosts()]).then(
    ([categories, posts]) => {
      return {
        categories: categories.categories,
        posts
      };
    }
  );
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(categories => {
      return categories;
    });

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(posts => {
      let nPosts = {};
      posts.forEach(post => {
        nPosts[post.id] = post;
      });
      return nPosts;
    });

export const getComments = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(comments => {
      let nComments = {};
      comments.forEach(comment => {
        nComments[comment.id] = comment;
      });
      return nComments;
    });

export const saveVote = ({ id, vote, contentType }) =>
  fetch(`${api}/${contentType}/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option: vote })
  }).then(res => res.json());
