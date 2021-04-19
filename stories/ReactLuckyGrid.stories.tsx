import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ReactLuckyGrid, ReactLuckyGridProps } from '../src';

const meta: Meta = {
  title: 'LuckyGrid',
  component: ReactLuckyGrid,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<ReactLuckyGridProps> = args => (
  <ReactLuckyGrid {...args} />
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

const createPrizes = (p: any[]) => {
  const grids = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 2, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ];

  return grids.map((xy, index) => {
    return { ...xy, ...p[index] };
  });
};

const luckyRef = React.createRef<any>();

Default.args = {
  width: 300,
  blocks: [
    {
      background: '#FBEBC9',
      borderRadius: '15px',
      padding: '10px',
    },
    {
      background: '#E96A3D',
      borderRadius: '15px',
      padding: '10px',
    },
  ],
  prizes: createPrizes([
    { fonts: [{ text: '1元红包', top: '40%' }] },
    { fonts: [{ text: '2元红包', top: '40%' }] },
    { fonts: [{ text: '3元红包', top: '40%' }] },
    { fonts: [{ text: '4元红包', top: '40%' }] },
    { fonts: [{ text: '5元红包', top: '40%' }] },
    { fonts: [{ text: '6元红包', top: '40%' }] },
    { fonts: [{ text: '7元红包', top: '40%' }] },
    { fonts: [{ text: '8元红包', top: '40%' }] },
  ]),
  buttons: [
    {
      x: 1,
      y: 1,
      background: 'red',
      fonts: [{ text: '立即抽奖', top: '40%', fontColor: '#fff' }],
    },
  ],
  defaultStyle: {
    fontSize: '14px',
    fontColor: '#88410E',
    background: '#FBEBCB',
    shadow: '2px, 2px, 0.5, #000',
  },
  onStart() {
    if (luckyRef.current) {
      luckyRef.current.play();

      setTimeout(() => {
        luckyRef.current.stop(2);
      }, 2000);
    }
  },
  onEnd() {
    alert('End');
  },
  ref: luckyRef,
} as ReactLuckyGridProps;
