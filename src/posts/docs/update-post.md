# Update Post

**Desc** : Endpoint to update a post

**URL** : `/posts/{postId}`

**Method** : `PUT`

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
{baseUrl}/posts/64bf17873ab6ee05943fa972
```

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
| imageFile | string ($binary) | Post's image        | Optional. But if you'd like to send the image file data then it has to be in a binary format data type and can only accept jpg, jpeg, png file types. The maximum size of the file is 10mb |

## **Request Body example**.

---

| Key       | Value          |
| --------- | -------------- |
| caption   | Study hard     |
| imageFile | [file content] |

---

<br/>

## **Success Response**

---

**Code** : `200 OK`

**Content example**

```json
{
  "status": "success",
  "message": "Post updated successfully",
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

**Forbidden**

**Code** : `403 FORBIDDEN`

**Condition Example** : `Updating a post owned by other user`

**Content example**

```json
{
  "error": "Forbidden",
  "message": "You are not authorized to modify this data",
  "statusCode": 403
}
```

---
