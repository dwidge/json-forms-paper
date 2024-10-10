import React, { FC } from "react";
import {
  CellProps,
  isBooleanControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core";
import { withJsonFormsCellProps } from "@jsonforms/react";
import { Checkbox } from "react-native-paper"; // Updated import
import type { VanillaRendererProps } from "../index";
import { withVanillaBooleanCellProps } from "../util/index";

export const BooleanCell: FC<CellProps> = (
  props: CellProps & VanillaRendererProps
) => {
  const { data, id, enabled, uischema, path, handleChange } = props;

  return (
    <Checkbox
      status={data ? "checked" : "unchecked"}
      onPress={() => handleChange(path, !data)}
      // id={id}
      disabled={!enabled}
    />
  );
};

/**
 * Default tester for boolean controls.
 * @type {RankedTester}
 */
export const booleanCellTester: RankedTester = rankWith(2, isBooleanControl);

export default withJsonFormsCellProps(
  withVanillaBooleanCellProps(BooleanCell)
) as typeof BooleanCell;
