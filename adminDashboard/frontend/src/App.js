import React from "react";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import SideNav from "./components/SideNav/SideNav";
import AddRoomType from "@components/AddRoomType/AddRoomType";
import AddRoom from "@components/AddRoom/AddRoom";
import { useState } from "react";

const components = [AddRoomType, AddRoom];

const App = () => {
  const [index, setIndex] = useState(0);
  let Component = components[index];
  return (
    <div style={({ height: "100vh" }, { display: "flex" })}>
      <SideNav index={index} setIndex={setIndex} />
      {<Component />}
    </div>
  );
};

export default App;
