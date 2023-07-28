# Get Current User Posts

**Desc** : Endpoint to get post data owned by current signed in user

**URL** : `/posts/current-user`

**Method** : `POST`

## **Request Headers**

| Key           | Value             | Description                                  |
| ------------- | ----------------- | -------------------------------------------- |
| Authorization | Bearer<jwt_token> | JWT token that users get from signin process |

---

<br/>

## **Request Body constraints**

| Field   | Type   | Description                               | Constraints                                                    |
| ------- | ------ | ----------------------------------------- | -------------------------------------------------------------- |
| page    | number | Page of the pagination                    | Required. Has to be a number value. Cannot be less than 1.     |
| perPage | number | Amount of data we want to fetch per page. | Required. Has to be a number value. Cannot be greater than 10. |

---

<br/>

## **Request Body example**

```json
{
  "page": 1,
  "perPage": 1
}
```

---

<br/>

## **Success Response**

---

**Code** : `200 OK`

**Content example**

```json
{
  "status": "success",
  "message": "Posts fetched succesfully",
  "data": {
    "totalPosts": 3,
    "currentPage": 1,
    "perPage": 1,
    "totalPages": 3,
    "posts": [
      {
        "_id": "64c1e5a67470eadb7952cd2e",
        "caption": "Morning everyone",
        "totalLikes": 1,
        "totalComments": 0,
        "imageUrl": "https://post-image.com",
        "createdAt": "2023-07-27T03:33:58.044Z",
        "author": {
          "_id": "64bd3873761dc76d512dd4b4",
          "username": "iamjames",
          "profileImage": "https://profile-image.com"
        }
      }
    ]
  }
}
```

---

<br/>

## **Error Responses**

---

**Unauthorized**

**Code** : `401 UNAUTHORIZED`

**Condition Example** : `Invalid token`

**Content example**

```json
{
  "error": "Unauthorized",
  "message": "Signin to proceed",
  "statusCode": 401
}
```

---
