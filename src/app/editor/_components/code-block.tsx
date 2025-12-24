/**
 * biome-ignore-all lint/suspicious/noExplicitAny: Tiptap example uses JS, NodeView props are complex to type
 * @see https://tiptap.dev/docs/examples/advanced/syntax-highlighting
 */

'use client';

import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';

import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';

export function CodeBlock({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}: any) {
  return (
    <NodeViewWrapper className="relative">
      <NativeSelect
        className="absolute top-2 right-2 [&_select]:bg-popover [&_select]:text-popover-foreground"
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={(e) => updateAttributes({ language: e.target.value })}
        size="sm"
      >
        <NativeSelectOption value="null">Auto</NativeSelectOption>
        {extension.options.lowlight.listLanguages().map((lang: any) => (
          <NativeSelectOption key={lang} value={lang}>
            {lang}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <pre>
        {/* @ts-expect-error - Tiptap types `as` as "div" only, but "code" works per docs */}
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
}
