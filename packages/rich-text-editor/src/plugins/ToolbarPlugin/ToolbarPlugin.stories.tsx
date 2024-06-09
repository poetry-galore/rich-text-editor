import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { LexicalComposer } from "@lexical/react/LexicalComposer";

import ToolbarPlugin from "./ToolbarPlugin";

const initialConfig = {
  namespace: "ToolbarPluginStory",
  onError: fn(),
};

const meta = {
  title: "plugins/ToolbarPlugin",
  component: ToolbarPlugin,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <LexicalComposer initialConfig={initialConfig}>
        <Story />
      </LexicalComposer>
    ),
  ],
} satisfies Meta<typeof ToolbarPlugin>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Without passing any props.
 */
export const Default: Story = {};

/**
 * ToolbarPlugin in a non-editable editor
 */
export const NoneEditable: Story = {
  decorators: [
    (Story) => (
      <LexicalComposer
        initialConfig={{
          ...initialConfig,
          editable: false,
        }}
      >
        <Story />
      </LexicalComposer>
    ),
  ],
};
