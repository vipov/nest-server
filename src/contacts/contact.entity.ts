import { Exclude, Transform } from "class-transformer";

export class Contact {
  id: number;

  
  @Transform(({ value, key }) => (value as string).toUpperCase(), {toPlainOnly: true})
  name: string;

  @Exclude({toPlainOnly: true})
  email: string;

  message: string;
}
