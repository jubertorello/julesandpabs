'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import EnvelopeIntro from '@/components/EnvelopeIntro';
import RSVPForm from '@/components/RSVPForm';
import type { RSVPState } from '@/components/RSVPForm';
import { supabase } from '@/lib/supabase';
import { wedding, backgrounds, whatsappUrl } from '@/config/wedding';
import Image from 'next/image';
import {
  MapPin,
  Calendar,
  Clock,
  Music,
  Heart,
  Plane,
  Gift,
  MessageSquare,
  Users,
  Check,
  Copy,
  ChevronRight,
  X,
  PhoneCall,
  Sparkles,
  Info,
  Volume2,
  VolumeX,
  Church,
  Wine,
  Utensils,
  PartyPopper,
  Menu
} from 'lucide-react';

// Custom Type for Song Suggestions
interface SuggestedSong {
  id: string;
  title: string;
  artist: string;
  votes: number;
}

const weddingPhotos = wedding.photos;

/**
 * Separador entre bloques: la filigrana de la papelería impresa. Si
 * `backgrounds.divider` está vacío, cae al filete de 1px de siempre.
 * `tone="claro"` la aclara para los fondos verdes.
 */
function Divider({ className = '', tone }: { className?: string; tone?: 'claro' }) {
  if (!backgrounds.divider) {
    return <div className={`h-px w-10 mx-auto ${tone === 'claro' ? 'bg-white/40' : 'bg-primary/20'} ${className}`} />;
  }
  return (
    <div
      aria-hidden
      className={`mx-auto w-40 h-5 bg-center bg-no-repeat bg-contain ${tone === 'claro' ? 'brightness-0 invert opacity-70' : 'opacity-70'} ${className}`}
      style={{ backgroundImage: `url("${backgrounds.divider}")` }}
    />
  );
}

