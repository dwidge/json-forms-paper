// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import * as Paper from "react-native-paper";
import * as RN from "react-native";
import { withClassName } from "@dwidge/class-name-rnw";
import RNSlider from "@react-native-community/slider";
import React from "react";

const wrap = withClassName();

export const DataTable = Object.assign(wrap(Paper.DataTable, "StyledView"), {
  Header: wrap(Paper.DataTable.Header, "StyledView"),
  Title: wrap(Paper.DataTable.Title, "StyledText"),
  Cell: wrap(Paper.DataTable.Cell, "StyledView"),
  Row: wrap(Paper.DataTable.Row, "StyledView"),
});
export const Card = Object.assign(wrap(Paper.Card), {
  Content: wrap(Paper.Card.Content, "StyledView"),
});
export const List = Object.assign(
  {},
  {
    Item: wrap(Paper.List.Item, "StyledView"),
    Accordion: wrap(Paper.List.Accordion, "StyledView"),
  },
);
export const Avatar = Object.assign(
  {},
  {
    Text: wrap(Paper.Avatar.Text, "StyledText"),
  },
);

export const Title = wrap(Paper.Title, "StyledText");
const StyledButton = wrap(Paper.Button, "StyledButton");
export const Button = ({
  children,
  className,
  style,
  ...props
}: {
  onPress?: () => unknown;
  accessibilityLabel?: string;
  mode?: "outlined" | "elevated" | "contained" | "text" | "contained-tonal";
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: any;
}) => (
  <StyledButton {...props} className={className} style={style}>
    <Text className={className} style={style}>
      {children}
    </Text>
  </StyledButton>
);
export const IconButton = wrap(Paper.IconButton, "StyledButton");
export const TextInput = wrap(Paper.TextInput, "StyledInput");
export const Tooltip = wrap(Paper.Tooltip, "StyledText");
export const Paragraph = wrap(Paper.Paragraph, "StyledText");
export const Surface = wrap(Paper.Surface, "StyledView");
export const Text = wrap(Paper.Text, "StyledText");
export const View = wrap(RN.View, "StyledView");
export const Slider = wrap(RNSlider, "StyledView");
