// ❌ ভুল (এটা করবেন না)
// const Banner = dynamic(() => import('@/components/Banner'), { ssr: false });

// ✅ সঠিক
import Banner from '@/components/Banner';
import HeroSlider from '@/components/HeroSlider';
import StatsSection from '@/components/StatsSection';
import TopDoctors from '@/components/TopDoctors';
import WhyChooseUs from '@/components/WhyChooseUs';

export default function Home() {
  return (
    <>
      {/* <Banner /> */}
     <HeroSlider  />
      <TopDoctors />
      <WhyChooseUs />
      <StatsSection />

      {/* অন্যান্য কন্টেন্ট */}
    </>
  );
}