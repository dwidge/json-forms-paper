// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import {
  and,
  CellProps,
  optionIs,
  RankedTester,
  rankWith,
  schemaMatches,
  StatePropsOfControlWithDetail,
} from "@jsonforms/core";
import {
  withJsonFormsCellProps,
  withJsonFormsDetailProps,
} from "@jsonforms/react";
import { merge } from "lodash";
import React, { useContext } from "react";
import { View } from "../../styles/components.js";
import { GpsControlContext } from "./GpsContext.js";
import { GpsControlComponent } from "./GpsType.js";
import { LabelError } from "../../util/LabelError.js";

const GpsRenderer = ({
  data,
  label,
  required,
  errors,
  path,
  handleChange,
  schema,
  config,
  uischema,
  Component = useContext(GpsControlContext),
  appliedUiSchemaOptions = merge({}, config, uischema.options),
  className = "gps-control " + appliedUiSchemaOptions.className,
}: StatePropsOfControlWithDetail &
  CellProps & {
    Component: GpsControlComponent;
    appliedUiSchemaOptions?: Record<string, any>;
    className?: string;
  }) => (
  <View className={className + " container"}>
    <LabelError
      className={className}
      label={label}
      errors={errors}
      required={required}
      hideRequiredAsterisk={appliedUiSchemaOptions.hideRequiredAsterisk}
    />
    <Component
      data={[
        data ?? null,
        (newData) => handleChange(path, newData ?? undefined),
      ]}
      options={schema.properties}
    />
  </View>
);

export const gpsRendererTester: RankedTester = rankWith(
  3,
  and(
    optionIs("control", "gps"),
    schemaMatches(
      (schema) =>
        !!(
          schema.type === "object" &&
          schema.properties &&
          schema.properties.coords &&
          schema.properties.timestamp
        ),
    ),
  ),
);

export default withJsonFormsDetailProps(
  withJsonFormsCellProps(GpsRenderer as any) as any,
) as typeof GpsRenderer;
