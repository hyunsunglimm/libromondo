"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import "swiper/css";
import "swiper/css/pagination";

import { forwardRef, useImperativeHandle, useRef } from "react";

type SwiperWrapperProps = {
  children: Array<React.ReactNode>;
};

const SwiperWrapper = forwardRef<
  { next: () => void; prev: () => void },
  SwiperWrapperProps
>(({ children }, ref) => {
  const swiperRef = useRef<SwiperType | null>();
  useImperativeHandle(ref, () => {
    return {
      next() {
        swiperRef.current?.slideNext();
      },
      prev() {
        swiperRef.current?.slidePrev();
      },
    };
  });

  return (
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      // onSlideChange={(swiper) => console.log(swiper.activeIndex)}
      spaceBetween={8}
      slidesPerView={4}
      slidesPerGroup={4}
      className="mt-4"
    >
      {children.map((c, idx) => (
        <SwiperSlide key={idx}>{c}</SwiperSlide>
      ))}
    </Swiper>
  );
});

SwiperWrapper.displayName = "SwiperWrapper";
export default SwiperWrapper;
