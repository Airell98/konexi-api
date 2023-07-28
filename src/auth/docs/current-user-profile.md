# Get Current Signedin User Profile

**Desc** : Endpoint to get the profile data of the current signed in user

**URL** : `/auth/profile/current-user`

**Method** : `GET`

## Request Headers

---

| Key           | Value             | Description                                  |
| ------------- | ----------------- | -------------------------------------------- |
| Authorization | Bearer<jwt_token> | JWT token that users get from signin process |

---

## Success Response

---

**Code** : `200 OK`

**Content example**

```json
{
  "status": "success",
  "message": "Profile fetched successfully",
  "data": {
    "_id": "64c37f2d771bb4ebc7cb29a9",
    "username": "JohnDoe98",
    "email": "johndoe@gmail.com",
    "name": "John Doe",
    "profileImage": "https://konexi-api.s3.ap-southeast-1.amazonaws.com/download.png-859b0694feda9b48b108da0d3af1eda6643c3f63292b4e2aaacf02fc7e673aba?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3PGECPGBLNU5I2WU%2F20230728%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20230728T085228Z&X-Amz-Expires=3600&X-Amz-Signature=3a31ea2d22f1690c91fc7f27342057ce7108bad8f9c59ffb07dea01df3631a5e&X-Amz-SignedHeaders=host&x-id=GetObject",
    "totalFollowers": 0,
    "totalFollowings": 0
  }
}
```

---

## Error Responses

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
