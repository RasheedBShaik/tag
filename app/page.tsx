// app/page.tsx
import Home from './components/HeroSection';
import CoreValues from './components/CoreValues';
import Navbar from './components/Navbar';
import FrameworkCarousel from './components/IntegratedFrameWork';
import ImpactHero from './components/YourJourneyImpact';
import HowWeWork from './components/HowWeWork';
import HomeTestimonials from './components/Testimonials';
import FinalRoadmapCTA from './components/FinalRoadmapCTA';
import WhyTheTAG from './components/WhyTheTag'; 

import { client } from '@/sanity/lib/client';

// Fetch Testimonials Data
async function getTestimonialsData() {
  try {
    const query = `*[_type == "testimonials"] | order(order asc) {
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

// Fetch Services Studio Data for Integrated Framework Carousel
async function getServicesData() {
  try {
    const query = `*[_type == "service"] | order(id asc) {
      _id,
      _type,
      title,
      slug { current },
      id,
      description,
      iconName,
      theme {
        primary,
        secondary,
        accent,
        glow,
        glass
      },
      processTimeline[] {
        frameworkNode
      },
      portfolioTiers[] {
        benchmarks
      },
      caseStudies[] {
        activeNodes
      }
    }`;
    return await client.fetch(query, {}, { next: { revalidate: 0 } });
  } catch (error) {
    console.error("CRITICAL ERROR: Failed to fetch services studio data:", error);
    return [];
  }
}

const Page = async () => {
  const [testimonialsData, coreValuesData, servicesData] = await Promise.all([
    getTestimonialsData(),
    getCoreValuesData(),
    getServicesData(),
  ]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 antialiased">
      <Navbar />
      <Home />
      
      <CoreValues data={coreValuesData} />
      
      <WhyTheTAG />
      
      {/* Services dynamic data successfully linked */}
      <FrameworkCarousel services={servicesData} />
      
      <ImpactHero />
      <HowWeWork />
      
      {/* Updated component execution matching the new name */}
      <HomeTestimonials testimonialsData={testimonialsData} />
      
      <FinalRoadmapCTA />
    </div>
  );
};

export default Page;