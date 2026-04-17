import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Terminal as TerminalIcon, X, ChevronRight } from "lucide-react";
import { liveProjects } from "@/data/liveProjects";
import { projects } from "@/data/projects";

const TerminalModal = ({ isOpen, onClose, navLinks }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [history, setHistory] = useState([
    { type: "output", content: "Malobr Terminal v1.5.0" },
    { type: "output", content: "Sistema de diretórios virtuais ativo." },
  ]);
  const [input, setInput] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [virtualCwd, setVirtualCwd] = useState(null); // Used to track "folders" on home page
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  // Determine the effective path
  const getCurrentPath = () => {
    if (location.pathname !== "/") {
        return `~${location.pathname}`;
    }
    if (virtualCwd) {
        return `~${virtualCwd}`;
    }
    return "~";
  };

  // Reset virtual CWD when changing actual pages
  useEffect(() => {
    if (location.pathname !== "/") {
        setVirtualCwd(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      const x = window.innerWidth / 2 - 384;
      const y = window.innerHeight / 2 - 250; 
      setPosition({ x: Math.max(20, x), y: Math.max(80, y) });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleMouseDown = (e) => {
    if (e.target.closest('.terminal-header')) {
      setIsDragging(true);
      setDragOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
      }
    };
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const commands = {
    help: () => "Comandos: ls, cd [path], cd .., reset, whoami, neofetch, clear, exit",
    whoami: () => "Marcelo (malobr) — Fullstack Developer.",
    neofetch: () => "OS: Portfolio-OS\nShell: zsh\nCWD: " + getCurrentPath(),
  };

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmdLine = input.trim();
    const args = cmdLine.split(" ");
    const mainCmd = args[0].toLowerCase();
    const target = args[1];

    let newHistory = [...history, { type: "input", content: cmdLine, path: getCurrentPath() }];

    if (commands[mainCmd]) {
      const output = commands[mainCmd]();
      output.split("\n").forEach(line => newHistory.push({ type: "output", content: line }));
    } else {
      switch (mainCmd) {
        case "ls":
          const currentPath = getCurrentPath();
          if (currentPath === "~") {
            newHistory.push({ type: "output", content: "trabalhos/  repos/  about/  stack/  contact/" });
          } else if (currentPath.includes("/trabalhos")) {
            newHistory.push({ type: "output", content: liveProjects.map(p => p.slug).join("  ") });
          } else if (currentPath.includes("/repos")) {
            newHistory.push({ type: "output", content: projects.map(p => p.name).join("  ") });
          } else {
              newHistory.push({ type: "output", content: "total 0" });
          }
          break;
        case "clear": setHistory([]); setInput(""); return;
        case "reset": setVirtualCwd(null); navigate("/"); setHistory([]); return;
        case "exit": onClose(); setInput(""); return;
        case "cd":
          if (target === ".." || target === "cd..") {
              if (location.pathname !== "/") {
                  navigate("/");
              } else if (virtualCwd) {
                  setVirtualCwd(null);
                  newHistory.push({ type: "output", content: "Voltando para a raiz..." });
              }
          } 
          else if (!target || target === "~" || target === "/") {
            setVirtualCwd(null);
            navigate("/");
            newHistory.push({ type: "output", content: "Voltando para a raiz..." });
          } 
          else {
            // Logic for cd trabalhos
            if (target === "trabalhos" || target === "trabalhos/") {
                setVirtualCwd("/trabalhos");
                document.querySelector("#trabalhos")?.scrollIntoView({ behavior: "smooth" });
                newHistory.push({ type: "output", content: "Diretório alterado para ~/trabalhos" });
            } else if (target === "repos" || target === "repos/") {
                setVirtualCwd("/repos");
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                newHistory.push({ type: "output", content: "Diretório alterado para ~/repos" });
            } 
            // Logic for projects inside folder
            else {
                const effectivePath = getCurrentPath();
                const isWork = liveProjects.find(p => p.slug === target || (effectivePath.includes("trabalhos") && target === p.slug));
                if (isWork) {
                    navigate(`/trabalhos/${isWork.slug}`);
                    setHistory([...newHistory, { type: "output", content: `Acessando trabalho: ${isWork.slug}...` }]);
                    setInput("");
                    setTimeout(onClose, 800);
                    return;
                }
                const isRepo = projects.find(p => p.name === target || (effectivePath.includes("repos") && target === p.name));
                if (isRepo) {
                    navigate(`/repos/${isRepo.name}`);
                    setHistory([...newHistory, { type: "output", content: `Acessando repositório: ${isRepo.name}...` }]);
                    setInput("");
                    setTimeout(onClose, 800);
                    return;
                }
                newHistory.push({ type: "output", content: `cd: diretório não encontrado: ${target}` });
            }
          }
          break;
        default:
          newHistory.push({ type: "output", content: `comando não encontrado: ${mainCmd}` });
      }
    }
    setHistory(newHistory);
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <div
        ref={modalRef}
        style={{ transform: `translate(${position.x}px, ${position.y}px)`, transition: isDragging ? 'none' : 'transform 0.1s ease-out' }}
        className="absolute w-full max-w-3xl bg-[#1c1825]/98 border border-primary/30 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[70vh] pointer-events-auto select-none"
      >
        <div onMouseDown={handleMouseDown} className="terminal-header flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/5 cursor-move active:cursor-grabbing">
          <div className="flex items-center gap-2">
            <TerminalIcon size={16} className="text-primary" />
            <span className="text-xs font-mono text-muted-foreground transition-all duration-300">malobr — zsh — {getCurrentPath()}</span>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-primary/20">
          {history.map((line, i) => (
            <div key={i} className="mb-1">
              {line.type === "input" ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-primary font-bold">➜</span>
                  <span className="text-secondary opacity-80">{line.path || "~"}</span>
                  <span className="text-foreground">{line.content}</span>
                </div>
              ) : (
                <div className="text-muted-foreground whitespace-pre-wrap pl-6 text-xs md:text-sm">{line.content}</div>
              )}
            </div>
          ))}

          <form onSubmit={handleCommand} className="flex items-center gap-1.5 w-full pt-1">
            <span className="text-primary font-bold">➜</span>
            <span className="text-secondary">{getCurrentPath()}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-foreground focus:ring-0 p-0 text-sm md:text-base selection:bg-primary/30"
              spellCheck="false"
              autoComplete="off"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default TerminalModal;
