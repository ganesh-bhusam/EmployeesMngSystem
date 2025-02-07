import React, { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee, updateEmployee } from '../services/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, TablePagination, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        setFilteredEmployees(
            employees.filter(employee =>
                employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, employees]);

    const fetchEmployees = async () => {
        const response = await getEmployees();
        setEmployees(response.data);
    };

    const handleDelete = async () => {
        if (employeeToDelete) {
            await deleteEmployee(employeeToDelete.id);
            fetchEmployees();
            setOpenDeleteDialog(false);
        }
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setOpenEditDialog(true);
    };

    const handleSaveEdit = async () => {
        if (selectedEmployee) {
            await updateEmployee(selectedEmployee.id, selectedEmployee);
            fetchEmployees();
            setOpenEditDialog(false);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const openDeleteDialogHandler = (employee) => {
        setEmployeeToDelete(employee);
        setOpenDeleteDialog(true);
    };

    return (
        <div>
            <h2 style={{ color: '#00008B' }}>Employee List</h2>

            {/* Search Bar */}
            <TextField
                label="Search Employees"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px', color: '#00008B' }}
            />

            <TableContainer component={Paper} style={{ backgroundColor: '#FFFAF0', padding: '10px', borderRadius: '10px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: '#00008B', fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell style={{ color: '#00008B', fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell style={{ color: '#00008B', fontWeight: 'bold' }}>Job Title</TableCell>
                            <TableCell style={{ color: '#00008B', fontWeight: 'bold' }}>Phone</TableCell>
                            <TableCell style={{ color: '#00008B', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell style={{ color: '#000000', fontWeight: 'bold' }}>{employee.name}</TableCell>
                                <TableCell style={{ color: '#000000', fontWeight: 'bold' }}>{employee.email}</TableCell>
                                <TableCell style={{ color: '#000000', fontWeight: 'bold' }}>{employee.jobTitle}</TableCell>
                                <TableCell style={{ color: '#000000', fontWeight: 'bold' }}>{employee.phone}</TableCell>
                                <TableCell>
                                    <IconButton style={{ color: '#00008B' }} onClick={() => handleEdit(employee)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton style={{ color: '#FF0000' }} onClick={() => openDeleteDialogHandler(employee)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredEmployees.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle style={{ color: '#00008B' }}>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this employee?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} style={{ color: '#00008B' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} style={{ color: '#FF0000' }}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Employee Dialog */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle style={{ color: 'black', backgroundColor: '#FFFACD' }}>Edit Employee</DialogTitle>
                <DialogContent style={{ backgroundColor: '#FFFACD' }}>
                    <TextField
                        label="Name"
                        fullWidth
                        value={selectedEmployee?.name || ''}
                        onChange={(e) => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })}
                        style={{ marginBottom: '10px', backgroundColor: 'white' }}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        value={selectedEmployee?.email || ''}
                        onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })}
                        style={{ marginBottom: '10px', backgroundColor: 'white' }}
                    />
                    <TextField
                        label="Job Title"
                        fullWidth
                        value={selectedEmployee?.jobTitle || ''}
                        onChange={(e) => setSelectedEmployee({ ...selectedEmployee, jobTitle: e.target.value })}
                        style={{ marginBottom: '10px', backgroundColor: 'white' }}
                    />
                    <TextField
                        label="Phone"
                        fullWidth
                        value={selectedEmployee?.phone || ''}
                        onChange={(e) => setSelectedEmployee({ ...selectedEmployee, phone: e.target.value })}
                        style={{ marginBottom: '10px', backgroundColor: 'white' }}
                    />
                </DialogContent>
                <DialogActions style={{ backgroundColor: '#FFFACD' }}>
                    <Button onClick={() => setOpenEditDialog(false)} style={{ color: 'black' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEdit} style={{ color: 'black' }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EmployeeList;
