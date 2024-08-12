import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Icon01 from '../assets/redcircle.png';
import Icon02 from '../assets/greencircle.png';
import Icon03 from '../assets/yellowcircle.png';
import Button from '@mui/material/Button';
import '../cascade/home.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Ensure Bootstrap JS is imported

function Home() {
    interface CountryType {
        code: number;
        label: string;
        phone: string;
        suggested?: boolean;
    }

    const test: readonly CountryType[] = [
        { code: 1, label: 'Priority 1', phone: '0703' },
        { code: 2, label: 'Priority 2', phone: '0703' },
        { code: 3, label: 'Priority 3', phone: '0703' }
    ];

    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const handleDateChange = (newDate: Dayjs | null) => {
        setSelectedDate(newDate);
    };

    const dayOfWeekFormat = (date: any) => {
        return date.format('ddd').charAt(0).toUpperCase();
    };

    const icons = [Icon01, Icon02, Icon03];
    const optionLabel = (option: any) => option.code;

    return (

        <div className='main-container'>
            <div className='container p-1 my-1 border'>
                <div className='row'>
                    <div className='col-3'>
                        <div className='calendar'>
                            <Stack direction="row" spacing={2}>
                                <Chip label="Select The Date" />
                            </Stack>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        minDate={dayjs()}
                                        dayOfWeekFormatter={dayOfWeekFormat}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>

                        {/* PRIORITY FIELD */}
                        <div className='priority'>
                            <Autocomplete
                                id="priority-select-demo"
                                sx={{ width: 260 }}
                                options={test}
                                autoHighlight
                                getOptionLabel={optionLabel}
                                renderOption={(props, option) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        <img
                                            loading="lazy"
                                            width="20"
                                            srcSet={icons[option.code - 1]}
                                            src={icons[option.code - 1]}
                                            alt=""
                                        />
                                        {option.label}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select The Priority"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        </div>

                        {/* CATEGORY SECTION */}
                        <div className='category'>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel variant="standard" htmlFor="category-select">
                                        Category
                                    </InputLabel>
                                    <NativeSelect
                                        defaultValue=""
                                        inputProps={{
                                            name: 'category',
                                            id: 'category-select',
                                        }}
                                    >
                                        <option value="Study">Study</option>
                                        <option value="Work">Work</option>
                                        <option value="Meeting">Meeting</option>
                                        <option value="Travel">Travel</option>
                                    </NativeSelect>
                                </FormControl>
                            </Box>
                        </div>

                        {/* DESCRIPTION SECTION */}
                        <div className='description'>
                            <Box
                                component="form"
                                sx={{ minWidth: 200 }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="standard-basic" label="Description" variant="standard" fullWidth />
                            </Box>
                        </div>
                        <Button variant="contained" id='addTaskBtn'>Add Task</Button>
                    </div>
                    <div className='col-2'>

                        <div className='row' id='dayTaskLabel'> <h1>Today Task</h1></div>
                    </div>

                    <div className='col-6'>
                        <div className='scrollable-table'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Key</th>
                                        <th scope="col">Priority</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {Array.from({ length: 25 }, (_, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>Wash Car and after going to the grocery and buy some foods </td>
                                            <td>Pending</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-1">
                        <div className='profileIcon'>
                            <button id='profileBtn'>
                                <img src={Icon01} className="rounded-circle" alt="Profile Icon" />
                                <div className='profile-container'>
                                    <h1 id='userName' >Hey Dilum</h1>
                                    <h5 id='userEmail'>vishwadilum91@gmail.com</h5>
                                    <span></span>
                                    <button type="button" className="btn btn-outline-dark">Log Out ):</button>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='second-container'>
                <div className='container p-1 my-1 border'>
                    <div className='row'>
                        <div className='col-10'>
                            <div className='scrollable-table'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Key</th>
                                            <th scope="col">Priority</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {Array.from({ length: 25 }, (_, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>Wash Car and after going to the grocery and buy some foods </td>
                                                <td>2024-07-22</td>
                                                <td>Pending</td>
                                                <div className="dropdown">
                                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                                            Status
                                                        </button>
                                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                            <li><button className="dropdown-item" type="button" id='pendingDropDown'>Pending</button></li>
                                                            <li><button className="dropdown-item" type="button" id='onProjectDropDown' >On Project</button></li>
                                                            <li><button className="dropdown-item" type="button" id='compltedDropDown' >Complted</button></li>
                                                        </ul>
                                                    </div>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-2'>
                            <button className='btn btn-outline-warning' id='workingBtn'>On Workinng</button>
                            <button className='btn btn-outline-success' id='complteBtn'>Completed</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
