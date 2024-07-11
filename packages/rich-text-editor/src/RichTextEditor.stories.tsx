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
 * Passing setEditorStateJSON prop
 */
export const PassSetEditorStateJSONProp: Story = {
  args: {
    setEditorStateJSON: fn(),
  },
};

/**
 * Passing setEditorStateHTML prop
 */
export const PassSetEditorStateHTMLProp: Story = {
  args: {
    setEditorStateHTML: fn(),
  },
};

/**
 * Passing setEditorStateJSON, setEditorStateHTML and onEditorChange props
 */
export const OnEditorChangeAndSetEditorState: Story = {
  args: {
    setEditorStateJSON: fn(),
    setEditorStateHTML: fn(),
    onEditorChange: [{ onChange: fn() }],
  },
};
