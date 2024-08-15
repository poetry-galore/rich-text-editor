import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import RichTextEditor from "./RichTextEditor";
import "./RichTextEditor.css";

const meta = {
  title: "RichTextEditor",
  component: RichTextEditor,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="relative h-[600px] w-[900px] mx-auto">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    placeholderText: { control: "text" },
    editable: { control: "boolean" },
  },
} satisfies Meta<typeof RichTextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Editor created without passing any props.
 */
export const Default: Story = {};

/**
 * Passing customPlaceholderText prop
 */
export const CustomPlaceholderText: Story = {
  args: {
    placeholderText: "Custom placeholder...",
  },
};

/**
 * Setting the editable prop to false.
 */
export const NotEditable: Story = {
  args: {
    placeholderText: "Not editable",
    editable: false,
  },
};

/**
 * Load editor state from html string.
 */
export const LoadEditorStateFromHTMLString: Story = {
  args: {
    initialEditorState:
      '<p dir="ltr"><span style="white-space: pre-wrap;">L</span><b><strong class="font-bold" style="white-space: pre-wrap;">o</strong></b><i><b><strong class="font-bold italic" style="white-space: pre-wrap;">o</strong></b></i><u><i><b><strong class="font-bold italic underline" style="white-space: pre-wrap;">k</strong></b></i></u><u><b><strong class="font-bold underline" style="white-space: pre-wrap;">at</strong></b></u><u><span class="underline" style="white-space: pre-wrap;">me</span></u><span style="white-space: pre-wrap;">andtellme</span></p><p dir="ltr"><b><strong class="font-bold" style="white-space: pre-wrap;">What can you </strong></b><i><b><strong class="font-bold italic" style="white-space: pre-wrap;">see?</strong></b></i></p>',
  },
};

/**
 * Load editor state from json string.
 */
export const LoadEditorStateFromJSONString: Story = {
  args: {
    initialEditorState: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Rich Text Editor","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
  },
};

/**
 * Passing onEditorChange prop
 */
export const OnEditorChange: Story = {
  args: {
    onEditorChange: [
      {
        onChange: (customEditorState) => {
          console.log(customEditorState.toJSON());
        },
      },
    ],
    initialEditorState:
      '<p dir="ltr"><span style="white-space: pre-wrap;">L</span><b><strong class="font-bold" style="white-space: pre-wrap;">o</strong></b><i><b><strong class="font-bold italic" style="white-space: pre-wrap;">o</strong></b></i><u><i><b><strong class="font-bold italic underline" style="white-space: pre-wrap;">k</strong></b></i></u><u><b><strong class="font-bold underline" style="white-space: pre-wrap;">at</strong></b></u><u><span class="underline" style="white-space: pre-wrap;">me</span></u><span style="white-space: pre-wrap;">andtellme</span></p><p dir="ltr"><b><strong class="font-bold" style="white-space: pre-wrap;">What can you </strong></b><i><b><strong class="font-bold italic" style="white-space: pre-wrap;">see?</strong></b></i></p>',
  },
};

/**
 * Passing onEditorChange prop with the ignoreSelectionChange set to true
 */
export const OnEditorChangeWithIgnoreSelection: Story = {
  args: {
    onEditorChange: [{ onChange: fn(), ignoreSelectionChange: true }],
  },
};

/**
 * Setting the config prop
 */
export const WithConfig: Story = {
  args: {
    editorConfig: {
      plugins: {
        toolbar: {
          register: true,
          textActions: ["bold", "code", "underline", "superscript", "italic"],
          historyActions: ["undo"],
          blockTypes: ["quote"],
        },
        html: true,
        floatingMenu: {
          register: true,
          textActions: ["bold", "italic"],
        },
      },
    },
  },
};
