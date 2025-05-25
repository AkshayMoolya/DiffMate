import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Github, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export const FooterSection = () => {
  return (
    <footer className="py-12 px-6 border-t bg-muted/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">DiffChecker Pro</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Professional text and file comparison tool for developers,
              writers, and teams.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/compare" className="hover:text-foreground">
                  Text Compare
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-foreground">
                  File Compare
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-foreground">
                  Folder Compare
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  API Access
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <Button size="sm" variant="outline">
                <Github className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 DiffChecker Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
