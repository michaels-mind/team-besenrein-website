'use client';

import React from 'react';
import { Container } from '@/components/common/Container';

interface Review {
  id: number;
  name: string;
  date: string;
  initial: string;
  rating: number;
  text: string;
}

const REVIEWS: Review[] = [];

export default function Reviews() {
  return (
    <section className="relative border-t border-slate-200 bg-white py-16 lg:py-24 overflow-hidden">
      
      {/* Background Google Logo - rechts im Container */}
      <div className="pointer-events-none absolute right-[10%] top-1/2 -z-0 h-[350px] w-[350px] -translate-y-1/2 select-none opacity-20">
        <svg viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.26v2.72h3.58c2.09-1.93 3.3-4.79 3.3-8.24z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
      </div>

      <Container>
        {/* Header - linksbündig */}
        <div className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-slate-200 bg-white p-2.5 shadow-sm">
               <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.26v2.72h3.58c2.09-1.93 3.3-4.79 3.3-8.24z" fill="#4285F4" />
                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
               </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Das sagen unsere Kunden</h2>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="text-5xl font-bold text-slate-300">-.-</span>
            <div className="h-12 w-px bg-slate-200" />
            <div>
              <div className="mb-1 flex text-xl text-slate-300">★★★★★</div>
              <div className="text-sm font-medium text-slate-500">Noch keine Bewertungen</div>
            </div>
          </div>
        </div>

        {/* Content - linksbündig, maximal 60% Breite */}
        <div className="max-w-2xl">
          {/* CTA Card */}
          <a
            href="https://www.google.com/search?q=Team+Besenrein&stick=H4sIAAAAAAAA_-NgU1I1qDAxTzKwSDE3MzQ1NE2zMqhITk1ONDJKMTZJTDFIMjUzXsTKF5KamKvglFqcmleUmpkHAJ18eSc6AAAA&hl=de" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative z-10 flex min-h-[240px] flex-col items-center justify-center rounded-2xl bg-primary p-8 text-center text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-[var(--color-primary-hover)] hover:shadow-2xl hover:shadow-primary/30"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:scale-110 group-hover:bg-white/30">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/>
              </svg>
            </div>
            <span className="mb-2 block text-2xl font-bold">Seien Sie der Erste!</span>
            <span className="block text-base text-white/90">Bewerten Sie uns jetzt auf Google</span>
          </a>

          {/* Reviews Grid - nur wenn Bewertungen vorhanden */}
          {REVIEWS.length > 0 && (
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {REVIEWS.map((review) => (
                <div key={review.id} className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                        {review.initial}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{review.name}</div>
                        <div className="text-xs text-slate-400">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 items-center rounded bg-yellow-50 px-2 py-0.5 text-xs font-bold text-yellow-700">
                      <span className="mr-1">{review.rating}</span> ★
                    </div>
                  </div>
                  <p className="flex-grow text-sm italic leading-relaxed text-slate-600">"{review.text}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
