'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function TryFreePage() {
  const [activeUseCase, setActiveUseCase] = useState('email');

  const useCases = [
    { id: 'email', label: 'Draft an email', icon: '📧' },
    { id: 'chatgpt', label: 'ChatGPT prompt', icon: '🌐' },
    { id: 'idea', label: 'Capture an idea', icon: '💡' },
    { id: 'crm', label: 'CRM update', icon: '📊' },
    { id: 'todo', label: 'To-Do list', icon: '✅' },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                Try voice typing for any use case.
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Zavi auto-formats your speech into polished text in seconds—across all your favorite apps.
              </p>
            </div>

            {/* Use Case Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              {useCases.map((useCase) => (
                <button
                  key={useCase.id}
                  onClick={() => setActiveUseCase(useCase.id)}
                  className={`px-6 py-3 rounded-full text-base font-medium transition-all ${
                    activeUseCase === useCase.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{useCase.icon}</span>
                  {useCase.label}
                </button>
              ))}
            </div>

            {/* Demo Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Before */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                      Removed Filler
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6 min-h-[200px]">
                    <p className="text-gray-700 leading-relaxed">
                      {activeUseCase === 'email' && (
                        <>Uh yeah so like we should probably tell Jenny from legal about the NDA um being not ready yet or maybe she did send it idk</>
                      )}
                      {activeUseCase === 'chatgpt' && (
                        <>Um so I need you to like help me write a thing about uh marketing strategies and stuff</>
                      )}
                      {activeUseCase === 'idea' && (
                        <>So like I was thinking we could um maybe do a thing where we uh combine the two features</>
                      )}
                      {activeUseCase === 'crm' && (
                        <>Yeah so I talked to the client and um they said they're like interested but uh need more time</>
                      )}
                      {activeUseCase === 'todo' && (
                        <>Need to like call the vendor and um check on the shipment and stuff</>
                      )}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex justify-center">
                  <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                {/* After */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                      Fixed Phrasing
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 min-h-[200px]">
                    <p className="text-gray-900 leading-relaxed font-medium">
                      {activeUseCase === 'email' && (
                        <>Let's inform Jenny from legal that the NDA is not yet finalized, or check if she has already sent it.</>
                      )}
                      {activeUseCase === 'chatgpt' && (
                        <>Help me write a comprehensive guide about effective marketing strategies.</>
                      )}
                      {activeUseCase === 'idea' && (
                        <>I was thinking we could combine the two features into a unified experience.</>
                      )}
                      {activeUseCase === 'crm' && (
                        <>Spoke with the client. They're interested but need more time to decide.</>
                      )}
                      {activeUseCase === 'todo' && (
                        <>Call vendor to check on shipment status.</>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-12">
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-lg rounded-xl hover:shadow-lg transition-all"
              >
                Try Zavi Free
              </Link>
              <p className="text-gray-500 mt-4">
                Works in every app. No credit card required.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl mb-3">❌</div>
                <h3 className="font-semibold text-gray-900 mb-2">Removes Fillers</h3>
              </div>
              <div>
                <div className="text-4xl mb-3">✏️</div>
                <h3 className="font-semibold text-gray-900 mb-2">Fixes Spelling</h3>
              </div>
              <div>
                <div className="text-4xl mb-3">✅</div>
                <h3 className="font-semibold text-gray-900 mb-2">Grammar Check</h3>
              </div>
              <div>
                <div className="text-4xl mb-3">📚</div>
                <h3 className="font-semibold text-gray-900 mb-2">Custom Dictionary</h3>
              </div>
            </div>

            {/* Platform Icons */}
            <div className="flex items-center justify-center gap-6 mt-16">
              <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 5.45v6.11l7.5.02V3.45L3 5.45zm7.5 7.68L3 13.11v6.14l7.5 1.98v-8.1zm1.5-8.1v8.12l9-.02V3.45l-9 1.58zm9 9.68l-9 .02v8.08l9 1.58v-9.68z"/>
              </svg>
              <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 15.3414c-.5511-.0001-.9993-.4484-.9993-.9995s.4483-.9995.9993-.9995c.5511 0 .9993.4484.9993.9995s-.4482.9995-.9993.9995m-5.046-8.3476c-.5511 0-.9993-.4484-.9993-.9995s.4482-.9995.9993-.9995.9993.4484.9993.9995-.4482.9995-.9993.9995m-5.046 8.3476c-.5511 0-.9993-.4484-.9993-.9995s.4482-.9995.9993-.9995.9993.4484.9993.9995-.4482.9995-.9993.9995m0-7.5466c-.5511 0-.9993-.4484-.9993-.9995s.4482-.9995.9993-.9995.9993.4484.9993.9995-.4482.9995-.9993.9995m12.5455 13.7512c-.1555 1.3-1.1033 2.348-2.4035 2.6085-3.7422.747-7.5477.747-11.29 0-1.3-.2605-2.248-1.3085-2.4035-2.6085-.3645-3.0403-.3645-6.1195 0-9.1598.1555-1.3 1.1035-2.348 2.4035-2.6085 3.7423-.747 7.5478-.747 11.29 0 1.3002.2605 2.248 1.3085 2.4035 2.6085.3645 3.0403.3645 6.1195 0 9.1598z"/>
              </svg>
              <p className="text-gray-600 font-medium">Works in every app.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
