import type { Meta, StoryObj } from "@storybook/react";
import OrderBookRow from "./OrderBookRow";

const meta: Meta<typeof OrderBookRow> = {
  title: "Components/Table/OrderBookRows/OrderBookRow",
  component: OrderBookRow,
  tags: ["autodocs"],
};

export default meta; 

type Story = StoryObj<typeof OrderBookRow>;

export const Active: Story = {
  args: {
    price: "10", 
    quantity : "20", 
    color : "red", 
    barWidth : 100,
  },
};

