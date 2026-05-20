// app/page.tsx
import Home from './components/HeroSection';
import CoreValues from './components/CoreValues';
import Navbar from './components/Navbar';
import FrameworkCarousel from './components/IntegratedFrameWork';
import ImpactHero from './components/YourJourneyImpact';
import HowWeWork from './components/HowWeWork';
import Testimonials from './components/Testimonials';
import FinalRoadmapCTA from './components/FinalRoadmapCTA';
import WhyTheTAG from './components/WhyTheTag'; 

import { client } from '@/sanity/lib/client';

// Fetch Testimonials Data
async function getTestimonialsData() {
  try {
    const query = `*[_type == "testimonial"] {
      _id,
      author,
      role,
      company,
      quote,
      stat,
      stars
    }`;
    return await client.fetch(query, {}, { next: { revalidate: 0 } });
  } catch (error) {
    console.error("CRITICAL ERROR: Failed to fetch testimonials data:", error);
    return [];
  }
}

// Fetch Core Values Data
async function getCoreValuesData() {
  try {
    // [0] extracts the single object out of the array matching this schema doc type
    const query = `*[_type == "coreValues"][0] {
      heading,
      technologies[] {
        _key,
        id,
        name,
        tagline,
        description,
        icon,
        features
      }
    }`;

    const data = await client.fetch(query, {}, { next: { revalidate: 0 } });

    console.log("-----------------------------------------");
    console.log("SANITY TERMINAL ENGINE DEBUG CHECK");
    console.log("Raw Payload Output:", JSON.stringify(data, null, 2));
    console.log("-----------------------------------------");

    return data;
  } catch (error) {
    console.error("CRITICAL ERROR: Failed to fetch core values data:", error);
    return null;
  }
}

const Page = async () => {
  // Execute calls in parallel to preserve performance structure
  const [testimonialsData, coreValuesData] = await Promise.all([
    getTestimonialsData(),
    getCoreValuesData(),
  ]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 antialiased">
      <Navbar />
      <Home />
      
      {/* Dynamic injection payload component entry point */}
      <CoreValues data={coreValuesData} />
      
      <WhyTheTAG />
      <FrameworkCarousel />
      <ImpactHero />
      <HowWeWork />
      
      <Testimonials testimonialsData={testimonialsData} />
      
      <FinalRoadmapCTA />
    </div>
  );
};

export default Page;