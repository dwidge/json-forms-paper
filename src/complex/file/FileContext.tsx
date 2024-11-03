// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { createContext } from "react";
import { Text, View } from "../../styles/components.js";
import { FileControlComponent } from "./FileType.js";

export const FileControlContext = createContext<FileControlComponent>(
  ({ data, options }) => (
    console.log(
      "FileControlContextW1: Please wrap App with FileControlContext.Provider",
    ),
    (
      <View>
        <Text>File</Text>
        <Text>data: {JSON.stringify(data?.[0] ?? null)}</Text>
        <Text>options: {JSON.stringify(options ?? null)}</Text>
      </View>
    )
  ),
);
