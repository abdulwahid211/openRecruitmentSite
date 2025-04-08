export interface Vacancy {
  vacancyID: number;
  employerID: number;
  title: string;
  description: string;
  created: string; // or Date, depending on how you handle dates
  sector: string;
  salary: string;
  location: string;
  contract: string;
}
