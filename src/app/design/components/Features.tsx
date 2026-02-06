'use client';
import { useRef, useState } from 'react';
import { TiLocationArrow } from 'react-icons/ti';

export const BentoTilt = ({ children, className = '' }: any) => {
  const [transformStyle, setTransformStyle] = useState('');
  const itemRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!itemRef.current) return;
    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;
    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`
    );
  };
  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransformStyle('')}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description }: any) => {
  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Inside the Design Wing
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Where creativity meets technology. We craft visual experiences that
          define GeekHaven.
        </p>
      </div>
      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="/design/videos/feature-1.mp4"
          title={
            <>
              ui/<b>u</b>x
            </>
          }
          description="Crafting intuitive and beautiful user interfaces for all GeekHaven products."
        />
      </BentoTilt>
      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="/design/videos/feature-2.mp4"
            title={
              <>
                art<b>w</b>ork
              </>
            }
            description="Digital art, posters, and assets for our biggest events."
          />
        </BentoTilt>
        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="/design/videos/feature-3.mp4"
            title={
              <>
                m<b>o</b>tion
              </>
            }
            description="Animation and video editing that brings static content to life."
          />
        </BentoTilt>
        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="/design/videos/feature-4.mp4"
            title={
              <>
                br<b>a</b>nd
              </>
            }
            description="Defining the visual identity of IIIT Allahabad's technical society."
          />
        </BentoTilt>
        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>
            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>
      </div>
    </div>
  </section>
);
export default Features;
