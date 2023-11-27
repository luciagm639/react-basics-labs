import './App.css';
import Task from './components/Task';
import AddTaskForm from './components/Form';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { getTasks, addTask, deleteTask, updateTask } from "./api/tasky-api";

function App() {
  const [taskState, setTaskState] = useState({ tasks: [] });

  useEffect(() => {
    getTasks().then(tasks => {
      setTaskState({ tasks: tasks });
    });
  }, []);


  const [formState, setFormState] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "Low"
  });

  const doneHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    tasks[taskIndex].done = !tasks[taskIndex].done;
    updateTask(tasks[taskIndex]);
    setTaskState({ tasks });
  }

  const deleteHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    const id = tasks[taskIndex]._id;
    tasks.splice(taskIndex, 1);
    deleteTask(id);
    setTaskState({ tasks });
  }

  const formChangeHandler = (event) => {
    let form = { ...formState };

    switch (event.target.name) {
      case "title":
        form.title = event.target.value;
        break;
      case "description":
        form.description = event.target.value;
        break;
      case "priority":
        form.priority = event.target.value;
        break;
      case "deadline":
        form.deadline = event.target.value;
        break;
      default:
        form = formState;
    }
    setFormState(form);
    console.log(formState);
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const tasks = taskState.tasks ? [...taskState.tasks] : [];
    const form = { ...formState };
    const newTask = await addTask(form);
    tasks.push(newTask);
    setTaskState({ tasks });
  }

  return (
    <div className="container">
      {/* App Header */}
      <Container maxWidth="md" component="main">
        {taskState.tasks ? (
          <Grid container spacing={5} alignItems="flex-top" justifyContent="center">
            {taskState.tasks.map((task, index) => (
              <Task
                title={task.title}
                description={task.description}
                deadline={task.deadline}
                done={task.done}
                priority={task.priority}
                key={task._id}
                markDone={() => doneHandler(index)}
                deleteTask={() => deleteHandler(index)}
              />
            ))}
          </Grid>
        ) : (
          <p>No Tasks to do - have a cup of tea and a biscuit!</p> // You can render a placeholder or a message if the array is empty
        )}
      </Container>
      {/* End App Header */}

      {/* Task Card Grid */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-top" justifyContent="center">
          {taskState.tasks.map((task, index) => (
            <Task
              title={task.title}
              description={task.description}
              deadline={task.deadline}
              priority={task.priority}
              done={task.done}
              key={task.id}
              markDone={() => doneHandler(index)}
              deleteTask={() => deleteHandler(index)}
            />
          ))}
        </Grid>
      </Container>
      {/* End Task Card Grid */}

      {/* Footer - Add Task Form */}
      <Container
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          my: 6,
          py: 6,
        }}
      >
        <Grid container justifyContent="center">
          <AddTaskForm submit={formSubmitHandler} change={formChangeHandler} />
        </Grid>
      </Container>
      {/* End Footer */}

    </div>
  );
}

export default App;
