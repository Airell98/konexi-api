export class UpdateProfileDto {
  _id: string;
  name: string;

  username: string;

  email: string;

  imageFile?: Express.Multer.File;
}
