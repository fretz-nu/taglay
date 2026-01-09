import React, { useState, useEffect, useMemo } from 'react'
import { fetchUsers, createUser, updateUser } from '../../services/UserService';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {
    Button, Stack, Typography, Modal, Paper, FormControl, InputAdornment, InputLabel,
    Input, TextField, MenuItem, Select, Switch
} from '@mui/material';
import { useDemoData } from '@mui/x-data-grid-generator';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { grey } from '@mui/material/colors';
import { useAdminSearch } from '../../context/AdminSearchContext.jsx';

const color = grey[500];

// DataGrid custom styling
const dataGridSx = {
  border: '1px solid #00ff00',
  backgroundColor: '#0d1a0d',
  color: '#00cc00',
  fontFamily: '"Space Mono", monospace',
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: '#0a1a0a',
    borderBottom: '2px solid #00ff00',
    color: '#00ff00',
    fontFamily: '"Share Tech Mono", monospace',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontWeight: 600,
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    color: '#00ff00',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  '& .MuiDataGrid-cell': {
    borderBottom: '1px solid rgba(0, 255, 0, 0.2)',
    color: '#00cc00',
    fontFamily: '"Space Mono", monospace',
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: 'rgba(0, 255, 0, 0.08)',
  },
  '& .MuiDataGrid-row.Mui-selected': {
    backgroundColor: 'rgba(0, 255, 0, 0.12)',
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: '1px solid #008800',
    backgroundColor: '#0a1a0a',
    color: '#00cc00',
  },
  '& .MuiTablePagination-root': {
    color: '#00cc00',
  },
  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
    color: '#00cc00',
    fontFamily: '"Space Mono", monospace',
  },
  '& .MuiTablePagination-actions button': {
    color: '#00ff00',
  },
  '& .MuiTablePagination-actions button:hover': {
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
  },
  '& .MuiTablePagination-selectIcon': {
    color: '#00ff00',
  },
  '& .MuiDataGrid-sortIcon': {
    color: '#00ff00',
  },
  '& .MuiDataGrid-menuIcon': {
    color: '#00ff00',
  },
  '& .MuiCheckbox-root': {
    color: '#00cc00',
  },
  '& .MuiCheckbox-root.Mui-checked': {
    color: '#00ff00',
  },
};

// Modal custom styling
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: '#0d1a0d',
    border: '1px solid #00ff00',
    boxShadow: '0 0 40px rgba(0, 255, 0, 0.3)',
    p: 4,
    color: '#00ff00',
    fontFamily: '"Space Mono", monospace',
    maxHeight: '80vh',
    overflowY: 'auto',
};

// TextField custom styling
const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    color: '#00ff00',
    '& fieldset': {
      borderColor: '#008800',
    },
    '&:hover fieldset': {
      borderColor: '#00ff00',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00ff00',
      boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
    },
  },
  '& .MuiInputLabel-root': {
    fontFamily: '"Space Mono", monospace',
    color: '#00cc00',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#00ff00',
  },
  '& .MuiInputBase-input': {
    fontFamily: '"Space Mono", monospace',
    color: '#00ff00',
  },
};

// Button styling
const primaryButtonSx = {
  fontFamily: '"Share Tech Mono", monospace',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontWeight: 600,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: '2px',
  transition: 'all 0.18s ease',
  position: 'relative',
  overflow: 'hidden',
  borderColor: '#00ff00',
  color: '#00ff00',
  backgroundColor: 'transparent',
  boxShadow: '0 0 20px rgba(0, 255, 0, 0.2), inset 0 0 20px rgba(0, 255, 0, 0.05)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 0 30px rgba(0, 255, 0, 0.5), inset 0 0 30px rgba(0, 255, 0, 0.1)',
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    color: '#00ff88',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
};

const secondaryButtonSx = {
  fontFamily: '"Share Tech Mono", monospace',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontWeight: 600,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: '2px',
  transition: 'all 0.18s ease',
  borderColor: '#00cc00',
  color: '#00cc00',
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    borderColor: '#00ff00',
    color: '#00ff88',
  },
};

