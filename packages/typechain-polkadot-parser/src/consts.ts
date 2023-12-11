// Copyright (c) 2012-2022 Supercolony
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the"Software"),
// to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

export const INK_PRIMITIVE_TYPES_TO_TS_RETURNS = {
  Bool: 'boolean',
  Char: 'string',
  Str: 'string',

  U8: 'ReturnNumber',
  U16: 'ReturnNumber',
  U32: 'ReturnNumber',
  U64: 'ReturnNumber',
  U128: 'ReturnNumber',
  U256: 'ReturnNumber',

  I8: 'ReturnNumber',
  I16: 'ReturnNumber',
  I32: 'ReturnNumber',
  I64: 'ReturnNumber',
  I128: 'ReturnNumber',
  I256: 'ReturnNumber',
} as const;

export type INK_PRIMITIVE_TYPE = keyof typeof INK_PRIMITIVE_TYPES_TO_TS_RETURNS;
export const INK_PRIMITIVE_TYPES_TO_TS_ARGUMENTS = {
  Bool: 'boolean',
  Char: 'string',
  Str: 'string',

  U8: '(number | string | BN)',
  U16: '(number | string | BN)',
  U32: '(number | string | BN)',
  U64: '(number | string | BN)',
  U128: '(string | number | BN)',
  U256: '(string | number | BN)',

  I8: '(number | string | BN)',
  I16: '(number | string | BN)',
  I32: '(number | string | BN)',
  I64: '(number | string | BN)',
  I128: '(string | number | BN)',
  I256: '(string | number | BN)',
} as const satisfies Record<INK_PRIMITIVE_TYPE, string>;
