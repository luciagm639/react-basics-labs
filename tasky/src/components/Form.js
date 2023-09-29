import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const AddTaskForm = (props) => {
    const priorities = [
        {
          value: 'high',
          label: 'high',
        },
        {
          value: 'medium',
          label: 'medium',
        },
        {
          value: 'low',
          label: 'low',
        }
      ];
  return (
    <div>
        <Box
            component="form"
            sx={{
                '& .MuiOutlinedInput-root': { m: 1, width: '30ch' },
            }}
            onSubmit={props.submit}
        >
            <div>
                <TextField
                required
                id="outlined-required"
                name="title"
                label="Task Title"
                InputLabelProps={{ shrink: true }}
                onChange={(event) => props.change(event)}
                />
            </div>
            <div>
                <TextField
                required
                name="deadline"
                label="Deadline"
                InputLabelProps={{ shrink: true }}
                type="date"
                onChange={(event) => props.change(event)}
                />
            </div>
            <div>
            <TextField
                id="priority"
                name="priority"
                select
                required
                label="Select"
                helperText="Please select the priority"
                onChange={(event) => props.change(event)}
            >
            {priorities.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
            </TextField>
            </div>
            <div>
                <TextField
                name="description"
                id="outlined-multiline-static"
                label="Task Details"
                InputLabelProps={{ shrink: true }}
                multiline
                rows={4}
                onChange={(event) => props.change(event)}
                />
            </div>
            <div>
                <Button 
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                    m: 1,
                    p: 1,
                    width: '95%'
                }}
                >
                    Add Task
                </Button>
            </div>
        </Box>
    </div>
  )
};

export default AddTaskForm;