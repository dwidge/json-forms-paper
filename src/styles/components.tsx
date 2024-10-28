// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import * as Paper from "react-native-paper";
import * as RN from "react-native";
import { withClassName } from "@dwidge/class-name-rnw";
import RNSlider from "@react-native-community/slider";
import React from "react";

const Debug = ({
  children = <></>,
  themeKey = "",
  className = "",
  stylesheet = {} as Record<string, any>,
  debug = !!stylesheet.debug,
}) =>
  debug ? (
    <RN.View style={stylesheet["debug"]}>
      <RN.Text style={stylesheet["debug-label"]}>
        {themeKey} {className}
      </RN.Text>
      {children}
    </RN.View>
  ) : (
    children
  );

const wrap = withClassName(Debug);

export const DataTable = Object.assign(
  wrap(Paper.DataTable, "StyledFormView") as React.FC<
    React.ComponentProps<typeof Paper.DataTable> & { className?: string }
  >,
  {
    Header: wrap(Paper.DataTable.Header, "StyledFormView") as React.FC<
      React.ComponentProps<typeof Paper.DataTable.Header> & {
        className?: string;
      }
    >,
    Title: wrap(Paper.DataTable.Title, "StyledFormView") as React.FC<
      React.ComponentProps<typeof Paper.DataTable.Title> & {
        className?: string;
      }
    >,
    Cell: wrap(Paper.DataTable.Cell, "StyledFormView") as React.FC<
      React.ComponentProps<typeof Paper.DataTable.Cell> & { className?: string }
    >,
    Row: wrap(Paper.DataTable.Row, "StyledFormView") as React.FC<
      React.ComponentProps<typeof Paper.DataTable.Row> & { className?: string }
    >,
  },
) as any;

export const Card = Object.assign(
  wrap(Paper.Card, "StyledFormView") as React.FC<
    React.ComponentProps<typeof Paper.Card> & { className?: string }
  >,
  {
    Content: wrap(Paper.Card.Content, "StyledFormView") as React.FC<
      React.ComponentProps<typeof Paper.Card.Content> & { className?: string }
    >,
  },
) as any;

export const List = Object.assign(
  {},
  {
    Item: wrap(Paper.List.Item, "StyledFormView") as React.FC<
      React.ComponentProps<typeof Paper.List.Item> & { className?: string }
    >,
    Accordion: wrap(Paper.List.Accordion, "StyledFormView") as React.FC<
      React.ComponentProps<typeof Paper.List.Accordion> & { className?: string }
    >,
  },
);

export const Avatar = Object.assign(
  {},
  {
    Text: wrap(Paper.Avatar.Text, "StyledFormText") as React.FC<
      React.ComponentProps<typeof Paper.Avatar.Text> & { className?: string }
    >,
  },
);

export const Title = wrap(Paper.Title, "StyledFormText") as React.FC<
  React.ComponentProps<typeof Paper.Title> & { className?: string }
>;

const StyledButton = wrap(Paper.Button, "StyledFormButton") as React.FC<
  React.ComponentProps<typeof Paper.Button> & { className?: string }
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

export const TextInputNoPress = ({
  ...props
}: React.ComponentProps<typeof Paper.TextInput>) => (
  <RN.Pressable style={{ flex: 1 }} onPress={() => {}}>
    <Paper.TextInput {...props} />
  </RN.Pressable>
);

export const IconButton = wrap(
  Paper.IconButton,
  "StyledFormButton",
) as React.FC<
  React.ComponentProps<typeof Paper.IconButton> & { className?: string }
>;
export const TextInput = wrap(TextInputNoPress, "StyledFormInput") as React.FC<
  React.ComponentProps<typeof Paper.TextInput> & { className?: string }
>;
export const Tooltip = wrap(Paper.Tooltip, "StyledFormText") as React.FC<
  React.ComponentProps<typeof Paper.Tooltip> & { className?: string }
>;
export const Paragraph = wrap(Paper.Paragraph, "StyledFormText") as React.FC<
  React.ComponentProps<typeof Paper.Paragraph> & { className?: string }
>;
export const Surface = wrap(Paper.Surface, "StyledFormView") as React.FC<
  React.ComponentProps<typeof Paper.Surface> & { className?: string }
>;
export const Text = wrap(Paper.Text, "StyledFormText") as React.FC<
  React.ComponentProps<typeof Paper.Text> & { className?: string }
>;
export const View = wrap(RN.View, "StyledFormView") as React.FC<
  React.ComponentProps<typeof RN.View> & { className?: string }
>;

// Explicitly type the Slider component
export const Slider = wrap(RNSlider, "StyledFormView") as React.FC<
  React.ComponentProps<typeof RNSlider> & { className?: string }
>;
