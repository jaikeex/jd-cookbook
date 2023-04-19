import React from 'react';
import type { StoryFn, Meta } from '@storybook/react';
import type { LikeButtonProps } from './LikeButton';
import LikeButton from './LikeButton';

export default {
  title: 'LikeButton',
  component: LikeButton
} as Meta<typeof LikeButton>;

const Template: StoryFn<LikeButtonProps> = (args) => <LikeButton {...args} />;

export const Default = Template.bind({});
Default.args = {};
