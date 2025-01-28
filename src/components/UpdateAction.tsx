import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, Save } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { UpdateTodo } from '../services/TodoService';
import { transformApiResponseToToDoList } from '../types/todo';

//@ts-ignore
export const UpdateAction = ({ params, rowId, setRowId,setTodoList,setErrorMessage,setSuccessMessage }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
 
  const handleSubmit = async () =>{
      setLoading(true);
    try {
      const result = await UpdateTodo(params.row);
      if (result.status === 200) {
        setTodoList(transformApiResponseToToDoList(result.data))     
    } 
    setSuccessMessage('Successfully Updated!!!');
    setSuccess(true);
    setLoading(false);
    setRowId(null);
    } catch (error:any) {
      console.log(error);
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
  //  console.log(params.row.Id,rowId);
  console.log(params);
    console.log(params.id,rowId);

    console.log(success)
    
      if (rowId === params.id && success) {
        setSuccess(false);
      }
    
  }, [rowId]);
  return (
    <Box
    sx={{
      m: 1,
      position: 'relative',
    }}
  >
    {success ? (
      <Fab
        color="primary"
        sx={{
          width: 40,
          height: 40,
          bgcolor: green[500],
          '&:hover': { bgcolor: green[700] },
        }}
      >
        <Check />
      </Fab>
    ) : (
      <Fab
        color="primary"
        sx={{
          width: 40,
          height: 40,
        }}
        disabled={params.id !== rowId ||loading}
        onClick={handleSubmit}
      >
        <Save />
      </Fab>
    )}
    {loading && (
      <CircularProgress
        size={52}
        sx={{
          color: green[500],
          position: 'absolute',
          top: -6,
          left: -6,
          zIndex: 1,
        }}
      />
    )}
  </Box>
  )
}
