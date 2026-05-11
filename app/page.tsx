import React from 'react'
import Home from './components/HeroSection'
import CoreValues from './components/CoreValues'

import Navbar from './components/Navbar'
import FrameworkCarousel from './components/IntegratedFrameWork'
import ImpactHero from './components/YourJourneyImpact'
import HowWeWork from './components/HowWeWork'
import PartnerTestimonials from './components/PartnerTestimonials'
import FinalRoadmapCTA from './components/FinalRoadmapCTA'
import WhyTheTAG from './components/WhyTheTag'
const page = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
      <CoreValues/>
      <WhyTheTAG/>
      <FrameworkCarousel/>
      <ImpactHero/>
      <HowWeWork/>
      <PartnerTestimonials/>
      <FinalRoadmapCTA/>
    </div>
  )
}

export default page
