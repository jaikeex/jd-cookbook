import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import LikeButton, { LikeButtonProps } from './LikeButton';

export default {
  title: 'LikeButton',
  component: LikeButton
} as Meta<typeof LikeButton>;

const Template: StoryFn<LikeButtonProps> = (args) => <LikeButton {...args} />;

export const Default = Template.bind({});
Default.args = {};
