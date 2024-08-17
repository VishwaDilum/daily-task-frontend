import React, { useEffect, useState } from 'react';
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
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Today } from '@mui/icons-material';

function Home() {
    interface CountryType {
        code: number;
        label: string;
        phone: string;
        suggested?: boolean;
    }
    interface DecodedToken {
        email?: string;
        validation?: boolean;
        iat?: number;
        exp?: number;
    }




    interface task {
        date?: Date;
        id?: string;
        priority?: string;
        category?: string;
        description?: string;
        status?: string;
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // Months are zero-indexed
    const day = today.getDate();

    const formattedDate = new Date()


    const [allTask, setAllTask] = useState<task[]>([]);
    const [todayTask, setTodayTask] = useState<task[]>([]);
    const [credential, setCredential] = useState<DecodedToken>();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const [selectedpriority, setPriority] = useState<CountryType>(); // State to manage selected priority
    const [selecteddescription, setDescription] = useState(null); // State to manage selected priority


    const Today = new Date();
    Today.setHours(0, 0, 0, 0)
    useEffect(() => {
        const fetchTasks = async () => {

            console.log("Where is the day of Today " + formattedDate);

            // JWT DECODE
            const token = Cookies.get('token');
            const user: DecodedToken = jwtDecode(`${token}`); // decode your token here
            console.log(user.email);
            setCredential(user);

            const task = await fetch("http://localhost:5000/task-all", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    targetEmail: user.email,
                })

            })

            const today_task = await fetch("http://localhost:5000/today-task", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    targetEmail: user.email,
                    targetDate: formattedDate
                })
            })
            const data = await task.json();
            setAllTask(data)
            const todayData = await today_task.json();
            setTodayTask(todayData)
        }
        fetchTasks();

        let xr = allTask.filter((a) => {
            const sqas = a.date;
            //  const stgwu = new Date(sqas);

        });

        const dateString = "2024-12-01T00:00:00.000Z";
        const dateObject = new Date(dateString);

        console.log("Convert Date   " + dateObject);

    }, [])
    console.log(allTask)

    const test: readonly CountryType[] = [
        { code: 1, label: 'Priority 1', phone: '0703' },
        { code: 2, label: 'Priority 2', phone: '0703' },
        { code: 3, label: 'Priority 3', phone: '0703' }
    ];

    const dayOfWeekFormat = (date: any) => {
        return date.format('ddd').charAt(0).toUpperCase();
    };

    const icons = [Icon01, Icon02, Icon03];
    const optionLabel = (option: any) => option.code;

    function logOut() {

        Cookies.remove('token')
        window.location.reload();
    }

    function addTask() {
        console.log(selectedDate);
        console.log(selectedCategory);
        console.log(selecteddescription);
        console.log(selectedpriority);

        fetch('http://localhost:5000/add-task',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
                , body: JSON.stringify({
                    email: credential?.email,
                    date: selectedDate,
                    category: selectedCategory,
                    description: selecteddescription,
                    priority: selectedpriority?.code
                })
            }
        )
    }



    const handleDateChange = (newDate: Dayjs | null) => {
        setSelectedDate(newDate);
        // console.log(selectedDate);
    };
    const categoryHandleChange = (event: any) => {
        const value = event.target.value;
        setSelectedCategory(value);
        // console.log('Selected category:', selectedCategory); // Log the selected category
    };
    const descriptionHandleChange = (event: any) => {
        const value = event.target.value;
        setDescription(value);
        // console.log('Selected description:', description); // Log the selected category
    };

    const priorityHandleChange = (event: any, newValue: any) => {
        setPriority(newValue); // Update the state with selected value
        if (newValue) {
            // console.log('Selected priority:', priority); // Log selected priority to the console
        }
    };

    const handleRowClick = (taskId: any) => {
        // You can now handle the row click event here
        console.log(`Row with Task ID ${taskId} was clicked.`);
    };

    const handleCompltedDropDown = (taskId: any) => {
        // You can now handle the row click event here
        console.log(`Row with Task ID ${taskId} was cpomplte clicked.`);
    };

    const handleOnProjectDropDown = (taskId: any) => {
        // You can now handle the row click event here
        console.log(`Row with Task ID ${taskId} was on Going clicked.`);
    };



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
                                getOptionLabel={(option) => option.label}
                                onChange={priorityHandleChange} // Handle option change
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
                                            autoComplete: 'new-password', // Disable autocomplete and autofill
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
                                        onChange={categoryHandleChange} // Handle change event

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
                                <TextField id="standard-basic" label="Description" variant="standard" fullWidth
                                    onChange={descriptionHandleChange} />
                            </Box>
                        </div>
                        <Button variant="contained" id='addTaskBtn' onClick={addTask} >Add Task</Button>
                    </div>
                    <div className='col-2'>

                        <div className='row' id='dayTaskLabel'> <h1>Today Task</h1></div>
                    </div>

                    <div className='col-6'>
                        <div className='scrollable-table'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Task ID</th>
                                        <th scope="col">Priority</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {todayTask.length > 0 ? (
                                        todayTask.map((task: any) => (
                                            <tr
                                                key={task.Id}
                                                data-id={task.Id}  // Add unique identifier
                                                onClick={() => handleRowClick(task.Id)} // Add click handler
                                            >
                                                <th scope="row">{task.Id}</th>
                                                <td>{task.Priority}</td>
                                                <td>{task.Category}</td>
                                                <td>{task.Description}</td>
                                                <td>{dayjs(task.date).format('YYYY-MM-DD')}</td>
                                                <td>{task.status}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6}>No tasks found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div className="col-1">
                        <div className='profileIcon'>
                            <button id='profileBtn'>
                                <img src={Icon01} className="rounded-circle" alt="Profile Icon" />
                                <div className='profile-container'>
                                    <h1 id='userName' >Hey {credential?.validation}</h1>
                                    <h5 id='userEmail'>vishwadilum91@gmail.com</h5>
                                    <span></span>
                                    <button type="button" className="btn btn-outline-dark" onClick={logOut}> Log Out ):</button>
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
                                    <thead >
                                        <tr>
                                            <th scope="col">Task ID</th>
                                            <th scope="col">Priority</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {allTask.length > 0 ? (
                                            allTask.map((task: any) => (
                                                <tr
                                                    key={task.Id}
                                                    data-id={task.Id}  // Add unique identifier
                                                    
                                                >
                                                    <th scope="row">{task.Id}</th>
                                                    <td>{task.Priority}</td>
                                                    <td>{task.Category}</td>
                                                    <td>{task.Description}</td>
                                                    <td>{dayjs(task.date).format('YYYY-MM-DD')}</td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                                                Status
                                                            </button>
                                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                                <li><button className="dropdown-item" type="button" id='pendingDropDown'>Pending</button></li>
                                                                <li><button className="dropdown-item" type="button" id='onProjectDropDown' onClick={() => handleOnProjectDropDown(task.Id)} >On Project</button></li>
                                                                <li><button className="dropdown-item" type="button" id='compltedDropDown'  onClick={() => handleCompltedDropDown(task.Id)} >Complted</button></li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6}>No tasks found</td>
                                            </tr>
                                        )}
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