// const columns = [
//     { field: 'id', headerName: 'ID', width: 90 },
//     {
//         field: 'firstName',
//         headerName: 'First name',
//         width: 150,
//         editable: true,
//     },
//     {
//         field: 'lastName',
//         headerName: 'Last name',
//         width: 150,
//         editable: true,
//     },
//     {
//         field: 'age',
//         headerName: 'Age',
//         type: 'number',
//         width: 110,
//         editable: true,
//     },
//     {
//         field: 'fullName',
//         headerName: 'Full name',
//         description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 160,
//         valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//     },
// ];

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

const UserListPage = () => {
    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 5,
        maxColumns: 6,
    });
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Track if editing
    const [editUserId, setEditUserId] = useState(null); // Track the user being edited
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        contactNumber: '',
        email: '',
        username: '',
        password: '',
        address: '',
        isActive: true,
    });

    // Get search query from context
    const { searchQuery } = useAdminSearch();

    // Filter users based on search query
    const filteredUsers = useMemo(() => {
        if (!searchQuery) return users;
        const query = searchQuery.toLowerCase();
        return users.filter(user =>
            user.firstName?.toLowerCase().includes(query) ||
            user.lastName?.toLowerCase().includes(query) ||
            user.email?.toLowerCase().includes(query) ||
            user.username?.toLowerCase().includes(query) ||
            user.type?.toLowerCase().includes(query) ||
            user.contactNumber?.includes(query)
        );
    }, [users, searchQuery]);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const { data } = await fetchUsers();
            setUsers(data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleOpen = () => {
        setIsEditing(false); // Reset to "Add" mode
        setNewUser({
            firstName: '',
            lastName: '',
            age: '',
            gender: '',
            contactNumber: '',
            email: '',
            username: '',
            password: '',
            address: '',
            isActive: true,
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsEditing(false);
        setEditUserId(null);
    };

    const handleEdit = (id) => {
        const userToEdit = users.find((user) => user._id === id);
        if (userToEdit) {
            setNewUser({ ...userToEdit, password: '' }); // Set password to an empty string
            setEditUserId(id); // Track the user being edited
            setIsEditing(true); // Switch to "Edit" mode
            setOpen(true); // Open the modal
        }
    };

    const handleSaveUser = async () => {
        try {
            if (isEditing) {
                // Update user
                const updatedUser = { ...newUser };
                if (!updatedUser.password) {
                    delete updatedUser.password; // Exclude password if it's empty
                }
                await updateUser(editUserId, updatedUser);
            } else {
                // Add new user
                await createUser(newUser);
            }
            loadUsers(); // Reload users
            handleClose(); // Close modal
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const handleToggleActive = async (id, isActive) => {
        try {
            await updateUser(id, { isActive: !isActive });
            loadUsers(); // Reload users after toggling
        } catch (error) {
            console.error('Error toggling user status:', error);
        }
    };

    const columns1 = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,

            valueGetter: (value, params) => `${params.firstName || ''} ${params.lastName || ''}`,
        },
        { field: 'age', headerName: 'Age', flex: 1, sortable: true },
        { field: 'gender', headerName: 'Gender', flex: 1, sortable: true },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 1, sortable: true },
        { field: 'contactNumber', headerName: 'Contact', flex: 1 },
        { field: 'username', headerName: 'Username', flex: 1 },
        { field: 'address', headerName: 'Address', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleEdit(params.row._id)}
                        sx={{
                            fontFamily: '"Share Tech Mono", monospace',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            border: '1px solid #00ff00',
                            color: '#00ff00',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                                borderColor: '#00ff00',
                                color: '#00ff88',
                                boxShadow: '0 0 15px rgba(0, 255, 0, 0.4)',
                            },
                        }}
                    >
                        Edit
                    </Button>
                    <Switch
                        checked={params.row.isActive}
                        onChange={() => handleToggleActive(params.row._id, params.row.isActive)}
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: 'rgba(0, 255, 0, 0.3)',
                                borderColor: '#00ff00',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb': {
                                backgroundColor: '#00ff00',
                                boxShadow: '0 0 10px rgba(0, 255, 0, 0.8)',
                            },
                            '& .MuiSwitch-track': {
                                backgroundColor: 'rgba(0, 136, 0, 0.3)',
                                border: '1px solid #008800',
                            },
                            '& .MuiSwitch-thumb': {
                                backgroundColor: '#00cc00',
                            },
                        }}
                    />
                </Box>
            ),
        },
    ];

    return (
        <>
            <Stack
                direction="row"
                sx={{
                    marginBottom: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pb: 2,
                    borderBottom: '1px solid #00ff00',
                    position: 'relative',
                }}
            >
                <Typography
                    variant="h2"
                    fontWeight="bold"
                    sx={{
                        fontFamily: '"Share Tech Mono", monospace',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: '#00ff00',
                        textShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
                    }}
                >
                    Users
                </Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddCircleIcon />}
                    onClick={handleOpen}
                    sx={primaryButtonSx}
                >
                    Add User
                </Button>
            </Stack>

            {/* Modal for Add/Edit User */}
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="add-user-modal"
                aria-describedby="add-user-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography
                        id="keep-mounted-modal-title"
                        variant="h4"
                        component="h2"
                        sx={{
                            fontFamily: '"Share Tech Mono", monospace',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: 700,
                            color: '#00ff00',
                            textShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
                            mb: 2,
                        }}
                    >
                        {isEditing ? 'Edit User' : 'Add User'}
                    </Typography>
                    <Stack id="transition-modal-description" direction="column" spacing={3} sx={{ mt: 2 }}>
                        <FormControl fullWidth variant="standard">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle sx={{ color: '#00ff00', mr: 1, my: 0.5 }} />
                                <TextField
                                    fullWidth
                                    id="input-with-sx"
                                    label="Enter first name"
                                    variant="standard"
                                    value={newUser.firstName}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, firstName: e.target.value })
                                    }
                                    sx={textFieldSx}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle sx={{ color: '#00ff00', mr: 1, my: 0.5 }} />
                                <TextField
                                    fullWidth
                                    id="input-with-sx"
                                    label="Enter last name"
                                    variant="standard"
                                    value={newUser.lastName}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, lastName: e.target.value })
                                    }
                                    sx={textFieldSx}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle sx={{ color: '#00ff00', mr: 1, my: 0.5 }} />
                                <TextField
                                    fullWidth
                                    id="input-with-sx"
                                    label="Enter age"
                                    variant="standard"
                                    value={newUser.age}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, age: e.target.value })
                                    }
                                    sx={textFieldSx}
                                />
                            </Box>

                            <Stack direction='row' sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle color="#00ff00" sx={{ mr: 1 }} />
                                <FormControl fullWidth variant="standard">
                                    <InputLabel
                                        id="demo-simple-select-standard-label"
                                        sx={{
                                            fontFamily: '"Space Mono", monospace',
                                            color: '#00cc00',
                                            '&.Mui-focused': {
                                                color: '#00ff00',
                                            },
                                        }}
                                    >
                                        Gender
                                    </InputLabel>
                                    <Select
                                        IconComponent={ExpandMoreIcon}
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={newUser.gender}
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, gender: e.target.value })
                                        }
                                        sx={{
                                            color: '#00ff00',
                                            fontFamily: '"Space Mono", monospace',
                                            '&:before': {
                                                borderColor: '#008800',
                                            },
                                            '&:hover:before': {
                                                borderColor: '#00ff00',
                                            },
                                            '&.Mui-focused:before': {
                                                borderColor: '#00ff00',
                                            },
                                        }}
                                    >
                                        <MenuItem value="Male" sx={{ fontFamily: '"Space Mono", monospace', color: '#00cc00' }}>Male</MenuItem>
                                        <MenuItem value="Female" sx={{ fontFamily: '"Space Mono", monospace', color: '#00cc00' }}>Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>

                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle sx={{ color: '#00ff00', mr: 1, my: 0.5 }} />
                                <TextField
                                    fullWidth
                                    id="input-with-sx"
                                    label="Enter mobile"
                                    variant="standard"
                                    value={newUser.contactNumber}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, contactNumber: e.target.value })
                                    }
                                    sx={textFieldSx}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle sx={{ color: '#00ff00', mr: 1, my: 0.5 }} />
                                <TextField
                                    fullWidth
                                    id="input-with-sx"
                                    label="Enter address"
                                    variant="standard"
                                    value={newUser.address}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, address: e.target.value })
                                    }
                                    sx={textFieldSx}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle sx={{ color: '#00ff00', mr: 1, my: 0.5 }} />
                                <TextField
                                    fullWidth
                                    id="input-with-sx"
                                    label="Enter email"
                                    variant="standard"
                                    value={newUser.email}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, email: e.target.value })
                                    }
                                    sx={textFieldSx}
                                />
                            </Box>
                            <Stack direction='row' sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle color="#00ff00" sx={{ mr: 1 }} />
                                <FormControl fullWidth variant="standard">
                                    <InputLabel
                                        id="type-label"
                                        sx={{
                                            fontFamily: '"Space Mono", monospace',
                                            color: '#00cc00',
                                            '&.Mui-focused': {
                                                color: '#00ff00',
                                            },
                                        }}
                                    >
                                        Type
                                    </InputLabel>
                                    <Select
                                        labelId="type-label"
                                        value={newUser.type || 'viewer'}
                                        onChange={(e) => setNewUser({ ...newUser, type: e.target.value })}
                                        sx={{
                                            color: '#00ff00',
                                            fontFamily: '"Space Mono", monospace',
                                            '&:before': {
                                                borderColor: '#008800',
                                            },
                                            '&:hover:before': {
                                                borderColor: '#00ff00',
                                            },
                                            '&.Mui-focused:before': {
                                                borderColor: '#00ff00',
                                            },
                                        }}
                                    >
                                        <MenuItem value="admin" sx={{ fontFamily: '"Space Mono", monospace', color: '#00cc00' }}>Admin</MenuItem>
                                        <MenuItem value="editor" sx={{ fontFamily: '"Space Mono", monospace', color: '#00cc00' }}>Editor</MenuItem>
                                        <MenuItem value="viewer" sx={{ fontFamily: '"Space Mono", monospace', color: '#00cc00' }}>Viewer</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle sx={{ color: '#00ff00', mr: 1, my: 0.5 }} />
                                <TextField
                                    fullWidth
                                    id="input-with-sx"
                                    label="Enter username"
                                    variant="standard"
                                    value={newUser.username}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, username: e.target.value })
                                    }
                                    sx={textFieldSx}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle sx={{ color: '#00ff00', mr: 1, my: 0.5 }} />
                                <TextField
                                    fullWidth
                                    id="input-with-sx"
                                    label="Enter password"
                                    variant="standard"
                                    type="password"
                                    value={newUser.password}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, password: e.target.value })
                                    }
                                    sx={textFieldSx}
                                />
                            </Box>
                        </FormControl>
                    </Stack>
                    <Stack spacing={2} direction="row">
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            sx={secondaryButtonSx}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleSaveUser}
                            sx={primaryButtonSx}
                        >
                            {isEditing ? 'Save Changes' : 'Add'}
                        </Button>
                    </Stack>
                </Box>
            </Modal>

            <Box sx={{ height: 500, width: '100%', mt: 3 }}>
                <DataGrid
                    rows={filteredUsers}
                    columns={columns1}
                    getRowId={(row) => row._id}
                    loading={loading}
                    pageSize={10}
                    rowsPerPageOptions={[10, 20, 50]}
                    disableSelectionOnClick
                    sx={dataGridSx}
                />
            </Box>
            {/* <Box sx={{ height: 300, width: '100%', marginBottom: '20px' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
            <h3 >
                Brokers List
            </h3>
            <div style={{ width: '100%' }}>
                <div style={{ height: 350, width: '100%' }}>
                    <DataGrid {...data} />
                </div>
            </div> */}
        </>
    )
}

export default UserListPage

