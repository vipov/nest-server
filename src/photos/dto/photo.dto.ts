import { Type } from "class-transformer";
import { PhotoEntity } from "../entities";

export class UploadResponseDto {

  @Type(() => PhotoEntity)
  photo: PhotoEntity;

  thumb: any;
  file: any;
  body: any;
  
  constructor(data: Partial<UploadResponseDto>) {
    Object.assign(this, data);
  }
}