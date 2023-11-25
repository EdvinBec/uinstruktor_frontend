import EditorPage from '@/components/ui/editor';
import React from 'react';

const page = ({ params }: { params: { id: string } }) => {
  return <EditorPage assigmentID={params.id}/>;
};

export default page;
