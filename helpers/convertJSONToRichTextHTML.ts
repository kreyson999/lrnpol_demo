import { setupDom } from '@/helpers/setupDom';
import { createHeadlessEditor } from '@lexical/headless';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { $generateHtmlFromNodes } from '@lexical/html';

export const convertJSONToRichTextHTML = (json: string): string | null => {
  const editor = createHeadlessEditor({
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
    onError: () => {},
  });

  editor.setEditorState(editor.parseEditorState(json));

  let html: null | string = null;
  editor.update(() => {
    try {
      const cleanup = setupDom();
      html = $generateHtmlFromNodes(editor, null);
      cleanup();
    } catch (error) {
      console.log(error);
    }
  });
  return html;
};
