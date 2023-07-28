# Delete Post

**Desc** : Endpoint to delete a post

**URL** : `/posts/{postId}`

**Method** : `DELETE`

## **Request Headers**

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

## **Success Response**

---

**Code** : `200 OK`

**Content example**

```json
{
  "status": "success",
  "message": "Post deleted successfully",
  "data": null
}
```

---

## **Error Responses**

---

**Bad Request**

**Code** : `400 BAD REQUEST`

**Condition Example** : `If one of the request param validations failed`

**Content example**

```json
{
  "error": "Bad Request",
  "message": "postId has to be a valid object id",
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

**Forbidden**

**Code** : `403 FORBIDDEN`

**Condition Example** : `Deleting a post owned by other user`

**Content example**

```json
{
  "error": "Forbidden",
  "message": "You are not authorized to modify this data",
  "statusCode": 403
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
