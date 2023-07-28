# Search users

**Desc** : Endpoint to search for users by name or username

**URL** : `/users/search`

**Method** : `POST`

## **Request Headers**

---

| Key           | Value             | Description                                  |
| ------------- | ----------------- | -------------------------------------------- |
| Authorization | Bearer<jwt_token> | JWT token that users get from signin process |

---

<br/>

## **Request Body Format**

The request body should be in the json format. Use the `application/json` content type when making the request.

---

<br/>

## **Request Body constraints**

| Field   | Type   | Description                               | Constraints                                                    |
| ------- | ------ | ----------------------------------------- | -------------------------------------------------------------- |
| page    | number | Page of the pagination                    | Required. Has to be a number value. Cannot be less than 1.     |
| perPage | number | Amount of data we want to fetch per page. | Required. Has to be a number value. Cannot be greater than 10. |
| name    | string | User's name or username                   | Required. Has to be a string value.                            |

---

<br/>

## **Request Body example**.

```json
{
  "page": 1,
  "perPage": 1,
  "name": "John"
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
  "message": "Users fetched succesfully",
  "data": {
    "totalUsers": 3,
    "currentPage": 1,
    "perPage": 1,
    "totalPages": 3,
    "users": [
      {
        "_id": "64c37f2d771bb4ebc7cb29a9",
        "name": "John Doe",
        "username": "JohnDoe98",
        "email": "john@gmail.com",
        "totalFollowers": 10,
        "totalFollowing": 2,
        "profileImage": "https://profile-image.com",
        "createdAt": "2023-07-27T03:33:58.044Z"
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

**Condition Example** : `If one of the request body validations failed`

**Content example**

```json
{
  "error": "Bad Request",
  "message": "Per page value cannot be greater than 10",
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
