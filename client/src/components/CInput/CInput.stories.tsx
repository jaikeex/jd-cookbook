import React from 'react';
import type { StoryFn, Meta } from '@storybook/react';
import type { CInputProps } from './CInput';
import { CInput } from './CInput';

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
