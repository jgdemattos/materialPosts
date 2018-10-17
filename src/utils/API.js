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

/*
export const getAllCategories = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books);
    */

export function getInitialData() {
  return Promise.all([getCategories(), getPosts()]).then(
    ([categories, posts]) => {
      return {
        categories: categories.categories,
        posts: posts
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
      return posts;
    });
