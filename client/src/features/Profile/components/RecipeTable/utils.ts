export const tableColumns = [
  {
    title: 'Name',
    field: 'name'
  },
  {
    title: 'Creation date',
    field: 'createdAt'
  },
  {
    title: 'Comments',
    field: 'commentsCount'
  },
  {
    title: 'Likes',
    field: 'likesCount'
  }
] as const;

export type ColumnFields = (typeof tableColumns)[number]['field'];
