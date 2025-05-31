import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const CtaSection = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden ">
      {/* Removed space-bg class as it's now in the parent container */}

      {/* Cosmic dust */}
      <div className="cosmic-dust absolute inset-0 z-0"></div>

      {/* Comets */}
      <div
        className="comet absolute top-[25%] right-[30%]"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div
        className="comet absolute bottom-[35%] left-[25%]"
        style={{ animationDelay: "4.5s" }}
      ></div>

      {/* Enhanced nebula effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <motion.div
          className="absolute w-[80rem] h-[80rem] rounded-full  opacity-10"
          style={{
            background:
              "linear-gradient(135deg, var(--space-accent) 0%, var(--nebula1) 50%, var(--nebula3) 100%)",
            filter: "blur(100px)",
          }}
          animate={{
            x: ["-30%", "0%", "-30%"],
            y: ["5%", "15%", "5%"],
            scale: [1, 1.3, 1],
            borderRadius: [
              "60% 40% 70% 30% / 50% 60% 40% 50%",
              "40% 60% 30% 70% / 60% 40% 60% 50%",
              "60% 40% 70% 30% / 50% 60% 40% 50%",
            ],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white px-2 sm:px-0"
        >
          Ready to{" "}
          <motion.span
            className="sci-fi-text inline-block"
            animate={{
              textShadow: [
                "0 0 10px rgba(98, 54, 255, 0.3)",
                "0 0 20px rgba(98, 54, 255, 0.7)",
                "0 0 10px rgba(98, 54, 255, 0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Transform
          </motion.span>{" "}
          Your Workflow?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-10 text-blue-200 max-w-2xl mx-auto leading-relaxed px-3 sm:px-0"
        >
          Compare text, files, folders, and even GitHub commits. Join thousands
          of professionals who trust DiffMate for their comparison needs.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Button
            size="lg"
            variant="default"
            className="text-lg px-10 py-6 sci-fi-glow bg-indigo-600 hover:bg-indigo-700 border-none group"
            asChild
          >
            <Link href="/compare">
              <motion.div
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Start Comparing Now
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.div>
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
        </motion.div>
      </div>
    </section>
  );
};
