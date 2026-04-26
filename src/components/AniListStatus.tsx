import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { fetchWatching, AniListEntry } from "../services/aniListService";
import { Play, Calendar, ExternalLink } from "lucide-react";

interface AniListStatusProps {
  username: string;
}

export default function AniListStatus({ username }: AniListStatusProps) {
  const [entries, setEntries] = useState<AniListEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchWatching(username);
      setEntries(data);
      setLoading(false);
    };

    loadData();
    // Refresh every 5 minutes for "real-time" feel
    const interval = setInterval(loadData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [username]);

  if (loading) return null;
  if (entries.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-20 px-4">
      <div className="flex flex-col items-center gap-3 mb-10">
        <div className="relative flex items-center justify-center">
          <div className="w-2 h-2 bg-neon rounded-full pulse shadow-[0_0_8px_#3af4ff] z-10" />
        </div>
        <h4 className="text-[9px] uppercase tracking-[0.6em] text-[#d4d4d4]/40 font-syne font-bold">Watch Feed</h4>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-neon/30 to-transparent mt-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.media.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex gap-6 p-6 bg-[#0f1010] border border-white/5 overflow-hidden transition-all hover:mana-glow-blue"
            >
              {/* Cover Image */}
              <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden shadow-2xl">
                <img 
                  src={entry.media.coverImage.large} 
                  alt={entry.media.title.romaji}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <a 
                  href={`https://anilist.co/anime/${entry.media.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-void/40"
                >
                  <ExternalLink className="w-5 h-5 text-neon" />
                </a>
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1 min-w-0 py-1">
                <h5 className="font-bebas tracking-widest text-lg text-white truncate mb-1 group-hover:text-neon transition-colors">
                  {entry.media.title.english || entry.media.title.romaji}
                </h5>
                
                <div className="flex items-center gap-2 text-[10px] text-[#d4d4d4]/40 mb-auto uppercase tracking-wider font-syne">
                  <Play className="w-2.5 h-2.5 fill-current text-neon" />
                  <span>Episode {entry.progress} / {entry.media.episodes || "?"}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-[2px] bg-white/5 overflow-hidden mb-4 mt-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(entry.progress / (entry.media.episodes || entry.progress + 5)) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-neon shadow-[0_0_8px_rgba(58,244,255,0.5)]"
                  />
                </div>

                {/* Airing Info */}
                {entry.media.nextAiringEpisode && (
                  <div className="flex items-center gap-2 text-[8px] text-gold bg-gold/5 w-fit px-2 py-1 border border-gold/20 font-syne uppercase tracking-widest">
                    <Calendar className="w-3 h-3" />
                    <span>Ep {entry.media.nextAiringEpisode.episode} in {Math.floor(entry.media.nextAiringEpisode.timeUntilAiring / 3600 / 24)}d</span>
                  </div>
                )}
              </div>
              
              {/* Corner Accents on Hover */}
              <div className="absolute top-0 left-0 w-full h-full corner-accent-tl opacity-0 group-hover:opacity-100 pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-full corner-accent-br opacity-0 group-hover:opacity-100 pointer-events-none" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
