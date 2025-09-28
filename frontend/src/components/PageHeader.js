import Image from 'next/image';

const PageHeader = ({ title, description, language = 'en' }) => {
  return (
    <div>
      <div className="h-[40vh] md:h-[50vh] lg:h-[60vh] flex items-center justify-center overflow-hidden relative">
        <div className="">
          <Image
            src="/bg.jpg"
            alt="City skyline"
            fill
            className="object-cover background-cover"
            priority
          />
        </div>

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(271.47deg, rgba(75, 38, 21, 0.28) 28%, rgba(75, 38, 21, 0.68) 68%)',
          }}
        ></div>
      </div>

      <div className="text-center py-12 md:py-16 lg:py-20">
        <h1 className="text-5xl font-bold text-amber-900 mb-6">{title}</h1>
        <p className="text-xl text-gray-700 max-w-4xl mx-auto">{description}</p>
      </div>
    </div>
  );
};

export default PageHeader;
