// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { computeLabel } from "@jsonforms/core";
import React from "react";
import { Text, View } from "../styles/components.js";

export const LabelError = ({
  className = "",
  label = "",
  errors = "",
  required = false,
  hideRequiredAsterisk = false,
}) => (
  <View className={className + " label-error"}>
    {!!label && (
      <Text className={className + " label"}>
        {computeLabel(label, required ?? false, hideRequiredAsterisk)}
      </Text>
    )}
    {!!errors.length && <Text className={className + " error"}>{errors}</Text>}
  </View>
);
