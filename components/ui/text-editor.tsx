'use client';
import { Button } from '@/components/ui/button';
import Codetag from '@/components/ui/code';
import Toolbar from '@/components/ui/text-tool-bar';
import { EditorProps } from '@monaco-editor/react';
import { LucideIcon, LucideProps, icons } from 'lucide-react';
import React, { Children, ReactNode, lazy, useCallback, useState } from 'react';
import {
  createEditor,
  Editor,
  Transforms,
  Element as SlateElement,
  BaseElement,
  BaseText,
  Text,
  Descendant,
} from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import { default as escapeHtml } from 'escape-html';

type RenderElementProps = {
  children: ReactNode;
  element: {
    type: string;
  };
  attributes: {
    'data-slate-node': 'element';
    'data-slate-inline'?: true | undefined;
    'data-slate-void'?: true | undefined;
    dir?: 'rtl' | undefined;
    ref: any;
  };
};

type RenderLeafProps = {
  children: any;
  leaf: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    code: boolean;
  };
  text: BaseText;
  attributes: {
    'data-slate-leaf': true;
  };
};

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'Problem description' }],
  },
];

type ElementProps = {
  attributes: {};
  children: ReactNode;
  element: { type: string; align: string };
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

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
    case 'justify':
      return <p className="text-center"></p>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'inset':
      return <p className="ml-4 border-l p-1">{children}</p>;
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

const serialize = (node: {
  children: any[];
  type: string;
  bold: boolean;
  italic: boolean;
  code: boolean;
}) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    } else if (node.italic) {
      string = `<em>${string}</em>`;
    } else if (node.code) {
      string = `<code>${string}</code>`;
    }
    return string;
  }
  const children: string = node.children.map((n) => serialize(n)).join('');

  switch (node.type) {
    case 'quote':
      return `<blockquote><p>${children}</p></blockquote>`;
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'heading-one':
      return `<h1 class="text-4xl">${children}</h1>`;
    case 'inset':
      return `<p class="ml-4  p-1 border-l">${children}</p>`;
    default:
      return children;
  }
};

const TextEditor = ({ setValue }: { setValue: (output: string) => void }) => {
  const [editor] = useState(() => withReact(createEditor()));
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    [],
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    [],
  );

  const [text, setText] = useState<Descendant[]>([]);
  const [output, setOutput] = useState<string>('');

  function handleSerializeText() {
    let output = '';
    text.forEach((value) => {
      output += serialize(value) + '\n';
    });
    setValue(output);
  }

  return (
    <div className="">
      <Slate
        initialValue={initialValue}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => 'set_selection' !== op.type,
          );
          if (isAstChange) {
            setText(value);
            handleSerializeText();
          }
        }}
        editor={editor}
      >
        <Toolbar>
          <MarkButton format="bold" icon={'Bold'} />
          <MarkButton format="italic" icon={'Italic'} />
          <MarkButton format="underline" icon={'Underline'} />
          <MarkButton format="code" icon={'Code'} />
          <BlockButton format="" icon={'CaseLower'} />
          <BlockButton format="heading-one" icon={'Heading1'} />
          <BlockButton format="heading-two" icon={'Heading2'} />
          {/* <BlockButton format="left" icon="AlignLeft" />
            <BlockButton format="center" icon="AlignCenter" />
            <BlockButton format="right" icon="AlignRight" />
            <BlockButton format="justify" icon="AlignJustify" /> */}
          <BlockButton format="bulleted-list" icon="List" />
          <BlockButton format="numbered-list" icon="ListOrdered" />
          <BlockButton format="inset" icon="Indent" />
          <Button onClick={handleSerializeText}>Save</Button>
        </Toolbar>
        {
          // TODO: nevem tocno ka je treba naret da se typescript nebo pritozeval. dela pa. future me problem
        }
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          className=""
        />
      </Slate>
    </div>
  );
};
export default TextEditor;
