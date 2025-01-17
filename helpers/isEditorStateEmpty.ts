import { $getRoot, EditorState, RootNode } from 'lexical';

export const isEditorStateEmpty = (state: EditorState) => {
  return state.read((): boolean => {
    const root = $getRoot();
    return (
      (root.getFirstChild() as RootNode).isEmpty() &&
      root.getChildrenSize() === 1
    );
  });
};
