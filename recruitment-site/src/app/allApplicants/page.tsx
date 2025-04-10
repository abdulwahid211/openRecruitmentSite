'use client';
import React, { useEffect, useRef, useState } from 'react';
import { RevoGrid, Template } from '@revolist/react-datagrid'; // Removed unused Template import
import { DELETE_ADMIN, DELETE_APPLICANT, DELETE_EMPLOYER, DOWNLOAD_CV, GET_ALL_APPLICANTS } from '../graphql/graphql.queries';
import { useMutation, useQuery } from '@apollo/client';
import RemoveCellButton from '../components/gridButtons/RemoveCellButton';
import { DialogProvider } from '../context/DialogProvider';
import MenuBar from '../components/MenuBar';
import { Applicant } from '../models/Applicant';
import DownloadCellButton from '../components/gridButtons/DownloadCellButton';

export default function Page() {
  // Capitalized component name
  const { loading, error, data } = useQuery(GET_ALL_APPLICANTS);
  const { loading: loadingCV, error: errorData, data: dataCV } = useQuery(DOWNLOAD_CV);
  const [deleteApplicantMutation] = useMutation(DELETE_APPLICANT, {
    refetchQueries: [{ query: GET_ALL_APPLICANTS }],
  });
  const [applicants, setApplicants] = useState<Applicant[]>([]); // Fixed typo in variable name

  const handleDelete = async (applicant: Applicant) => {
    try {
      await deleteApplicantMutation({ variables: { email: applicant.email } });
    } catch (error) {
      console.error('Error deleting applicant:', error);
    }
  };

  const handleDownload = async (applicant: Applicant) => {
    try {
      await deleteApplicantMutation({ variables: { email: applicant.email } });
    } catch (error) {
      console.error('Error deleting applicant:', error);
    }
  };

  const columns = [
    {
      prop: 'applicantID',
      name: 'ID',
      sortable: true,
      size: 100,
    },
    {
      prop: 'firstName',
      name: 'First Name',
      sortable: true,
      size: 200,
    },
    {
      prop: 'lastName',
      name: 'Last Name',
      sortable: true,
      size: 200,
    },
    {
      prop: 'email',
      name: 'Email',
      sortable: true,
      size: 200,
    },
    {
      prop: 'city',
      name: 'City',
      sortable: true,
      size: 200,
    },
    {
      prop: 'telephone',
      name: 'Telephone',
      sortable: true,
      size: 200,
    },
    {
      name: 'Download',
      size: 100,
      sortable: false,
      cellTemplate: Template((props: any) => <DownloadCellButton column={props.column} handleClick={() => handleDelete(props.model)} />),
    },
    {
      name: 'Remove',
      size: 100,
      sortable: false,
      cellTemplate: Template((props: any) => <RemoveCellButton column={props.column} handleClick={() => handleDelete(props.model)} />),
    },
  ];

  useEffect(() => {
    if (!loading && data?.applicants) {
      setApplicants(data.applicants);
      console.log(data);
    }
  }, [loading, data]);

  return (
    <div>
      <DialogProvider>
        <MenuBar />
      </DialogProvider>
      <div className="p-2 max-w-full overflow-x-auto">
        <RevoGrid
          source={applicants} // Use corrected variable name
          columns={columns}
          theme="material"
          style={{ height: '200px' }}
          className="w-full bg-blue-50 font-bold border-1"
          resize
          autoSizeColumn
        />
      </div>
    </div>
  );
}