export default function Home() {
  const [showMain, setShowMain] = useState(false);
  // La intro se desmonta cuando acaba su propio fundido, no al empezarlo.
  const [introDone, setIntroDone] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  // Play audio on first user interaction — only until audioStarted
  useEffect(() => {
    if (!wedding.music.autoplay || audioStarted) return;
    const tryPlay = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setAudioStarted(true);
          })
          .catch(() => { });
      }
    };
    document.addEventListener('click', tryPlay);
    document.addEventListener('touchstart', tryPlay);
    return () => {
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('touchstart', tryPlay);
    };
  }, [audioStarted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio play failed:", err);
        });
    }
  };

  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedSwift, setCopiedSwift] = useState(false);
  const [showIbanModal, setShowIbanModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMusicModal, setShowMusicModal] = useState(false);
  const [showAllSongsModal, setShowAllSongsModal] = useState(false);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [musicList, setMusicList] = useState<SuggestedSong[]>([]);
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');
  const [showAddSongSuccess, setShowAddSongSuccess] = useState(false);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [rsvpData, setRsvpData] = useState<RSVPState | null>(null);
  const [formKey, setFormKey] = useState(0);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    completed: false
  });

  // Load localStorage data client-side safely on mount
  useEffect(() => {
    const loadSavedData = async () => {
      // 1. Read localStorage synchronously first so the page renders immediately
      const storedRsvp = localStorage.getItem('wedding_rsvp_status');
      if (storedRsvp) {
        try {
          const parsed = JSON.parse(storedRsvp);
          const normalized: RSVPState = {
            attending: parsed.attending !== undefined ? parsed.attending : true,
            guestName: parsed.guestName || '',
            hasIntolerance: parsed.hasIntolerance || !!(parsed.dietaryRestrictions),
            dietaryRestrictions: parsed.dietaryRestrictions || '',
            busIda: parsed.busIda === true,
            busVuelta: parsed.busVuelta === true,
            companions: Array.isArray(parsed.companions) ? parsed.companions : [],
            message: parsed.message || '',
            submittedAt: parsed.submittedAt
          };
          setRsvpData(normalized);
          setFormSubmitted(true);
        } catch (e) {
          console.error(e);
        }
      }

      // 2. Allow page to render now, before any async network call
      setMounted(true);

      // 3. Load songs from Supabase (non-blocking — page is already visible)
      const { data: songsData, error: songsError } = await supabase
        .from('songs')
        .select('*')
        .eq('client_id', wedding.clientId)
        .order('votes', { ascending: false });

      if (songsData && !songsError) {
        setMusicList(songsData);
      }
    };

    const timer = setTimeout(loadSavedData, 0);
    return () => clearTimeout(timer);
  }, []);

  // Timer interval
  useEffect(() => {
    const weddingDate = new Date(wedding.date.iso).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, completed: false });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Copy IBAN handler
  const handleCopyIban = () => {
    navigator.clipboard.writeText(wedding.gift.modal.iban);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Copy Swift handler
  const handleCopySwift = () => {
    navigator.clipboard.writeText(wedding.gift.modal.swift);
    setCopiedSwift(true);
    setTimeout(() => setCopiedSwift(false), 2000);
  };

  // Handle smooth scroll to section with offset for fixed header
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setShowMobileMenu(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Add Song Suggestion
  const handleAddSong = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSongTitle.trim() || !newSongArtist.trim()) return;

    const newSong = {
      client_id: wedding.clientId,
      title: newSongTitle.trim(),
      artist: newSongArtist.trim(),
      votes: 1
    };

    const { data, error } = await supabase
      .from('songs')
      .insert([newSong])
      .select()
      .single();

    if (data && !error) {
      const updated = [data, ...musicList].sort((a, b) => b.votes - a.votes);
      setMusicList(updated);
      setShowAddSongSuccess(true);
      setTimeout(() => {
        setShowAddSongSuccess(false);
      }, 3000);
    }

    setNewSongTitle('');
    setNewSongArtist('');
  };

  // Upvote Music
  const handleVoteSong = async (id: string) => {
    const song = musicList.find(s => s.id === id);
    if (!song) return;

    const newVotes = song.votes + 1;

    const updated = musicList.map(s => {
      if (s.id === id) {
        return { ...s, votes: newVotes };
      }
      return s;
    });
    const sorted = [...updated].sort((a, b) => b.votes - a.votes);
    setMusicList(sorted);

    await supabase
      .from('songs')
      .update({ votes: newVotes })
      .eq('id', id);
  };

  const handleRsvpSubmitted = (data: RSVPState) => {
    setRsvpData(data);
    setFormSubmitted(true);
  };

  const handleEditRsvp = () => {
    setFormSubmitted(false);
    setRsvpData(null);
    setFormKey((k) => k + 1);
    localStorage.removeItem('wedding_rsvp_status');
  };

  // Los enlaces de secciones desactivadas no se muestran en la navegación.
  const navLinks = wedding.nav.links.filter(
    (link) =>
      (link.id !== 'musica' || wedding.music.enabled) &&
      (link.id !== 'viaje' || wedding.gift.enabled)
  );

  if (!mounted) {
    return null;
  }

  return (
    <main className={`min-h-screen relative selection:bg-primary/20 select-none md:select-text ${!showMain ? 'h-screen overflow-hidden' : ''}`}>
      {/* Reproductor de audio oculto */}
      <audio ref={audioRef} loop preload="auto">
        <source src={wedding.music.backgroundAudio} type="audio/mpeg" />
      </audio>

      {/* Botón mute flotante — visible desde que arranca el audio */}
      {audioStarted && !showMain && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          onClick={togglePlay}
          className="fixed bottom-6 right-6 z-[70] flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm text-white/80 hover:bg-black/30 hover:text-white transition-all duration-200 text-[11px] font-display uppercase tracking-[0.2em] font-semibold"
        >
          {isPlaying ? <VolumeX size={14} /> : <Volume2 size={14} />}
          {isPlaying ? '' : ''}
        </motion.button>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showMain ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-ink font-serif"
      >
        {/* STICKY HEADER NAVIGATION */}
        <nav className="fixed top-0 inset-x-0 bg-primary text-cream border-b border-white/10 z-40 transition-all duration-300 shadow-md">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <a
              href="#inicio"
              onClick={(e) => handleNavClick(e, 'inicio')}
              className="text-[30px] sm:text-[38px] md:text-[46px] leading-none tracking-tighter text-cream hover:opacity-80 transition-opacity cursor-pointer font-serif"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {wedding.couple.heart ? (
                <span className="flex items-center gap-1">
                  J
                  <span className="relative inline-block w-[0.5em] h-[0.5em] brightness-0 invert">
                    <Image src={wedding.couple.heart} alt="y" fill className="object-contain" referrerPolicy="no-referrer" />
                  </span>
                  P
                </span>
              ) : (
                wedding.couple.initials
              )}
            </a>
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-[11px] uppercase tracking-[0.25em] font-display text-soft font-semibold">
              {navLinks
                .filter((link) => !link.mobileOnly)
                .map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
            </div>
            <div className="flex items-center space-x-3">
              {/* Control de Música de Fondo */}
              <button
                onClick={togglePlay}
                className="p-2 text-cream/90 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 flex items-center justify-center focus:outline-none relative"
                title={isPlaying ? "Pausar música" : "Reproducir música"}
                aria-label={isPlaying ? "Pausar música de fondo" : "Reproducir música de fondo"}
              >
                {isPlaying ? (
                  <>
                    <span className="absolute top-1 right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                    </span>
                    <Volume2 size={18} className="animate-pulse text-secondary brightness-125" />
                  </>
                ) : (
                  <>
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-stone-400/80"></span>
                    <VolumeX size={18} className="opacity-60 text-cream" />
                  </>
                )}
              </button>

              {/* Desktop Confirmar button */}
              <a
                href="#confirmacion"
                onClick={(e) => handleNavClick(e, 'confirmacion')}
                className="hidden md:inline-block px-4 py-1.5 border border-white/30 text-cream hover:bg-cream hover:text-ink transition-all duration-300 rounded-full text-[10px] uppercase font-display tracking-[0.2em] font-semibold"
              >
                {wedding.nav.ctaLabel}
              </a>

              {/* Mobile Menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden flex items-center space-x-1 px-3 py-1.5 border border-white/35 text-cream hover:bg-white/10 transition-all rounded-full text-[10px] uppercase font-display tracking-[0.15em] cursor-pointer font-semibold"
                aria-label="Menú de secciones"
              >
                <span>Menú</span>
                {showMobileMenu ? <X size={12} /> : <Menu size={12} />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="md:hidden overflow-hidden bg-primary border-t border-white/10"
              >
                <div className="px-6 py-4 flex flex-col space-y-4 text-center text-xs uppercase tracking-[0.2em] font-display text-soft font-semibold">
                  {navLinks.map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className="py-1 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="pt-2">
                    <a
                      href="#confirmacion"
                      onClick={(e) => handleNavClick(e, 'confirmacion')}
                      className="inline-block w-full py-2.5 bg-cream text-ink hover:bg-sand transition-colors rounded-full text-[10px] tracking-[0.2em] font-bold"
                    >
                      {wedding.nav.ctaLabel}
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>


        {/* 1. HERO - INITIALS & INVITATION + NOMBRES & FECHA */}
        <section
          id="inicio"
          className="w-full relative pt-32 md:py-32 flex flex-col items-center justify-center text-center overflow-hidden"
        >
          <motion.div
            initial="hidden"
            animate={showMain ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3
                }
              }
            }}
            className="max-w-4xl mx-auto px-6 w-full flex flex-col items-center relative z-10"
          >
            {wedding.hero.intro.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
                }}
                className={`font-serif text-muted text-[31px] md:text-[34px] italic leading-relaxed max-w-sm mx-auto text-center px-10 md:px-0 ${ i === wedding.hero.intro.length - 1 ? 'mb-10' : 'mb-5' }`}
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
              }}
              className="tracking-[0.25em] uppercase text-[24px] leading-[24px] text-ink mb-8 text-center no-underline font-display font-semibold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {wedding.hero.announcement}
            </motion.h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
              }}
              className="font-serif text-muted text-[31px] md:text-[34px] lg:text-[34px] italic leading-relaxed max-w-sm mx-auto mb-10 text-center px-9 md:px-0"
            >
              {wedding.hero.subtitle}
            </motion.p>

          </motion.div>
          <motion.div
            initial="hidden"
            animate={showMain ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.3 }
              }
            }}
            className="max-w-4xl mx-auto px-6 w-full flex flex-col items-center relative z-10"
          >

            {/* Couple names - Elegant Stacked Layout styled like screenshot */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: "easeOut" } }
              }}
              className="my-10 md:my-14 mb-12 flex flex-col items-center select-text"
            >
              <div className="flex flex-col items-center">
                <h1 className="font-handwritten text-[58px] leading-[62px] text-deep font-light">
                  {wedding.couple.partnerA.firstName}
                </h1>
                <span className="font-display tracking-[0.05em] text-[18px] text-deep uppercase mt-1 font-semibold">
                  {wedding.couple.partnerA.lastName}
                </span>
              </div>

              {wedding.couple.heart ? (
                <div className="relative w-9 h-9 md:w-11 md:h-11 my-4">
                  <Image src={wedding.couple.heart} alt="y" fill className="object-contain" referrerPolicy="no-referrer" />
                </div>
              ) : (
                <div className="font-serif text-[41px] md:text-[51px] my-4 text-deep font-light">&</div>
              )}

              <div className="flex flex-col items-center">
                <h1 className="font-handwritten text-[58px] leading-[62px] text-deep font-light">
                  {wedding.couple.partnerB.firstName}
                </h1>
                <span className="font-display tracking-[0.05em] text-[18px] leading-[26px] text-deep uppercase mt-1 font-semibold">
                  {wedding.couple.partnerB.lastName}
                </span>
              </div>
            </motion.div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
              }}
              className="font-serif text-muted text-[31px] md:text-[34px] lg:text-[34px] italic leading-relaxed max-w-sm mx-auto mb-5 text-center px-8 md:px-0"
            >
              {wedding.hero.closing}
            </motion.p>

            {/* DATE REPRESENTATION */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: "easeOut" } }
              }}
              className="flex flex-col items-center mt-4 select-none"
            >
              <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8">
                {/* Month with borders */}
                <div className="border-y border-deep/40 py-2 px-3 sm:px-5 text-center min-w-[76px] sm:min-w-[150px] flex-shrink">
                  <span
                    className="tracking-[0.2em] uppercase text-deep block font-display font-semibold"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(11px, 3.4vw, 14px)', lineHeight: '1.1', textAlign: 'center' }}
                  >
                    {wedding.date.monthName}
                  </span>
                </div>

                {/* Big Day */}
                <div className="text-[52px] sm:text-6xl md:text-7xl font-serif font-light text-deep leading-none px-1 flex-shrink-0">
                  {wedding.date.day}
                </div>

                {/* Year with borders */}
                <div className="border-y border-deep/40 py-2 px-3 sm:px-5 text-center min-w-[76px] sm:min-w-[150px] flex-shrink">
                  <span
                    className="tracking-[0.2em] text-deep font-light block"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(13px, 4vw, 18px)', lineHeight: '1.1', textAlign: 'center' }}
                  >
                    {wedding.date.year}
                  </span>
                </div>
              </div>

              {/* Time below */}
              <div className="mt-6 text-center">
                <span
                  className="font-display tracking-[0.25em] text-deep uppercase font-semibold"
                  style={{ fontSize: '16px', lineHeight: '16px' }}
                >
                  {wedding.date.weekdayAndTime}
                </span>
              </div>
            </motion.div>
          </motion.div>


        </section>

        {/* 2. LUGAR / LOCATION CARDS (Ubicaciones) */}
        <section
          id="lugar"
          className="w-full pt-20 pb-20 md:py-40 relative"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="max-w-5xl mx-auto px-6 relative z-10"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="text-center mb-16"
            >
              <span className="font-display text-[10px] uppercase tracking-[0.3em] text-muted mb-2 block font-semibold">{wedding.locations.eyebrow}</span>
              <h2 className="font-serif text-[51px] md:text-[61px] text-ink font-light italic">
                {wedding.locations.title}
              </h2>
              <Divider className="mt-4" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-stretch">
              {[wedding.locations.ceremony, wedding.locations.reception].map((place) => (
                <motion.div
                  key={place.name}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 14 } }
                  }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col justify-between relative px-2 md:px-6"
                >
                  <div>
                    <div className="mb-6 text-center">
                      <span className="font-display text-[10px] uppercase tracking-[0.3em] text-muted font-semibold">{place.eyebrow}</span>
                    </div>

                    <h3
                      className="text-2xl text-ink mb-4 font-normal tracking-wide text-center"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {place.name}
                    </h3>

                    <p className="font-serif text-muted text-[24px] italic mb-6 leading-relaxed text-center">
                      {place.address}
                    </p>

                    {place.image && (
                      <div className="relative h-64 md:h-72 w-full">
                        <Image
                          src={place.image}
                          alt={place.eyebrow}
                          fill
                          priority
                          className="object-contain object-center"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-center space-x-1.5 mb-8 text-muted text-xs">
                      <Clock size={13} className="opacity-85" />
                      <span style={{ fontFamily: 'var(--font-display)' }}>{place.time}</span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <a
                      href={place.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 w-[220px] py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-display text-[10px] uppercase tracking-[0.2em] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] font-semibold"
                    >
                      <span>{place.ctaLabel}</span>
                      <ChevronRight size={12} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 3 & 4. CUENTA ATRÁS Y CARRETE DE FOTOS */}
        <section id="fotos" className="py-24 pt-16 pb-16 relative overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center"
          >
            {/* Cuenta atrás: una lámina más de la papelería */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } }
              }}
              className="relative w-full max-w-[420px] border border-primary/30 px-10 py-14 text-center mb-20"
            >
              {/* Las cuatro esquinas salen de la misma imagen, girada */}
              {([
                ['-top-6 -left-6', ''],
                ['-top-6 -right-6', 'scale-x-[-1]'],
                ['-bottom-6 -left-6', 'scale-y-[-1]'],
                ['-bottom-6 -right-6', 'rotate-180'],
              ] as const).map(([posicion, giro]) => (
                <span
                  key={posicion}
                  aria-hidden
                  className={`absolute ${posicion} w-16 h-16 bg-contain bg-no-repeat ${giro}`}
                  style={{ backgroundImage: `url("${backgrounds.frameCorner}")` }}
                />
              ))}

              {timeLeft.completed ? (
                <p className="font-serif text-ink text-[clamp(2.2rem,11vw,3.4rem)] leading-tight">
                  {wedding.date.iso.slice(0, 10) === new Date().toISOString().slice(0, 10)
                    ? wedding.countdown.today
                    : wedding.countdown.past}
                </p>
              ) : (
                <>
                  <p className="font-serif text-muted text-[26px] leading-none mb-6">{wedding.countdown.lead}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-2">
                    {([
                      ['days', wedding.countdown.labels.days],
                      ['hours', wedding.countdown.labels.hours],
                      ['minutes', wedding.countdown.labels.minutes],
                      ['seconds', wedding.countdown.labels.seconds],
                    ] as const).map(([unidad, rotulo]) => (
                      <div key={unidad} className="text-center">
                        {/* Cada cifra entra por abajo y la anterior sale por arriba */}
                        <div className="relative h-[52px] md:h-[60px] overflow-hidden">
                          <AnimatePresence initial={false}>
                            <motion.span
                              key={timeLeft[unidad]}
                              initial={{ y: '65%', opacity: 0 }}
                              animate={{ y: '0%', opacity: 1 }}
                              exit={{ y: '-65%', opacity: 0 }}
                              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                              className="absolute inset-0 flex items-center justify-center font-serif text-ink text-[46px] md:text-[54px] leading-none"
                            >
                              {timeLeft[unidad]}
                            </motion.span>
                          </AnimatePresence>
                        </div>
                        <p className="font-display uppercase tracking-[0.18em] text-muted text-[9px] font-semibold mt-1">
                          {rotulo}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>

            {/* Carrete de fotos */}
            {weddingPhotos.length > 0 && (
              <div className="w-full">
                {wedding.gallery.image && (
                  <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-2">
                    <Image src={wedding.gallery.image} alt="" fill className="object-contain" referrerPolicy="no-referrer" />
                  </div>
                )}
                <h3 className="font-serif text-[41px] md:text-[51px] text-ink font-light italic text-center mb-8">
                  {wedding.gallery.title}
                </h3>
              </div>
            )}
          </motion.div>

          {/*
            El carrete va fuera del contenedor centrado para que ocupe todo el
            ancho. `overflow-hidden` lo mantiene dentro de la pantalla: nunca
            desplaza la página en horizontal.
          */}
          {weddingPhotos.length > 0 && (
            <div className="relative w-full overflow-hidden group">
              <div
                className="flex gap-3 md:gap-5 w-max motion-safe:animate-[carrete_var(--carrete)_linear_infinite] group-hover:[animation-play-state:paused]"
                style={{ '--carrete': `${wedding.gallery.speed}s` } as React.CSSProperties}
              >
                {/* Dos pasadas seguidas: al terminar la primera, el bucle encaja */}
                {[...weddingPhotos, ...weddingPhotos].map((foto, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActivePhoto(foto)}
                    aria-label="Ampliar foto"
                    className="relative shrink-0 h-[220px] w-[160px] md:h-[300px] md:w-[220px] bg-cream p-2 shadow-[0_6px_20px_rgba(0,0,0,0.14)] cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="relative block w-full h-full overflow-hidden">
                      <Image
                        src={foto}
                        alt={wedding.couple.joinedNames}
                        fill
                        sizes="(max-width: 768px) 160px, 220px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>


        {/* 4. ITINERARIO SECTION */}
        <section
          id="itinerario"
          className="py-24 pt-16 pb-16 text-ink itinerario-section"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="max-w-4xl mx-auto px-6"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="text-center mb-16"
            >
              <span className="font-display text-[10px] uppercase tracking-[0.3em] text-muted mb-2 block font-semibold">{wedding.itinerary.eyebrow}</span>
              <h2 className="font-serif text-[51px] md:text-[61px] text-ink font-medium italic">
                {wedding.itinerary.title}
              </h2>
              <p
                className="font-serif text-muted mt-2 italic text-[24px] leading-snug"
              >
                {wedding.itinerary.subtitle}
              </p>
              <Divider className="mt-4" />
            </motion.div>

            {/* TIMELINE TRACK */}
            <div className="relative mt-12 pl-8 md:pl-0">
              {/* Center line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 transform -translate-x-1/2" />

              <div className="space-y-10 md:space-y-16">
                {wedding.itinerary.events.map((event, i) => {
                  const izquierda = i % 2 === 0;
                  return (
                    <motion.div
                      key={event.title}
                      initial={{ opacity: 0, y: 50, scale: 0.94 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ type: "spring", stiffness: 90, damping: 13 }}
                      className="relative flex"
                    >
                      {/* Punto sobre la línea, a la altura del hito */}
                      <span
                        aria-hidden
                        className="absolute left-1/2 top-8 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/40"
                      />

                      <div
                        className={`w-1/2 flex flex-col ${
                          izquierda
                            ? 'pr-5 md:pr-12 items-end text-right'
                            : 'ml-auto pl-5 md:pl-12 items-start text-left'
                        }`}
                      >
                        {event.image && (
                          <div className="relative w-24 h-24 md:w-32 md:h-32 mb-1">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              className={`object-contain ${izquierda ? 'object-right' : 'object-left'}`}
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}
                        <div className="inline-block px-3 py-1 bg-primary/5 border border-primary/15 rounded-full text-ink font-display text-xs mb-2 font-semibold">
                          {event.time}
                        </div>
                        <h4 className="text-[clamp(1.15rem,5.4vw,2.1rem)] leading-tight text-ink font-display font-semibold">
                          {event.title}
                        </h4>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </section>

        {/* 5. PLAYLIST / MUSIC SUGGESTIONS */}
        {wedding.music.enabled && (
          <section
            id="musica"
            className="w-full py-24 pt-16 pb-16 relative"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
              className="max-w-4xl mx-auto px-6 text-center relative z-10"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="bg-cream border border-primary/10 rounded-sm p-10 md:p-14 shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-primary/10" />
                {wedding.music.image && (
                  <div className="flex justify-center mb-6">
                    <div className="relative w-28 h-28 md:w-36 md:h-36">
                      <Image
                        src={wedding.music.image}
                        alt={wedding.music.title}
                        fill
                        className="object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                )}

                <h3 className="font-serif text-[41px] md:text-[51px] text-ink mb-4 font-light italic">
                  {wedding.music.title}
                </h3>

                <p className="text-muted text-[15px] italic leading-relaxed max-w-lg mx-auto mb-10">
                  {wedding.music.description}
                </p>

                <button
                  onClick={() => setShowMusicModal(true)}
                  className="inline-flex items-center space-x-3 px-8 py-3 bg-primary hover:bg-primary/90 text-white font-display text-[10px] uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer font-semibold"
                >
                  <Music size={13} />
                  <span>{wedding.music.ctaLabel}</span>
                </button>

                {musicList.length > 0 && (
                  <div className="mt-12 text-left max-w-md mx-auto">
                    <span className="text-[10px] uppercase tracking-wider text-muted block mb-4 border-b border-primary/10 pb-2 font-display font-semibold">
                      Top canciones sugeridas:
                    </span>
                    <div className="space-y-3">
                      {musicList.slice(0, 3).map((song, index) => (
                        <div
                          key={song.id}
                          className="flex items-center justify-between text-xs bg-sand/30 p-2.5 rounded-md border border-primary/5"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-[10px] text-ink/40 font-display w-4 shrink-0 font-semibold">#{index + 1}</span>
                            <div className="min-w-0">
                              <span className="font-bold text-ink block truncate">{song.title}</span>
                              <span className="text-muted">{song.artist}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleVoteSong(song.id)}
                            className="flex items-center space-x-1.5 px-2 py-1 hover:bg-primary/5 rounded font-display text-[10px] uppercase text-muted border border-primary/10 transition-colors shrink-0 ml-2 font-semibold"
                          >
                            <Heart size={10} className="fill-primary/20 text-ink" />
                            <span>{song.votes}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                    {musicList.length > 3 && (
                      <button
                        onClick={() => setShowAllSongsModal(true)}
                        className="mt-4 w-full py-2 text-[10px] uppercase tracking-wider font-display text-muted border border-primary/15 rounded-full hover:bg-primary/5 transition-colors cursor-pointer font-semibold"
                      >
                        Ver todas las canciones ({musicList.length})
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          </section>
        )}

        {/* 6. NEXT ADVENTURE / LUNA DE MIEL */}
        {wedding.gift.enabled && (
          <section id="viaje" className="py-24 pt-16 pb-16 bg-secondary relative text-white">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12 }
                }
              }}
              className="max-w-3xl mx-auto px-6 text-center"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="font-display text-[10px] uppercase tracking-[0.3em] text-white/80 mb-2 block font-semibold"
              >
                {wedding.gift.eyebrow}
              </motion.span>
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
                }}
                className="font-serif text-[51px] md:text-[61px] text-white font-medium mb-6 italic"
              >
                {wedding.gift.title}
              </motion.h2>
              <motion.div
                variants={{
                  hidden: { opacity: 0, scaleX: 0 },
                  visible: { opacity: 1, scaleX: 1, transition: { duration: 0.6 } }
                }}
              >
                <Divider className="mb-3" tone="claro" />
              </motion.div>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
                className="font-serif text-[26px] text-white/95 italic leading-relaxed max-w-xl mx-auto mb-2"
              >
                {wedding.gift.description}
              </motion.p>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
                className="font-serif text-[26px] text-white leading-relaxed max-w-lg mx-auto mb-1"
              >
                {wedding.gift.invitation}
              </motion.p>

              <div className="flex justify-center">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.92, rotate: -2 },
                    visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }
                  }}
                  className="relative w-84 h-52 md:w-106 md:h-80"
                >
                  {wedding.gift.image && (
                    <Image
                      src={wedding.gift.image}
                      alt={wedding.gift.imageAlt}
                      fill
                      className="object-contain"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </motion.div>
              </div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } }
                }}
                className="flex flex-col items-center gap-2"
              >
                <p className="font-serif text-white/75 text-[24px] italic">
                  {wedding.gift.ctaHint}
                </p>
                <button
                  onClick={() => setShowIbanModal(true)}
                  className="inline-flex items-center space-x-2 px-8 py-3.5 bg-white text-ink hover:bg-white/90 font-display text-[11px] uppercase tracking-[0.22em] rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer font-semibold"
                >
                  <Gift size={13} />
                  <span>{wedding.gift.ctaLabel}</span>
                </button>
              </motion.div>
            </motion.div>
          </section>
        )}

        {/* 7. CONFIRMA TU ASISTENCIA (RSVP Form) */}
        <section
          id="confirmacion"
          className="w-full py-24 pt-16 pb-16 confirmacion-section"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="max-w-4xl mx-auto px-6"
          >
            <div className="text-center mb-12">
              {wedding.rsvp.image ? (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                  className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4"
                >
                  <Image src={wedding.rsvp.image} alt="" fill className="object-contain" referrerPolicy="no-referrer" />
                </motion.div>
              ) : (
                <div className="flex justify-center mb-6">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 70, damping: 15 } }
                    }}
                    className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10"
                  >
                    <Check size={32} className="text-ink" />
                  </motion.div>
                </div>
              )}
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
                className="font-serif text-[51px] md:text-[61px] text-ink font-light italic"
              >
                {wedding.rsvp.title}
              </motion.h2>
              <motion.div
                variants={{
                  hidden: { opacity: 0, scaleX: 0 },
                  visible: { opacity: 1, scaleX: 1, transition: { duration: 0.6 } }
                }}
              >
                <Divider className="mt-4 mb-6" />
              </motion.div>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
                className="font-serif text-[24px] md:text-[26px] text-muted leading-relaxed max-w-md mx-auto"
              >
                Para poder organizar con cariño y detalle este día, por favor, agradeceríamos que rellenarais este formulario antes del <strong className="text-ink">{wedding.rsvp.deadline}</strong>, gracias.
              </motion.p>
            </div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 35 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="bg-cream border border-primary/10 rounded-sm p-8 md:p-12 shadow-sm max-w-2xl mx-auto"
            >
              <RSVPForm
                key={formKey}
                onSubmitted={handleRsvpSubmitted}
                onEdit={handleEditRsvp}
                rsvpData={rsvpData}
                formSubmitted={formSubmitted}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* 8. INFORMACIÓN DE INTERÉS */}
        <section
          id="informacion"
          className="py-20 pt-16 pb-16 relative"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="max-w-4xl mx-auto px-6 relative z-10"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="text-center mb-12"
            >
              {wedding.info.image && (
                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4">
                  <Image src={wedding.info.image} alt="" fill className="object-contain" referrerPolicy="no-referrer" />
                </div>
              )}
              <span className="font-display text-[9px] uppercase tracking-[0.3em] text-ink/70 font-semibold">{wedding.info.eyebrow}</span>
              <h3 className="font-serif text-[41px] md:text-[51px] text-ink mt-1 font-light italic">
                {wedding.info.title}
              </h3>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {wedding.info.cards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 14 } }
                  }}
                  whileHover={{ y: -4, boxShadow: "0 10px 25px -10px rgba(0,0,0,0.2)" }}
                  className="bg-secondary p-8 border border-white/10 rounded shadow-sm flex flex-col justify-between items-start text-left"
                >
                  <div>
                    {card.image && (
                      <div className="relative w-24 h-24 mb-3 brightness-0 invert opacity-90">
                        <Image src={card.image} alt="" fill className="object-contain object-left" referrerPolicy="no-referrer" />
                      </div>
                    )}
                    <h4 className="text-[17px] text-white font-medium mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                      {card.title}
                    </h4>
                    <p className="font-serif text-[22px] text-white/90 leading-snug">
                      {card.body}
                      {card.bullets.map((bullet, i) => (
                        <span key={i} className={`block font-semibold ${i === 0 ? 'mt-2' : 'mt-1.5'}`}>
                          {bullet}
                        </span>
                      ))}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 9. ¿DUDAS? (WHATSAPP INVITADOS CHAT LINKS) */}
        <section
          className="py-20 pt-16 pb-16 dudas-section"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="max-w-4xl mx-auto px-6 text-center"
          >
            {wedding.contact.image && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4"
              >
                <Image src={wedding.contact.image} alt="" fill className="object-contain" referrerPolicy="no-referrer" />
              </motion.div>
            )}

            <motion.h3
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="font-serif text-[41px] text-ink mb-4 font-light italic"
            >
              {wedding.contact.title}
            </motion.h3>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="font-serif text-[26px] text-muted leading-relaxed mb-10 max-w-md mx-auto"
            >
              {wedding.contact.description}
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto"
            >
              {[wedding.couple.partnerA, wedding.couple.partnerB].map((partner) => (
                <a
                  key={partner.firstName}
                  href={whatsappUrl(partner)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-3 w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-display text-[10px] uppercase tracking-[0.2em] transition-all duration-300 shadow-md hover:scale-105 active:scale-95 font-semibold"
                >
                  <PhoneCall size={12} />
                  <span>{partner.whatsappLabel}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* 10. FOOTER: TE ESPERAMOS */}
        <footer
          className="pt-28 pb-16 md:pt-32 md:pb-20 text-center relative overflow-hidden bg-secondary"
          style={{
            backgroundColor: 'var(--color-secondary)',
          }}
        >
          {/* Ambient mask overlay to ensure perfect contrast and depth */}
          <div className="absolute inset-0 bg-primary/15 pointer-events-none z-0" />

          <div className="max-w-2xl mx-auto px-6 relative z-10">
            <span
              className="text-[clamp(2.6rem,13vw,4.5rem)] leading-[1.15] block mb-6 text-cream drop-shadow-sm font-serif"
            >
              {wedding.footer.headline}
            </span>
            <p className="font-display text-[11px] md:text-xs uppercase tracking-[0.3em] text-cream mb-2 drop-shadow-xs font-semibold">
              {wedding.couple.joinedNames}
            </p>
            <p className="font-display text-[9px] md:text-[10px] text-cream/85 tracking-widest uppercase drop-shadow-xs font-semibold">
              {wedding.date.long} • {wedding.date.city}
            </p>
          </div>

          {/* Bottom thin bar */}
          <div className="absolute bottom-0 left-0 right-0 py-3 bg-primary/30 border-t border-cream/10 z-10">
            <p className="font-display text-[9px] md:text-[10px] text-cream/80 tracking-widest font-semibold">
              By{' '}
              <a
                href={wedding.footer.credit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-cream transition-colors"
              >
                {wedding.footer.credit.label}
              </a>
              . Todos los derechos reservados.
            </p>
          </div>
        </footer>

        {/* ========================================================= */}
        {/* MODALS / OVERLAYS & PORTALS */}
        {/* ========================================================= */}

        {/* MODAL 1: DATOS IBAN / REGALOS */}
        <AnimatePresence>
          {showIbanModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 select-text">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowIbanModal(false)}
                className="absolute inset-0 bg-primary/45 backdrop-blur-xs"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-cream border border-primary/20 rounded-md shadow-2xl p-8 relative z-50 max-w-md w-full text-center"
              >
                <button
                  onClick={() => setShowIbanModal(false)}
                  className="absolute top-4 right-4 p-1.5 text-ink/60 hover:text-ink hover:bg-primary/5 rounded-full transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>

                <div className="flex justify-center mb-4 text-muted">
                  <Plane size={32} className="animate-bounce" />
                </div>

                <h3 className="font-serif text-[41px] text-ink mb-3">{wedding.gift.modal.title}</h3>

                <p className="text-xs text-muted leading-relaxed mb-6">
                  {wedding.gift.modal.description}
                </p>

                <div className="bg-sand/60 p-4 rounded-md border border-primary/10 mb-6 relative text-left">
                  {/* IBAN Section */}
                  <span className="block text-[8px] font-display uppercase tracking-[0.2em] text-muted mb-2 font-semibold">
                    Número de cuenta (IBAN):
                  </span>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-xs md:text-sm text-ink select-all tracking-wider font-semibold">
                      {wedding.gift.modal.iban}
                    </span>
                    <button
                      onClick={handleCopyIban}
                      className="p-2 bg-primary/5 hover:bg-primary/10 text-ink rounded transition-all active:scale-95 cursor-pointer"
                      title="Copiar IBAN"
                    >
                      {copied ? (
                        <span className="text-[10px] font-display uppercase tracking-wider font-semibold">¡Copiado!</span>
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>

                  {/* SWIFT/BIC Section */}
                  <span className="block text-[8px] font-display uppercase tracking-[0.2em] text-muted mb-2 font-semibold">
                    Código Swift/BIC:
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs md:text-sm text-ink select-all tracking-wider font-semibold">
                      {wedding.gift.modal.swift}
                    </span>
                    <button
                      onClick={handleCopySwift}
                      className="p-2 bg-primary/5 hover:bg-primary/10 text-ink rounded transition-all active:scale-95 cursor-pointer"
                      title="Copiar Swift/BIC"
                    >
                      {copiedSwift ? (
                        <span className="text-[10px] font-display uppercase tracking-wider font-semibold">¡Copiado!</span>
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>

                  {/* Info notice */}
                  <div className="flex items-start gap-1.5 mt-3 text-[9px] text-muted leading-snug">
                    <Info size={11} className="mt-0.5 flex-shrink-0 text-muted" />
                    <span>Con este código podrás recibir transferencias internacionales</span>
                  </div>

                  <span className="block text-[8px] text-muted mt-3 pt-2 border-t border-primary/5">
                    Titulares: {wedding.gift.modal.holders}
                  </span>
                </div>

                <p className="text-[10px] text-muted uppercase tracking-wider italic font-display font-semibold">
                  {wedding.gift.modal.thanks}
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MODAL 2: SUGERIR CANCIONES */}
        <AnimatePresence>
          {showMusicModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 select-text">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMusicModal(false)}
                className="absolute inset-0 bg-primary/45 backdrop-blur-xs"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-cream border border-primary/20 rounded-md shadow-2xl p-8 relative z-50 max-w-sm w-full"
              >
                <button
                  onClick={() => setShowMusicModal(false)}
                  className="absolute top-4 right-4 p-1.5 text-ink/60 hover:text-ink hover:bg-primary/5 rounded-full transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>

                <div className="text-center mb-6">
                  <Music size={26} className="text-muted mx-auto mb-2" />
                  <h3 className="font-serif text-[34px] text-ink">{wedding.music.modal.title}</h3>
                  <p className="text-xs text-muted mt-1">{wedding.music.modal.subtitle}</p>
                </div>

                <AnimatePresence>
                  {showAddSongSuccess && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-primary/10 border border-primary/25 rounded text-ink p-3 text-center mb-4 font-display text-xs flex items-center justify-center gap-1.5 overflow-hidden font-semibold"
                    >
                      <Check size={14} />
                      <span>¡Canción añadida con éxito!</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleAddSong} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider font-display text-muted mb-1 font-semibold">
                      Título de la Canción
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={wedding.music.modal.songPlaceholder}
                      value={newSongTitle}
                      onChange={(e) => setNewSongTitle(e.target.value)}
                      className="w-full bg-sand/30 border border-primary/20 rounded p-2 text-ink focus:outline-none focus:border-primary focus:bg-sand/50 transition-colors font-display font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider font-display text-muted mb-1 font-semibold">
                      Artista
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={wedding.music.modal.artistPlaceholder}
                      value={newSongArtist}
                      onChange={(e) => setNewSongArtist(e.target.value)}
                      className="w-full bg-sand/30 border border-primary/20 rounded p-2 text-ink focus:outline-none focus:border-primary focus:bg-sand/50 transition-colors font-display font-semibold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white tracking-[0.2em] font-display text-[10px] uppercase rounded-full transition-all duration-300 shadow hover:shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98] font-semibold"
                  >
                    {wedding.music.modal.submitLabel}
                  </button>
                </form>

                <div className="mt-6 border-t border-primary/10 pt-4 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                  <span className="block text-[9px] uppercase tracking-wider text-muted mb-2 font-display font-semibold">
                    Sugiriendo actualmente ({musicList.length}):
                  </span>
                  <div className="space-y-2">
                    {musicList.map(song => (
                      <div key={song.id} className="flex justify-between items-center bg-sand/30 p-2 rounded text-[11px] border border-primary/5">
                        <div className="truncate pr-4">
                          <span className="font-bold text-ink">{song.title}</span> - <span className="text-muted">{song.artist}</span>
                        </div>
                        <span className="text-[10px] font-display bg-primary/5 px-2 py-0.5 rounded text-ink font-semibold">
                          {song.votes} votos
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ALL SONGS MODAL */}
        <AnimatePresence>
          {showAllSongsModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 select-text">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAllSongsModal(false)}
                className="absolute inset-0 bg-primary/45 backdrop-blur-xs"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-cream border border-primary/20 rounded-md shadow-2xl p-8 relative z-50 max-w-sm w-full"
              >
                <button
                  onClick={() => setShowAllSongsModal(false)}
                  className="absolute top-4 right-4 p-1.5 text-ink/60 hover:text-ink hover:bg-primary/5 rounded-full transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
                <div className="text-center mb-6">
                  <Music size={26} className="text-muted mx-auto mb-2" />
                  <h3 className="font-serif text-[34px] text-ink">Playlist de los invitados</h3>
                  <p className="text-xs text-muted mt-1">{musicList.length} canciones sugeridas</p>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
                  {musicList.map((song, index) => (
                    <div key={song.id} className="flex items-center justify-between bg-sand/30 p-2.5 rounded text-[11px] border border-primary/5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-[10px] text-ink/40 font-display w-4 shrink-0 font-semibold">#{index + 1}</span>
                        <div className="min-w-0 truncate">
                          <span className="font-bold text-ink">{song.title}</span>
                          <span className="text-muted"> — {song.artist}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleVoteSong(song.id)}
                        className="flex items-center space-x-1 px-2 py-1 hover:bg-primary/5 rounded font-display text-[10px] text-muted border border-primary/10 transition-colors shrink-0 ml-2 font-semibold"
                      >
                        <Heart size={9} className="fill-primary/20 text-ink" />
                        <span>{song.votes}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* LIGHTBOX FOR PHOTOS */}
        <AnimatePresence>
          {activePhoto && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 select-none"
              onClick={() => setActivePhoto(null)}
            >
              {/* Backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-overlay/92 backdrop-blur-md"
              />

              {/* Main image container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full h-[70vh] md:h-[80vh] z-50 flex items-center justify-center cursor-default"
              >
                <div className="relative w-full h-full rounded border border-white/10 overflow-hidden shadow-2xl">
                  <Image
                    src={activePhoto}
                    alt="Nuestros momentos ampliada"
                    fill
                    sizes="100vw"
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Close button */}
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute -top-12 right-0 md:-top-10 md:-right-10 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                  <X size={24} />
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </motion.div>

      {!introDone && (
        <EnvelopeIntro
          onStartExit={() => setShowMain(true)}
          onComplete={() => setIntroDone(true)}
        />
      )}
    </main>
  );
}
