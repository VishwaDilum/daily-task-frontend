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
import './left-side.css';
import Autocomplete from '@mui/material/Autocomplete';
import Icon01 from '../assets/redcircle.png'
import Icon02 from '../assets/greencircle.png'
import Icon03 from '../assets/yellowcircle.png'
import Button from '@mui/material/Button';
import {} from '../cascade/left-side.css';

// JS SECTION
function LeftSide() {
    interface CountryType {
        code: number;
        label: string;
        phone: string;
        suggested?: boolean;
    }
    const test: readonly CountryType[] = [
        { code: 1, label: 'Prioroty', phone: '0703' },
        { code: 2, label: 'Prioroty', phone: '0703' },
        { code: 3, label: 'Prioroty', phone: '0703' }
    ]

    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const handleDateChange = (newDate: Dayjs | null) => {
        setSelectedDate(newDate);
    };

    const dayOfWeekFormat = (date: any) => {
        return date.format('ddd').charAt(0).toUpperCase();
    };

    const icons = [Icon01, Icon02, Icon03];
    const optionLabel = ((option: any) => option.code);
    // CLOSE JS SECTION



    // HTML SECTION

    return (
        <div className='container'>
            <div className='calendar'>
                <Stack direction="row" spacing={30}>
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
                    id="country-select-demo"
                    sx={{ width: 260 }}
                    options={test}
                    autoHighlight
                    getOptionLabel={optionLabel}
                    renderOption={(props: any, option: any) => (
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
                            label="Select The Prority"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )
                    }
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
                            defaultValue={30}
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

            <div className='buttonClass'>
            <Stack spacing={2} direction="row">
                <Button variant="contained">Add Task</Button>
            </Stack>
            </div>

        </div>
    );
}

export default LeftSide;

