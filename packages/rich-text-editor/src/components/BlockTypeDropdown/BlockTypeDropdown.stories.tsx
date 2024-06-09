import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import BlockTypeDropdown from "./BlockTypeDropdown";

const initialConfig = {
  namespace: "BlockTypeDropdownStory",
  onError: fn(),
};

const meta = {
  title: "components/BlockTypeDropdown",
  component: BlockTypeDropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <LexicalComposer initialConfig={initialConfig}>
        <Story />
      </LexicalComposer>
    ),
  ],
} satisfies Meta<typeof BlockTypeDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Without passing any props.
 */
export const Default: Story = {};

/**
 * BlockTypeDropdown in a non-editable editor
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
