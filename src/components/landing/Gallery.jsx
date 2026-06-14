import SectionHeading from "../common/SectionHeading";
import AnimatedSection from "../common/AnimatedSection";

const images = [
  "/pic1.png",
  "/pic5.png",
  "/pic6.png",
  "/pic3.png",
  "/pic4.png",
  "/pic2.png",
];

export default function Gallery() {
  return (
    <section className="section-padding bg-white">

      <div className="container-width px-5">

        <SectionHeading
          badge="Gallery"
          title="Life At Kanhaiya Classes"
          description="A glimpse into our learning environment and student growth journey."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

          {images.map((image, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.1}
            >
              <div className="rounded-[30px] overflow-hidden shadow-lg hover:scale-[1.03] transition duration-500">

                <img
                  src={image}
                  alt="gallery"
                  className="w-full h-[250px] object-cover"
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}