import { Instagram, Youtube, Send, Mail, Github } from "lucide-react";
import { config } from "../config";

export default function Footer() {
  const socialIcons = [
    { icon: Github, href: config.socials.github },
    { icon: Instagram, href: config.socials.instagram },
    { icon: Youtube, href: config.socials.youtube },
    { icon: Send, href: config.socials.telegram },
    { icon: Mail, href: `mailto:${config.email}` },
  ];

  return (
    <footer id="contact" className="py-20 px-8 border-t border-white/5 bg-void/50 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-marker tracking-wider text-white uppercase" style={{ textShadow: "3px 3px 0 rgba(192,57,43,0.5), 6px 6px 0 rgba(192,57,43,0.25)" }}>
              {config.name}
            </span>
          </div>
          <p className="text-white/60 max-w-md leading-[1.85] font-syne text-[13px]">
            {config.hero.bio}
          </p>
          <div className="flex gap-3">
            {socialIcons.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[44px] h-[44px] flex items-center justify-center border border-white/10 bg-white/5 text-white/40 transition-all duration-300 hover:border-crimson hover:text-crimson hover:shadow-[0_0_15px_rgba(192,57,43,0.3)] hover:-translate-y-1"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-white/80">Explore</h4>
          <ul className="space-y-4">
            <li>
              <a href="#home" className="group flex items-center gap-2 text-[12px] font-syne text-white/40 hover:text-white transition-all uppercase tracking-[0.15em]">
                <span className="w-0 h-[1px] bg-crimson transition-all group-hover:w-4" />
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="group flex items-center gap-2 text-[12px] font-syne text-white/40 hover:text-white transition-all uppercase tracking-[0.15em]">
                <span className="w-0 h-[1px] bg-crimson transition-all group-hover:w-4" />
                Skills
              </a>
            </li>
            <li>
              <a href="#completed" className="group flex items-center gap-2 text-[12px] font-syne text-white/40 hover:text-white transition-all uppercase tracking-[0.15em]">
                <span className="w-0 h-[1px] bg-crimson transition-all group-hover:w-4" />
                Archive
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-white/80">Socials</h4>
          <ul className="space-y-4">
            <li>
              <a href={config.socials.github} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[12px] font-syne text-white/40 hover:text-white transition-all uppercase tracking-[0.15em]">
                <span className="w-0 h-[1px] bg-crimson transition-all group-hover:w-4" />
                GitHub
              </a>
            </li>
            <li>
              <a href={config.socials.anilist} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[12px] font-syne text-white/40 hover:text-white transition-all uppercase tracking-[0.15em]">
                <span className="w-0 h-[1px] bg-crimson transition-all group-hover:w-4" />
                AniList
              </a>
            </li>
            <li>
              <a href={config.socials.instagram} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[12px] font-syne text-white/40 hover:text-white transition-all uppercase tracking-[0.15em]">
                <span className="w-0 h-[1px] bg-crimson transition-all group-hover:w-4" />
                Instagram
              </a>
            </li>
            <li>
              <a href={config.socials.youtube} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[12px] font-syne text-white/40 hover:text-white transition-all uppercase tracking-[0.15em]">
                <span className="w-0 h-[1px] bg-crimson transition-all group-hover:w-4" />
                YouTube
              </a>
            </li>
            <li>
              <a href={config.socials.telegram} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[12px] font-syne text-white/40 hover:text-white transition-all uppercase tracking-[0.15em]">
                <span className="w-0 h-[1px] bg-crimson transition-all group-hover:w-4" />
                Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-syne">
          {config.name} · {config.footer.copyright} · {config.footer.year}
        </span>
        <div className="flex gap-8">
          <a href="#" className="text-[10px] text-white/20 hover:text-crimson uppercase tracking-[0.4em] font-syne transition-colors">Privacy</a>
          <a href="#" className="text-[10px] text-white/20 hover:text-crimson uppercase tracking-[0.4em] font-syne transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
