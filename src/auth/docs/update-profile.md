# Update User's Profile

**Desc** : Endpoint to update the profile data of the current signed in user

**URL** : `/auth/profile`

**Method** : `PUT`

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

| Field     | Type             | Description         | Constraints                                                                                                                                                                               |
| --------- | ---------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| username  | string           | User's username     | Required. Has to be a string value. Unique.                                                                                                                                               |
| name      | string           | User's fullname     | Required. Has to be a string value.                                                                                                                                                       |
| email     | string           | User's email        | Required. Has to be a string value. Unique. Valid email format                                                                                                                            |
| imageFile | string ($binary) | User's profileImage | Optional. But if you'd like to send the imageFile data then it has to be in a binary format data type and can only accept jpg, jpeg, png file types. The maximum size of the file is 10mb |

---

<br/>

## **Request Body example**.

| Key       | Value          |
| --------- | -------------- |
| name      | John Doe       |
| username  | JohnDoe98      |
| email     | john@gmail.com |
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
  "message": "Profile updated successfully",
  "data": {
    "username": "JohnDoe98",
    "email": "johndoe@gmail.com",
    "name": "John Doe",
    "profileImage": "https://konexi-api.s3.ap-southeast-1.amazonaws.com/download.png-859b0694feda9b48b108da0d3af1eda6643c3f63292b4e2aaacf02fc7e673aba?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3PGECPGBLNU5I2WU%2F20230728%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20230728T084216Z&X-Amz-Expires=3600&X-Amz-Signature=57584c85dab63266e0d9638777be951ffecb01926abdc1e5ecb42f953a9f16d6&X-Amz-SignedHeaders=host&x-id=GetObject"
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

**Conflict**

**Code** : `409 CONFLICT`

**Condition Example** : `Duplicate email or username`

**Content example**

```json
{
  "error": "Conflict",
  "message": "Sorry, the username airell98 is already taken. Please choose a different username.",
  "statusCode": 409
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
