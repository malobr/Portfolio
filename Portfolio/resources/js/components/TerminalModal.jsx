import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Terminal as TerminalIcon, X, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { translations } from "../constants/translations";

const TerminalModal = ({ isOpen, onClose, navLinks, lang = 'pt' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const t = translations[lang] || translations.pt;
  
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [history, setHistory] = useState([
    { type: "output", content: t.terminal_welcome },
    { type: "output", content: t.terminal_db_active },
    { type: "output", content: lang === 'en' ? "Type 'help' to see commands." : "Digite 'help' para ver os comandos." },
  ]);

  const [input, setInput] = useState("");
  const [currentPath, setCurrentPath] = useState("/");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const dragControls = useDragControls();

  // Virtual Filesystem State
  const [fs, setFs] = useState({
    "/": { type: "dir", children: ["hero", "about", "projects", "blog", "contact"] },
    "/hero": { type: "dir", children: [] },
    "/about": { type: "dir", children: [] },
    "/projects": { type: "dir", children: [] },
    "/blog": { type: "dir", children: [] },
    "/contact": { type: "dir", children: [] },
  });

  // Size and position states
  const [windowSize, setWindowSize] = useState({ width: 800, height: 500 });
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/projects").then(res => res.json()),
      fetch("/api/posts").then(res => res.json())
    ]).then(([projData, postData]) => {
      setProjects(projData);
      setPosts(postData);
      
      // Update FS with real data
      setFs(prev => ({
        ...prev,
        "/projects": { type: "dir", children: projData.map(p => p.slug) },
        "/blog": { type: "dir", children: postData.map(p => p.slug) },
        ...Object.fromEntries(projData.map(p => [`/projects/${p.slug}`, { type: "file", content: p.tagline }])),
        ...Object.fromEntries(postData.map(p => [`/blog/${p.slug}`, { type: "file", content: p.excerpt[lang] || p.excerpt['en'] }]))
      }));
    });
  }, [lang]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle language change for initial history
  useEffect(() => {
     setHistory(prev => {
        if (prev.length <= 3) {
           return [
             { type: "output", content: t.terminal_welcome },
             { type: "output", content: t.terminal_db_active },
             { type: "output", content: lang === 'en' ? "Type 'help' to see commands." : "Digite 'help' para ver os comandos." },
           ];
        }
        return prev;
     });
  }, [lang]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const commands = {
    help: () => `${t.terminal_help_intro}
  ls         - ${t.terminal_help_ls}
  cd [dir]   - ${t.terminal_help_cd}
  mkdir [dir]- ${t.terminal_help_mkdir}
  rm [name]  - ${t.terminal_help_rm}
  whoami     - ${t.terminal_help_whoami}
  neofetch   - ${t.terminal_help_neofetch}
  sudo       - ${t.terminal_help_sudo}
  clear      - ${t.terminal_help_clear}
  exit       - ${t.terminal_help_exit}`,
    whoami: () => t.hero_desc,
    neofetch: () => `OS: Malobr-OS v1.6\nShell: bash\nUptime: ${Math.floor(performance.now()/1000)}s\nResolution: ${window.innerWidth}x${window.innerHeight}\nPackages: react, laravel, vite, tailwind`,
    sudo: () => t.terminal_sudo_denied,
  };

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmdLine = input.trim();
    const args = cmdLine.split(" ");
    const mainCmd = args[0].toLowerCase();
    const target = args[1];

    let newHistory = [...history, { type: "input", content: cmdLine, path: currentPath }];

    if (commands[mainCmd]) {
      const output = commands[mainCmd]();
      output.split("\n").forEach(line => newHistory.push({ type: "output", content: line }));
    } else {
      switch (mainCmd) {
        case "ls":
          const dir = fs[currentPath];
          if (dir && dir.type === "dir") {
            const children = dir.children.join("  ");
            newHistory.push({ type: "output", content: children || t.terminal_empty });
          }
          break;
        case "cd":
          if (!target || target === "~" || target === "/") {
            setCurrentPath("/");
          } else if (target === "..") {
            const parts = currentPath.split("/").filter(Boolean);
            parts.pop();
            setCurrentPath("/" + parts.join("/"));
          } else {
            const fullPath = (currentPath === "/" ? "" : currentPath) + "/" + target;
            if (fs[fullPath] && fs[fullPath].type === "dir") {
              setCurrentPath(fullPath);
            } else {
              newHistory.push({ type: "output", content: t.terminal_error_cd.replace("{target}", target) });
            }
          }
          break;
        case "mkdir":
          if (!target) {
            newHistory.push({ type: "output", content: "mkdir: missing operand" });
          } else {
            const newDirPath = (currentPath === "/" ? "" : currentPath) + "/" + target;
            setFs(prev => ({
              ...prev,
              [currentPath]: { ...prev[currentPath], children: [...prev[currentPath].children, target] },
              [newDirPath]: { type: "dir", children: [] }
            }));
            newHistory.push({ type: "output", content: t.terminal_mkdir_success.replace("{name}", target) });
          }
          break;
        case "rm":
          if (!target) {
            newHistory.push({ type: "output", content: "rm: missing operand" });
          } else {
            const targetPath = (currentPath === "/" ? "" : currentPath) + "/" + target;
            if (fs[targetPath]) {
              setFs(prev => {
                const newFs = { ...prev };
                delete newFs[targetPath];
                newFs[currentPath] = { 
                  ...newFs[currentPath], 
                  children: newFs[currentPath].children.filter(c => c !== target) 
                };
                return newFs;
              });
              newHistory.push({ type: "output", content: t.terminal_rm_success.replace("{name}", target) });
            } else {
              newHistory.push({ type: "output", content: t.terminal_error_rm.replace("{target}", target) });
            }
          }
          break;
        case "clear": setHistory([]); setInput(""); return;
        case "exit": onClose(); setInput(""); return;
        default: newHistory.push({ type: "output", content: t.terminal_error_cmd.replace("{cmd}", mainCmd) });
      }
    }
    setHistory(newHistory);
    setInput("");
  };

  const handleResizeMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    const startX = e.pageX;
    const startY = e.pageY;
    const startWidth = windowSize.width;
    const startHeight = windowSize.height;

    const onMouseMove = (moveE) => {
      setWindowSize({
        width: Math.max(400, startWidth + (moveE.pageX - startX)),
        height: Math.max(300, startHeight + (moveE.pageY - startY))
      });
    };

    const onMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const Prompt = ({ path }) => (
    <div className="flex flex-wrap items-center gap-1 leading-none mb-1">
      <span className="text-[#4AF626] font-bold">visitor@malobr</span>
      <span className="text-[#d33682] font-bold ml-1">MINGW64</span>
      <span className="text-[#f1fa8c] font-bold ml-2">{path}</span>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            style={{ 
              width: windowSize.width, 
              height: windowSize.height,
              maxHeight: '90vh',
              maxWidth: '95vw'
            }}
            className="bg-[#0c0a0f]/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8)] flex flex-col pointer-events-auto relative"
          >
            {/* Header */}
            <div 
              onPointerDown={(e) => dragControls.start(e)}
              className="flex items-center justify-between px-4 py-3 bg-[#1e1e2e] border-b border-white/5 cursor-move group"
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5 mr-4">
                  <div className="w-3 h-3 rounded-full bg-[#ff5555] opacity-80" />
                  <div className="w-3 h-3 rounded-full bg-[#f1fa8c] opacity-80" />
                  <div className="w-3 h-3 rounded-full bg-[#50fa7b] opacity-80" />
                </div>
                <TerminalIcon size={14} className="text-muted-foreground mr-1" />
                <span className="text-xs font-mono text-muted-foreground/80 tracking-wide">Bash</span>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-red-500/20 rounded-md text-muted-foreground hover:text-red-400 transition-all">
                <X size={16} />
              </button>
            </div>

            {/* Content Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-3 scrollbar-luxury selection:bg-[#44475a]/50"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((line, i) => (
                <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 5}ms` }}>
                  {line.type === "input" ? (
                    <div className="space-y-1">
                      <Prompt path={line.path} />
                      <div className="flex items-center gap-2 pl-2">
                        <span className="text-foreground">$</span>
                        <span className="text-foreground">{line.content}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground whitespace-pre-wrap pl-6 text-[13px] leading-relaxed font-normal">
                      {line.content}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="space-y-1 text-label font-mono">
                <Prompt path={currentPath} />
                <form onSubmit={handleCommand} className="flex items-center gap-2 pl-2">
                  <span className="text-foreground">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-foreground focus:ring-0 p-0 text-[13px] font-mono"
                    spellCheck="false"
                    autoComplete="off"
                  />
                </form>
              </div>
            </div>
            
            {/* Window Resize Handle */}
            <div onMouseDown={handleResizeMouseDown} className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize bg-transparent z-10 flex items-center justify-center group">
                <div className="w-1.5 h-1.5 border-r border-b border-white/20 group-hover:border-primary transition-colors pr-0.5 pb-0.5" />
            </div>

            {/* Footer */}
            <div className="px-4 py-1.5 bg-[#14121a] border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest">
              <span>visitor:malobr — explorer</span>
              <span>online</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TerminalModal;
