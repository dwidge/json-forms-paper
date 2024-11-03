// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { createContext } from "react";
import { Text, View } from "../../styles/components.js";
import { GpsControlComponent } from "./GpsType.js";

export const GpsControlContext = createContext<GpsControlComponent>(
  ({ data, options }) => (
    console.warn(
      "GpsControlContextW1: Please wrap App with GpsControlContext.Provider",
    ),
    (
      <View>
        <Text>Gps</Text>
        <Text>data: {JSON.stringify(data?.[0] ?? null)}</Text>
        <Text>options: {JSON.stringify(options ?? null)}</Text>
      </View>
    )
  ),
);
