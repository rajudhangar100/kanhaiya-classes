"use client";

import "swiper/css";
import "swiper/css/autoplay";

import { Swiper, SwiperSlide } from "swiper/react";
import SectionHeading from "../common/SectionHeading";

const testimonials = [
  {
    name: "Rohit Parent",
    review:
      "Kanhaiya Classes helped my child improve confidence and marks significantly.",
  },
  {
    name: "Student Parent",
    review:
      "Excellent guidance and proper test system. Highly recommended.",
  },
  {
    name: "Commerce Student",
    review:
      "Very supportive teachers and amazing learning environment.",
  },{
    name: "Rohit Parent",
    review:
      "Kanhaiya Classes helped my child improve confidence and marks significantly.",
  },
  {
    name: "Student Parent",
    review:
      "Excellent guidance and proper test system. Highly recommended.",
  },
  {
    name: "Commerce Student",
    review:
      "Very supportive teachers and amazing learning environment.",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-[#FAFAFA]">
      <div className="container-width px-5">

        <SectionHeading
          badge="Testimonials"
          title="What Parents & Students Say"
          description="Trusted by students and parents for quality education."
        />

        <Swiper
          spaceBetween={20}
          slidesPerView={1.2}
          loop
          autoplay={{
            delay: 2500,
          }}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-[35px] p-8 shadow-lg min-h-[250px]">

                <h3 className="font-bold text-xl text-[#163232]">
                  {item.name}
                </h3>

                <p className="text-gray-500 mt-5 leading-8">
                  {item.review}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}