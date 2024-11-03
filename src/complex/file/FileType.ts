// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { OptionalState } from "../../util/State";

export type FileData = {
  id: string;
  size?: number | null;
  mime?: string | null;
};

export type FileControlComponent = ({
  data,
  options,
}: {
  data?: OptionalState<FileData | null>;
  options?: {
    mime?: { enum?: string[] };
    size?: { maximum?: number };
  };
}) => React.JSX.Element;
