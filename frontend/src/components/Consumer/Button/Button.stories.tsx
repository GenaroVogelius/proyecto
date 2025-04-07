import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Consumer/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onTap: { action: 'tapped' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Click me',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const WithCustomText: Story = {
  args: {
    children: 'Custom Button Text',
  },
};

export const WithTapHandler: Story = {
  args: {
    children: 'Tap Me',
    onTap: () => console.log('Button tapped!'),
  },
}; 