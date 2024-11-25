# REST API Docs

This a back end project for a social media platform using node js with Nest JS framework, mongodb as the storage, and AWS for storing images and deployment service. All the authentication processes in this project are handled by JWT tokens.

# API URLS

Base Url: {host}/api/v1

Swagger Docs: {host}/swagger

Deployment Steps: [Deployment-Steps](Deployment.md)

### Auth endpoints

1. Create Account:

- Endpoint: [POST /auth/signup](src/auth/docs/signup.md)
- This endpoint allows users to create a new account in the system. Users need to provide necessary information such as username, email, name, and password.

2. Signin:

- Endpoint: [POST /auth/signin](src/auth/docs/signin.md)
- Users can use this endpoint to sign in to their existing accounts. They must provide valid login credentials (username and password). The server should authenticate the user's details and respond with a token that the user can use for subsequent authenticated requests.

3. Update Profile

- Endpoint: [PUT /auth/profile](src/auth/docs/update-profile.md)
- Users can use this endpoint to update their account profile, and also to upload their profile image. The system will store their profile image on AWS S3

4. Get Current User Profile

- Endpoint: [GET /auth/profile/current-user](src/auth/docs/current-user-profile.md)
- Users can use this endpoint to get their own profile.

5. Get User Profile

- Endpoint: [GET /auth/profile/{userId}](src/auth/docs/get-user-profile.md)
- Users can use this endpoint to get other users' profile.

### Post endpoints

1. Create Post:

- Endpoint: [POST /posts](src/posts/docs/create-post.md)
- This endpoint allows users to create a new post. This endpoint allows users to create a new post. The server will store the users' image files on AWS S3.

2. Update Post:

- Endpoint: [PUT /posts/{postId}](src/posts/docs/update-post.md)
- Users can use this endpoint to update their own post.

3. Current User Posts:

- Endpoint: [POST /posts/current-user](src/posts/docs/current-user-posts.md)
- Users can use this endpoint to get all of their own posts.

4. Get User Posts:

- Endpoint: [POST /posts/user](src/posts/docs/get-user-posts.md)
- Users can use this endpoint to get posts of a specific user.

5. Search Posts:

- Endpoint: [POST /posts/search](src/posts/docs/search-posts.md)
- Users can use this endpoint to search for posts by keyword.

6. Get One Post:

- Endpoint: [GET /posts/{postId}](src/posts/docs/get-one-post.md)
- Users can use this endpoint to get one post.

7. Delete Post:

- Endpoint: [DELETE /posts/{postId}](src/posts/docs/delete-post.md)
- Users can use this endpoint to delete their own post.

8. Like Post:

- Endpoint: [POST /posts/like/{postId}](src/posts/docs/like-post.md)
- Users can use this endpoint to like a post.

9. Unlike Post:

- Endpoint: [POST /posts/unlike/{postId}](src/posts/docs/unlike-post.md)
- Users can use this endpoint to unlike a post.

10. Create Comment:

- Endpoint: [POST /posts/comments/{postId}](src/posts/docs/create-comment.md)
- Users can use this endpoint to comment a post

11. Delete Comment:

- Endpoint: [DELETE /posts/comments/{postId}/{commentId}](src/posts/docs/delete-comment.md)
- Users can use this endpoint to delete their comment from a post.

12. Get Comments:

- Endpoint: [DELETE /posts/comments/{postId}](src/posts/docs/get-comments.md)
- Users can use this endpoint to get comments from a post.

### User endpoints

1. Search Users:

- Endpoint: [POST /users/search](src/users/docs/search-users.md)
- Users can use this endpoint to search for users by name or username

2. Follow User:

- Endpoint: [POST /users/follow-user](src/users/docs/follow-user.md)
- Users can use this endpoint to follow other user.

3. Unfollow User:

- Endpoint: [POST /users/unfollow-user](src/users/docs/unfollow-user.md)
- Users can use this endpoint to unfollow other user.

4. Current User Followers:

- Endpoint: [POST /users/current-user-followers](src/users/docs/current-user-followers.md)
- Users can use this endpoint to get their own followers.

5. Current User Following:

- Endpoint: [POST /users/current-user-following](src/users/docs/current-user-following.md)
- Users can use this endpoint to get their own following.

6. Get User Followers:

- Endpoint: [POST /users/followers](src/users/docs/get-user-followers.md)
- Users can use this endpoint to get other users' followers.

7. Get User Following:

- Endpoint: [POST /users/following](src/users/docs/get-user-following.md)
- Users can use this endpoint to get other users' following.
