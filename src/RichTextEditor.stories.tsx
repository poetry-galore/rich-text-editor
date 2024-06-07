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
      <div className="relative h-[500px] container">
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
 * Passing onChange prop
 */
export const RegisterOnEditorChange: Story = {
  args: {
    onEditorChange: [fn()]
  }
}

/**
 * Passing setEditorState prop
 */
export const PassSetEditorStateProp: Story = {
  args: {
    setEditorState: fn()
  }
}

/**
 * Passing setEditorState and onEditorChange props
 */
export const OnEditorChangeAndSetEditorChange: Story = {
  args: {
    setEditorState: fn(),
    onEditorChange: [fn()]
  }
}
