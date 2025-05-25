import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, FileText, GitBranch, Users } from "lucide-react";

export const UseCasesSection = () => {
  const useCases = [
    {
      icon: <Code className="w-8 h-8 text-blue-600" />,
      title: "Code Reviews",
      description:
        "Perfect for reviewing code changes, pull requests, and version comparisons",
      users: "Developers",
    },
    {
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "Document Editing",
      description:
        "Track changes in documents, contracts, and collaborative writing",
      users: "Writers & Editors",
    },
    {
      icon: <GitBranch className="w-8 h-8 text-purple-600" />,
      title: "Version Control",
      description:
        "Compare different versions of files and track evolution over time",
      users: "Project Managers",
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "Team Collaboration",
      description: "Share and discuss changes with team members efficiently",
      users: "Teams",
    },
  ];

  return (
    <section id="use-cases" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Perfect for Every Use Case
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From code reviews to document editing, DiffChecker Pro adapts to
            your workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">{useCase.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {useCase.description}
                </p>
                <Badge variant="secondary">{useCase.users}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
