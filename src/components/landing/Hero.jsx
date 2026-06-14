"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router=useRouter();
  function handleJoin(){
    router.push("/student/register");
  }
  function handleExplore(){
    router.push("#about");
  }
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
            {/* <button onClick={handleJoin} className="bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] hover:scale-[1.03] transition duration-300 text-white px-8 py-4 rounded-full font-semibold shadow-lg">
              Join Us
            </button> */}

          </div>
          {/* Quick Contact */}
{/* Quick Contact */}
<div className="mt-12 flex justify-center md:justify-start">

  <a
    href="tel:+916366645045"
    className="group inline-flex items-center gap-4 bg-white/80 backdrop-blur-md border border-[#3ED6C1]/20 hover:border-[#3ED6C1] rounded-3xl px-5 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
  >
    <div className="w-14 h-14 rounded-2xl bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] flex items-center justify-center text-white text-2xl shadow-md group-hover:rotate-12 transition-transform duration-300">
      📞
    </div>

    <div>
      <p className="text-sm text-gray-500 font-medium">
        Call Us Now
      </p>

      <h3 className="text-lg md:text-xl font-bold text-[#163232]">
        +91 63666 45045
      </h3>
    </div>

    <div className="ml-2 text-[#2CB5A0] font-semibold text-sm hidden sm:block">
      Tap to Call →
    </div>
  </a>

</div>

          {/* Mini Stats */}
          {/* <div className="flex gap-8 mt-10">
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
          </div> */}
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

  {/* 1. Added aspect-square and forced the glass wrapper to be a perfect circle */}
  <div className="glass rounded-full p-2 shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
    <div className="w-[380px] h-[380px] rounded-full overflow-hidden aspect-square">
      <Image
        src="/logo.png"
        alt="Kanhaiya Classes"
        width={380}
        height={380}
        // 2. Added object-cover and forced the image element into a circle
        className="rounded-full object-cover w-full h-full"
      />
    </div>
  </div>
</motion.div>
      </div>
    </section>
  );
}