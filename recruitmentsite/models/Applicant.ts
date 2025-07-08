export class Applicant {
  public applicantID: number;
  public lastName: string;
  public firstName: string;
  public city: string;
  public telephone: string;
  public email: string;
  public password: string;

  constructor(applicationID: number, lastName: string, firstName: string, city: string, telephone: string, email: string, password: string) {
    this.applicantID = applicationID;
    this.lastName = lastName;
    this.firstName = firstName;
    this.city = city;
    this.telephone = telephone;
    this.email = email;
    this.password = password;
  }
}
