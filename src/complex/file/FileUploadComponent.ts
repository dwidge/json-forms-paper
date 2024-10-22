// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { FileMeta } from "./FileMeta.js";

export type State<T> = [T, React.Dispatch<T>?];

export type FileUploadComponent = ({
  file,
  allowedMimeTypes,
  maxSize,
}: {
  file?: State<FileMeta | null | undefined> | undefined;
  allowedMimeTypes?: string[] | undefined;
  maxSize?: number | undefined;
}) => React.JSX.Element;
