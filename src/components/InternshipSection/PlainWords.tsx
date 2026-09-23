import React from "react";
import Reveal from "./Reveal";

interface Term {
  word: string;
  meaning: string;
}

const terms: Term[] = [
  { word: "AI Agent", meaning: "AI that plans and does several steps for you, checking its own work as it goes." },
  { word: "RAG", meaning: "The AI looks things up in your own documents before it answers." },
  { word: "Prompt", meaning: "The instruction you give an AI to tell it what you want done." },
  { word: "Hallucination", meaning: "A confident answer that isn't actually supported by facts or sources." },
  { word: "Context Window", meaning: "How much information the model can keep in view at once." },
  { word: "Fine-Tuning", meaning: "Adjusting a model on specific examples so it performs better at one task." },
];

const PlainWords: React.FC = () => {
  return (
    <section className="relative w-full py-14 sm:py-20 px-4 bg-black">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif text-center mb-3">
            AI, in plain words
          </h2>
          <p className="text-gray-400 text-sm sm:text-base text-center mb-10">
            You never need to know a term before you arrive — every one of
            these is explained first, then shown, then practised.
          </p>
        </Reveal>

        <dl className="border-t border-white/10">
          {terms.map((t) => (
            <div
              key={t.word}
              className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-8 py-5 border-b border-white/10"
            >
              <dt className="text-lg font-bold text-cyan-400 font-serif">
                {t.word}
              </dt>
              <dd className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {t.meaning}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default PlainWords;
