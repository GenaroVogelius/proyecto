import type { Meta, StoryObj } from "@storybook/react";
import Table from "./Table";
import TableHeader from "./TableHeader/TableHeader";
import OrderBookRows from "./OrderBookRows/OrderBookRows";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ["autodocs"],
};

export default meta; 

type Story = StoryObj<typeof Table>;

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
    children: (
      <>
        <TableHeader />
        <OrderBookRows rows={{ bids: sampleBids, asks: [] }} />
      </>
    ),
  },
};

export const WithAsks: Story = {
  args: {
    children: (
      <>
        <TableHeader />
        <OrderBookRows rows={{ bids: [], asks: sampleAsks }} />
      </>
    ),
  },
};

export const WithBoth: Story = {
  args: {
    children: (
      <>
        <TableHeader />
        <OrderBookRows rows={{ bids: sampleBids, asks: sampleAsks }} />
      </>
    ),
  },
};

export const Empty: Story = {
  args: {
    children: (
      <>
        <TableHeader />
        <OrderBookRows rows={{ bids: [], asks: [] }} />
      </>
    ),
  },
};

