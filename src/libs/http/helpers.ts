import { message } from 'aws-sdk/clients/sns';

export type TCommonAPIResponseParam<T> = {
  status?: message;
  statusCode: number;
  message?: string;
  data: T;
};

export const generateCommonApiResponse = <T>(
  payload: TCommonAPIResponseParam<T>,
) => {
  return {
    status:
      payload.statusCode === 200 || payload.statusCode === 201
        ? 'success'
        : payload.message,
    message: payload?.message ?? '',
    data: payload.data,
  };
};
