import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  ArrowUpRight,
  Code2,
  Briefcase,
  Lightbulb,
  Send,
  Sparkles
} from 'lucide-react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- CONFIGURATION ---
const GITHUB_USERNAME = 'TALVIN29'; // <-- REPLACE THIS WITH YOUR GITHUB USERNAME

const FALLBACK_PROJECTS = [
  {
    id: 'loading',
    title: 'Loading Systems...',
    tag: 'Syncing',
    description: 'Fetching live repositories from GitHub...',
    featureHighlight: 'Establishing secure connection...',
    techStack: ['API', 'Sync'],
    link: '#',
    icon: <Sparkles className="w-6 h-6 text-blue-400 animate-pulse" />,
    colSpan: 'col-span-1 md:col-span-2'
  }
];

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [isSyncing, setIsSyncing] = useState(true);
  const [ideaText, setIdeaText] = useState('');
  const [isIdeaSubmitted, setIsIdeaSubmitted] = useState(false);

  // --- 3D Hover Effect State ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    setMounted(true);

    const fetchGitHubProjects = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`);
        if (!response.ok) throw new Error('Failed to fetch from GitHub');
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          // Filter out the portfolio repository itself and take the top 4
          const filteredProjects = data.filter((repo: any) => repo.name !== 'portfolio_landing_page').slice(0, 4);

          const mappedProjects = filteredProjects.map((repo: any, index: number) => ({
            id: repo.id,
            title: repo.name,
            tag: repo.language ? `Built with ${repo.language}` : 'Cross-platform',
            description: repo.description || 'No description provided for this repository. Check out the code to see what it does!',
            featureHighlight: `Last updated: ${new Date(repo.updated_at).toLocaleDateString()}`,
            techStack: [repo.language || 'Code', 'Open Source'],
            link: repo.html_url,
            icon: <Code2 className="w-6 h-6 text-emerald-400" />,
            colSpan: 'col-span-1'
          }));
          setProjects(mappedProjects);
        }
      } catch (error) {
        console.error('Error syncing GitHub data:', error);
      } finally {
        setIsSyncing(false);
      }
    };

    fetchGitHubProjects();
  }, []);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#090909] text-gray-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-24">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-24">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-emerald-400" />
            <span className="text-xl font-bold tracking-tighter text-white">System.Init</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]'} animate-pulse`} />
            <span className={`text-xs font-mono uppercase tracking-wider ${isSyncing ? 'text-blue-400' : 'text-emerald-400'}`}>
              {isSyncing ? 'Syncing GitHub...' : 'System Active'}
            </span>
          </div>
        </header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-24"
        >
          {/* HERO SECTION */}
          <motion.section variants={itemVariants} className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-6 max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
                Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Scalable Automation</span> &amp; FinTech Solutions.
              </h1>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-2xl">
                 Engineering high-performance systems that bridge complex data logic with seamless digital experiences. Focused on real-world impact, building practical tools that streamline operations and elevate financial technologies.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                 <a href="#projects" className="group relative px-8 py-4 font-semibold text-lg bg-emerald-500 text-[#090909] rounded-xl overflow-hidden hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                   <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-400 to-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <span className="relative flex items-center gap-2 z-10">Explore Work <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                 </a>
                 <a href="#contact" className="group px-8 py-4 font-semibold text-lg text-white bg-white/[0.03] rounded-xl border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all flex items-center gap-2 backdrop-blur-sm">
                   Contact Me <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                 </a>
              </div>
            </div>
            
            <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0 [perspective:1000px]">
              {/* Decorative background glows */}
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
              <div className="absolute inset-[-10%] bg-blue-500/10 blur-2xl rounded-full animate-pulse" />
              
              {/* Profile Image Container - 3D Tilt */}
              <motion.div 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateY,
                  rotateX,
                  transformStyle: "preserve-3d",
                }}
                className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(16,185,129,0.15)] bg-[#050505] cursor-crosshair group"
              >
                {/* Dynamic Glare Overlay */}
                <motion.div 
                  className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: useTransform(
                      [mouseXSpring, mouseYSpring],
                      ([currentX, currentY]) => {
                        const bgX = (currentX as number) * 100 + 50;
                        const bgY = (currentY as number) * 100 + 50;
                        return `radial-gradient(circle at ${bgX}% ${bgY}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)`;
                      }
                    )
                  }}
                />
                
                <img 
                  src="/portfolio_landing_page/profile.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover object-center transform transition-transform duration-700"
                  style={{ transform: "translateZ(50px) scale(1.1)" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/profile.jpg";
                  }}
                />
              </motion.div>
              
              {/* Floating Badge (Also gets 3D effect visually by sitting on top) */}
              <div className="absolute -bottom-6 -right-6 bg-[#090909]/90 p-4 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-3 backdrop-blur-xl z-30 transition-transform duration-500 hover:scale-110 cursor-pointer">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                <span className="text-sm font-medium text-white pr-2">System Ready</span>
              </div>
            </div>
          </motion.section>



          <div className="mt-24">
            {/* PROJECTS BENTO GRID (FULL WIDTH) */}
            <motion.section variants={itemVariants} className="space-y-8" id="projects">
              <div className="flex items-center gap-3 mb-10">
                <Briefcase className="w-6 h-6 text-emerald-400" />
                <h2 className="text-3xl font-bold text-white tracking-tight">Featured Projects</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project: any, index: number) => {
                  // Adjust colSpans for a masonry-like bento grid feel on larger screens
                  let dynamicColSpan = 'col-span-1';
                  if (projects.length >= 4) {
                    if (index === 0) dynamicColSpan = 'col-span-1 lg:col-span-2'; // Top Left Wide
                    if (index === 3) dynamicColSpan = 'col-span-1 lg:col-span-2'; // Bottom Right Wide
                  } else if (projects.length === 1) {
                    dynamicColSpan = 'col-span-1 lg:col-span-2';
                  }
                  return (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      key={project.id}
                      whileHover={{ scale: 0.99, translateY: -5 }}
                      className={`block group p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.05] backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.2)] ${project.colSpan}`}
                    >
                      <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 text-emerald-400">
                        <ArrowUpRight className="w-8 h-8" />
                      </div>
                      
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 bg-white/[0.03] rounded-2xl ring-1 ring-white/10 group-hover:ring-emerald-500/50 group-hover:bg-emerald-500/10 transition-all shadow-inner">
                          {project.icon}
                        </div>
                        <div>
                          <span className="text-xs font-mono text-emerald-400/80 uppercase tracking-wider">{project.tag}</span>
                          <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">{project.title}</h3>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 mb-6 max-w-lg leading-relaxed line-clamp-3">{project.description}</p>
                      
                      <div className="mb-10 p-4 rounded-xl bg-white/[0.02] border border-white/[0.03] text-sm text-gray-300">
                        <strong className="text-white font-medium block mb-1">Highlight:</strong>
                        {project.featureHighlight}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-auto absolute bottom-8">
                        {project.techStack.map((tech: string) => (
                          <span key={tech} className="px-3 py-1.5 text-xs font-semibold bg-[#090909]/80 text-emerald-400/90 rounded-full border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors shadow-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                      {/* Spacer to push content above absolute positioned tags */}
                      <div className="h-8"></div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.section>

            {/* COMING SOON / IDEA REQUEST */}
            <motion.section variants={itemVariants} className="mt-24 space-y-8" id="coming-soon">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-blue-400" />
                <h2 className="text-3xl font-bold text-white tracking-tight">Coming Soon: The Next Build</h2>
              </div>
              <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-500/20 backdrop-blur-md max-w-4xl">
                <h3 className="text-2xl font-semibold text-white mb-4">What should I build next?</h3>
                <p className="text-gray-400 mb-8 max-w-2xl leading-relaxed">
                  I'm constantly looking for real-world problems to solve using automation and data logic. If you have an idea for a tool, dashboard, or workflow optimization, pitch it below.
                </p>
                
                {!isIdeaSubmitted ? (
                  <form 
                    onSubmit={(e) => { e.preventDefault(); setIsIdeaSubmitted(true); }}
                    className="flex flex-col sm:flex-row gap-4 max-w-2xl"
                  >
                    <input 
                      type="text" 
                      required
                      value={ideaText}
                      onChange={(e) => setIdeaText(e.target.value)}
                      placeholder="e.g. A tool to automate processing PDF invoices..." 
                      className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-light"
                    />
                    <button 
                      type="submit"
                      className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      Send Pitch <Send className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-4 animate-in fade-in duration-500 max-w-2xl">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Idea Received!</h4>
                      <p className="text-emerald-400/80 text-sm">Thanks for the pitch. I'll review it and might just build it live.</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.section>
            
            {/* PHILOSOPHY SECTION */}
            <motion.section variants={itemVariants} className="mt-24 space-y-8" id="philosophy">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-6 h-6 text-emerald-400" />
                <h2 className="text-3xl font-bold text-white tracking-tight">My Philosophy</h2>
              </div>
              <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                  I believe the best tools are built at the intersection of <em className="text-emerald-400 not-italic font-medium">data logic</em> and <em className="text-emerald-400 not-italic font-medium">human empathy</em>. As a minimalist engineer, my goal is to strip away the corporate fluff and focus entirely on creating scalable, high-performance systems that solve real-world problems. Whether it's empowering B40 families or streamlining financial automations, technology should be practical, accessible, and fast.
                </p>
              </div>
            </motion.section>
          </div>

          {/* CONTACT FOOTER */}
          <motion.footer variants={itemVariants} id="contact" className="pt-24 pb-12">
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-tr from-emerald-900/10 via-white/[0.02] to-blue-900/10 border border-white/[0.05] backdrop-blur-xl flex flex-col items-center text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Initialize Connection</h2>
              <p className="text-gray-400 max-w-lg mb-8">
                Currently open for new opportunities to build scalable systems or collaborate on high-impact Fintech solutions.
              </p>
              <div className="flex gap-4">
                <a href="mailto:talvinleegenwei0329@gmail.com" className="p-4 bg-white/[0.05] rounded-2xl hover:bg-white/[0.1] hover:scale-105 transition-all text-gray-300 hover:text-white border border-white/10">
                  <Mail className="w-6 h-6" />
                </a>
                <a href={`https://github.com/TALVIN29`} target="_blank" rel="noreferrer" className="p-4 bg-white/[0.05] rounded-2xl hover:bg-white/[0.1] hover:scale-105 transition-all text-gray-300 hover:text-white border border-white/10">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/talvin-lee-579a02241" target="_blank" rel="noreferrer" className="p-4 bg-white/[0.05] rounded-2xl hover:bg-white/[0.1] hover:scale-105 transition-all text-gray-300 hover:text-white border border-white/10">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="mt-12 text-center text-sm text-gray-600 font-mono">
              <p>© {new Date().getFullYear()} System.Init. All systems nominal.</p>
            </div>
          </motion.footer>

        </motion.div>
      </div>
    </div>
  );
}
