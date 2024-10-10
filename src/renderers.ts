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

import { RankedTester } from "@jsonforms/core";

import {
  BooleanCell,
  booleanCellTester,
  DateCell,
  dateCellTester,
  DateTimeCell,
  dateTimeCellTester,
  EnumCell,
  enumCellTester,
  IntegerCell,
  integerCellTester,
  NumberCell,
  numberCellTester,
  SliderCell,
  sliderCellTester,
  TextAreaCell,
  textAreaCellTester,
  TextCell,
  textCellTester,
  TimeCell,
  timeCellTester,
} from "./cells/index.js";

import {
  InputControl,
  inputControlTester,
  RadioGroupControl,
  radioGroupControlTester,
  OneOfRadioGroupControl,
  oneOfRadioGroupControlTester,
} from "./controls/index.js";

import {
  ArrayControl,
  arrayControlTester,
  Categorization,
  categorizationTester,
  // LabelRenderer,
  // labelRendererTester,
  TableArrayControl,
  tableArrayControlTester,
} from "./complex/index.js";
import {
  // materialAllOfControlTester,
  // MaterialAllOfRenderer,
  // materialAnyOfControlTester,
  // MaterialAnyOfRenderer,
  MaterialArrayControlRenderer,
  materialArrayControlTester,
  materialObjectControlTester,
  MaterialObjectRenderer,
  // materialOneOfControlTester,
  // MaterialOneOfRenderer,
  // MaterialEnumArrayRenderer,
  // materialEnumArrayRendererTester,
} from "./complex/index.js";

import {
  GroupLayout,
  groupTester,
  HorizontalLayout,
  horizontalLayoutTester,
  VerticalLayout,
  verticalLayoutTester,
} from "./layouts/index.js";
import UnknownRenderer, {
  unknownRendererTester,
} from "./controls/UnknownRenderer.js";
import {
  MaterialLabelRenderer,
  materialLabelRendererTester,
} from "./additional/index.js";

export const paperRenderers: { tester: RankedTester; renderer: any }[] = [
  { tester: materialObjectControlTester, renderer: MaterialObjectRenderer },
  // {
  //   tester: materialArrayControlTester,
  //   renderer: MaterialArrayControlRenderer,
  // },
  { tester: inputControlTester, renderer: InputControl },
  { tester: radioGroupControlTester, renderer: RadioGroupControl },
  { tester: oneOfRadioGroupControlTester, renderer: OneOfRadioGroupControl },
  { tester: arrayControlTester, renderer: ArrayControl },
  // { tester: labelRendererTester, renderer: LabelRenderer },
  { tester: categorizationTester, renderer: Categorization },
  { tester: tableArrayControlTester, renderer: TableArrayControl },
  { tester: groupTester, renderer: GroupLayout },
  { tester: verticalLayoutTester, renderer: VerticalLayout },
  { tester: horizontalLayoutTester, renderer: HorizontalLayout },
  // additional
  { tester: materialLabelRendererTester, renderer: MaterialLabelRenderer },
  { tester: unknownRendererTester, renderer: UnknownRenderer },
];

export const paperCells: { tester: RankedTester; cell: any }[] = [
  { tester: booleanCellTester, cell: BooleanCell },
  { tester: dateCellTester, cell: DateCell },
  { tester: dateTimeCellTester, cell: DateTimeCell },
  { tester: enumCellTester, cell: EnumCell },
  { tester: integerCellTester, cell: IntegerCell },
  { tester: numberCellTester, cell: NumberCell },
  { tester: sliderCellTester, cell: SliderCell },
  { tester: textAreaCellTester, cell: TextAreaCell },
  { tester: textCellTester, cell: TextCell },
  { tester: timeCellTester, cell: TimeCell },
];
