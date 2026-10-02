import type { ReactNode } from 'react'
import PageHero from '../../components/PageHero'
import ScrollReveal from '../../components/ScrollReveal'
import { siteConfig } from '../../data/siteConfig'

interface LegalPageProps {
  title: string;
  children: ReactNode;
  /** Shown under the title, e.g. "Last updated". */
  meta?: string;
}

export default function LegalPage({ title, meta, children }: LegalPageProps) {
  return (
    <main>
      <PageHero label="Legal" title={title} subtitle={meta} />

      <section className="bg-ivory py-14 md:py-24">
        <div className="mx-auto max-w-[760px] px-6 md:px-10">
          <ScrollReveal>
            <div
              className="prose prose-neutral max-w-none
                prose-headings:mt-10 prose-headings:mb-3 prose-headings:text-2xl
                prose-headings:font-serif prose-headings:font-normal prose-headings:text-navy
                prose-p:mb-4 prose-p:leading-relaxed prose-p:text-muted
                prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                prose-ul:text-muted prose-li:my-1
                prose-strong:text-navy
                [&_a]:link-underline"
            >
              {children}
            </div>
          </ScrollReveal>

          <div className="mt-16 border-t border-stone-200 pt-8 text-sm text-muted">
            Questions about this document?{' '}
            <a href={`mailto:${siteConfig.email}`} className="link-underline text-gold">
              {siteConfig.email}
            </a>{' '}
            or call{' '}
            <a href={`tel:${siteConfig.phoneClean}`} className="link-underline text-gold">
              {siteConfig.phone}
            </a>
            .
          </div>
        </div>
      </section>
    </main>
  )
}

/** Small helper so the three legal pages can flag draft status consistently. */
export function DraftNotice({ children }: { children: ReactNode }) {
  return (
    <p className="mb-8 border-l-2 border-gold bg-stone px-4 py-3 text-sm italic leading-relaxed text-muted-dark">
      {children}
    </p>
  )
}