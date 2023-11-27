'use client';
import { Button } from '@/components/ui/button';
import Codetag from '@/components/ui/code';
import Toolbar from '@/components/ui/text-tool-bar';
import { EditorProps } from '@monaco-editor/react';
import {
  Bold,
  Code,
  Indent,
  Italic,
  LucideIcon,
  Underline,
  icons,
} from 'lucide-react';
import Image from 'next/image';
import React, { ReactNode, lazy, useState } from 'react';
import { createEditor, Editor } from 'slate';
import {
  Slate,
  Editable,
  withReact,
  useSlate,
  RenderLeafProps,
} from 'slate-react';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

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
  attributes: {};
  children: ReactNode;
  leaf: { bold: boolean; code: boolean; italic: boolean; underline: boolean };
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
      variant={isMarkActive({ editor, format }) ? 'active' : 'default'}
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
          </Toolbar>
          {
            // TODO: nevem tocno ka je treba naret da se typescript nebo pritozeval. dela pa. future me problem
          }
          <Editable renderLeaf={Leaf} className="h-1/2 p-2 border rounded-lg" />
        </Slate>
      </div>
    </div>
  );
};

export default NewAssigmentPage;
