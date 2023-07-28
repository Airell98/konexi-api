# Create Comment

**Desc** : Endpoint to create a comment for a post

**URL** : `/posts/comments/{postId}`

**Method** : `POST`

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

## **Request Body Format**

The request body should be in the json data format. Use the `application/json` content type when making the request.

---

<br/>

## **Request Body constraints**

| Field | Type   | Description         | Constraints                        |
| ----- | ------ | ------------------- | ---------------------------------- |
| text  | string | Text of the comment | Required. Has to be a string value |

---

## **Request Body example**.

```json
{
  "text": "Great post you have there :)"
}
```

---

<br/>

## **Success Response**

---

**Code** : `201 CREATED`

**Content example**

```json
{
  "status": "success",
  "message": "Comment created succesfully",
  "data": {
    "author": {
      "_id": "64bd3873761dc76d512dd4b4",
      "username": "iamjames",
      "name": "James Hetfield"
    },
    "text": "Great post you have there bro :)",
    "createdAt": "2023-07-26T16:42:47.378Z"
  }
}
```

---

<br/>

## **Error Responses**

---

**Bad Request**

**Code** : `400 BAD REQUEST`

**Condition Example** : `If one of the request body validations failed`

**Content example**

```json
{
  "error": "Bad Request",
  "message": "Text cannot be empty",
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
