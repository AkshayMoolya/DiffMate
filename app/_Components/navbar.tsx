import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav className="border-b border-indigo-900/30 bg-space-dark/90 backdrop-blur supports-[backdrop-filter]:bg-space-dark/60 fixed top-0 z-50 w-full">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-700 rounded-lg flex items-center justify-center sci-fi-glow">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <motion.span
                className="text-xl font-bold sci-fi-text"
                animate={{
                  textShadow: [
                    "0 0 5px rgba(98, 54, 255, 0.3)",
                    "0 0 10px rgba(98, 54, 255, 0.6)",
                    "0 0 5px rgba(98, 54, 255, 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                DiffMate
              </motion.span>
            </motion.div>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {["Features", "Use Cases"].map((item, index) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-blue-300 hover:text-blue-100 transition-colors"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
            <ThemeToggle />
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                asChild
                className="sci-fi-glow bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none"
              >
                <Link href="/compare">Get Started</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
