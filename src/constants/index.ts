export const ENV_FILE_NAME = '.env';

export const ENV_VARIABLES = {
  MONGODB_URI: 'MONGODB_URI',
  SECRET_KEY: 'SECRET_KEY',
  S3_BUCKET_NAME: 'S3_BUCKET_NAME',
  S3_BUCKET_REGION: 'S3_BUCKET_REGION',
  S3_ACCESS_KEY: 'S3_ACCESS_KEY',
  S3_SECRET_ACCESS_KEY: 'S3_SECRET_ACCESS_KEY',
};

export const API_PARAMS = {
  POST_ID: 'postId',
  COMMENT_ID: 'commentId',
};

export const ERROR_MESSAGES = {
  DUPLICATE_USERNAME: (username: string) =>
    `Sorry, the username ${username} is already taken. Please choose a different username.`,
  DUPLICATE_EMAIL: (email: string) =>
    `Sorry, the email ${email} is already taken. Please choose a different email.`,
  INVALID_FORMAT: (field: string) => `Invalid ${field} format`,
  IS_STRING: (field: string) => `${field} has to be a string value`,
  IS_NUMBER: (field: string) => `${field} has to be a number value`,
  IS_NOT_EMPTY: (field: string) => `${field} cannot be empty`,
  IS_VALID_EMAIL_FORMAT: (field: string) =>
    `${field} has to have a valid email format`,
  IS_VALID_OBJECT_ID: (field: string) => `${field} has to be a valid object id`,
  MAX_NUMBER: (field: string, max: number) =>
    `${field} value cannot be greater than ${max}`,
  MIN_NUMBER: (field: string, min: number) =>
    `${field} value cannot be less than ${min}`,
  UNAUTHORIZED: 'Signin to proceed',
  FORBIDDEN_MODIY: `You are not authorized to modify this data`,
  RESOURCE_NOT_FOUND: 'The requested resource was not found.',
  FAILED_LOGIN:
    'Sorry, your password was incorrect. Please double-check your password.',
  INVALID_IMAGE_FILE:
    "Image file has to be either of type jpg, png or jpeg and it's file size cannot be more than 10 MB",
  FOLLOW_USER_TWICE: 'You cannot follow a user twice',
  FOLLOW_YOUR_SELF: 'You cannot follow your self',
  UNFOLLOW_YOUR_SELF: 'You cannot unfollow your self',
  LIKE_POST_TWICE: 'You cannot like the same post twice',
  UNLIKE_UNLIKED_POST: "You cannot unlike a post if you haven't liked the post",
};
