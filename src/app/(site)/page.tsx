import { Hero } from '@/components/sections/Hero';
import { Work } from '@/components/sections/Work';
import { WhatIDo } from '@/components/sections/WhatIDo';
import { Differentiator } from '@/components/sections/Differentiator';
import { Thinking } from '@/components/sections/Thinking';
import { About } from '@/components/sections/About';
import { Now } from '@/components/sections/Now';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';

/**
 * One page, one story:
 * Who is this? → What has he built? → What does he do? → Why is that different?
 * → How does he think? → Who is he? → What now? → How do I work with him?
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <WhatIDo />
      <Differentiator />
      <Thinking />
      <About />
      <Now />
      <Faq />
      <Contact />
    </>
  );
}
