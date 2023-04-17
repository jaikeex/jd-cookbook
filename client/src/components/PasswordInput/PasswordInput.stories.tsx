import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { PasswordInput, PasswordInputProps } from './PasswordInput';

export default {
  title: 'PasswordInput',
  component: PasswordInput
} as Meta<typeof PasswordInput>;

const Template: StoryFn<PasswordInputProps> = (args) => <PasswordInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'password',
  placeholder: 'Start typing...'
};
