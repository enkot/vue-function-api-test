export function fetchUserPosts(id) {
    return fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${id}`
    ).then(res => res.json())
}
