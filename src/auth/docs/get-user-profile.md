# Get User's Profile

**Desc** : Endpoint to get the user profile data by user id

**URL** : `/auth/profile/{userId}`

**Method** : `GET`

**Request Headers**

---

| Key           | Value             | Description                                  |
| ------------- | ----------------- | -------------------------------------------- |
| Authorization | Bearer<jwt_token> | JWT token that users get from signin process |

---

**Request Params constraints**

| Field  | Type                     | Description | Constraints                                          |
| ------ | ------------------------ | ----------- | ---------------------------------------------------- |
| userId | string (Mongo Object Id) | User's id   | Required. Has to be a string value. Valid Object Id. |

## **Request Params example**.

```text
{baseUrl}/auth/profile/64bd3873761dc76d512dd4b4
```

## Success Response

---

**Code** : `200 OK`

**Content example**

```json
{
  "status": "success",
  "message": "Profile fetched successfully",
  "data": {
    "_id": "64bd3873761dc76d512dd4b4",
    "username": "iamrichard",
    "email": "richard@gmail.com",
    "name": "Richard Geere",
    "profileImage": "https://image-richard.com",
    "totalFollowers": 10,
    "totalFollowings": 1,
    "isFollowing": true,
    "isFollowedByCurrentuser": true
  }
}
```

---

## Error Responses

---

**Bad Request**

**Code** : `400 BAD REQUEST`

**Condition Example** : `If one of the request param validations failed`

**Content example**

```json
{
  "error": "Bad Request",
  "message": "userId has to be a valid object id",
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
