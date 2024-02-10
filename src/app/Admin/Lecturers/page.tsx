// import LecturerList from "./components/LecturerList";
// import Navbar from "./components/Navbar";

// export default function Lecturers() {
//   return (<div className="flex flex-col w-full mx-auto">
//     <Navbar />
//     <LecturerList />
//     </div>);
// }

"use client";
import React, { useEffect, useState } from "react";   
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import axios from "axios";
import Header from "../Header/page";
import Footer from "../Footer/page";
import { TextField } from "@mui/material";

const roles = ["Lesson", "HOD", "Development"];
const randomRole = () => {
  return randomArrayItem(roles);
};

const API_URL = "/api/users/lecturer";

const initialRows: GridRowsProp = [
  // {
  //   id: _id,
  //   name: randomTraderName(),
  //   age: 25,
  //   joinDate: randomCreatedDate(),
  //   role: randomRole(),
  // },
  // {
  //   id: randomId(),
  //   name: randomTraderName(),
  //   age: 36,
  //   joinDate: randomCreatedDate(),
  //   role: randomRole(),
  // },
  // {
  //   id: randomId(),
  //   name: randomTraderName(),
  //   age: 19,
  //   joinDate: randomCreatedDate(),
  //   role: randomRole(),
  // },
  // {
  //   id: randomId(),
  //   name: randomTraderName(),
  //   age: 28,
  //   joinDate: randomCreatedDate(),
  //   role: randomRole(),
  // },
  // {
  //   id: randomId(),
  //   name: randomTraderName(),
  //   age: 23,
  //   joinDate: randomCreatedDate(),
  //   role: randomRole(),
  // },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    employeeNumber: '',
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: event.target.value,
    }));
  };

  const handleClick = async () => {
    try {
      // Validate your form data if needed

      const response = await axios.post(API_URL, formData);

      const newLecturer = response.data;

      setRows((oldRows) => [
        ...oldRows,
        {
          ...newLecturer,
          isNew: true,
        },
      ]);

      setRowModesModel((oldModel) => ({
        ...oldModel,
        [newLecturer._id]: {
          mode: GridRowModes.Edit,
          fieldToFocus: 'firstname',
        },
      }));
    } catch (error: any) {
      console.error('Error creating lecturer:', error.message);
    }
  };

  return (
    <GridToolbarContainer>
      {/* Assuming you have form input fields */}
      <TextField
        label="First Name"
        value={formData.firstname}
        onChange={handleInputChange('firstname')}
      />
      <TextField
        label="Last Name"
        value={formData.lastname}
        onChange={handleInputChange('lastname')}
      />
      <TextField
        label="Email"
        value={formData.email}
        onChange={handleInputChange('email')}
      />
      <TextField
        label="Password"
        value={formData.password}
        onChange={handleInputChange('password')}
      />
      <TextField
        label="Emp Number"
        value={formData.employeeNumber}
        onChange={handleInputChange('employeeNumber')}
      />
      {/* Add other input fields as needed */}

      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  React.useEffect(() => {
    // Fetch lecturers when the component mounts
    const fetchLecturers = async () => {
      try {
        const response = await axios.get(API_URL);
        const lecturers = response.data;
        setRows(lecturers);
      } catch (error) {
        console.error("Error fetching lecturers:", error);
      }
    };

    fetchLecturers();
  }, []);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => async () => {
    try {
      // Assuming you want to fetch additional data before entering edit mode
      const response = await axios.get(`${API_URL}/${id}`);

      setRows((oldRows) => {
        const updatedRows = oldRows.map((row) =>
          row._id === id ? { ...row, ...response.data, isNew: false } : row
        );
        return updatedRows;
      });

      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    } catch (error) {
      console.error("Error fetching lecturer for edit:", error);
    }
  };

  const handleSaveClick = (id: GridRowId) => async () => {
    try {
      const updatedRow = await axios.post(`${API_URL}/${id}`, {
        // Assuming you have the updated data available in the row
        firstname: rows.find((row) => row._id === id)?.firstname || "",
        lastname: rows.find((row) => row._id === id)?.lastname || "",
        email: rows.find((row) => row._id === id)?.email || "",
        password: rows.find((row) => row._id === id)?.password || "",
        isVerified: rows.find((row) => row._id === id)?.isVerified || false,
        employeeNumber:
          rows.find((row) => row._id === id)?.employeeNumber || "",
      });

      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      processRowUpdate(updatedRow.data);
    } catch (error) {
      console.error("Error updating lecturer:", error);
    }
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setRows(rows.filter((row) => row._id !== id));
    } catch (error) {
      console.error("Error deleting lecturer:", error);
    }
  };

  const handleCancelClick = (id: GridRowId) => async () => {
    try {
      const editedRow = rows.find((row) => row._id === id);

      if (editedRow) {
        if (editedRow.isNew) {
          // If it's a newly added row that is canceled, delete it from the server
          await axios.delete(`${API_URL}/${id}`);
        }

        // Update local state to remove the canceled row
        setRows((oldRows) => oldRows.filter((row) => row._id !== id));
      }

      // Set the row mode to view and ignore modifications
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    } catch (error) {
      console.error("Error handling cancel:", error);
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "FirstName", width: 180, editable: true },
    { field: "lastname", headerName: "LastName", width: 180, editable: true },
    {
      field: "employeeNumber",
      headerName: "EmployeeNumber",
      type: "number",
      width: 200,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
      editable: true,
    },
    {
      field: "password",
      headerName: "Password",
      width: 180,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 80,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
      className="bg-white flex-col justify-center pt-24 w-full mx-auto"
    >
      <Header category="Page" title="Lecturers" />
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
      <Footer />
    </Box>
  );
}
