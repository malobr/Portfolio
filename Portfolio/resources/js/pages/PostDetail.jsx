import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Tag, Share2, Loader2, BookOpen, Terminal as TerminalIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const PostDetail = () => {
  const { slug } = useParams();
  const [lang, setLang] = useState('pt');
  const [post, setPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalCommand, setTerminalCommand] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    fetchPost();
  }, [slug]);

  const openInTerminal = () => {
    setTerminalCommand(`cat /blog/${slug}`);
    setIsTerminalOpen(true);
  };

  const handleTerminalClose = () => {
    setIsTerminalOpen(false);
    setTerminalCommand(null);
  };

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/posts/slug/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);

        // Fetch all to find the next one
        const allRes = await fetch("/api/posts");
        const all = await allRes.json();
        const idx = all.findIndex(p => p.slug === slug);
        setNextPost(all[(idx + 1) % all.length]);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">cat blog_post_{slug}.md...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-label mb-4 font-mono">// 404</p>
          <h1 className="text-display-lg text-foreground mb-6">Artigo não encontrado</h1>
          <Link to="/" className="btn-luxury inline-flex items-center gap-2">
            <ArrowLeft size={16} />
            Voltar
          </Link>
        </div>
      </div>
    );
  }

  const currentTitle = post.title[lang] || post.title['en'];
  const currentExcerpt = post.excerpt[lang] || post.excerpt['en'];
  const currentContent = post.content[lang] || post.content['en'];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation 
        lang={lang} 
        setLang={setLang} 
        forceTerminalOpen={isTerminalOpen}
        onTerminalClose={handleTerminalClose}
        initialCommand={terminalCommand}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-luxury">
          <Link
            to="/#blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>cd ../artigos</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <p className="text-label mb-6 font-mono text-primary">// insight_article</p>
              <h1 className="text-display-xl text-foreground mb-8 leading-tight tracking-tighter">
                {currentTitle}
              </h1>
              <p className="text-body-lg text-muted-foreground max-w-2xl leading-relaxed italic border-l-2 border-primary pl-6">
                {currentExcerpt}
              </p>
            </div>

            <aside className="space-y-6 border-l border-white/10 pl-8 lg:pl-10 h-fit">
              <div>
                <p className="text-label text-xs font-mono mb-2 flex items-center gap-2 text-muted-foreground">
                  <Calendar size={12} /> publicada em
                </p>
                <p className="text-body text-foreground font-mono">{post.publish_date}</p>
              </div>
              <div>
                <p className="text-label text-xs font-mono mb-2 flex items-center gap-2 text-muted-foreground">
                  <Clock size={12} /> tempo de leitura
                </p>
                <p className="text-body text-foreground font-mono">{post.read_time}</p>
              </div>
              <div>
                <p className="text-label text-xs font-mono mb-2 flex items-center gap-2 text-muted-foreground">
                  <Tag size={12} /> tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags?.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] font-mono">{tag}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Content in Terminal Style */}
      <section className="pb-24">
        <div className="container-luxury">
          <div className="bg-[#1c1825] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
            <div className="px-6 py-4 bg-black/40 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen size={16} className="text-primary" />
                <span className="text-xs font-mono text-muted-foreground">content.md</span>
              </div>
              <div className="flex gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                 <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                 <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
            </div>

            <div className="p-8 md:p-16">
              <div className="prose-custom max-w-none overflow-x-auto">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    table: ({node, ...props}) => (
                      <div className="w-full my-8 border border-white/10 rounded-lg overflow-hidden bg-black/20">
                        <table {...props} className="w-full border-collapse" />
                      </div>
                    ),
                    thead: ({node, ...props}) => <thead {...props} className="hidden md:table-header-group" />,
                    tr: ({node, ...props}) => <tr {...props} className="flex flex-col md:table-row border-b border-white/5 last:border-0" />,
                    th: ({node, ...props}) => <th {...props} className="px-4 py-3 md:px-6 md:py-4 text-left font-mono text-primary bg-white/5 text-xs md:text-sm uppercase tracking-wider border-b border-white/10 md:border-0" />,
                    td: ({node, ...props}) => (
                      <td {...props} className="px-4 py-3 md:px-6 md:py-4 text-muted-foreground text-[11px] md:text-sm font-mono flex flex-col md:table-cell">
                        <span className="md:hidden text-[10px] text-primary/50 uppercase mb-1 font-bold">INFO:</span>
                        {props.children}
                      </td>
                    ),
                  }}
                >
                  {currentContent}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal Call to Action */}
      <section className="pb-24">
          <div className="container-luxury">
              <div className="p-8 md:p-12 bg-charcoal border border-primary/20 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-primary/40 transition-all">
                  <div className="max-w-xl text-center md:text-left">
                      <p className="text-label mb-3 font-mono text-primary flex items-center gap-2 justify-center md:justify-start">
                          <TerminalIcon size={14} /> terminal_integration_link
                      </p>
                      <h3 className="text-display-sm text-foreground mb-4">Experiência <span className="italic">Geek</span></h3>
                      <p className="text-body text-muted-foreground">
                          {lang === 'pt' 
                            ? "Você sabia que pode ler todos os nossos artigos diretamente via terminal? Experimente uma navegação purista e sinta-se um verdadeiro sysadmin explorando nossa documentação."
                            : "Did you know you can read all our articles directly via terminal? Experience purist navigation and feel like a true sysadmin exploring our documentation."}
                      </p>
                  </div>
                  <button 
                    onClick={openInTerminal}
                    className="btn-luxury px-6 py-4 bg-primary/10 border-primary/30 text-primary hover:bg-primary hover:text-white flex flex-col items-center gap-3 w-full"
                  >
                      <span className="font-mono text-[9px] md:text-xs break-all text-center opacity-80 uppercase tracking-tighter">cat /blog/{slug}</span>
                      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
                          Executar no Terminal <ArrowUpRight size={14} className="shrink-0" />
                      </div>
                  </button>
              </div>
          </div>
      </section>

      {/* Sharing and Support */}
      <section className="py-16 border-t border-white/5 bg-charcoal/30">
          <div className="container-luxury text-center">
              <p className="text-label mb-8 font-mono">// spread_the_knowledge</p>
              <div className="flex justify-center gap-4">
                  <button className="btn-luxury px-8 py-3 flex items-center gap-3 group">
                      <Share2 size={18} className="group-hover:text-primary transition-colors" />
                      {lang === 'pt' ? 'Compartilhar este artigo' : 'Share this article'}
                  </button>
              </div>
          </div>
      </section>

      {/* Next Article Navigation */}
      {nextPost && nextPost.slug !== post.slug && (
        <section className="py-24 bg-[#110e1a]">
          <div className="container-luxury">
            <p className="text-label mb-8 font-mono">// ler_a_seguir</p>
            <Link to={`/blog/${nextPost.slug}`} className="group inline-block w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-12 group-hover:border-primary transition-colors">
                <div className="max-w-2xl">
                  <p className="font-mono text-xs text-muted-foreground mb-4 uppercase tracking-widest">
                    {nextPost.publish_date} · {nextPost.read_time}
                  </p>
                  <h2 className="text-display-md group-hover:text-primary transition-colors font-mono tracking-tight leading-tight">
                    {nextPost.title[lang] || nextPost.title['en']}
                  </h2>
                </div>
                <div className="mt-8 md:mt-0 w-16 h-16 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-all">
                  <ArrowUpRight size={24} className="group-hover:text-white" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <Footer lang={lang} />
    </div>
  );
};

export default PostDetail;
