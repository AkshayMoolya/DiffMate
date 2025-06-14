import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Github, Twitter, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const FooterSection = () => {
  return (
    <footer className="py-12 px-6 border-t border-indigo-900/30 relative">
      {/* Removed space-bg class as it's now in the parent container */}

      {/* Enhanced star effects */}
      <div className="cosmic-dust absolute inset-0 opacity-15 z-0"></div>

      <motion.div
        className="nebula absolute w-[60rem] h-[60rem] opacity-50 left-[50%] top-[50%] z-0"
        style={{
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, var(--nebula1), var(--nebula2) 70%, transparent)",
        }}
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="container mx-auto relative z-10 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="flex items-center space-x-3 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-700 rounded-lg flex items-center justify-center sci-fi-glow">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold sci-fi-text">DiffMate</span>
            </motion.div>
            <p className="text-blue-300 text-sm">
              Professional text and file comparison tool for developers,
              writers, and teams.
            </p>
          </motion.div>

          {/* Enhanced footer columns with animation */}
          {[
            {
              title: "Product",
              links: [
                { name: "Text Compare", href: "/compare" },
                { name: "File Compare", href: "/compare" },
                { name: "Folder Compare", href: "/compare" },
                { name: "API Access", href: "#" },
              ],
            },
            {
              title: "Resources",
              links: [
                { name: "Documentation", href: "#" },
                { name: "Tutorials", href: "#" },
                { name: "Blog", href: "#" },
                { name: "Support", href: "#" },
              ],
            },
          ].map((column, idx) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
            >
              <h4 className="font-semibold mb-4 text-blue-100">
                {column.title}
              </h4>
              <ul className="space-y-3 text-sm text-blue-400">
                {column.links.map((link, linkIdx) => (
                  <motion.li
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className="hover:text-blue-200 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-semibold mb-4 text-blue-100">Connect</h4>
            <div className="flex space-x-4">
              {[Github, Twitter, Mail].map((Icon, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-indigo-400 hover:border-indigo-500 hover:bg-indigo-100 hover:text-indigo-700 sci-fi-glow dark:border-indigo-700 dark:hover:border-indigo-500 dark:hover:bg-indigo-900/50"
                  >
                    <Icon className="w-4 h-4 text-indigo-700 dark:text-indigo-300" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t mt-10 pt-8 text-center text-sm text-blue-300 border-indigo-900/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p>&copy;{new Date().getFullYear()} DiffMate. All rights reserved.</p>

          <div className="mt-4 flex justify-center items-center flex-wrap gap-2">
            <span>Made with ❤️ by Akshay</span>
            <div className="flex space-x-3 items-center">
              <motion.a
                href="https://github.com/AkshayMoolya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-100 inline-flex items-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Github className="w-4 h-4 mr-1" />
                <span>GitHub</span>
              </motion.a>

              <motion.a
                href="https://akshay33.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-100 inline-flex items-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                <span>Portfolio</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
