"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative hero-gradient min-h-screen overflow-hidden flex items-center pt-40">

      {/* Floating Blobs */}
      <div className="absolute top-10 -left-20 w-72 h-72 bg-[#3ED6C1]/20 rounded-full blur-[120px]" />

      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#F4A261]/20 rounded-full blur-[140px]" />

      <div className="container-width px-5 grid md:grid-cols-2 gap-10 items-center">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="bg-[#3ED6C1]/15 text-[#2CB5A0] px-4 py-2 rounded-full text-sm font-medium">
            Trusted Coaching for Future Success
          </span>

          <h1 className="heading-font text-[44px] md:text-7xl leading-[1.1] mt-5 font-bold text-[#163232]">
              Shaping Future
            <span className="gradient-text">
              {" "}Bright Minds
            </span>
          </h1>

          <p className="text-gray-600 mt-5 text-base md:text-lg leading-8 max-w-xl"> 
            From 1st to 12th Commerce, we
            provide expert guidance, regular
            tests, performance tracking, and
            personalized growth for every
            student.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] hover:scale-[1.03] transition duration-300 text-white px-8 py-4 rounded-full font-semibold shadow-lg">
              Join Us
            </button>

            <button className="border border-[#3ED6C1] text-[#3ED6C1] px-8 py-4 rounded-full font-semibold hover:bg-[#3ED6C1] hover:text-white transition duration-300">
              Explore
            </button>
          </div>

          {/* Mini Stats */}
          <div className="flex gap-8 mt-10">
            <div>
              <h3 className="font-bold text-2xl text-[#163232]">
                500+
              </h3>
              <p className="text-gray-500">
                Students
              </p>
            </div>

            <div>
              <h3 className="font-bold text-2xl text-[#163232]">
                98%
              </h3>
              <p className="text-gray-500">
                Success Rate
              </p>
            </div>

            <div>
              <h3 className="font-bold text-2xl text-[#163232]">
                12+
              </h3>
              <p className="text-gray-500">
                Years
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="relative flex justify-center"
        >
          <div className="absolute w-87.5 h-87.5 rounded-full bg-[#3ED6C1]/20 blur-[120px]" />

          <div className="glass rounded-[40px] p-5 shadow-2xl">
            <Image
              src="/logo.png"
              alt="Kanhaiya Classes"
              width={380}
              height={380}
              className="rounded-[30px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}