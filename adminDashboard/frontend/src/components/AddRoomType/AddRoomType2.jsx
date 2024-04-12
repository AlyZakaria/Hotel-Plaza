import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InputFileUpload from "@components/UploadFile/UploadFile";
import { DataGridPro, useGridApiRef } from "@mui/x-data-grid-pro";

const rows = [
  {
    id: 1,
    pricePerNight: 200,
    room_capacity: 2,
    room_view: "sea",
    type_name: "test",
    description: "test",
  },
  {
    id: 2,
    pricePerNight: 200,
    room_capacity: 2,
    room_view: "sea",
    type_name: "test",
    description: "test",
  },
  {
    id: 3,
    pricePerNight: 200,
    room_capacity: 2,
    room_view: "sea",
    type_name: "test",
    description: "test",
  },
  {
    id: 4,
    pricePerNight: 200,
    room_capacity: 2,
    room_view: "sea",
    type_name: "test",
    description: "test",
  },
  {
    id: 5,
    pricePerNight: 200,
    room_capacity: 2,
    room_view: "sea",
    type_name: "test",
    description: "test",
  },
];
const columns = [
  { field: "id", headerName: "id", width: 150 },
  { field: "pricePerNight", headerName: "pricePerNight", width: 150 },
  { field: "room_capacity", headerName: "room capacity", width: 150 },
  {
    field: "room_view",
    headerName: "room view",
    type: "singleSelect",
    valueOptions: ["sea", "pool", "nile"],
    width: 150,
  },
  { field: "type_name", headerName: "type name", width: 150 },
  { field: "description", headerName: "description", width: 150 },
  {
    field: "actions",
    headerName: "actions",
    width: 150,
    renderCell: () => <InputFileUpload />,
  },
];

const AddRoomType = () => {
  //   apiRef.current.updateRows([{ id: 1, _action: "delete" }]);
  const apiRef = useGridApiRef();
  function getRowId(row) {
    return row.id;
  }
  const [nbRows, setNbRows] = React.useState(rows.length);
  const addRow = () => {
    const rowIds = apiRef.current.getAllRowIds();
    apiRef.current.updateRows(
      rowIds.map((rowId) => ({
        id: rowId,
        pricePerNight: 200,
        room_capacity: 2,
        room_view: "sea",
        type_name: "test",
        description: "test",
      }))
    );
  };
  const removeRow = () => {};
  return (
    <div style={{ width: "100%" }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Button size="small" onClick={removeRow}>
          Remove a row
        </Button>
        <Button size="small" onClick={addRow}>
          Add a row
        </Button>
      </Stack>
      <DataGrid
        apiRef={apiRef}
        getRowId={getRowId}
        rows={rows}
        columns={columns}
      />
    </div>
  );
};

export default AddRoomType;
