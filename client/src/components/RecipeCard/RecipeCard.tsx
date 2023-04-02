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
  Box,
  CardActionArea
} from '@mui/material';
import { red } from '@mui/material/colors';
import FlexBetween from 'components/FlexBetween/FlexBetween';
import * as React from 'react';
import { Link } from 'react-router-dom';
import type { Recipe } from 'types';

export interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }): JSX.Element => {
  return (
    <Card
      sx={{
        width: '20rem',
        display: 'flex',
        flexDirection: 'column',
        '& .MuiCardHeader-subheader': {
          fontSize: '0.75rem'
        }
      }}
    >
      {/* @ts-ignore: material ui types do not know the "to" prop */}
      <CardActionArea LinkComponent={Link} to={`/recipe/${recipe._id}`} disableRipple>
        {recipe.picturePath ? (
          <CardMedia
            sx={{ objectFit: 'cover' }}
            component="img"
            height="200"
            image={recipe.picturePath}
            alt={recipe.name}
          />
        ) : (
          <CardContent sx={{ height: '200px' }}>
            <Typography variant="body2">{recipe.description}</Typography>
          </CardContent>
        )}
        <CardContent sx={{ py: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="button" textAlign="center">
            {recipe.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
