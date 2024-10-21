import React from "react";
import {
  CellProps,
  isDateControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core";
import { withJsonFormsCellProps } from "@jsonforms/react";
import { VanillaRendererProps, withVanillaCellProps } from "../util/index.js";
import { TextInput } from "../styles/components.js";

export const DateCell = (props: CellProps & VanillaRendererProps) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;

  return (
    <TextInput
      mode="outlined"
      value={data || ""}
      onChangeText={(value) => {
        handleChange(path, value === "" ? undefined : value);
      }}
      className={className}
      testID={id}
      disabled={!enabled}
      onFocus={() => uischema.options && uischema.options.focus}
    />
  );
};

export const dateCellTester: RankedTester = rankWith(2, isDateControl);

export default withJsonFormsCellProps(
  withVanillaCellProps(DateCell),
) as typeof DateCell;
