import type { Meta, StoryObj } from "@storybook/react";
import OrderBookRows from "./OrderBookRows";

const meta: Meta<typeof OrderBookRows> = {
  title: "Components/Table/OrderBookRows",
  component: OrderBookRows,
  parameters: {
    layout: 'centered',
  },
  tags: ["autodocs"],
};

export default meta; 

type Story = StoryObj<typeof OrderBookRows>;

const sampleBids: [string, string][] = [
  ['83,466.7', '21,041'],
  ['83,465.0', '48,900'],
  ['83,464.3', '76,984'],
  ['83,464.2', '61,587'],
  ['83,464.0', '153,973'],
];

const sampleAsks: [string, string][] = [
  ['83,438.0', '116,676'],
  ['83,437.5', '137,497'],
  ['83,437.0', '89,123'],
  ['83,436.5', '45,678'],
  ['83,436.0', '92,345'],
];

export const WithBids: Story = {
  args: {
    rows: {
      bids: sampleBids,
      asks: [],
    },
  },
};

export const WithAsks: Story = {
  args: {
    rows: {
      bids: [],
      asks: sampleAsks,
    },
  },
};

export const WithBoth: Story = {
  args: {
    rows: {
      bids: sampleBids,
      asks: sampleAsks,
    },
  },
};

