import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { fetchCompleted } from "../services/aniListService";
import { Star, Clock, Trophy } from "lucide-react";

interface CompletedStoriesProps {
  username: string;
}

export default function CompletedStories({ username }: CompletedStoriesProps) {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCompleted(username);
      setEntries(data.slice(0, 6)); // Show latest 6
      setLoading(false);
    };
    loadData();
  }, [username]);

  if (loading) return null;
  if (entries.length === 0) return null;

  return (
    <section id="completed" className="py-32 px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col items-center text-center mb-20 space-y-4">
        <h2 className="text-5xl md:text-7xl font-bebas tracking-[0.06em] text-[#d4d4d4]">
          Finished Stories
        </h2>
        <p className="text-[#d4d4d4]/45 max-w-lg mx-auto font-syne text-[12.5px] leading-[1.85]">
          A real-time reflection of the narratives that have shaped my perspective. 
          Updated whenever a credit roll ends.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.media.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="group relative h-[450px] overflow-hidden border border-white/5 bg-void"
            >
              {/* Background Cover */}
              <img 
                src={entry.media.coverImage.extraLarge || entry.media.coverImage.large} 
                alt={entry.media.title.romaji}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-30 group-hover:opacity-50"
                referrerPolicy="no-referrer"
              />
              
              {/* Layered Textures from design system */}
              <div className="absolute inset-0 halftone opacity-20 pointer-events-none" />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1 bg-neon/8 backdrop-blur-md px-3 py-1 border border-neon/22">
                    <Star className="w-3 h-3 text-neon" />
                    <span className="text-[9px] font-bold font-syne text-neon uppercase tracking-widest">{entry.media.averageScore}%</span>
                  </div>
                  <div className="flex items-center gap-1 bg-crimson/10 backdrop-blur-md px-3 py-1 border border-crimson/20">
                    <Clock className="w-3 h-3 text-crimson2" />
                    <span className="text-[9px] font-bold font-syne text-white uppercase tracking-widest">{entry.media.episodes} Ep</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bebas tracking-wider text-white mb-2 leading-tight group-hover:text-neon transition-colors">
                  {entry.media.title.english || entry.media.title.romaji}
                </h3>
                
                <p className="text-[#d4d4d4]/45 text-[11px] line-clamp-2 font-syne mb-6 leading-relaxed">
                  {entry.media.description?.replace(/<[^>]*>?/gm, '')}
                </p>

                <div className="flex flex-wrap gap-2">
                  {entry.media.genres.slice(0, 2).map((genre: string) => (
                    <span key={genre} className="text-[8px] uppercase tracking-widest text-[#d4d4d4]/20 border border-white/5 px-2 py-1">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-6 right-6 flex items-center gap-3 bg-void/80 backdrop-blur-xl p-3 border border-white/5 group-hover:border-neon/35 transition-colors">
                <Trophy className="w-4 h-4 text-neon" />
                <div className="flex flex-col">
                  <span className="text-[7px] uppercase tracking-[0.2em] text-[#d4d4d4]/30">Archive</span>
                  <span className="text-[9px] font-bold text-white font-syne uppercase tracking-widest">Completed</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-16 text-center"
      >
        <a 
          href={`https://anilist.co/user/${username}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.4em] text-[#d4d4d4]/20 hover:text-neon transition-colors group font-syne"
        >
          View Full Archive
          <motion.span 
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-neon"
          >
            →
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
}
