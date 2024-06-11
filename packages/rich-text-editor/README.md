# rich-text-editor

Rich text editor for React created using the [lexical](https://github.com/facebook/lexical) framework.

## Getting started

Install `@poetry-galore/rich-text-editor`

```bash
npm install @poetry-galore/rich-text-editor
```

Below is an example of basic usage

```Typescript
import RichTextEditor from '@poetry-galore/rich-text-editor';

function App() {
  return (
    <RichTextEditor />
  );
}

export default App;
```

## RichTextEditor

### Props

| Name            | Type                                                                                            | Default              | Description                                               |
| --------------- | ----------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------- |
| placeholderText | string                                                                                          | 'Start your poem...' | Text displayed when editor is empty                       |
| editable        | boolean                                                                                         | true                 | Set to `false` to disable the editor                      |
| initialEditorState     | InitialEditorStateType \| undefined                                                             | undefined            | Sets initial content of the editor                        |
| onEditorChange  | `((editorState: EditorState, editor: LexicalEditor, tags: Set<string>) => void)[]` \| undefined | undefined            | Array of callbacks to trigger when the editor updates     |
| setEditorState  | React.Dispatch<React.SetStateAction\<string>> \| undefined                                      | undefined            | React state update function for setting the editor state. |

> Any other props from `React.AllHTMLAttributes<HTMLDivElement>` can be passed.
> These props are applied to the div element that is the container of the `LexicalComposer`.

<details>
<summary>Other Props</summary>

```Typescript
/* RichTextEditor Component */

function RichTextEditor({
    placeholderText = "Start your poem...",
    editable = true,
    initialEditorState,
    onEditorChange,
    setEditorState,
    children,
    ...rest
}: RichTextEditorProps) {
  // Code
  return (
      <div {...rest}> // Other props are applied to this div
          <LexicalComposer initialConfig={initialConfig}>
            {/* Code */}
          </LexicalComposer>
      </div>
  );
}
```

</details>

> Any `children` passed are added to the `LexicalComposer`. You can add your own plugins here.

<details>
<summary>children</summary>

```Typescript
function RichTextEditor({
    placeholderText = "Start your poem...",
    editable = true,
    initialEditorState,
    onEditorChange,
    setEditorState,
    children,
    ...rest
}: RichTextEditorProps) {
    return (
        <div {...rest}>
            <LexicalComposer initialConfig={initialConfig}>
                {/** Other plugins */}
                {children}  // Passed in the LexicalComposer
            </LexicalComposer>
        </div>
    );
}
```

</details>

## 🏗 Contributing

1. 🍴Fork it
2. 🔀Create your branch: `git checkout -b your-branch`
3. 🎨Make your changes
4. 📝Commit your changes with [Semantic Commit Messages (recommended)](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
5. 🚀Push to the branch: `git push origin your-branch`
6. 🎉Submit a PR to `develop` branch
