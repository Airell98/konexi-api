# Get Single Post

**Desc** : Endpoint to get a single post data by post id

**URL** : `/posts/{postId}`

**Method** : `GET`

## **Request Headers**

---

| Key           | Value             | Description                                  |
| ------------- | ----------------- | -------------------------------------------- |
| Authorization | Bearer<jwt_token> | JWT token that users get from signin process |

---

<br/>

**Request Params constraints**

| Field  | Type                     | Description | Constraints                                          |
| ------ | ------------------------ | ----------- | ---------------------------------------------------- |
| postId | string (Mongo Object Id) | Post's id   | Required. Has to be a string value. Valid Object Id. |

---

<br/>

## **Request Params example**.

```text
{baseUrl}/posts/64bf17873ab6ee05943fa972
```

## **Success Response**

---

**Code** : `200 OK`

**Content example**

```json
{
  "status": "success",
  "message": "Post fetched successfully",
  "data": {
    "_id": "64bf17873ab6ee05943fa972",
    "caption": "Meeting with my students :)",
    "imageUrl": "https://image-post.com",
    "totalLikes": 1,
    "totalComments": 4,
    "author": {
      "_id": "64bd3873761dc76d512dd4b4",
      "username": "iamjames"
    }
  }
}
```

---

<br/>

## Error Responses

---

**Bad Request**

**Code** : `400 BAD REQUEST`

**Condition Example** : `If one of the request param validations failed`

**Content example**

```json
{
  "error": "Bad Request",
  "message": "postId has to be a valid object id",
  "statusCode": 400
}
```

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

**Not Found**

**Code** : `404 NOT FOUND`

**Condition Example** : `If the post data cannot be found`

**Content example**

```json
{
  "error": "Not Found",
  "message": "The requested resource was not found.",
  "statusCode": 404
}
```

---
