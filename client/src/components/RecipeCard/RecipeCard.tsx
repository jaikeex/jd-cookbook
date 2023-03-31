import { ExpandMore, Favorite, MoreVert, Share } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Collapse,
  Button,
  Box
} from '@mui/material';
import { red } from '@mui/material/colors';
import FlexBetween from 'components/FlexBetween/FlexBetween';
import * as React from 'react';
import type { Recipe } from 'types';

export interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }): JSX.Element => {
  // console.log(recipe);

  return (
    <Card sx={{ maxWidth: '20rem' }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={recipe.user.avatar} />}
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={recipe.name}
        subheader={new Date(+recipe.createdAt).toDateString()}
      />
      <CardMedia component="img" height="194" image={recipe.picturePath} alt={recipe.name} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {recipe.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
        <div>
          <IconButton aria-label="add to favorites">
            <Favorite />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </div>
        <Button variant="outlined">View recipe</Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
