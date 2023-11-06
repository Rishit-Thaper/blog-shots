import React  from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

function Profile() {
  const { author } = useAuthContext();

  console.log('Author:', author?.id);
  return (
    <>
      <div>Name: {author?.name}</div>
      <div>Email: {author?.email}</div>
    </>
  );
}

export default Profile;
