import React from "react";
import {
  CellProps,
  isRangeControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core";
import { withJsonFormsCellProps } from "@jsonforms/react";
import type { VanillaRendererProps } from "../index.js";
import { withVanillaCellProps } from "../util/index.js";
import { Slider } from "../styles/components.js";

export const SliderCell = (props: CellProps & VanillaRendererProps) => {
  const { data, className, id, enabled, uischema, schema, path, handleChange } =
    props;

  return (
    <Slider
      className={className}
      value={data || schema.default}
      onValueChange={(value) => handleChange(path, value)}
      minimumValue={schema.minimum}
      maximumValue={schema.maximum}
      disabled={!enabled}
      aria-label={id}
      testID={id}
      onSlidingComplete={(value) => handleChange(path, value)}
    />
  );
};

export const sliderCellTester: RankedTester = rankWith(4, isRangeControl);

export default withJsonFormsCellProps(
  withVanillaCellProps(SliderCell)
) as typeof SliderCell;
