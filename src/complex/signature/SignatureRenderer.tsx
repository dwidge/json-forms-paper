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
import { SignatureControlContext } from "./SignatureContext.js";
import { SignatureComponent } from "./SignatureType.js";
import { LabelError } from "../../util/LabelError.js";

const SignatureRenderer = ({
  data,
  label,
  required,
  errors,
  path,
  handleChange,
  schema,
  config,
  uischema,
  Component = useContext(SignatureControlContext),
  appliedUiSchemaOptions = merge({}, config, uischema.options),
  className = "signature-control " + appliedUiSchemaOptions.className,
}: StatePropsOfControlWithDetail &
  CellProps & {
    Component: SignatureComponent;
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

export const signatureRendererTester: RankedTester = rankWith(
  3,
  and(
    optionIs("control", "signature"),
    schemaMatches(
      (schema) =>
        !!(
          schema.type === "object" &&
          schema.properties &&
          schema.properties.id &&
          schema.properties.size &&
          schema.properties.mime
        ),
    ),
  ),
);

export default withJsonFormsDetailProps(
  withJsonFormsCellProps(SignatureRenderer as any) as any,
) as typeof SignatureRenderer;
