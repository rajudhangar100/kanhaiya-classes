export default function CTA() {
  return (
    <section className="section-padding px-5">

      <div className="container-width">

        <div className="rounded-[40px] overflow-hidden bg-gradient-to-br from-[#3ED6C1] to-[#2CB5A0] text-white text-center py-20 px-8 relative">

          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-[100px]" />

          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#F4A261]/20 rounded-full blur-[100px]" />

          <h2 className="heading-font text-4xl md:text-6xl font-bold relative z-10">
            Start Your Learning Journey
          </h2>

          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-white/90 relative z-10">
            Give your child the right
            guidance and structured learning
            for a brighter future.
          </p>

          <button className="mt-10 bg-white text-[#2CB5A0] px-8 py-4 rounded-full font-semibold hover:scale-105 transition relative z-10">
            Join Kanhaiya Classes
          </button>
        </div>
      </div>
    </section>
  );
}