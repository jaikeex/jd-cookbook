const breakpoints = {
  xs: '425px',
  sm: '768px',
  md: '1366px',
  lg: '1920px',
  xl: '2300px'
};

export const device = {
  xs: `@media screen and (min-width: ${breakpoints.xs})`,
  sm: `@media screen and (min-width: ${breakpoints.sm})`,
  md: `@media screen and (min-width: ${breakpoints.md})`,
  lg: `@media screen and (min-width: ${breakpoints.lg})`,
  xl: `@media screen and (min-width: ${breakpoints.xl})`
};
