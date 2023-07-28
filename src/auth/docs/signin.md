# User Sigin

**URL** : `/auth/signin`

**Method** : `POST`

**Request Body constraints**

| Field    | Type   | Description     | Constraints |
| -------- | ------ | --------------- | ----------- |
| username | string | User's username | n/a         |
| password | string | User's password | n/a         |

**Request Body example**.

```json
{
  "username": "iamjames",
  "password": "12345678"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": "success",
  "message": "User signin successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGMzNjFmMWFhODNmN2I4ZmM0Zjc5NDAiLCJ1c2VybmFtZSI6InRvbW15bGVlIiwiaWF0IjoxNjkwNTMxNTgzLCJleHAiOjE2OTA1NDIzODN9.tbdT95i_J89Y9x9pc-hXlRhvn17i-qPPkSmwTxEK6GE"
  }
}
```

## Error Responses

---

**Unauthorized**

**Code** : `401 UNAUTHORIZED`

**Condition Example** : `If the username or the password is incorrect`

**Content example**

```json
{
  "error": "Unauthorized",
  "message": "Sorry, your password was incorrect. Please double-check your password.",
  "statusCode": 401
}
```

---
