import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import HistoryActions from "./HistoryActions";

import { LexicalComposer } from "@lexical/react/LexicalComposer";

const meta = {
  title: "components/HistoryActions",
  component: HistoryActions,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <LexicalComposer
        initialConfig={{
          namespace: "HistoryActionsStory",
          onError: fn(),
        }}
      >
        <Story />
      </LexicalComposer>
    ),
  ],
} satisfies Meta<typeof HistoryActions>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Without passing any props
 */
export const Default: Story = {};

export const WithSeparator: Story = {
  args: {
    separator: true,
  },
};

export const WithConfigUndoOnly: Story = {
  args: {
    config: ["undo"],
  },
};

export const WithConfigRedoOnly: Story = {
  args: {
    config: ["redo"],
  },
};

export const WithConfigUndoAndRedo: Story = {
  args: {
    config: ["undo", "redo"],
  },
};
