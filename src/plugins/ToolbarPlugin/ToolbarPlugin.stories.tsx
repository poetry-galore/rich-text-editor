import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { LexicalComposer } from "@lexical/react/LexicalComposer";

import ToolbarPlugin from "./ToolbarPlugin";

const meta = {
    title: "plugins/ToolbarPlugin",
    component: ToolbarPlugin,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <LexicalComposer
                initialConfig={{
                    namespace: "ToolbarPluginStory",
                    onError: fn(),
                }}
            >
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
