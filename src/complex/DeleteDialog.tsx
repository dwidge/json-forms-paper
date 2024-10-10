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

import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { View } from "react-native";

export interface DeleteDialogProps {
  open: boolean;
  onClose(): void;
  onConfirm(): void;
  onCancel(): void;
  title?: string;
  message?: string;
  acceptText?: string;
  declineText?: string;
}

export interface WithDeleteDialogSupport {
  openDeleteDialog(path: string, data: number): void;
}

export const DeleteDialog = React.memo(function DeleteDialog({
  open,
  onClose,
  onConfirm,
  onCancel,
  title,
  message,
  acceptText,
  declineText,
}: DeleteDialogProps) {
  return (
    <Portal>
      <Dialog visible={open} onDismiss={onClose}>
        <View accessibilityLabelledBy="alert-dialog-confirmdelete-title"></View>
        <Dialog.Title id="alert-dialog-confirmdelete-title">
          {title}
        </Dialog.Title>
        <Dialog.Content>
          <Text id="alert-dialog-confirmdelete-description">{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel} accessibilityLabel="Decline">
            {declineText}
          </Button>
          <Button onPress={onConfirm} accessibilityLabel="Confirm">
            {acceptText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});