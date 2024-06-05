import type { Meta, StoryObj } from "@storybook/react";
import RichTextEditor from "./RichTextEditor";
import "./RichTextEditor.css";

const meta = {
  title: "RichTextEditor",
  component: RichTextEditor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="relative h-[500px] w-[800px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    placeholderText: { control: "text" },
    editable: { control: "boolean" }
  }
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
