import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material'
import { DataGrid, GridCellEditCommitParams, gridClasses, GridColDef } from '@mui/x-data-grid'
import { Category, Priority, ToDoList, transformApiResponseToToDoList } from '../types/todo'
import { useEffect, useState } from 'react';
import { grey } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import { UpdateAction } from '../components/UpdateAction';

import { useNavigate } from 'react-router-dom';
import {  DeleteTodo, GetTodo } from '../services/TodoService';
import Create from '../components/Create';



const TodoList = () => {
  const navigate = useNavigate();
    const [open,openchange]=useState(false);
      const [loading,SetLoading] = useState(false);
      const [rowId,setRowId] = useState<number| null>(null);
      const [todoList, setTodoList] = useState<ToDoList[]>([]);
      const [errorMessage, setErrorMessage] = useState<string|null>(null);
   const [successMessage, setSuccessMessage] = useState<string|null>(null);

      useEffect(()=>{
        if(!localStorage.getItem('token')){
          navigate('/login');
        }

        const fetchData = async () => {
          try {
            const response = await GetTodo();
            
            if(response.status === 200){
             console.log(response.data);
             const data = transformApiResponseToToDoList(response.data);
             console.log(data);
               setTodoList(data);
            }
          } catch (error:any) {
              setErrorMessage(error.message)
          }
        }   
        fetchData()

      },[])
     

      const todoListColumns: GridColDef[] = [
       
        {
          field: "Message",
          headerName: "Todo Lists",
          flex:1,
          editable:true
        },
        {
          field: "Priority",
          headerName: "Priority",
          width: 100,
          type: "singleSelect",
          valueOptions: Object.values(Priority),
          cellClassName: (params) => {
            switch (params.value) {
              case Priority.High:
                return "priority-high";
              case Priority.Medium:
                return "priority-medium";
              case Priority.Low:
                return "priority-low";
              default:
                return "";
            }
          },editable:true
        },
        {
          field: "Category",
          headerName: "Category",
          width: 100,
          type: "singleSelect",
          valueOptions: Object.values(Category),
          editable:true
        },
        // setRowId,setDone,data,setSuccessMessage,setErrorMessage,clickrow
        {field: 'Action',headerName:'Action',width:100 , renderCell: (params) => (
            <UpdateAction {...{ params, rowId, setRowId,setTodoList,setErrorMessage,setSuccessMessage }} />
          )},
        {
            field: 'delete',
            headerName: 'Delete',
            sortable: false,
            width: 100,
            renderCell: (params) => 
              <>
              { loading ? (
                <CircularProgress
                />
              ):(<DeleteIcon onClick={() => handleDelete(params.row)}
              style={{ color: 'red' }}
              />)}
              </>
            
          }
      ];
    


      const handleDelete =async (data:any) => {
        console.log(data.id);
        SetLoading(true);
        try {
          
          const result = await DeleteTodo(data.id);
          if (result.status === 200) {
            console.log(result.data);
            console.log(transformApiResponseToToDoList(result.data))
            
            setTodoList(transformApiResponseToToDoList(result.data))
            
            setSuccessMessage('Deleted Successfully!');
              SetLoading(false);
            
        } 
      
    }catch (error: any) {
      console.log(error);
        setErrorMessage(error.message);
        SetLoading(false);
      }

      };

     

      const handleLogout=()=>{
        localStorage.clear();
        navigate('/login');
    }
   
  return (
   <>
   {errorMessage && (
        <Alert severity="error" onClose={()=>setErrorMessage(null)}>
          {errorMessage}
        </Alert>)}
        {successMessage && (
        <Alert severity="success" onClose={()=>setSuccessMessage(null)}>
          {successMessage}
        </Alert>)}
   <Create {...{setTodoList,setSuccessMessage,setErrorMessage,open,openchange}}/>
   <Box
     sx={{
      height: "72vh",
      width: "60%",
     // display: "flex", // Enable flexbox
      justifyContent: "center", // Center horizontally
      alignItems: "center", // Center vertically
      margin: "0 auto", // Center the Box itself horizontally in its container
    //  backgroundColor: "#f5f5f5", // Optional: Add a background to visualize the box
    }}
    >
        <div style={{    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:30,
    marginBottom:15
    }}>

         <Button onClick={()=>openchange(true)} variant="contained" color="primary">
          Create TodoList
        </Button>
        
        <Typography
        variant='h3'
        component='h3'
        sx={{textAlign:'center',mt:3,mb:3}}
        >
            TodoList
        </Typography>
        <Button onClick={handleLogout} variant="contained" color="secondary">
          Logout
        </Button>
        
            </div>
        <DataGrid
        rows={todoList}
        columns={todoListColumns}
       // paginationModel={paginationModel}
       
       onCellEditCommit={(params :GridCellEditCommitParams) => setRowId(params.id as number)}
     //  processRowUpdate={handleProcessRowUpdate
      // onPaginationModelChange={setPaginationModel}
     //   rowsPerPageOptions={[10, 15, 20]} // Available page size options
        getRowSpacing={
            p =>({
                top:p.isFirstVisible ?0:5,
                bottom:p.isLastVisible ?0:5
            })
        }
        sx={{
            "& .MuiDataGrid-cell": {
                border: "none",  // Remove cell borders
            },
            "& .MuiDataGrid-columnHeaders": {
                borderBottom: "none",  // Remove column header border
            },
            "& .MuiDataGrid-row": {
                borderBottom: "none",  // Remove row bottom borders
            },
            "& .MuiDataGrid-viewport": {
                border: "none",  // Remove overall viewport border
            },
            [`& .${gridClasses.row}`]:{
                bgcolor: grey[200]
            },
        }}
        />
   </Box>
        </>
  )
}

export default TodoList