import { CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import type { Recipe } from 'core/types';
import * as Styled from './styles';

export type RecipeCardProps = (
  | {
      href: string;
      isLink: boolean;
    }
  | {
      href?: never;
      isLink?: never;
    }
) & {
  recipe: Recipe;
};

const RecipeCard: React.FC<RecipeCardProps> = ({ isLink = false, href = '', recipe }): JSX.Element => {
  const innerProps = isLink
    ? {
        LinkComponent: Link,
        to: href
      }
    : {};

  return (
    <Styled.Card>
      <CardActionArea {...innerProps} disableRipple>
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
        <Styled.CardContent>
          <Typography variant="button" textAlign="center">
            {recipe.name}
          </Typography>
        </Styled.CardContent>
      </CardActionArea>
    </Styled.Card>
  );
};

export default RecipeCard;
