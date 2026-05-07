import React from 'react'
import Home from './components/HeroSection'
import CoreValues from './components/CoreValues'
import WhoWeAre from './components/WhoWeAre'
import Navbar from './components/Navbar'
import PartnerWithUs from './components/PartnerWithUs'
import FrameworkCarousel from './components/IntegratedFrameWork'
import ImpactHero from './components/YourJourneyImpact'
import HowWeWork from './components/HowWeWork'
import PartnerTestimonials from './components/PartnerTestimonials'
import FinalRoadmapCTA from './components/FinalRoadmapCTA'
const page = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
      <CoreValues/>
      <WhoWeAre/>
      <PartnerWithUs/>
      <FrameworkCarousel/>
      <ImpactHero/>
      <HowWeWork/>
      <PartnerTestimonials/>
      <FinalRoadmapCTA/>
    </div>
  )
}

export default page
