import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

export default function Outer() {
  return (
    <div>
      <Tooltip title="Add" arrow>
        {/* <Button>Arrow</Button> */}
        <Button>Arrow</Button>
      </Tooltip>
    </div>
  );
}

// custom component > button 
// const Button = (props) => {
//   return (
//     <div> {props[0]}
//     </div>
//   )
// }
