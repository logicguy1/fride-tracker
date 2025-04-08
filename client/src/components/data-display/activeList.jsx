import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useNetwork } from '../../hooks/useNetwork';

const UserGrid = () => {
  const [users, setUsers] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0
  });
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const { makeRequest } = useNetwork();

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 }
  ];

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const endpoint = `/v1/items?limit=${paginationModel.pageSize}&skip=${paginationModel.page * paginationModel.pageSize}`;
      const data = await makeRequest(endpoint, 'get');
      setUsers(data);
      // Assuming the API returns total count in headers or response
      // You might need to adjust this based on your API
      setRowCount(data.length);
    } catch (error) {
      // Error handling is managed by useNetwork hook
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [paginationModel]);

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

export default UserGrid;