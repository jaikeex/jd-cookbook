import RecipeTable from 'components/RecipeTable/RecipeTable';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RootState } from 'store';

export interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = (props): JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.user);
  const params = useParams();

  const isOwnProfile = user?._id === params._id;

  return (
    <div>
      <RecipeTable userId={params._id || ''} />
    </div>
  );
};

export default ProfilePage;
