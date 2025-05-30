import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";

export const CtaSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Transform Your Workflow?
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Compare text, files, folders, and even GitHub commits. Join thousands
          of professionals who trust DiffMate for their comparison needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8"
            asChild
          >
            <Link href="/compare">
              Start Comparing Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          {/* <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Desktop App
          </Button> */}
        </div>
      </div>
    </section>
  );
};
