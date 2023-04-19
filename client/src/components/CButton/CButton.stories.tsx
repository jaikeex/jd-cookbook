import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { CButton } from './CButton';
import type { CButtonProps } from './CButton';

export default {
  title: 'CButton',
  component: CButton
} as Meta<typeof CButton>;

const Template: StoryFn<CButtonProps> = (args) => <CButton {...args}>Button</CButton>;

export const Default = Template.bind({});
Default.args = {
  primary: true
};
