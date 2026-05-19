// ❌ ভুল (এটা করবেন না)
// const Banner = dynamic(() => import('@/components/Banner'), { ssr: false });

// ✅ সঠিক
import Banner from '@/components/Banner';

export default function Home() {
  return (
    <>
      <Banner />
      {/* অন্যান্য কন্টেন্ট */}
    </>
  );
}