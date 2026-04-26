import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, Clock, Calendar, Loader2 } from "lucide-react";

const BlogSection = ({ lang }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching posts:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="section-padding flex flex-col items-center justify-center gap-4 bg-background border-t border-white/5">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <section id="blog" className="section-padding bg-background border-t border-border/50">
      <div className="container-luxury">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24"
        >
          <div>
            <p className="text-label mb-6 font-mono">// {lang === 'en' ? 'Writing' : 'Artigos'}</p>
            <h2 className="text-display-lg text-foreground">
              {lang === 'en' ? 'Latest' : 'Últimos'} 
              <span className="text-primary italic"> {lang === 'en' ? 'Insights' : 'Pensamentos'}</span>
            </h2>
          </div>
          <p className="text-body-lg text-muted-foreground max-w-md mt-6 md:mt-0 italic">
            {lang === 'en' 
              ? 'These are ideas I had and wrote down to start and give continuity to them.' 
              : 'Estas são ideias que tive e que escrevi para dar início e continuidade a elas.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/blog/${post.slug}`} className="group block h-full p-6 border border-transparent hover:border-primary/20 hover:bg-foreground/[0.02] rounded-2xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-horizontal-lines opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="mb-6 overflow-hidden bg-charcoal aspect-video border border-border/50 flex items-center justify-center relative">
                  <BookOpen size={40} className="text-primary/20 group-hover:scale-110 group-hover:text-primary transition-all duration-500" />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 text-[10px] font-mono border ${
                    post.status === 'Concluído' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                    post.status === 'Em andamento' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                    post.status === 'Iniciado' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                    'bg-white/5 border-border text-muted-foreground'
                  }`}>
                    {post.status}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1"><Calendar size={10} /> {post.publish_date}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {post.read_time}</span>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                  {post.title[lang] || post.title['en']}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt[lang] || post.excerpt['en']}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-white/5 text-muted-foreground border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
