import Image from "next/image";

interface PropertyImagesProps {
  images: string[];
};

const PropertyImages = ({ images }: PropertyImagesProps) => {
  return (
    <section className="bg-blue-50 pt-4 pb-16">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt=''
            className="object-cover h-[400px] mx-auto rounded-xl"
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className="col-span-1">
                <Image
                  src={image}
                  alt=''
                  className="object-cover h-[400px] mx-auto rounded-xl"
                  width={1800}
                  height={400}
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
};

export default PropertyImages;