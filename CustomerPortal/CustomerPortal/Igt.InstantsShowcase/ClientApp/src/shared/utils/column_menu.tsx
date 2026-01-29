import React, { FunctionComponent } from "react";
import {
  GridColumnMenuFilter,
  GridColumnMenuCheckboxFilter,
  GridColumnMenuProps,
} from "@progress/kendo-react-grid";

export const ColumnMenu = (props: any, expanded = true) => {
  return (
    <div>
      <GridColumnMenuFilter {...props} expanded={expanded} />
    </div>
  );
};

// export const ColumnMenuCheckboxFilter = (props: GridColumnMenuProps, expanded = true) : FunctionComponent<GridColumnMenuProps> => {
//   return 
//       <GridColumnMenuCheckboxFilter {...props} />
// };
