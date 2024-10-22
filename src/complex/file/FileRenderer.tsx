// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import {
  CellProps,
  RankedTester,
  rankWith,
  schemaMatches,
  StatePropsOfControlWithDetail,
} from "@jsonforms/core";
import { withJsonFormsCellProps } from "@jsonforms/react";
import { withJsonFormsDetailProps } from "@jsonforms/react";
import { FileMeta } from "./FileMeta.js";
import { FileUploadComponent } from "./FileUploadComponent.js";
import { createContext, useContext } from "react";
import { Text } from "../../styles/components.js";

export const FileRendererContext = createContext<FileUploadComponent>(() => (
  <Text>{`<FileRendererContext value={()=><></>}></FileRendererContext>`}</Text>
));

const FileRenderer = ({
  data,
  path,
  handleChange,
  schema,
  FileUpload = useContext(FileRendererContext),
}: StatePropsOfControlWithDetail &
  CellProps & { FileUpload: FileUploadComponent }) => (
  <FileUpload
    file={[
      data ?? null,
      (fileMeta: FileMeta | null | undefined) =>
        handleChange(path, fileMeta ?? undefined),
    ]}
    allowedMimeTypes={schema.properties?.mime?.enum || []}
    maxSize={schema.properties?.size?.maximum}
  />
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
