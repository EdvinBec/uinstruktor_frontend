'use client';
import { Button } from '@/components/ui/button';
import Codetag from '@/components/ui/code';
import Toolbar from '@/components/ui/text-tool-bar';
import { EditorProps } from '@monaco-editor/react';
import { LucideIcon, icons } from 'lucide-react';
import React, { Children, ReactNode, lazy, useCallback, useState } from 'react';
import {
  createEditor,
  Editor,
  Transforms,
  Element as SlateElement,
  BaseElement,
  BaseText,
} from 'slate';
import {
  Slate,
  Editable,
  withReact,
  useSlate,
  RenderLeafProps,
  RenderElementProps,
} from 'slate-react';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

type ElementProps = {
  attributes: {};
  children: ReactNode;
  element: { type: string; align: string };
};
const Element = ({
  attributes,
  children,
  element,
}: {
  children: ReactNode;
  element: { type: string };
  attributes: {
    'data-slate-node': 'element';
    'data-slate-inline'?: true | undefined;
    'data-slate-void'?: true | undefined;
    dir?: 'rtl' | undefined;
    ref: any;
  };
}) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return (
        <h1 className="text-3xl" {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 className="text-2xl" {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const toggleBlock = ({
  editor,
  format,
}: {
  editor: Editor;
  format: string;
}) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const isBlockActive = (editor: Editor, format: string, blockType: any) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    }),
  );
};

const BlockButton = ({ format, icon }: { format: string; icon: string }) => {
  const editor = useSlate();
  const LucideIcon: LucideIcon = icons[icon];
  return (
    <Button
      variant={
        isBlockActive(
          editor,
          format,
          TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
        )
          ? 'active'
          : 'secondary'
      }
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock({ editor, format });
      }}
    >
      <LucideIcon />
    </Button>
  );
};

const isMarkActive = ({
  editor,
  format,
}: {
  editor: Editor;
  format: string;
}) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = ({ editor, format }: { editor: Editor; format: string }) => {
  const isActive = isMarkActive({ editor, format });

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const Leaf = ({
  attributes,
  children,
  leaf,
}: {
  children: any;
  leaf: { bold: boolean; italic: boolean; underline: boolean; code: boolean };
  text: BaseText;
  attributes: { 'data-slate-leaf': true };
}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.code) {
    children = <Codetag>{children}</Codetag>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const MarkButton = ({ format, icon }: { format: string; icon: string }) => {
  const editor = useSlate();
  const LucideIcon = icons[icon];
  return (
    <Button
      //active={isMarkActive(editor, format)}
      variant={isMarkActive({ editor, format }) ? 'active' : 'secondary'}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark({ editor, format });
      }}
    >
      {<LucideIcon />}
    </Button>
  );
};

const NewAssigmentPage = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  return (
    <div>
      <h1 className="text-3xl p-2">New assigment</h1>
      <div className="p-2 m-4">
        <Slate initialValue={initialValue} editor={editor}>
          <Toolbar>
            <MarkButton format="bold" icon={'Bold'} />
            <MarkButton format="italic" icon={'Italic'} />
            <MarkButton format="underline" icon={'Underline'} />
            <MarkButton format="code" icon={'Code'} />
            <BlockButton format="" icon={'CaseLower'} />
            <BlockButton format="heading-one" icon={'Heading1'} />
            <BlockButton format="heading-two" icon={'Heading2'} />
            <BlockButton format="left" icon="AlignLeft" />
            <BlockButton format="center" icon="AlignCenter" />
            <BlockButton format="right" icon="AlignRight" />
            <BlockButton format="justify" icon="AlignJustify" />
            <BlockButton format="bulleted-list" icon="List" />
            <BlockButton format="numbered-list" icon="ListOrdered" />
          </Toolbar>
          {
            // TODO: nevem tocno ka je treba naret da se typescript nebo pritozeval. dela pa. future me problem
          }
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            className="h-1/2 p-2 border rounded-lg"
          />
        </Slate>
      </div>
    </div>
  );
};

export default NewAssigmentPage;