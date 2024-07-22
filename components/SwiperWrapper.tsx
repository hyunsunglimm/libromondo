"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import "swiper/css";
import "swiper/css/pagination";

import { forwardRef, useImperativeHandle, useRef } from "react";

type SwiperWrapperProps = {
  slidesPerView: number;
  setPage: (arg: number) => void;
  children: Array<React.ReactNode>;
};

const SwiperWrapper = forwardRef<
  { slideTo: (arg: number) => void },
  SwiperWrapperProps
>(({ slidesPerView, setPage, children }, ref) => {
  const swiperRef = useRef<SwiperType | null>();

  useImperativeHandle(ref, () => {
    return {
      slideTo(index: number) {
        swiperRef.current?.slideTo(index);
      },
    };
  });

  return (
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      onSlideChange={(swiper) =>
        setPage(Math.ceil(swiper.realIndex / slidesPerView + 1))
      }
      spaceBetween={8}
      slidesPerView={3}
      slidesPerGroup={3}
      breakpoints={{
        768: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
      }}
    >
      {children.map((c, idx) => (
        <SwiperSlide key={idx}>{c}</SwiperSlide>
      ))}
    </Swiper>
  );
});

SwiperWrapper.displayName = "SwiperWrapper";
export default SwiperWrapper;
