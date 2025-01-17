'use client';

import React from 'react';

import MBox from '@mui/material/Box';
import MInputLabel from '@mui/material/InputLabel';
import RichTextEditorTheme from '@/config/RichTextEditorTheme';
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
// import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import CodeHighlightPlugin from './richTextEditorPlugins/CodeHighlightPlugin';
import ToolbarPlugin from './richTextEditorPlugins/ToolBarPlugin';
import AutoLinkPlugin from './richTextEditorPlugins/AutoLinkPlugin';
import OnChangePlugin from './richTextEditorPlugins/OnChangePlugin';
import MFormHelperText from '@mui/material/FormHelperText';

import '@/styles/richTextEditorStyles.css';
import { EditorState } from 'lexical';

function Placeholder() {
  return <div className="editor-placeholder">Wpisz tekst...</div>;
}

type Props = {
  label: string;
  value: string | undefined;
  helperText?: string | false;
  onChange: (state: EditorState) => void;
  contentBackgroundColor: string;
};

const RichTextEditor = ({
  label,
  value,
  helperText,
  contentBackgroundColor,
  onChange,
}: Props) => {
  const editorConfig: InitialConfigType = {
    namespace: 'RichTextEditor',
    // The editor theme
    theme: RichTextEditorTheme,
    // Handling of errors during update
    onError(error: Error) {
      throw error;
    },
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      AutoLinkNode,
      LinkNode,
    ],
    editorState: value,
  };

  return (
    <MBox className="tw-max-w-screen-lg" onClick={(e) => e.stopPropagation()}>
      <MInputLabel
        classes={{
          root: 'tw-text-sm tw-mb-2',
        }}
      >
        {label}
      </MInputLabel>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container tw-relative">
          <ToolbarPlugin />
          <div
            style={{
              background: contentBackgroundColor,
            }}
            className="editor-inner"
          >
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <OnChangePlugin onChange={onChange} />
          </div>
        </div>
      </LexicalComposer>
      <MFormHelperText className="tw-text-red-500">
        {helperText}
      </MFormHelperText>
    </MBox>
  );
};

export default RichTextEditor;
