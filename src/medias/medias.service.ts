import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as crypto from 'crypto';

import { ENV_VARIABLES } from '../constants';

@Injectable()
export class MediasService {
  constructor(private configService: ConfigService) {}

  private get bucketName() {
    return this.configService.get<string>(ENV_VARIABLES.S3_BUCKET_NAME);
  }

  private get accessKey() {
    return this.configService.get<string>(ENV_VARIABLES.S3_ACCESS_KEY);
  }

  private get secretAccessKey() {
    return this.configService.get<string>(ENV_VARIABLES.S3_SECRET_ACCESS_KEY);
  }

  private get region() {
    return this.configService.get<string>(ENV_VARIABLES.S3_BUCKET_REGION);
  }

  private get bucketInstance() {
    return new S3Client({
      credentials: {
        accessKeyId: this.accessKey,
        secretAccessKey: this.secretAccessKey,
      },
      region: this.region,
    });
  }

  private get randomHex() {
    return crypto.randomBytes(32).toString('hex');
  }

  async uploadFile(fileName: string, fileBuffer: Buffer, mimetype: string) {
    const uniqueFileName = `${fileName}-${this.randomHex}`;
    const payload = {
      Bucket: this.bucketName,
      Key: uniqueFileName,
      Body: fileBuffer,
      ContentType: mimetype,
    };

    const command = new PutObjectCommand(payload);

    await this.bucketInstance.send(command);

    return uniqueFileName;
  }

  async deleteFile(fileName: string) {
    const payload = {
      Bucket: this.bucketName,
      Key: fileName,
    };

    const command = new DeleteObjectCommand(payload);

    await this.bucketInstance.send(command);
  }

  async getFileUrl(fileName: string) {
    const payload = {
      Bucket: this.bucketName,
      Key: fileName,
    };

    const command = new GetObjectCommand(payload);

    const url = await getSignedUrl(this.bucketInstance, command, {
      expiresIn: 3600,
    });

    return url;
  }
}
