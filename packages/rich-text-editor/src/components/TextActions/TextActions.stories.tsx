import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { LexicalComposer } from "@lexical/react/LexicalComposer";

import TextActions from "./TextActions";

const initialConfig = {
  namespace: "TextActionsStory",
  onError: fn(),
};

const meta = {
  title: "components/TextActions",
  component: TextActions,
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
} satisfies Meta<typeof TextActions>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Without passing any props.
 */
export const Default: Story = {};

/**
 * TextActions in a non-editable editor
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

export const WithConfig: Story = {
  args: {
    config: ["bold", "italic", "strikethrough"],
  },
};
