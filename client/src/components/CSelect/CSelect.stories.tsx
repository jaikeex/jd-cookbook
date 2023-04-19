import React from 'react';
import type { StoryFn, Meta } from '@storybook/react';
import type { CSelectProps } from './CSelect';
import { CSelect } from './CSelect';
import { MenuItem } from '@mui/material';

export default {
  title: 'CSelect',
  component: CSelect
} as Meta<typeof CSelect>;

const Template: StoryFn<CSelectProps> = (args) => (
  <CSelect {...args}>
    <MenuItem value={'easy'}>Easy</MenuItem>
    <MenuItem value={'medium'}>Medium</MenuItem>
    <MenuItem value={'hard'}>Hard</MenuItem>
  </CSelect>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Diffculty',
  fullWidth: true
};
