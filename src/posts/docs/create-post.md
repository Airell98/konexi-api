# Create Post

**Desc** : Endpoint to create a new post data

**URL** : `/posts`

**Method** : `POST`

## **Request Headers**

---

| Key           | Value             | Description                                  |
| ------------- | ----------------- | -------------------------------------------- |
| Authorization | Bearer<jwt_token> | JWT token that users get from signin process |

---

<br/>

## **Request Body Format**

The request body should be in the form data format. Use the `multipart/form-data` content type when making the request.

---

<br/>

## **Request Body constraints**

| Field     | Type             | Description         | Constraints                                                                                                                          |
| --------- | ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| caption   | string           | Caption of the post | Optional                                                                                                                             |
| imageFile | string ($binary) | Post's image        | Required. Has to be in a binary format data type and can only accept jpg, jpeg, png file types. The maximum size of the file is 10mb |

## **Request Body example**.

<br/>

| Key       | Value          |
| --------- | -------------- |
| caption   | Study hard     |
| imageFile | [file content] |

---

<br/>

## **Success Response**

---

**Code** : `201 CREATED`

**Content example**

```json
{
  "status": "success",
  "message": "Post created successfully",
  "data": {
    "imageUrl": "https://image-post.com",
    "caption": "Study hard",
    "createdAt": "2023-07-26T18:48:15.378Z"
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
  "message": "Image file has to be either of type jpg, png or jpeg and it's file size cannot be more than 10 MB",
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
