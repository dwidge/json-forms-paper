// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import * as Paper from "react-native-paper";
import * as RN from "react-native";
import { withClassName } from "@dwidge/class-name-rnw";
import RNSlider from "@react-native-community/slider";
import React from "react";

const wrap = withClassName();

export const DataTable = Object.assign(
  wrap(Paper.DataTable, "StyledView") as React.FC<
    React.ComponentProps<typeof Paper.DataTable>
  >,
  {
    Header: wrap(Paper.DataTable.Header, "StyledView") as React.FC<
      React.ComponentProps<typeof Paper.DataTable.Header>
    >,
    Title: wrap(Paper.DataTable.Title, "StyledText") as React.FC<
      React.ComponentProps<typeof Paper.DataTable.Title>
    >,
    Cell: wrap(Paper.DataTable.Cell, "StyledView") as React.FC<
      React.ComponentProps<typeof Paper.DataTable.Cell>
    >,
    Row: wrap(Paper.DataTable.Row, "StyledView") as React.FC<
      React.ComponentProps<typeof Paper.DataTable.Row>
    >,
  }
);

export const Card = Object.assign(
  wrap(Paper.Card, "StyledView") as React.FC<
    React.ComponentProps<typeof Paper.Card>
  >,
  {
    Content: wrap(Paper.Card.Content, "StyledView") as React.FC<
      React.ComponentProps<typeof Paper.Card.Content>
    >,
  }
);

export const List = Object.assign(
  {},
  {
    Item: wrap(Paper.List.Item, "StyledView") as React.FC<
      React.ComponentProps<typeof Paper.List.Item>
    >,
    Accordion: wrap(Paper.List.Accordion, "StyledView") as React.FC<
      React.ComponentProps<typeof Paper.List.Accordion>
    >,
  }
);

export const Avatar = Object.assign(
  {},
  {
    Text: wrap(Paper.Avatar.Text, "StyledText") as React.FC<
      React.ComponentProps<typeof Paper.Avatar.Text>
    >,
  }
);

export const Title = wrap(Paper.Title, "StyledText") as React.FC<
  React.ComponentProps<typeof Paper.Title>
>;

const StyledButton = wrap(Paper.Button, "StyledButton") as React.FC<
  React.ComponentProps<typeof Paper.Button>
>;

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

export const IconButton = wrap(Paper.IconButton, "StyledButton") as React.FC<
  React.ComponentProps<typeof Paper.IconButton>
>;
export const TextInput = wrap(Paper.TextInput, "StyledInput") as React.FC<
  React.ComponentProps<typeof Paper.TextInput>
>;
export const Tooltip = wrap(Paper.Tooltip, "StyledText") as React.FC<
  React.ComponentProps<typeof Paper.Tooltip>
>;
export const Paragraph = wrap(Paper.Paragraph, "StyledText") as React.FC<
  React.ComponentProps<typeof Paper.Paragraph>
>;
export const Surface = wrap(Paper.Surface, "StyledView") as React.FC<
  React.ComponentProps<typeof Paper.Surface>
>;
export const Text = wrap(Paper.Text, "StyledText") as React.FC<
  React.ComponentProps<typeof Paper.Text>
>;
export const View = wrap(RN.View, "StyledView") as React.FC<
  React.ComponentProps<typeof RN.View>
>;

// Explicitly type the Slider component
export const Slider = wrap(RNSlider, "StyledView") as React.FC<
  React.ComponentProps<typeof RNSlider>
>;
