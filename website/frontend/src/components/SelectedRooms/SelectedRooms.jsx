import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import useUpdateSelectedRooms from "../../hooks/useUpdateSelectedRooms.js";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";
const SelectedRooms = ({
  rooms,
  selectedRooms,
  setSelectedRooms,
  nights,
  date,
}) => {
  const sum = selectedRooms.reduce((acc, selectedRooms) => {
    console.log(selectedRooms);
    const total = selectedRooms.totalAfterDiscount
      ? selectedRooms.totalAfterDiscount
      : selectedRooms.total;
    return acc + total;
  }, 0);

  useUpdateSelectedRooms(rooms, setSelectedRooms);
  return (
    <Box
      sx={{
        bgcolor: "white",
        border: "2px solid #c6ceda",
        borderRadius: "5px",
        height: "fit-content",
      }}
    >
      <Box>
        <Typography
          variant="h6"
          component="h6"
          sx={{
            textAlign: "left",
            padding: "20px",
            fontWeight: "bold",
          }}
        >
          EGY {sum} total
        </Typography>
        <Box
          sx={{
            paddingTop: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="p"
            component="p"
            sx={{
              textAlign: "left",
              padding: "20px",
              fontFamily: "sans-serif",
            }}
          >
            {date.checkIn.format("DD MMM YYYY")} -{" "}
            {date.checkOut.format("DD MMM YYYY")}
          </Typography>
          <Typography
            variant="p"
            component="p"
            sx={{ padding: "20px", textAlign: "right" }}
          >
            {nights} nights
          </Typography>
        </Box>
        <Typography
          variant="p"
          component="p"
          sx={{
            textAlign: "left",
            margin: "0px 20px",
            padding: "10px 0px",
            fontFamily: "sans-serif",
            borderBottom: "1px solid #c6ceda",
          }}
        >
          {selectedRooms.length} {selectedRooms.length > 1 ? "rooms" : "room"}{" "}
          selected
        </Typography>

        {selectedRooms &&
          selectedRooms.map((room) => {
            return (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="p"
                    component="p"
                    sx={{
                      textAlign: "left",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      color: "#333",
                      marginBottom: "20px",
                    }}
                  >
                    {room.roomtype}
                    {room.offerName ? " - " + room.offerName : ""}
                  </Typography>
                  <Typography
                    variant="p"
                    component="p"
                    sx={{
                      textAlign: "right",

                      padding: "10px 0px",
                      color: "#333",
                      marginBottom: "20px",
                    }}
                  >
                    x{room.count}
                  </Typography>
                  <DeleteOutlineIcon
                    onClick={() => {
                      setSelectedRooms((prev) =>
                        prev.filter(
                          (prevRoom) => prevRoom.roomtypeId !== room.roomtypeId
                        )
                      );
                    }}
                    sx={{ cursor: "pointer", padding: "10px 20px" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #c6ceda",
                    margin: "0px 20px",
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "left",
                      paddingLeft: "0px",
                      fontSize: "1em",
                      color: "#717171",
                    }}
                  >
                    {room.capacity} guests, {nights}{" "}
                    {nights > 1 ? "nights" : "night"}
                  </Typography>
                  <Typography
                    sx={{
                      padding: "0px 20px",
                    }}
                  >
                    EGY{" "}
                    {room.totalAfterDiscount
                      ? room.totalAfterDiscount
                      : room.total}
                  </Typography>
                </Box>
              </Box>
            );
          })}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0px 20px",
        }}
      >
        <Typography
          variant="p"
          component="p"
          sx={{
            textAlign: "left",
            padding: "10px 0px",
            color: "#333",
            fontWeight: "bold",
            fontSize: "1.3em",
          }}
        >
          Total
        </Typography>
        <Typography
          sx={{
            padding: "10px 20px",
            fontSize: "1.3em",
            color: "#333",
            fontWeight: "bold",
            paddingLeft: "0px",
          }}
        >
          EGY {sum}
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            textAlign: "left",
            padding: "0px 20px",
            color: "#717171",
            marginBottom: "20px",
            fontSize: "0.8em",
          }}
        >
          Included Taxes + Fees
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Button
          sx={{ cursor: "pointer" }}
          variant="contained"
          size="large"
          disabled={selectedRooms.length === 0}
        >
          Book
        </Button>
      </Box>
    </Box>
  );
};

export default SelectedRooms;
