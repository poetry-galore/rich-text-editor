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
      '<p dir="ltr"><span style="white-space: pre-wrap;">Can I have that </span></p><p dir="ltr"><b><strong class="font-bold" style="white-space: pre-wrap;">Looking at the same place</strong></b></p><p dir="ltr"><i><b><strong class="font-bold italic" style="white-space: pre-wrap;">Can</strong></b></i></p>',
  },
};

/**
 * Passing onEditorChange prop
 */
export const OnEditorChange: Story = {
  args: {
    onEditorChange: [{ onChange: fn() }],
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
 * Passing setIsEmpty prop
 */
export const PassOnChange: Story = {
  args: {
    onChange: fn(),
  },
};

/**
 * Passing setEditorStateJSON, setEditorStateHTML and onEditorChange props
 */
export const OnEditorChangeAndSetEditorState: Story = {
  args: {
    onEditorChange: [{ onChange: fn() }],
  },
};
