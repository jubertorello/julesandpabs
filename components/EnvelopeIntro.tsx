'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { wedding, backgrounds } from '@/config/wedding';

interface EnvelopeIntroProps {
  onComplete: () => void;
  onStartExit?: () => void;
}

type AnimState = 'FRONT' | 'FLIPPING' | 'BACK_CLOSED' | 'OPENING' | 'OPENED' | 'EXITING';

export default function EnvelopeIntro({ onComplete, onStartExit }: EnvelopeIntroProps) {
  const [showPre, setShowPre] = useState(true);
  const [state, setState] = useState<AnimState>('FRONT');
  const [showBackAssets, setShowBackAssets] = useState(false);

  const assets = backgrounds.envelope;

  useEffect(() => {
    // Only start the flip animation after the user interacts with the pre-screen
    if (showPre) return;
    const startTimer = setTimeout(() => {
      if (state === 'FRONT') setState('FLIPPING');
    }, 800);
    return () => clearTimeout(startTimer);
  }, [showPre, state]);

  useEffect(() => {
    if (state === 'FLIPPING') {
      const timer = setTimeout(() => setShowBackAssets(true), 400);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <AnimatePresence>
      {state !== 'EXITING' && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none"
        >
          {/* Fondo: el papel de la tarjeta con las cenefas florales a los lados */}
          <div
            className="absolute inset-0 z-[-1] bg-cream"
            style={{
              backgroundImage: `url("${backgrounds.intro.desktop}")`,
              backgroundSize: '360px 360px',
              backgroundRepeat: 'repeat',
            }}
          />
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 z-[-1] pointer-events-none w-[26vw] max-w-[230px]"
            style={{
              opacity: backgrounds.flowers.opacity,
              backgroundImage: `url("${backgrounds.flowers.left}")`,
              backgroundSize: '100% auto',
              backgroundRepeat: 'repeat-y',
              backgroundPosition: 'left top',
            }}
          />
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 z-[-1] pointer-events-none w-[26vw] max-w-[230px]"
            style={{
              opacity: backgrounds.flowers.opacity,
              backgroundImage: `url("${backgrounds.flowers.right}")`,
              backgroundSize: '100% auto',
              backgroundRepeat: 'repeat-y',
              backgroundPosition: 'right top',
            }}
          />

          {/* Pre-screen: shown before the envelope animation starts */}
          <AnimatePresence>
            {showPre && (
              <motion.div
                key="pre-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 z-[60] flex flex-col items-center justify-center cursor-pointer"
                onClick={() => setShowPre(false)}
              >
                {/* Floating envelope image */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative mb-8 w-[180px] md:w-[220px] aspect-[4/3]"
                >
                  <Image
                    src={backgrounds.envelope.backClosed}
                    alt="Sobre"
                    fill
                    className="object-contain"
                    priority
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                <p className="font-serif text-deep text-2xl md:text-3xl italic mb-1">
                  {wedding.envelope.preTitle}
                </p>
                <p className="font-sans text-muted text-[11px] uppercase tracking-[0.35em] mb-10">
                  {wedding.envelope.preSubtitle}
                </p>

                <motion.button
                  type="button"
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="px-8 py-3 rounded-full bg-primary text-cream font-sans text-xs uppercase tracking-[0.25em] shadow-lg hover:bg-primary/90 transition-colors"
                >
                  {wedding.envelope.preButton}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope (hidden behind pre-screen, shown after click) */}
          <AnimatePresence>
            {!showPre && (
              <motion.div
                key="envelope"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-[88vw] max-w-[430px] aspect-[4/3] flex items-center justify-center perspective-[1500px] translate-y-[10vh] md:translate-y-[20vh]"
              >
                <motion.div
                  className="relative w-full h-full preserve-3d"
                  animate={state !== 'FRONT' ? { rotateY: 180 } : { rotateY: 0 }}
                  transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                  onAnimationComplete={() => {
                    if (state === 'FLIPPING') {
                      setTimeout(() => setState('OPENING'), 700);
                    }
                  }}
                >
                  {/* --- FACE A: FRONT --- */}
                  <div className="absolute inset-0 z-50 backface-hidden shadow-2xl rounded-sm overflow-hidden">
                    <Image src={assets.front} alt="Sobre Frontal" fill className="object-cover" priority referrerPolicy="no-referrer" />
                  </div>

                  {/* --- FACE B: BACK --- */}
                  <div
                    className="absolute inset-0 z-40 overflow-visible"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    {/*
                      Orden de capas, de atrás hacia delante:
                      1. solapa abierta (triángulo con el lacre, apuntando
                         hacia arriba por encima del sobre)
                      2. tarjeta, que sale del sobre al abrirse
                      3. bolsillo del sobre, con su escote en V, por delante
                         de la tarjeta para que parezca que sale de dentro
                      4. dorso cerrado, que se desvanece al abrir
                    */}

                    {/* 1. Solapa abierta */}
                    {(state === 'OPENING' || state === 'OPENED') && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-x-0 bottom-[99%] z-10 pointer-events-none"
                        style={{ aspectRatio: '840 / 549' }}
                      >
                        <Image
                          src={assets.flapOpen}
                          alt="Solapa abierta"
                          fill
                          className="object-contain rotate-180"
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                    )}

                    {/* 2. La tarjeta */}
                    <motion.div
                      className="absolute inset-x-[4%] top-[14%] h-[235px] md:h-[265px] rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.28)] flex flex-col items-center justify-center px-6 py-5 text-center"
                      style={{
                        backgroundImage: `url(${assets.cardBg})`,
                        backgroundSize: '260px 260px',
                        // Al terminar de salir, la tarjeta pasa por delante del
                        // sobre, como en la invitación impresa.
                        zIndex: state === 'OPENED' ? 35 : 20,
                      }}
                      initial={{ y: '8%', opacity: 0 }}
                      animate={
                        state === 'OPENED'
                          ? { y: '-42%', opacity: 1 }
                          : state === 'OPENING'
                          ? { y: '8%', opacity: 1 }
                          : { y: '8%', opacity: 0 }
                      }
                      transition={{ y: { duration: 1.5, ease: [0.33, 1, 0.68, 1], delay: 0.3 } }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={state === 'OPENED' ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.1 }}
                        className="relative flex flex-col items-center pointer-events-auto"
                      >
                        <p className="font-serif text-muted text-base md:text-lg mb-1 italic">{wedding.envelope.cardIntro}</p>
                        <h2 className="font-serif text-2xl md:text-3xl text-primary mb-4 leading-tight font-light italic">
                          {wedding.envelope.cardNames}
                        </h2>
                        <div className="h-px w-10 bg-primary/25 mb-4" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setState('EXITING');
                            if (onStartExit) onStartExit();
                            setTimeout(onComplete, 1000);
                          }}
                          className="px-6 py-2 bg-primary text-cream font-sans tracking-[0.2em] text-[9px] uppercase rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                          {wedding.envelope.cardButton}
                        </button>
                      </motion.div>
                    </motion.div>

                    {/* 3. Bolsillo del sobre, por delante de la tarjeta */}
                    <div className="absolute inset-0 z-30 pointer-events-none">
                      <Image src={assets.base} alt="" fill className="object-contain" referrerPolicy="no-referrer" />
                    </div>

                    {/* 4. Dorso cerrado */}
                    <div className="absolute inset-0 z-40 pointer-events-none">
                      {(state === 'FLIPPING' || state === 'OPENING') && (
                        <motion.div
                          className="absolute inset-0"
                          initial={{ opacity: 1 }}
                          animate={state === 'OPENING' ? { opacity: 0 } : { opacity: 1 }}
                          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                          onAnimationComplete={() => {
                            if (state === 'OPENING') setState('OPENED');
                          }}
                        >
                          <Image src={assets.backClosed} alt="Dorso cerrado" fill className="object-contain" referrerPolicy="no-referrer" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
