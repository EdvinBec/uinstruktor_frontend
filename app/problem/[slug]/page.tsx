'use client';
import { fetchProblem } from '@/lib/code';
import { ApiResponseData, CodeProblem } from '@/types';
import React, { useEffect, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProblemPage = ({ params }: { params: { slug: string } }) => {
  const [problem, setProblem] = useState<CodeProblem>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchProblem('0bf67ec5a8d41cff38c953d3').then((response) => {
      setProblem(response);
    });
  }, [params.slug]);

  if (loading || !problem) {
    return <div>Loading</div>;
  }

  return (
    <div className="p-2 flex flex-row">
      <Tabs defaultValue="desc" className="w-1/2">
        <TabsList>
          <TabsTrigger color="red" value="details">
            Details
          </TabsTrigger>
          <TabsTrigger value="testCases">Tests</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <div className="p-2 ">
            <h1 className="text-4xl">{problem?.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: problem?.description }} />
          </div>
        </TabsContent>
        <TabsContent value="testCases">
          <div className="p-2">
            <h2 className="text-3xl">Test cases:</h2>
          </div>
        </TabsContent>
      </Tabs>
      <div className="w-1/2"></div>
    </div>
  );
};

export default ProblemPage;
