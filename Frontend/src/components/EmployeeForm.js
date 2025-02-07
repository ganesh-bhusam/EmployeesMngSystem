import React, { useState } from 'react';
import { addEmployee, updateEmployee } from '../services/api';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import './App.css'; // Ensure this file applies styles globally

const EmployeeForm = ({ employee, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: employee ? employee.name : '',
        email: employee ? employee.email : '',
        jobTitle: employee ? employee.jobTitle : '',
        phone: employee ? employee.phone : '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (employee) {
                await updateEmployee(employee.id, formData);
            } else {
                await addEmployee(formData);
            }
            if (onSubmit) onSubmit();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h5" gutterBottom style={{ color: 'green' }}>
                        {employee ? 'Edit' : 'Add'} Employee
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    variant="outlined"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    InputLabelProps={{ style: { color: 'green' } }}
                                    InputProps={{ style: { color: 'green' } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    InputLabelProps={{ style: { color: 'green' } }}
                                    InputProps={{ style: { color: 'green' } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Job Title"
                                    variant="outlined"
                                    value={formData.jobTitle}
                                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                    required
                                    InputLabelProps={{ style: { color: 'green' } }}
                                    InputProps={{ style: { color: 'green' } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    variant="outlined"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    InputLabelProps={{ style: { color: 'green' } }}
                                    InputProps={{ style: { color: 'green' } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    style={{ backgroundColor: 'green', color: 'white' }}
                                    type="submit"
                                >
                                    {employee ? 'Update' : 'Add'} Employee
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

EmployeeForm.defaultProps = {
    onSubmit: () => console.warn("onSubmit function is not provided"),
};

export default EmployeeForm;
