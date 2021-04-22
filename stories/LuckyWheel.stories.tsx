import React from 'react';
import { Meta, Story } from '@storybook/react';
import { LuckyWheel, LuckyWheelProps } from '../src';

const meta: Meta = {
  title: 'LuckyWheel',
  component: LuckyWheel,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<LuckyWheelProps> = args => <LuckyWheel {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

const createPrizes = (p: any[]) => {
  return p.map((item, index) => {
    return { ...item, background: index % 2 == 0 ? '#f8d384' : '#f9e3bb' };
  });
};

const luckyRef = React.createRef<any>();

Default.args = {
  width: 300,
  blocks: [
    {
      background: '#FBEBC9',
      padding: '10px',
    },
    {
      background: '#E96A3D',
      padding: '10px',
    },
  ],
  prizes: createPrizes([
    { fonts: [{ text: '1元红包', top: '20%' }] },
    { fonts: [{ text: '2元红包', top: '20%' }] },
    { fonts: [{ text: '3元红包', top: '20%' }] },
    { fonts: [{ text: '4元红包', top: '20%' }] },
    { fonts: [{ text: '5元红包', top: '20%' }] },
    { fonts: [{ text: '6元红包', top: '20%' }] },
    { fonts: [{ text: '7元红包', top: '20%' }] },
    { fonts: [{ text: '8元红包', top: '20%' }] },
  ]),
  buttons: [
    { radius: '40px', background: '#d64737' },
    { radius: '35px', background: '#f6c66f', pointer: true },
    {
      radius: '30px',
      background: '#fff',
      fonts: [{ text: '开始', top: '-13px' }],
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
} as LuckyWheelProps;
