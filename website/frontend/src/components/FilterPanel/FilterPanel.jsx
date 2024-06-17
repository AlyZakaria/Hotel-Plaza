import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useFilterPanel from "../../hooks/useFilterPanel";
import useGetRoomsWithCapacity from "../../hooks/useGetRoomsWithCapacity";
import { useState } from "react";

function FilterPanel({
  rooms,
  roomFilter,
  setRoomFilter,
  setRoomsTemp,
  capacityFilter,
  setCapacityFilter,
}) {
  const [roomsTypes, setRoomsTypes] = useState([]);
  const [capacity, setCapacity] = useState([]);

  useGetRoomsWithCapacity(setRoomsTypes, setCapacity);
  useFilterPanel(roomFilter, capacityFilter, rooms, setRoomsTemp);

  const handleRoomFilter = (event) => {
    if (event.target.checked) {
      setRoomFilter([...roomFilter, event.target.name]);
    } else {
      setRoomFilter(
        roomFilter.filter((roomType) => roomType !== event.target.name)
      );
    }
  };
  const handleRoomCap = (event) => {
    if (event.target.checked) {
      setCapacityFilter([...capacityFilter, event.target.name]);
    } else {
      setCapacityFilter(
        capacityFilter.filter((cap) => cap !== event.target.name)
      );
    }
  };

  return (
    <Container>
      <Typography variant="h6">FILTERS</Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Room Types</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {roomsTypes.map((roomType) => {
              return (
                <FormControlLabel
                  control={<Checkbox onChange={handleRoomFilter} />}
                  label={roomType}
                  name={roomType}
                />
              );
            })}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Capacity</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {capacity.map((cap) => {
              return (
                <FormControlLabel
                  control={<Checkbox onChange={handleRoomCap} />}
                  label={cap}
                  name={cap}
                />
              );
            })}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default FilterPanel;
