//const api = process.env.REACT_APP_CONTACTS_API_URL || "http://localhost:3001";
let api = "";

if ("TRUE" === process.env.PRODUCTION) {
  api = "https://material-posts.herokuapp.com";
} else {
  api = "http://localhost:3001";
}

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

export const saveComment = ({ parentId, timestamp, body, author, id }) =>
  fetch(`${api}/comments`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ parentId, timestamp, body, author, id })
  }).then(res => res.json());

export const deleteComment = id => {
  return fetch(`${api}/comments/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
  }).then(res => res.json());
};

export const updateComment = ({ id, body, timestamp }) => {
  return fetch(`${api}/comments/${id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ body, timestamp })
  }).then(res => res.json());
};

export const updatePost = ({ id, body, title }) => {
  return fetch(`${api}/posts/${id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id, body, title })
  }).then(res => res.json());
};

export const savePost = ({ body, title, timestamp, category, author, id }) =>
  fetch(`${api}/posts`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ body, title, timestamp, category, author, id })
  }).then(res => res.json());

export const deletePost = id => {
  return fetch(`${api}/posts/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
  }).then(res => res.json());
};
