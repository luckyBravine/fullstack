"use client"
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from '../Header/page';
import Footer from '../Footer/page';
import axios from "axios";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";

const defaultTheme = createTheme();

const getUsers = async () => {
  try {
    const response = await axios.get("/api/users/signup");
    toast.success('User exists');
    return response.data;
  } catch (error: any  ) {
    console.error("Failed to fetch users", error.message);
    toast.error(error.message);
    return [];
  }
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "userName", headerName: "Username", width: 150, editable: true },
  { field: "email", headerName: "Email", width: 150, editable: true },
  { field: "course", headerName: "Course", type: "number", width: 150, editable: true },
  { field: "yearOfStudy", headerName: "Year of Study", type: "number", width: 150, editable: true },
  { field: "regNumber", headerName: "Registration Number", type: "number", width: 150, editable: true },
];

export default function Student() {
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>

    <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100%",
          overflow: "auto",
          flexDirection: "column",
          width: "80%"
        }}
        className="bg-white flex-col justify-center pt-24 w-full mx-auto"
      >
        <Header category="Page" title="Students" />
        <DataGrid
          rows={ users }
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
        <Footer />
      </Box>
      
    </ThemeProvider>
  );
}
