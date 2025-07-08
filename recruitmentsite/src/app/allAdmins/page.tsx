'use client';
import React, { useEffect, useRef, useState } from 'react';
import { RevoGrid, Template } from '@revolist/react-datagrid'; // Removed unused Template import
import { DELETE_ADMIN, GET_ALL_ADMINS } from '../../../libs/graphql/graphql.queries';
import { useMutation, useQuery } from '@apollo/client';
import RemoveCellButton from '../../../components/gridButtons/RemoveCellButton';
import { DialogProvider } from '../../../context/DialogProvider';
import NavBar from '../../../components/nav/NavBar';
import { Admin } from '../../../models/Admin';

export default function Page() {
  // Capitalized component name
  const { loading, error, data } = useQuery(GET_ALL_ADMINS);
  const [deleteAdminMutation] = useMutation(DELETE_ADMIN, {
    refetchQueries: [{ query: GET_ALL_ADMINS }],
  });
  const [admin, setAdmin] = useState<Admin[]>([]); // Fixed typo in variable name

  const handle = async (admin: Admin) => {
    try {
      await deleteAdminMutation({ variables: { email: admin.email } });
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const columns = [
    {
      prop: 'adminID',
      name: 'AdminI',
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
      name: 'Remove',
      size: 100,
      sortable: false,
      cellTemplate: Template((props: any) => <RemoveCellButton column={props.column} handleClick={() => handle(props.model)} />),
    },
  ];

  useEffect(() => {
    if (!loading && data?.admins) {
      setAdmin(data.admins);
      console.log(data);
    }
  }, [loading, data]);

  return (
    <div>
      <DialogProvider>
        <NavBar />
      </DialogProvider>
      <div className="p-4 max-w-full overflow-x-auto">
        <RevoGrid
          source={admin} // Use corrected variable name
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
