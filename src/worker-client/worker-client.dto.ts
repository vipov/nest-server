export class SumEvent {
  static message = 'sum';
  data: number[];
}

export class CreateThumbsEvent {
  static message = 'create_thumbs';
  filename: string;
}
