import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { CInput, CInputProps } from './CInput';

export default {
  title: 'CInput',
  component: CInput
} as Meta<typeof CInput>;

const Template: StoryFn<CInputProps> = (args) => <CInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'username',
  placeholder: 'Start typing...'
};
