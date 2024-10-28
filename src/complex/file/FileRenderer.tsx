// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import {
  CellProps,
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
import React, { createContext, useContext } from "react";
import { Text, View } from "../../styles/components.js";
import { FileMeta } from "./FileMeta.js";
import { FileUploadComponent } from "./FileUploadComponent.js";
import { LabelError } from "./LabelError.js";

export const FileRendererContext = createContext<FileUploadComponent>(() => (
  <Text>{`<FileRendererContext value={()=><></>}></FileRendererContext>`}</Text>
));

const FileRenderer = ({
  data,
  label,
  required,
  errors,
  path,
  handleChange,
  schema,
  config,
  uischema,
  FileUpload = useContext(FileRendererContext),
  appliedUiSchemaOptions = merge({}, config, uischema.options),
  className = "file-control " + appliedUiSchemaOptions.className,
}: StatePropsOfControlWithDetail &
  CellProps & {
    FileUpload: FileUploadComponent;
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
    <FileUpload
      file={[
        data?.id ? data : null,
        (fileMeta: FileMeta | null | undefined) =>
          handleChange(path, fileMeta ?? {}),
      ]}
      allowedMimeTypes={schema.properties?.mime?.enum || []}
      maxSize={schema.properties?.size?.maximum}
    />
  </View>
);

export const fileRendererTester: RankedTester = rankWith(
  3,
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
);

export default withJsonFormsDetailProps(
  withJsonFormsCellProps(FileRenderer as any) as any,
) as typeof FileRenderer;
