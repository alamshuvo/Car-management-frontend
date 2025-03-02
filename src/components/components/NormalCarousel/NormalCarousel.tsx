import { Carousel, Image } from "antd";

const NormalCarousel = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <Carousel
        autoplay
        dots={false} // Hide dots if not needed
        slidesToShow={4} // Show 4 images at a time
        slidesToScroll={1} // Scroll one image at a time
        responsive={[
          {
            breakpoint: 1024, // For tablets
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768, // For mobile landscape
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480, // For mobile portrait
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {[
          "https://carvan.wpengine.com/wp-content/uploads/2024/11/carvan-insta-img-1.jpg",
          "https://carvan.wpengine.com/wp-content/uploads/2024/11/carvan-insta-img-2.jpg",
          "https://carvan.wpengine.com/wp-content/uploads/2024/11/carvan-insta-img-3.jpg",
          "https://carvan.wpengine.com/wp-content/uploads/2024/11/carvan-insta-img-4.jpg",
          "https://carvan.wpengine.com/wp-content/uploads/2024/11/carvan-insta-img-5.jpg",
        ].map((src, index) => (
          <div key={index} className="p-2">
            <Image
              src={src}
              alt={`Car ${index + 1}`}
              className="w-full h-[200px] object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default NormalCarousel;
