import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Terminal as TerminalIcon, X, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { translations } from "../constants/translations";
import { useTheme } from "../context/ThemeContext";

const TerminalModal = ({ isOpen, onClose, navLinks, lang = 'pt', initialCommand = null }) => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const t = translations[lang] || translations.pt;
  
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [currentPath, setCurrentPath] = useState(() => {
    return localStorage.getItem("terminal_path") || "/";
  });
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("terminal_history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse terminal history", e);
      }
    }
    return [
      { type: "output", content: t.terminal_welcome },
      { type: "output", content: t.terminal_db_active },
      { type: "output", content: lang === 'en' ? "Type 'help' to see commands." : "Digite 'help' para ver os comandos." },
    ];
  });
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const dragControls = useDragControls();

  // Virtual Filesystem State
  const [fs, setFs] = useState({
    "/": { type: "dir", children: ["hero", "about", "projects", "blog", "contact", "cv.pdf"] },
    "/hero": { type: "dir", children: [] },
    "/about": { type: "dir", children: [] },
    "/projects": { type: "dir", children: [] },
    "/blog": { type: "dir", children: [] },
    "/contact": { type: "dir", children: [] },
    "/cv.pdf": { type: "file", content: "FILE: resume_marcelo.pdf\nSTATUS: Ready for download\nType 'cv' or 'cat cv.pdf' to access." },
  });

  // Size and position states
  const [windowSize, setWindowSize] = useState({ width: 800, height: 500 });
  const [isResizing, setIsResizing] = useState(false);
  
  // Game state
  const [game, setGame] = useState(null);

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
        ...Object.fromEntries(projData.map(p => [`/projects/${p.slug}`, { 
          type: "file", 
          content: `NAME: ${p.name}\nTAGLINE: ${p.tagline}\n\n${p.description}\n\nSTACK: ${p.technologies?.join(", ")}` 
        }])),
        ...Object.fromEntries(postData.map(p => [`/blog/${p.slug}`, { 
          type: "file", 
          content: `${postData.find(post => post.slug === p.slug)?.title?.[lang] || ""}\n${'='.repeat(40)}\n\n${postData.find(post => post.slug === p.slug)?.content?.[lang] || postData.find(post => post.slug === p.slug)?.content?.['en'] || ""}`
        }]))
      }));
    });
  }, [lang]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      
      if (initialCommand && fs["/"]) {
        // Execute initial command after a short delay
        setTimeout(() => {
          handleCommand({ preventDefault: () => {}, target: { value: initialCommand } }, initialCommand);
        }, 500);
      }
    }
  }, [isOpen, initialCommand, fs]);

  // Handle language change for initial history
  useEffect(() => {
     console.log("Terminal initialized/updated");
     setHistory(prev => {
        if (prev.length <= 3) {
            return [
              { type: "output", content: t.terminal_welcome + " [SYSTEM UPDATED]" },
              { type: "output", content: t.terminal_db_active },
              { type: "output", content: lang === 'en' ? "Type 'help' for commands or 'snake' for a surprise!" : "Digite 'help' para comandos ou 'snake' para uma surpresa!" },
            ];
        }
        return prev;
     });
  }, [lang, t.terminal_welcome, t.terminal_db_active]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    // Persist history and path
    localStorage.setItem("terminal_history", JSON.stringify(history.slice(-50))); // Keep last 50
    localStorage.setItem("terminal_path", currentPath);
  }, [history, currentPath]);

  const commands = {
    help: () => `${t.terminal_help_intro}
  ls           - ${t.terminal_help_ls}
  cd [dir]     - ${t.terminal_help_cd}
  mkdir [dir]  - ${t.terminal_help_mkdir}
  rm [name]    - ${t.terminal_help_rm}
  cat [file]   - ${t.terminal_help_cat}
  theme [opt]  - Switch theme (--flash, --stealth)
  cv           - Download/View my curriculum
  snake        - Play a retro snake game
  man [cmd]    - ${t.terminal_help_man}
  echo [text]  - ${t.terminal_help_echo}
  date         - ${t.terminal_help_date}
  pwd          - Print working directory
  whoami       - ${t.terminal_help_whoami}
  neofetch     - ${t.terminal_help_neofetch}
  sudo         - ${t.terminal_help_sudo}
  clear        - ${t.terminal_help_clear}
  exit         - ${t.terminal_help_exit}`,
    whoami: () => t.hero_desc,
    neofetch: () => `            .-/+oossssoo+/-.
        .:+ssssssssssssssssss+:.
      -+ssssssssssssssssssyyssss+-
    .ossssssssssssssssssdMMMNysssso.
   /ssssssssssshdmmNNmmdMMMMMMhssssss/
  +ssssssssshmydMMMMMMMMMMMMMMMs sssss+
 /ssssssssdMMMMMMMMMMMMMMMMMMMMMM dssss/
.ssssssssdMMMMMMMMMMMMMMMMMMMMMMMMdo sss.
osssssssmMMMMMMMMMMMMMMMMMMMMMMMMMMm sssso
ssssssssNMMMMMMMMMMMMMMMMMMMMMMMMMMN sssss
osssssssmMMMMMMMMMMMMMMMMMMMMMMMMMMm sssso
.ssssssssdMMMMMMMMMMMMMMMMMMMMMMMMdo sss.
 /ssssssssdMMMMMMMMMMMMMMMMMMMMMM dssss/
  +ssssssssshmydMMMMMMMMMMMMMMMs sssss+
   /ssssssssssshdmmNNmmdMMMMMMhssssss/
    .ossssssssssssssssssdMMMNysssso.
      -+ssssssssssssssssssyyssss+-
        .:+ssssssssssssssssss+:.
            .-/+oossssoo+/-.

OS: Malobr-OS v1.6.0
Secrets: [snake_game_active][ON]
Theme: ${theme.toUpperCase()}
Kernel: React 19.0.0
Uptime: ${Math.floor(performance.now()/1000)}s
Packages: laravel, vite, tailwind, framer-motion
Shell: bash 5.2.15
Resolution: ${window.innerWidth}x${window.innerHeight}
WM: Portfolio-Canvas

> TIP: Access hidden modules by typing 'snake' or 'cv'
`,
    sudo: () => t.terminal_sudo_denied,
    pwd: () => currentPath,
    date: () => new Date().toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US'),
    echo: (args) => args || "",
    cv: () => {
        navigate('/cv');
        return "Navigating to CV Dossier...";
    },
    system: async (args) => {
        if (args === "--stats") {
            try {
                const res = await fetch("/api/system/stats");
                const data = await res.json();
                
                const uptime = Math.floor(performance.now() / 1000);
                const hrs = Math.floor(uptime / 3600);
                const mins = Math.floor((uptime % 3600) / 60);
                const secs = uptime % 60;

                return `
[MALOBR-OS ANALYTICS REPORT]
----------------------------
TIME: ${new Date().toISOString()}
UPTIME: ${hrs}h ${mins}m ${secs}s
STATUS: [ACTIVE]

STATISTICS:
- Total Accesses:    ${data.total_visits}
- Unique Visitors:   ${data.unique_visitors}
- Hits (Last 24h):   ${data.visits_today}

ECOSYSTEM:
- Active Projects:   ${data.counts.projects}
- Live Deployments:  ${data.counts.live_projects}
- Intel (Posts):     ${data.counts.posts}

MEMORY_USAGE: ${Math.floor(Math.random() * 20 + 40)}MB/512MB
NODE_DIST: Vercel/DigitalOcean
----------------------------
ANALYSIS COMPLETE.
`;
            } catch (err) {
                return "ERR: Failed to retrieve system statistics.";
            }
        }
        return "usage: system [--stats]";
    }
  };

  const handleCommand = (e, overrideInput = null) => {
    if (e) e.preventDefault();
    const cmdLine = (overrideInput || input).trim();
    if (!cmdLine) return;

    const args = cmdLine.split(" ");
    const mainCmd = args[0].toLowerCase();
    const target = args[1];

    let newHistory = [...history, { type: "input", content: cmdLine, path: currentPath }];

    const resolvePath = (targetPath) => {
      if (targetPath.startsWith("/")) return targetPath.replace(/\/+/g, "/");
      const base = currentPath === "/" ? "" : currentPath;
      return (base + "/" + targetPath).replace(/\/+/g, "/");
    };

    if (commands[mainCmd]) {
      const result = commands[mainCmd](args.slice(1).join(" "));
      if (result instanceof Promise) {
          result.then(output => {
              output.split("\n").forEach(line => newHistory.push({ type: "output", content: line }));
              setHistory([...newHistory]);
          });
          newHistory.push({ type: "output", content: "Retrieving system telemetry..." });
      } else {
          result.split("\n").forEach(line => newHistory.push({ type: "output", content: line }));
      }
    } else {
      // Check if trying to run a file directly (e.g., ./cv.pdf or cv.pdf)
      const cleanCmd = mainCmd.startsWith("./") ? mainCmd.substring(2) : mainCmd;
      const filePath = resolvePath(cleanCmd);
      if (fs[filePath] && fs[filePath].type === "file") {
        if (cleanCmd === "cv.pdf") {
            return commands.cv();
        } else {
            fs[filePath].content.split("\n").forEach(line => 
                newHistory.push({ type: "output", content: line })
            );
        }
      } else {
        switch (mainCmd) {
          case "ls":
            const lsTarget = target ? resolvePath(target) : currentPath;
            const dir = fs[lsTarget];
            if (dir && dir.type === "dir") {
              const children = dir.children.join("  ");
              newHistory.push({ type: "output", content: children || t.terminal_empty });
            } else {
              newHistory.push({ type: "output", content: `ls: cannot access '${target}': No such directory` });
            }
            break;
          case "cd":
            if (!target || target === "~" || target === "/") {
              setCurrentPath("/");
            } else if (target === "..") {
              const parts = currentPath.split("/").filter(Boolean);
              parts.pop();
              const newPath = "/" + parts.join("/");
              setCurrentPath(newPath);
            } else {
              const fullPath = resolvePath(target);
              if (fs[fullPath]) {
                if (fs[fullPath].type === "dir") {
                    setCurrentPath(fullPath);
                } else {
                    newHistory.push({ type: "output", content: `bash: cd: ${target}: Not a directory (it's a file, try 'cat ${target}')` });
                }
              } else {
                newHistory.push({ type: "output", content: t.terminal_error_cd.replace("{target}", target) });
              }
            }
            break;
          case "cat":
            if (!target) {
              newHistory.push({ type: "output", content: "usage: cat [file]" });
            } else {
              const catPath = resolvePath(target);
              if (fs[catPath] && fs[catPath].type === "file") {
                fs[catPath].content.split("\n").forEach(line => 
                  newHistory.push({ type: "output", content: line })
                );
              } else {
                newHistory.push({ type: "output", content: t.terminal_error_cat.replace("{target}", target) });
              }
            }
            break;
        case "man":
          if (!target) {
            newHistory.push({ type: "output", content: "What manual page do you want?" });
          } else {
            const manKey = `man_${target}`;
            if (t[manKey]) {
              newHistory.push({ type: "output", content: t.terminal_man_title });
              newHistory.push({ type: "output", content: t.terminal_man_usage.replace("{cmd}", target) });
              newHistory.push({ type: "output", content: t.terminal_man_description.replace("{desc}", t[manKey]) });
            } else {
              newHistory.push({ type: "output", content: t.terminal_man_not_found.replace("{cmd}", target) });
            }
          }
          break;
        case "mkdir":
          if (!target) {
            newHistory.push({ type: "output", content: "mkdir: missing operand" });
          } else {
            const newDirPath = resolvePath(target);
            const parentPath = newDirPath.substring(0, newDirPath.lastIndexOf("/")) || "/";
            const dirName = newDirPath.substring(newDirPath.lastIndexOf("/") + 1);
            
            if (fs[parentPath] && fs[parentPath].type === "dir") {
              setFs(prev => ({
                ...prev,
                [parentPath]: { ...prev[parentPath], children: [...prev[parentPath].children, dirName] },
                [newDirPath]: { type: "dir", children: [] }
              }));
              newHistory.push({ type: "output", content: t.terminal_mkdir_success.replace("{name}", dirName) });
            } else {
              newHistory.push({ type: "output", content: `mkdir: cannot create directory '${target}': No such file or directory` });
            }
          }
          break;
        case "rm":
          if (!target) {
            newHistory.push({ type: "output", content: "rm: missing operand" });
          } else {
            const targetPath = resolvePath(target);
            if (fs[targetPath]) {
                const parentPath = targetPath.substring(0, targetPath.lastIndexOf("/")) || "/";
                const objName = targetPath.substring(targetPath.lastIndexOf("/") + 1);

              setFs(prev => {
                const newFs = { ...prev };
                delete newFs[targetPath];
                if (newFs[parentPath]) {
                  newFs[parentPath] = { 
                    ...newFs[parentPath], 
                    children: newFs[parentPath].children.filter(c => c !== objName) 
                  };
                }
                return newFs;
              });
              newHistory.push({ type: "output", content: t.terminal_rm_success.replace("{name}", objName) });
            } else {
              newHistory.push({ type: "output", content: t.terminal_error_rm.replace("{target}", target) });
            }
          }
          break;

        case "theme":
          if (target === "--flash") {
            setTheme("flash");
            newHistory.push({ type: "output", content: "Switching to FLASH (Luxury Paper) theme..." });
          } else if (target === "--stealth") {
            setTheme("stealth");
            newHistory.push({ type: "output", content: "Switching to STEALTH (Terminal Dark) theme..." });
          } else {
            newHistory.push({ type: "output", content: "usage: theme [--flash | --stealth]" });
          }
          break;
        case "snake":
          newHistory.push({ type: "output", content: "Initializing Malobr-Snake v1.0..." });
          newHistory.push({ type: "output", content: "Use ARROW KEYS to move. Press 'Q' to quit." });
          // Game logic would be triggered here
          setGame("snake");
          break;
        case "clear": setHistory([]); setInput(""); return;
        case "exit": onClose(); setInput(""); return;
        default: newHistory.push({ type: "output", content: t.terminal_error_cmd.replace("{cmd}", mainCmd) });
      }
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
            style={{ 
              width: windowSize.width, 
              height: windowSize.height,
              maxHeight: '90vh',
              maxWidth: '95vw'
            }}
            className="bg-[var(--terminal-bg)] backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8)] flex flex-col pointer-events-auto relative"
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between px-4 py-3 bg-secondary/80 border-b border-white/5 group"
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5 mr-4">
                  <div className="w-3 h-3 rounded-full bg-[#ff5555] opacity-80" />
                  <div className="w-3 h-3 rounded-full bg-[#f1fa8c] opacity-80" />
                  <div className="w-3 h-3 rounded-full bg-[#50fa7b] opacity-80" />
                </div>
                <TerminalIcon size={14} className="text-muted-foreground mr-1" />
                <span className="text-xs font-mono text-muted-foreground/80 tracking-wide">Malobr-OS Terminal <span className="text-primary/40 text-[10px] ml-2 animate-pulse">[1 SECRET UNLOCKED]</span></span>
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
              
              {game === 'snake' ? (
                <TerminalSnake onQuit={() => {
                  setGame(null);
                  setHistory(prev => [...prev, { type: "output", content: "Snake game exited. High Score: 0 (Simulated)" }]);
                }} />
              ) : (
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
                      autoFocus
                    />
                  </form>
                </div>
              )}
            </div>
            

            {/* Footer */}
            <div className="px-4 py-1.5 bg-secondary border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest">
              <span>visitor:malobr — explorer</span>
              <span>online</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Prompt = ({ path }) => {
    const { theme } = useTheme();
    const isFlash = theme === 'flash';
    return (
        <div className="flex flex-wrap items-center gap-1 leading-none mb-1">
          <span className={`${isFlash ? 'text-blue-600' : 'text-[#4AF626]'} font-bold`}>visitor@malobr</span>
          <span className={`${isFlash ? 'text-red-600' : 'text-[#d33682]'} font-bold ml-1`}>MINGW64</span>
          <span className={`${isFlash ? 'text-amber-600' : 'text-[#f1fa8c]'} font-bold ml-2`}>{path}</span>
        </div>
    );
};

const TerminalSnake = ({ onQuit }) => {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [snake, setSnake] = useState([{x: 10, y: 10}]);
    const [food, setFood] = useState({x: 15, y: 15});
    const [dir, setDir] = useState({x: 1, y: 0});
    
    const ROWS = 15;
    const COLS = 30;

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key.toLowerCase() === 'q') onQuit();
            if (e.key === 'ArrowUp' && dir.y === 0) setDir({x: 0, y: -1});
            if (e.key === 'ArrowDown' && dir.y === 0) setDir({x: 0, y: 1});
            if (e.key === 'ArrowLeft' && dir.x === 0) setDir({x: -1, y: 0});
            if (e.key === 'ArrowRight' && dir.x === 0) setDir({x: 1, y: 0});
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [dir, onQuit]);

    useEffect(() => {
        if (gameOver) return;
        const move = setInterval(() => {
            setSnake(prev => {
                const head = {x: prev[0].x + dir.x, y: prev[0].y + dir.y};
                
                // Collision
                if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS || prev.some(p => p.x === head.x && p.y === head.y)) {
                    setGameOver(true);
                    return prev;
                }

                const newSnake = [head, ...prev];
                if (head.x === food.x && head.y === food.y) {
                    setScore(s => s + 10);
                    setFood({x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS)});
                } else {
                    newSnake.pop();
                }
                return newSnake;
            });
        }, 100);
        return () => clearInterval(move);
    }, [dir, food, gameOver]);

    return (
        <div className="w-full bg-black/60 rounded-lg p-6 border border-primary/30 relative overflow-hidden group shadow-2xl">
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_4px,3px_100%]" />
            
            <div className="flex justify-between items-center mb-4 font-mono text-[10px] uppercase tracking-tighter text-primary/80 z-20 relative">
                <div className="flex gap-4">
                    <span>SCORE_DB: {String(score).padStart(4, '0')}</span>
                    <span className="animate-pulse">SYSTEM_ACTIVE</span>
                </div>
                <span className="text-red-500/80">PRESS 'Q' TO ABORT</span>
            </div>

            <div 
                className="grid gap-px overflow-hidden border border-white/5 bg-white/5 z-20 relative"
                style={{ 
                    gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                }}
            >
                {[...Array(ROWS * COLS)].map((_, i) => {
                    const x = i % COLS;
                    const y = Math.floor(i / COLS);
                    const isSnake = snake.some(p => p.x === x && p.y === y);
                    const isHead = snake[0].x === x && snake[0].y === y;
                    const isFood = food.x === x && food.y === y;

                    return (
                        <div 
                            key={i} 
                            className={`aspect-square transition-all duration-75 ${
                                isHead ? 'bg-primary shadow-[0_0_10px_var(--color-primary)]' : 
                                isSnake ? 'bg-primary/40' : 
                                isFood ? 'bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]' : 
                                'bg-transparent'
                            }`}
                        />
                    );
                })}
            </div>

            {gameOver && (
                <div className="absolute inset-0 z-30 bg-black/80 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                    <p className="text-red-500 font-mono text-xl font-bold tracking-widest mb-4">CRITICAL FAILURE</p>
                    <p className="text-white/60 font-mono text-xs mb-8">Snake process terminated unexpectedly.</p>
                    <button 
                        onClick={() => {
                            setSnake([{x: 10, y: 10}]);
                            setDir({x: 1, y: 0});
                            setGameOver(false);
                            setScore(0);
                        }}
                        className="px-6 py-2 border border-primary text-primary font-mono text-xs hover:bg-primary hover:text-white transition-all uppercase"
                    >
                        Reboot System
                    </button>
                </div>
            )}
        </div>
    );
};

export default TerminalModal;
