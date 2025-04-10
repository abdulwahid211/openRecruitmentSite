export class CV {
  public email: string;
  public filename: string;
  public uploaded: string;
  public file: string;
  public type: string;
  public size: number;

  constructor(
    email: string,
    filename: string,
    uploaded: string,
    file: string,
    type: string,
    size: number,
  ) {
    this.email = email;
    this.filename = filename;
    this.uploaded = uploaded;
    this.file = file;
    this.type = type;
    this.size = size;
  }
}
