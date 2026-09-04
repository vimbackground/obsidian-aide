import { SerializedEditorState, SerializedLexicalNode } from 'lexical'

export function editorStateToPlainText(
  editorState: SerializedEditorState,
): string {
  if (!editorState || !editorState.root) return ''
  return lexicalNodeToPlainText(editorState.root)
}

function lexicalNodeToPlainText(node: SerializedLexicalNode): string {
  if ('children' in node && Array.isArray(node.children)) {
    return (node.children as SerializedLexicalNode[])
      .map(lexicalNodeToPlainText)
      .join('')
  } else if (node.type === 'linebreak') {
    return '\n'
  } else if ('text' in node && typeof node.text === 'string') {
    return node.text
  }
  return ''
}

export function plainTextToEditorState(text: string): SerializedEditorState {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: text,
              version: 1,
            },
          ],
          direction: 'ltr',
        },
      ],
      direction: 'ltr',
    },
  } as unknown as SerializedEditorState
}
