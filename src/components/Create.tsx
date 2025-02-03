import CloseIcon from "@mui/icons-material/Close";
import {  Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Stack, TextField } from '@mui/material'
import { useState } from "react";
import { Category, initialFormData, Priority, ToDoList, transformApiResponseToToDoList } from "../types/todo";
import { CreateTodo } from "../services/TodoService";

//@ts-ignore
const Create = ({setTodoList,setSuccessMessage,setErrorMessage,open,openchange}) => {
   // const [open,openchange]=useState(false);
    const [formData, setFormData] = useState<ToDoList>(initialFormData);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      const handleCreate = async () => {
        console.log("Submitted Data:", formData);
        try {
          // Call RegisterService and handle success
          const result = await CreateTodo(formData);
          if (result.status === 200) {
            setTodoList(transformApiResponseToToDoList(result.data))
            setFormData(initialFormData);
          // Redirect or do something on success, e.g., navigate to login page
        } 
        openchange(false);
     // setCount(prev=> prev+1);
      setSuccessMessage('Successfully Created!!!')
    }catch (error: any) {
      console.log(error);
        setErrorMessage(error.message);
      }
        openchange(false);
      };
  return (
    <Dialog open={open} onClose={()=>openchange(false)} fullWidth maxWidth="md">
    <DialogTitle>
      Create TodoList  
      <IconButton onClick={()=> openchange(false)} style={{ float: "right" }}>
        <CloseIcon color="primary" />
      </IconButton>  
    </DialogTitle>

    <DialogContent>
      <Stack spacing={3} margin={3}>
        <TextField
          label="Todo"
          name="Message"
          value={formData.Message}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          select
          label="Priority"
          name="Priority"
          value={formData.Priority}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {Object.values(Priority).map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Category"
          name="Category"
          value={formData.Category}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {Object.values(Category).map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </TextField>
      </Stack>
    </DialogContent>

    <DialogActions>
      <Button onClick={handleCreate} color="primary" variant="contained">Submit</Button>
      <Button onClick={()=> openchange(false)} color="error" variant="contained">Close</Button>
    </DialogActions>
  </Dialog>

  )
}

export default Create