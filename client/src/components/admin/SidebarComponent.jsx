import React, { useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import Movies from "./Movies";
import Theatre from "./Theatre";
import CreatePost from "./CreatePost";
// import Category from "./category/Category";
// import ProductTable from "./products/ProductTable";
// import Welcome from "./Welcome";

function SidebarComponent() {
  const [activeComponent, setActiveComponent] = useState("Movies");

  const handleItemClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const componentMap = {
    Movies: <CreatePost />,
    Theatre: <Theatre />,
    // Products: <ProductTable />,
  };

  return (
    <>
     <div className="flex flex-col lg:flex-row">
      <Sidebar aria-label="Default sidebar example w-16">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              className={`cursor-pointer  ${
                activeComponent === "Movies" ? "bg-yellow-100" : ""
              }`}
              icon={HiChartPie}
              onClick={() => handleItemClick("Movies")}
            >
              Movies
            </Sidebar.Item>

            <Sidebar.Item
              onClick={() => handleItemClick("Theatre")}
              isactive={activeComponent === "Theatre" ? "true" : "false"}
              icon={HiViewBoards}
              labelColor="dark"
              className={`cursor-pointer ${
                activeComponent === "Theatre" ? "bg-yellow-100" : ""
              }`}
            >
              Theatre
            </Sidebar.Item>

            {/* <Sidebar.Item
              className={`cursor-pointer ${
                activeComponent === "Products" ? "bg-yellow-100" : ""
              }`}
              onClick={() => handleItemClick("Products")}
              isactive={activeComponent === "Products" ? "true" : "false"}
              icon={HiInbox}
            >
              Products
            </Sidebar.Item> */}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      <div className="flex-grow p-4">
        {activeComponent === "Movies" && componentMap.Movies}
        {activeComponent === "Theatre" && componentMap.Theatre}
        {activeComponent !== "Movies" && activeComponent !== "Theatre" && componentMap[activeComponent]}
      </div>
      </div>
    </>
  );
}

export default SidebarComponent;
