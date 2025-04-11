import { gql } from '@apollo/client';

export const APPLICANT_LOGIN = gql`
  query Mutation($email: String!, $password: String!) {
    applicantLogin(email: $email, password: $password) {
      token
      id
    }
  }
`;

export const ADMIN_LOGIN = gql`
  query Mutation($email: String!, $password: String!) {
    adminsLogin(email: $email, password: $password) {
      token
      id
    }
  }
`;

export const GET_APPLICANT_PROFILE = gql`
  query Query($email: String!) {
    applicant(email: $email) {
      applicantID
      firstName
      lastName
      telephone
      city
      email
      password
    }
  }
`;

export const CREATE_APPLICANT_PROFILE = gql`
  mutation Mutation($lastName: String!, $firstName: String!, $email: String!, $password: String!, $telephone: String!, $city: String!) {
    createApplicant(applicant: { lastName: $lastName, firstName: $firstName, email: $email, password: $password, telephone: $telephone, city: $city })
  }
`;

export const CREATE_ADMIN_PROFILE = gql`
  mutation Mutation($lastName: String!, $firstName: String!, $email: String!, $password: String!) {
    createAdmin(admin: { lastName: $lastName, firstName: $firstName, email: $email, password: $password })
  }
`;

export const CREATE_EMPLOYER_PROFILE = gql`
  mutation CreateEmployer($name: String!, $address: String!, $city: String!, $postcode: String!, $email: String!, $telephone: String!) {
    createEmployer(employer: { name: $name, address: $address, city: $city, postcode: $postcode, email: $email, telephone: $telephone })
  }
`;

export const CREATE_VACANCY_PROFILE = gql`
  mutation CreateVacancies(
    $employerId: Int!
    $title: String!
    $description: String!
    $created: DateTime!
    $sector: String!
    $salary: String!
    $location: String!
    $contract: String!
  ) {
    createVacancies(
      vacancy: { employerID: $employerId, title: $title, salary: $salary, location: $location, created: $created, contract: $contract, description: $description, sector: $sector }
    )
  }
`;

export const GET_VACANCY_PROFILE = gql`
  query vacancy($vacancyId: Int!) {
    vacancy(vacancyId: $vacancyId) {
      vacancyID
      employerID
      title
      description
      created
      sector
      salary
      location
      contract
    }
  }
`;

export const GET_VACANCIES = gql`
  query vacancies {
    vacancies {
      vacancyID
      employerID
      title
      description
      created
      sector
      salary
      location
      contract
    }
  }
`;

export const CREATE_APPLIED_JOBS = gql`
  mutation Mutation($applicantId: Int!, $vacancyId: Int!) {
    createAppliedJobs(jobs: { applicantID: $applicantId, vacancyID: $vacancyId })
  }
`;

export const CHECK_APPLIED_JOBS = gql`
  query Query($applicantId: Int!, $vacancyId: Int!) {
    verifyAlreadyAppliedJob(applicantId: $applicantId, vacancyId: $vacancyId)
  }
`;

export const GET_EMPLOYER_PROFILE = gql`
  query Employer($email: String!) {
    employer(email: $email) {
      employerID
      name
      telephone
      city
      postcode
      email
    }
  }
`;

export const GET_ALL_APPLICANTS = gql`
  query Applicants {
    applicants {
      applicantID
      lastName
      firstName
      telephone
      city
      email
      password
    }
  }
`;

export const GET_ALL_EMPLOYERS = gql`
  query Employers {
    employers {
      employerID
      name
      telephone
      address
      city
      postcode
      email
    }
  }
`;

export const GET_ALL_ADMINS = gql`
  query Admins {
    admins {
      adminID
      lastName
      firstName
      email
      password
    }
  }
`;

export const DELETE_ADMIN = gql`
  mutation DeleteAdmin($email: String!) {
    deleteAdmin(email: $email)
  }
`;

export const DELETE_APPLICANT = gql`
  mutation DeleteApplicant($email: String!) {
    deleteApplicant(email: $email)
  }
`;

export const DELETE_EMPLOYER = gql`
  mutation DeleteEmployer($email: String!) {
    deleteEmployer(email: $email)
  }
`;

export const DELETE_ALL_VACANCY = gql`
  mutation Mutation($vacancyID: Int!) {
    deleteVacancies(vacancyID: $vacancyID)
  }
`;

export const GET_ALL_APPLIED_APPLICANTS = gql`
  query ApplicantAppliedJobs($employerId: Int!) {
    applicantAppliedJobs(employerId: $employerId) {
      vacancyID
      jobTitle
      applicantID
      lastName
      firstName
      city
      telephone
      email
    }
  }
`;

export const UPLOAD_CV = gql`
  mutation UploadCV($file: String!, $email: String!, $filename: String!, $uploaded: DateTime!, $type: String!, $size: Int!) {
    uploadCV(cv: { file: $file, email: $email, filename: $filename, uploaded: $uploaded, type: $type, size: $size })
  }
`;

export const DOWNLOAD_CV = gql`
  query DownloadCV($email: String!) {
    downloadCV(email: $email) {
      id
      email
      filename
      file
      type
      uploaded
      size
    }
  }
`;
