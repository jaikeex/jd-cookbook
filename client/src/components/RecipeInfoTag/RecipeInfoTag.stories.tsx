import React from 'react';
import type { StoryFn, Meta } from '@storybook/react';
import type { RecipeInfoTagProps } from './RecipeInfoTag';
import RecipeInfoTag from './RecipeInfoTag';
import { GirlOutlined } from '@mui/icons-material';

export default {
  title: 'RecipeInfoTag',
  component: RecipeInfoTag
} as Meta<typeof RecipeInfoTag>;

const Template: StoryFn<RecipeInfoTagProps> = (args) => <RecipeInfoTag {...args}>Medium</RecipeInfoTag>;

export const Default = Template.bind({});
Default.args = {
  icon: <GirlOutlined />
};
