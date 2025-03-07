import FeaturedProperties from "@/components/featured-properties";
import Hero from "@/components/hero";
import HomeProperties from "@/components/home-properties";
import InfoBoxes from "@/components/info-boxes";

export const metadata = {
  description: 'Find the perfect rental property',
  keywords: 'rental, property, real estate',
  title: 'Property pulse',
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
};

export default HomePage;
