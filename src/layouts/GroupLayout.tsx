/*
  The MIT License
  
  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/

import {
  GroupLayout,
  LayoutProps,
  RankedTester,
  rankWith,
  uiTypeIs,
} from "@jsonforms/core";
import { withJsonFormsLayoutProps } from "@jsonforms/react";
import isEmpty from "lodash/isEmpty";
import React, { FunctionComponent } from "react";
import type { VanillaRendererProps } from "../index.js";
import { withVanillaControlProps } from "../util/index.js";
import { renderChildren } from "./util.js";

import { Text, View } from "../styles/components.js";

/**
 * Default tester for a group layout.
 *
 * @type {RankedTester}
 */
export const groupTester: RankedTester = rankWith(1, uiTypeIs("Group"));

export const GroupLayoutRenderer = (
  props: LayoutProps & VanillaRendererProps
) => {
  const { data: _data, ...otherProps } = props;
  // We don't hand over data to the layout renderer to avoid rerendering it with every data change
  return <GroupLayoutRendererComponent {...otherProps} />;
};

const GroupLayoutRendererComponent: FunctionComponent<
  LayoutProps & VanillaRendererProps
> = React.memo(function GroupLayoutRendererComponent({
  schema,
  uischema,
  path,
  enabled,
  visible,
  label,
  getStyle = () => [],
  getStyleAsClassName = () => "",
}: LayoutProps & VanillaRendererProps) {
  const group = uischema as GroupLayout;
  const elementsSize = group.elements ? group.elements.length : 0;
  const classNames = getStyleAsClassName("group.layout");
  const childClassNames = ["group-layout-item"]
    .concat(getStyle("group.layout.item", elementsSize))
    .join(" ");

  if (visible === false) {
    return null;
  }

  return (
    <View className={classNames}>
      {!isEmpty(label) ? <Text className={classNames}>{label}</Text> : null}
      {renderChildren(group, schema, childClassNames, path, enabled)}
    </View>
  );
});

export default withVanillaControlProps(
  withJsonFormsLayoutProps(GroupLayoutRenderer)
);
