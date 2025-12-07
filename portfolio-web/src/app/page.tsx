import { CinematicIntro } from "../components/cinematic-intro";
import { GuidedTour } from "../components/guided-tour";
import { Hero } from "../components/hero";
import { About } from "../components/about";
import { Projects } from "../components/projects";
import { Contact } from "../components/contact";
import { ProjectShowcase } from "../components/project-showcase";

import { SpotlightEffect } from "../components/spotlight-effect";
import { AiChatbot } from "../components/ai-chatbot";
import { VoiceControl } from "../components/voice-control";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <CinematicIntro />
      <GuidedTour />
      <SpotlightEffect />
      <VoiceControl />
      <AiChatbot />
      <Hero />
      <About />
      <ProjectShowcase />
      <Projects />
      <Contact />

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm glass mt-20">
        <p>© {new Date().getFullYear()} Aditya Kumar Singh. All rights reserved.</p>
        <p className="mt-2">Built with Next.js, Tailwind & Framer Motion</p>
      </footer>
    </main>
  );
}
