import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useNetwork } from '../../hooks/useNetwork';
import StatusChip from '../common/statusChip';

const ItemActivities = ({ item_id }) => {
  const [users, setUsers] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const { makeRequest } = useNetwork();

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'owner', headerName: 'Owner', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    {
      field: 'created',
      headerName: 'Created',
      flex: 1,
      valueFormatter: ({ value }) =>
        new Date(value).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
    },
    {
      field: 'expires',
      headerName: 'Expires',
      flex: 1,
      valueFormatter: ({ value }) =>
        new Date(value).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => <StatusChip status={params.value} />,
    },
  ];
  
  

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const endpoint = `/v1/records?item_id=${item_id}&limit=${paginationModel.pageSize}&skip=${paginationModel.page * paginationModel.pageSize}`;
      const data = await makeRequest(endpoint, 'get');

      // Flatten the item data to include name and description
      const mappedData = data.map((entry) => ({
        id: entry.id,
        name: entry.item?.name || '',
        description: entry.item?.description || '',
        created: entry.created,
        expires: entry.expires,
        status: entry.status,
        owner: entry.owner.name,
      }));

      setUsers(mappedData);
      setRowCount(data.length); // Update if API gives total count
    } catch (error) {
      // Handled by useNetwork
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [paginationModel, item_id]);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25]}
        rowCount={rowCount}
        loading={loading}
        pagination
        paginationMode="server"
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        density='compact'
      />
    </Box>
  );
};

export default ItemActivities;
