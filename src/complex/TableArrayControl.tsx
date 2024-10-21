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
  ArrayControlProps,
  ArrayTranslations,
  ControlElement,
  createDefaultValue,
  encode,
  getControlPath,
  Helpers,
  Paths,
  RankedTester,
  Resolve,
  Test,
} from "@jsonforms/core";
import {
  DispatchCell,
  withArrayTranslationProps,
  withJsonFormsArrayControlProps,
  withTranslateProps,
} from "@jsonforms/react";
import _ from "lodash";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import type { VanillaRendererProps } from "../index.js";
import { Button, IconButton, Text, View } from "../styles/components.js";
import { withVanillaControlProps } from "../util/index.js";
import { DeleteDialog } from "./DeleteDialog.js";

const { convertToValidClassName } = Helpers;
const { or, isObjectArrayControl, isPrimitiveArrayControl, rankWith } = Test;

/**
 * Alternative tester for an array that also checks whether the 'table'
 * option is set.
 * @type {RankedTester}
 */
export const tableArrayControlTester: RankedTester = rankWith(
  3,
  or(isObjectArrayControl, isPrimitiveArrayControl),
);

interface TableArrayControlProps
  extends ArrayControlProps,
    VanillaRendererProps {
  translations: ArrayTranslations;
}

const TableArrayControl: React.FC<TableArrayControlProps> = (props) => {
  const {
    addItem,
    uischema,
    schema,
    rootSchema,
    path,
    data,
    visible,
    errors,
    label,
    getStyleAsClassName = () => "",
    childErrors,
    translations,
    enabled,
  } = props;

  const controlElement = uischema as ControlElement;
  const tableClass = getStyleAsClassName("array.table.table");
  const labelClass = getStyleAsClassName("array.table.label");
  const buttonClass = getStyleAsClassName("array.table.button");
  const validationClass = getStyleAsClassName("array.table.validation");
  const controlClass = [
    getStyleAsClassName("array.table"),
    convertToValidClassName(controlElement.scope),
  ].join(" ");
  const createControlElement = (key?: string): ControlElement => ({
    type: "Control",
    label: false,
    scope: schema.type === "object" ? `#/properties/${key}` : "#",
  });
  const isValid = errors.length === 0;
  const divClassNames = [validationClass]
    .concat(isValid ? "" : getStyleAsClassName("array.table.validation.error"))
    .join(" ");

  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const openDeleteDialog = (path: string, index: number) => {
    setSelectedPath(path);
    setSelectedIndex(index);
    setDeleteDialogVisible(true);
  };

  const confirmDelete = () => {
    if (selectedPath !== null && selectedIndex !== null) {
      const p = selectedPath.substring(0, selectedPath.lastIndexOf("."));
      props.removeItems?.(p, [selectedIndex])();
    }
    setDeleteDialogVisible(false);
    setSelectedIndex(null);
    setSelectedPath(null);
  };

  const getJsonType = (prop: string) =>
    Resolve.schema(schema, `#/properties/${encode(prop)}`, rootSchema).type;

  if (!visible) return null;
  return (
    <View className={controlClass}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text className={labelClass}>{label}</Text>
        <Button
          className={buttonClass}
          mode="contained"
          disabled={!enabled}
          onPress={addItem(path, createDefaultValue(schema, rootSchema))}
        >
          {translations.addTooltip}
        </Button>
      </View>
      {!isValid && <Text className={"error " + divClassNames}>{errors}</Text>}
      <ScrollView
        horizontal
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View className={"table-array container"}>
          <View className={"table-array header row"}>
            {schema.properties ? (
              Object.keys(schema.properties)
                .filter((prop) => schema.properties?.[prop].type !== "array")
                .map((prop) => (
                  <View
                    className={"table-array header cell " + getJsonType(prop)}
                    key={prop}
                  >
                    <Text
                      className={"table-array header cell " + getJsonType(prop)}
                    >
                      {schema.properties?.[prop].title || _.startCase(prop)}
                    </Text>
                  </View>
                ))
            ) : (
              <View className={"table-array header cell items"}>
                <Text className={"table-array header cell items"}>Items</Text>
              </View>
            )}
            {/* <View>Valid</View> */}
            <View className={"table-array header cell actions"}>
              <Text className={"table-array header cell actions"}>Actions</Text>
            </View>
          </View>

          {!data || !Array.isArray(data) || data.length === 0 ? (
            <View>
              <Text>{translations.noDataMessage}</Text>
            </View>
          ) : (
            data.map((_child, index) => {
              const childPath = Paths.compose(path, `${index}`);
              const errorsPerEntry = childErrors?.filter((error) => {
                const errorPath = getControlPath(error);
                return errorPath.startsWith(childPath);
              });

              return (
                <View key={childPath} className={"table-array data row"}>
                  {schema.properties ? (
                    Object.keys(schema.properties)
                      .filter(
                        (prop) => schema.properties?.[prop].type !== "array",
                      )
                      .map((prop) => {
                        const childPropPath = Paths.compose(
                          childPath,
                          prop.toString(),
                        );
                        return (
                          <View
                            key={childPropPath}
                            className={
                              "table-array data cell " + getJsonType(prop)
                            }
                          >
                            <DispatchCell
                              schema={Resolve.schema(
                                schema,
                                `#/properties/${encode(prop)}`,
                                rootSchema,
                              )}
                              uischema={createControlElement(encode(prop))}
                              path={`${childPath}.${prop}`}
                            />
                          </View>
                        );
                      })
                  ) : (
                    <View
                      key={Paths.compose(childPath, index.toString())}
                      className={
                        "table-array data cell " + getJsonType(index.toString())
                      }
                    >
                      <DispatchCell
                        schema={schema}
                        uischema={createControlElement()}
                        path={childPath}
                      />
                    </View>
                  )}
                  {/* <View>
                    <Text
                      style={{
                        color: errorsPerEntry.length
                          ? theme.colors.error
                          : theme.colors.primary,
                      }}
                    >
                      {errorsPerEntry.length
                        ? errorsPerEntry.map((e) => e.message).join(" and ")
                        : "OK"}
                    </Text>
                  </View> */}
                  <View className={"table-array data cell actions"}>
                    <IconButton
                      icon="delete"
                      onPress={() => openDeleteDialog(childPath, index)}
                      aria-label={translations.removeTooltip}
                    />
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      <DeleteDialog
        open={deleteDialogVisible}
        onClose={() => setDeleteDialogVisible(false)}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialogVisible(false)}
        title={translations.deleteDialogTitle}
        message={translations.deleteDialogMessage}
        acceptText={translations.deleteDialogAccept}
        declineText={translations.deleteDialogDecline}
      />
    </View>
  );
};

export default withVanillaControlProps(
  withJsonFormsArrayControlProps(
    withTranslateProps(
      withArrayTranslationProps(TableArrayControl),
    ) as React.ComponentType<ArrayControlProps>,
  ),
) as typeof TableArrayControl;
