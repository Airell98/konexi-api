# Get Comments

**Desc** : Endpoint to get comment data from a post

**URL** : `/posts/comments/{postId}`

**Method** : `GET`

## **Request Headers**

---

| Key           | Value             | Description                                  |
| ------------- | ----------------- | -------------------------------------------- |
| Authorization | Bearer<jwt_token> | JWT token that users get from signin process |

---

<br/>

## **Request Params constraints**

| Field  | Type                     | Description | Constraints                                          |
| ------ | ------------------------ | ----------- | ---------------------------------------------------- |
| postId | string (Mongo Object Id) | Post's id   | Required. Has to be a string value. Valid Object Id. |

---

<br/>

## **Request Params example**.

```text
{baseUrl}/posts/comments/64bf17873ab6ee05943fa972
```

---

<br/>

## **Request Query constraints**

| Field   | Type   | Description                              | Constraints                                                    |
| ------- | ------ | ---------------------------------------- | -------------------------------------------------------------- |
| page    | number | Page of the pagination                   | Required. Has to be a number value. Cannot be less than 1.     |
| perPage | number | Amount of data we want to fetch per page | Required. Has to be a number value. Cannot be greater than 10. |

---

<br/>

## **Request Query example**.

```text
{baseUrl}/posts/comments/64bf17873ab6ee05943fa972?page=1&perPage=1
```

---

<br/>

## **Request Body Format**

The request body should be in the json data format. Use the `application/json` content type when making the request.

---

<br/>

## **Success Response**

---

**Code** : `200 OK`

**Content example**

```json
{
  "status": "success",
  "message": "Comments fetched succesfully",
  "data": {
    "totalComments": 4,
    "totalPages": 4,
    "currentPage": 2,
    "perPage": 1,
    "comments": [
      {
        "_id": "64c14cafb7bfbf02d4f5fdea",
        "author": {
          "_id": "64c11f62b9f7e4466d54e8c5",
          "username": "agnesmo",
          "name": "agnesmo",
          "profileImage": "https://profile-image.com"
        },
        "text": "I like your post man",
        "createdAt": "2023-07-26T16:41:19.172Z"
      }
    ]
  }
}
```

---

<br/>

## **Error Responses**

---

**Bad Request**

**Code** : `400 BAD REQUEST`

**Condition Example** : `If one of the request query validations failed`

**Content example**

```json
{
  "error": "Bad Request",
  "message": "Per page cannot be greater than 10",
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
