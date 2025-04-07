import type { Meta, StoryObj } from '@storybook/react';
import Consumer from './Consumer';

const meta: Meta<typeof Consumer> = {
  title: 'Components/Consumer',
  component: Consumer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Consumer>;

export const Default: Story = {
  args: {
    roomName: 1,
  },
}; 
    
