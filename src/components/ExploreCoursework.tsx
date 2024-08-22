import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for coursework examples
const courseworkExamples = {
  essays: [
    {
      id: 1,
      title: "The Impact of Climate Change",
      subject: "Environmental Science",
    },
    {
      id: 2,
      title: "Shakespeare's Use of Metaphor",
      subject: "English Literature",
    },
    { id: 3, title: "The French Revolution", subject: "History" },
  ],
  researchPapers: [
    {
      id: 4,
      title: "Advancements in Quantum Computing",
      subject: "Computer Science",
    },
    {
      id: 5,
      title: "The Effects of Social Media on Mental Health",
      subject: "Psychology",
    },
    { id: 6, title: "Sustainable Energy Solutions", subject: "Engineering" },
  ],
  caseStudies: [
    { id: 7, title: "Tesla's Market Strategy", subject: "Business" },
    { id: 8, title: "The 2008 Financial Crisis", subject: "Economics" },
    {
      id: 9,
      title: "Healthcare Reform in the US",
      subject: "Political Science",
    },
  ],
};

const ExploreCoursework: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Explore Coursework</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="essays">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="essays">Essays</TabsTrigger>
            <TabsTrigger value="researchPapers">Research Papers</TabsTrigger>
            <TabsTrigger value="caseStudies">Case Studies</TabsTrigger>
          </TabsList>
          {Object.entries(courseworkExamples).map(([category, examples]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {examples.map((example) => (
                  <Card key={example.id}>
                    <CardHeader>
                      <CardTitle className="text-sm">{example.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">{example.subject}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExploreCoursework;
