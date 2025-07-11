'use client';
import React, { useEffect, useRef, useState } from 'react';
import { RevoGrid, Template } from '@revolist/react-datagrid'; // Removed unused Template import
import { DELETE_EMPLOYER, GET_ALL_EMPLOYERS } from '../../../libs/graphql/graphql.queries';
import { useMutation, useQuery } from '@apollo/client';
import { Employer } from '../../../models/Employer';
import RemoveCellButton from '../../../components/gridButtons/RemoveCellButton';
import { DialogProvider } from '../../../context/DialogProvider';
import NavBar from '../../../components/nav/NavBar';

export default function Page() {
  // Capitalized component name
  const { loading, error, data } = useQuery(GET_ALL_EMPLOYERS);
  const [deleteEmployerMutation] = useMutation(DELETE_EMPLOYER, {
    refetchQueries: [{ query: GET_ALL_EMPLOYERS }],
  });
  const [employers, setEmployers] = useState<Employer[]>([]); // Fixed typo in variable name

  const handle = async (employer: Employer) => {
    try {
      await deleteEmployerMutation({ variables: { email: employer.email } });
    } catch (error) {
      console.error('Error deleting employer:', error);
    }
  };

  const columns = [
    {
      prop: 'employerID',
      name: 'ID',
      sortable: true,
      size: 100,
    },
    {
      prop: 'name',
      name: 'Name',
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
      prop: 'remove', // Added a unique prop for the Remove column
      name: 'Remove',
      size: 100,
      sortable: false,
      cellTemplate: Template((props: any) => (
        <RemoveCellButton
          prop={props.prop}
          model={props.model}
          rowIndex={props.rowIndex}
          colIndex={props.colIndex}
          column={props.column}
          handleClick={() => handle(props.model)}
          colType={'colPinStart'}
          type={'rgRow'}
          data={[]}
        />
      )),
    },
  ];

  useEffect(() => {
    if (!loading && data?.employers) {
      setEmployers(data.employers);
    }
  }, [loading, data]);

  return (
    <div>
      <DialogProvider>
        <NavBar />
      </DialogProvider>
      <div className="p-4 max-w-full overflow-x-auto">
        <RevoGrid
          source={employers} // Use corrected variable name
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
