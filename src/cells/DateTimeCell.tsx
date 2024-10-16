import React from "react";
import {
  CellProps,
  isDateTimeControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core";
import { withJsonFormsCellProps } from "@jsonforms/react";
import type { VanillaRendererProps } from "../index.js";
import { withVanillaCellProps } from "../util/index.js";
import { TextInput } from "../styles/components.js";

export const DateTimeCell = (props: CellProps & VanillaRendererProps) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;

  const toISOString = (inputDateTime: string) => {
    return inputDateTime === "" ? "" : inputDateTime + ":00.000Z";
  };

  return (
    <TextInput
      mode="outlined"
      label="Date and Time"
      value={(data || "").substr(0, 16)}
      onChangeText={(value) => handleChange(path, toISOString(value))}
      className={className}
      testID={id}
      disabled={!enabled}
      onFocus={() => uischema.options && uischema.options.focus}
    />
  );
};

export const dateTimeCellTester: RankedTester = rankWith(2, isDateTimeControl);

export default withJsonFormsCellProps(
  withVanillaCellProps(DateTimeCell)
) as typeof DateTimeCell;
