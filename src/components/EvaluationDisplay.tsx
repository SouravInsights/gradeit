import React, { useEffect } from "react";
import useEssayEvaluationStore from "@/store/essayEvaluationStore";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const EvaluationDisplay: React.FC = () => {
  const {
    evaluationResult,
    setEvaluationResult,
    isLoading,
    isEvaluationRequested,
  } = useEssayEvaluationStore();

  useEffect(() => {
    if (isEvaluationRequested && !evaluationResult && !isLoading) {
      // Simulate API call with dummy data
      const dummyData = {
        overallScore: Math.floor(Math.random() * 41) + 60, // Random score between 60-100
        criteriaScores: {
          A: Math.floor(Math.random() * 41) + 60,
          B: Math.floor(Math.random() * 41) + 60,
          C: Math.floor(Math.random() * 41) + 60,
        },
        evaluationDate: new Date().toISOString(),
      };

      // Set the dummy data in the store
      setEvaluationResult(dummyData);
    }
  }, [isEvaluationRequested, isLoading, evaluationResult, setEvaluationResult]);

  if (!isEvaluationRequested) {
    return null;
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Evaluation Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Skeleton className="w-32 h-32 rounded-full mx-auto" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  if (!evaluationResult) {
    return <div>Loading evaluation results...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evaluation Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              <Progress
                value={evaluationResult.overallScore}
                className="w-32 h-32"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">
                  {evaluationResult.overallScore}%
                </span>
              </div>
            </div>
            <span className="mt-2 text-sm text-gray-500">Overall Score</span>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Score Breakdown</h3>
            {Object.entries(evaluationResult.criteriaScores).map(
              ([criteria, score]) => (
                <div key={criteria} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span>Criteria {criteria}</span>
                    <span className="font-medium">{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              )
            )}
          </div>

          <div className="text-sm text-gray-600">
            Evaluation Date:{" "}
            {new Date(evaluationResult.evaluationDate).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvaluationDisplay;
