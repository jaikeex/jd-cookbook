import React from 'react';
import type { StoryFn, Meta } from '@storybook/react';
import type { PasswordInputProps } from './PasswordInput';
import { PasswordInput } from './PasswordInput';

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
