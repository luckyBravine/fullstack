"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../Header/page";
import Footer from "../Footer/page";
import FileUpload from "./components/file-upload";

const defaultTheme = createTheme();

export default function Timetable() {
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
          width: "80%",
        }}
        className="bg-white flex-col justify-center pt-24 w-full mx-auto"
      >
        <Header category="Page" title="Timetable" />
        <FileUpload />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
