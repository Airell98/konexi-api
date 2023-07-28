import { registerDecorator, ValidationOptions } from 'class-validator';
import { isValidObjectId } from 'mongoose';

export const IsValidObjectIdField = (validationOptions?: ValidationOptions) => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsValidObjectIdField',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isValidObjectId(value);
        },
      },
    });
  };
};
