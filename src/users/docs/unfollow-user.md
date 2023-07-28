# Unfollow User

**Desc** : Endpoint to unfollow a user

**URL** : `/users/unfollow-user`

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

| Field  | Type                     | Description | Constraints                                          |
| ------ | ------------------------ | ----------- | ---------------------------------------------------- |
| userId | string (Mongo Object Id) | User's id   | Required. Has to be a string value. Valid Object Id. |

---

<br/>

## **Request Body example**.

```json
{
  "userId": "64c11f62b9f7e4466d54e8c5"
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
  "message": "You have successfully unfollowed agnesmo",
  "data": {
    "unfollower": {
      "id": "64c11ebab9f7e4466d54e8b5",
      "username": "andreHediyunus"
    },
    "unfollowedUser": {
      "id": "64c11f62b9f7e4466d54e8c5",
      "username": "agnesmo"
    }
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
