import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";

const SideNav = ({ index, setIndex }) => {
  const { collapseSidebar } = useProSidebar();
  let items = ["Room type", "New room"];

  const changeItem = (ind) => {
    setIndex(ind);
  };

  return (
    <Sidebar style={{ height: "100vh" }}>
      <Menu>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            collapseSidebar();
          }}
          style={{ textAlign: "center" }}
        >
          {" "}
          <h2>
            <Typography sx={{ fontFamily: "times new roman" }}>
              Hotel Plaza
            </Typography>
          </h2>
        </MenuItem>
        {items.map((item, ind) => (
          <MenuItem icon={<AddIcon />} onClick={() => changeItem(ind)}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </Sidebar>
  );
};

export default SideNav;
