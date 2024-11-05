// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { OptionalState } from "../../util/State";

export type SignatureData = {
  id?: string;
  size?: number | null;
  mime?: string | null;
  timestamp?: number;
};

export type SignatureComponent = ({
  data,
  options,
}: {
  data?: OptionalState<SignatureData | null>;
  options?: {};
}) => React.JSX.Element;
