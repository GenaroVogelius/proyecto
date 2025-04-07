import type { Meta, StoryObj } from '@storybook/react';
import TypeWritter from './TypeWritter';

const meta: Meta<typeof TypeWritter> = {
  title: 'Components/TypeWritter',
  component: TypeWritter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TypeWritter>;

export const Default: Story = {
  args: {
    words: [{
      text: 'Hello World!'
    }],
  },
};



export const LongText: Story = {
  args: {
    words: [{
      text: 'This is a longer text that demonstrates how the typewriter effect works with multiple lines of content.'
    }],
  },
};

export const StyledText: Story = {
  args: {
    words: [
      { text: 'Normal ' },
      { text: 'Bold', className: 'font-bold' },
      { text: ' and ' },
      { text: 'Colored', className: 'text-purple-500' }
    ],
  },
}; 