# Get User Following

**Desc** : Endpoint to get all following data of a user

**URL** : `/users/following`

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

| Field   | Type                     | Description                               | Constraints                                                    |
| ------- | ------------------------ | ----------------------------------------- | -------------------------------------------------------------- |
| page    | number                   | Page of the pagination                    | Required. Has to be a number value. Cannot be less than 1.     |
| perPage | number                   | Amount of data we want to fetch per page. | Required. Has to be a number value. Cannot be greater than 10. |
| userId  | string (Mongo Object Id) | User's id                                 | Required. Has to be a string value. Valid Object Id.           |

---

<br/>

## **Request Body example**.

```json
{
  "page": 1,
  "perPage": 10,
  "userId": "64bd3873761dc76d512dd4b4"
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
  "message": "Following fetched successfully",
  "data": {
    "totalFollowers": 10,
    "totalPages": 10,
    "currentPage": 1,
    "perPage": 1,
    "following": [
      {
        "_id": "64bd379ef4884a7ebb0be368",
        "username": "anthony",
        "email": "anthony@gmail.com",
        "profileImage": "https://profile-image.com",
        "name": "Anthony"
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

**Not Found**

**Code** : `404 NOT FOUND`

**Condition Example** : `If the user data cannot be found`

**Content example**

```json
{
  "error": "Not Found",
  "message": "The requested resource was not found.",
  "statusCode": 404
}
```

---
