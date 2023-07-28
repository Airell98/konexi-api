# Create User's Account

**URL** : `/auth/signup`

**Method** : `POST`

**Request Body constraints**

| Field    | Type   | Description     | Constraints                                                      |
| -------- | ------ | --------------- | ---------------------------------------------------------------- |
| name     | string | User's fullname | Required. Has to be a string value.                              |
| password | string | User's password | Required. Has to be a string value. Minimum length: 8 characters |
| username | string | User's username | Required. Has to be a string value. Unique.                      |
| email    | string | User's email    | Required. Has to be a string value. Unique. Valid email          |

**Request Body example**.

```json
{
  "name": "Richard",
  "password": "12345678",
  "username": "richard98",
  "email": "richard@gmail.com"
}
```

## Success Response

**Code** : `201 CREATED`

**Content example**

```json
{
  "status": "success",
  "message": "User signup successful",
  "data": {
    "username": "richard98",
    "name": "Richard",
    "email": "richard@gmail.com"
  }
}
```

## Error Responses

---

**Bad Request**

**Condition Example** : `If one of the request body validations failed`

**Content example**

```json
{
  "error": "Bad Request",
  "message": "Name cannot be empty",
  "statusCode": 400
}
```

---

**Conflict**

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
