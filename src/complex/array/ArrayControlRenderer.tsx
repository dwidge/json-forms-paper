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
  composePaths,
  ControlElement,
  createDefaultValue,
  findUISchema,
  Helpers,
} from "@jsonforms/core";
import {
  JsonFormsDispatch,
  withArrayTranslationProps,
  withJsonFormsArrayControlProps,
  withTranslateProps,
} from "@jsonforms/react";
import range from "lodash/range";
import React, { Fragment, useMemo, useState } from "react";
import { Dialog, Portal } from "react-native-paper";
import type { VanillaRendererProps } from "../../index.js";
import {
  Button,
  IconButton,
  Paragraph,
  Text,
  View,
} from "../../styles/index.js";
import { withVanillaControlProps } from "../../util/index.js";
import { TouchableOpacity } from "react-native";
import { LabelError } from "../file/LabelError.js";
import { merge } from "lodash";

export const ArrayControl = ({
  classNames,
  data,
  label,
  path,
  schema,
  errors,
  addItem,
  removeItems,
  moveUp,
  moveDown,
  uischema,
  uischemas,
  getStyleAsClassName,
  renderers,
  rootSchema,
  translations,
  enabled,
  required,
  className = "control-array",
  config,
  appliedUiSchemaOptions = merge({}, config, uischema.options),
}: ArrayControlProps &
  VanillaRendererProps & {
    translations: ArrayTranslations;
    appliedUiSchemaOptions?: Record<string, any>;
  }) => {
  const controlElement = uischema as ControlElement;
  const [showDialog, setShowDialog] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null,
  );
  const customClassName =
    (controlElement.options?.tags?.toString?.() as string) ?? "";
  const summaryUiSchema = controlElement.options?.summary;

  const childUiSchema = useMemo(
    () =>
      findUISchema(
        uischemas ?? [],
        schema,
        uischema.scope,
        path,
        undefined,
        uischema,
        rootSchema,
      ),
    [uischemas, schema, uischema.scope, path, uischema, rootSchema],
  );

  const shouldConfirmDelete = false;

  const handleConfirmRemove = () => {
    if (itemToRemove !== null) {
      removeItems?.(path, [itemToRemove])();
      setItemToRemove(null);
      setShowDialog(false);
    }
  };

  return (
    <>
      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
          <Dialog.Title>Confirmation</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to delete this item?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDialog(false)}>Cancel</Button>
            <Button onPress={handleConfirmRemove}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View className="control-array container">
        <LabelError
          className={className}
          label={label}
          errors={errors}
          required={required}
          hideRequiredAsterisk={appliedUiSchemaOptions.hideRequiredAsterisk}
        />
        <View className="control-array items">
          <View
            className={"control-array item-controls add " + customClassName}
          >
            <IconButton
              icon="plus"
              aria-label={translations.up}
              disabled={!enabled}
              onPress={addItem(
                path,
                createDefaultValue(schema, rootSchema),
                //@ts-expect-error
                0, // Insert at beginning
              )}
            />
          </View>
          {data ? (
            range(0, data.length).map((index) => {
              const childPath = composePaths(path, `${index}`);
              const isSelected = selectedItemIndex === index;

              return (
                <Fragment key={index}>
                  <View className="control-array item">
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() =>
                        setSelectedItemIndex((prev) =>
                          prev === index ? null : index,
                        )
                      }
                      disabled={!summaryUiSchema}
                    >
                      <View key={index} className="control-array item-render">
                        <JsonFormsDispatch
                          schema={schema}
                          uischema={
                            isSelected
                              ? childUiSchema
                              : (summaryUiSchema ?? childUiSchema)
                          }
                          path={childPath}
                          renderers={renderers}
                        />
                      </View>
                    </TouchableOpacity>
                    <View
                      className={
                        "control-array item-controls " + customClassName
                      }
                    >
                      <IconButton
                        icon="arrow-up"
                        aria-label={translations.up}
                        disabled={!enabled}
                        onPress={() => moveUp?.(path, index)()}
                      />
                      <IconButton
                        icon="delete"
                        aria-label={translations.removeTooltip}
                        disabled={!enabled}
                        onPress={() => {
                          if (shouldConfirmDelete) {
                            setItemToRemove(index);
                            setShowDialog(true);
                          } else removeItems?.(path, [index])();
                        }}
                      />
                      <IconButton
                        icon="arrow-down"
                        aria-label={translations.down}
                        disabled={!enabled}
                        onPress={() => moveDown?.(path, index)()}
                      />
                    </View>
                  </View>
                  <View
                    className={
                      "control-array item-controls add " + customClassName
                    }
                  >
                    <IconButton
                      icon="plus"
                      disabled={!enabled}
                      onPress={addItem(
                        path,
                        createDefaultValue(schema, rootSchema),
                        //@ts-expect-error
                        index + 1, // Insert after the current item
                      )}
                    />
                  </View>
                </Fragment>
              );
            })
          ) : (
            <Text className="control-array message nodata">
              {translations.noDataMessage}
            </Text>
          )}
        </View>
      </View>
    </>
  );
};

export const ArrayControlRenderer = ({
  schema,
  uischema,
  data,
  path,
  rootSchema,
  uischemas,
  addItem,
  getStyle,
  getStyleAsClassName,
  removeItems,
  moveUp,
  moveDown,
  id,
  visible,
  enabled,
  errors,
  translations,
}: ArrayControlProps &
  VanillaRendererProps & { translations: ArrayTranslations }) => {
  const controlElement = uischema as ControlElement;
  const labelDescription = Helpers.createLabelDescriptionFrom(
    controlElement,
    schema,
  );
  const label = labelDescription.show ? labelDescription.text : "";

  if (!visible) return null;
  return (
    <ArrayControl
      classNames={{}}
      data={data}
      label={label ?? ""}
      path={path}
      schema={schema}
      errors={errors}
      addItem={addItem}
      removeItems={removeItems}
      moveUp={moveUp}
      moveDown={moveDown}
      uischema={uischema}
      uischemas={uischemas}
      getStyleAsClassName={getStyleAsClassName}
      rootSchema={rootSchema}
      id={id}
      visible={visible}
      enabled={enabled}
      getStyle={getStyle}
      translations={translations}
    />
  );
};

export default withVanillaControlProps(
  withJsonFormsArrayControlProps(
    withTranslateProps(withArrayTranslationProps(ArrayControlRenderer)),
  ),
);
