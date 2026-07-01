import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import BannerSection from './components/BannerSection'
import ProjectsSection from './components/ProjectsSection'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'

function HomePage() {
  return (
    // pt-20 offsets content below the fixed 80px (h-20) NavBar
    <div className="pt-20">

      {/* ── Banner ── */}
      <BannerSection photoSrc="src/assets/professional_pfp.jpg" />

      {/* ── Projects ── */}
      {/* To switch to featured-only mode: <ProjectsSection featuredOnly /> */}
      <ProjectsSection />

      {/* ── About ── */}
      <AboutSection photoSrc="src/assets/professional_pfp.jpg" />

      {/* ── Footer ── */}
      <Footer />

    </div>
  )
}

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Root SPA route — all sections live here */}
        <Route path="/" element={<HomePage />} />
        {/*
          Future routes:
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
        */}
      </Routes>
    </>
  )
}
