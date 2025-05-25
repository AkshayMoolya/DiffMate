import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer",
      company: "TechCorp",
      content:
        "This diff checker has revolutionized our code review process. The visual clarity is unmatched.",
      rating: 5,
    },
    {
      name: "Mike Rodriguez",
      role: "Technical Writer",
      company: "DocuFlow",
      content:
        "Finally, a diff tool that makes document comparison actually enjoyable. Love the clean interface.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Project Manager",
      company: "StartupXYZ",
      content:
        "The folder comparison feature saved us hours of manual work. Incredibly powerful yet simple.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Loved by Professionals</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what developers, writers, and teams are saying about DiffChecker
            Pro
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
