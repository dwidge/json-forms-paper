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

import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import {
  Category,
  Categorization,
  deriveLabelForUISchemaElement,
  Translator,
  isVisible,
} from "@jsonforms/core";
import { isCategorization } from "./tester.js";
import { AjvProps } from "../../util/index.js";
import { Text, View } from "../../styles/components.js";

const getCategoryClassName = (
  category: Category,
  selectedCategory: Category,
): string =>
  selectedCategory === category ? "category-label selected" : "category-label";

export interface CategorizationProps {
  elements: (Category | Categorization)[];
  selectedCategory: Category;
  depth: number;
  data: any;
  onSelect: any;
  subcategoriesClassName: string;
  groupClassName: string;
  t: Translator;
}

export const CategorizationList = ({
  selectedCategory,
  elements,
  data,
  depth,
  onSelect,
  subcategoriesClassName,
  groupClassName,
  t,
  ajv,
}: CategorizationProps & AjvProps) => {
  const categoryLabels = useMemo(
    () => elements.map((cat) => deriveLabelForUISchemaElement(cat, t)),
    [elements, t],
  );

  return (
    <View className={"category-list " + subcategoriesClassName}>
      {elements.map((category, idx) => {
        if (!isVisible(category, data, "", ajv)) return;

        if (isCategorization(category)) {
          return (
            <View key={categoryLabels[idx]} className={groupClassName}>
              <Text>{categoryLabels[idx]}</Text>
              <CategorizationList
                selectedCategory={selectedCategory}
                elements={category.elements}
                data={data}
                ajv={ajv}
                depth={depth + 1}
                onSelect={onSelect}
                subcategoriesClassName={subcategoriesClassName}
                groupClassName={groupClassName}
                t={t}
              />
            </View>
          );
        } else {
          return (
            <View
              key={categoryLabels[idx]}
              className={getCategoryClassName(category, selectedCategory)}
            >
              <TouchableOpacity onPress={onSelect(idx)}>
                <Text
                  className={getCategoryClassName(category, selectedCategory)}
                >
                  {categoryLabels[idx]}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }
      })}
    </View>
  );
};
