import { CommentModel } from "../models";

export class GetCommentResponseDto {
  total: number;
  
  data: CommentModel;
}