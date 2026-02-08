import { Button } from "@autocast/ui/components/button";
import {
  Plus,
  Play,
  Check,
  FileText,
  Sparkles,
  Video,
  Mic,
  Captions,
} from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-radial from-accent/10 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium animate-fade-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              v2.0 NOW AVAILABLE
            </div>

            <div className="space-y-4 animate-fade-up animation-delay-200">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Turn <span className="gradient-text-primary">long-form</span>
                <br />
                content into media assets.
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Automate your content pipeline with event-driven workflows.
                Convert blogs and podcasts into short-form videos, tweets, and
                audio snippets instantly using OpenAI.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 animate-fade-up animation-delay-400">
              <Button size="lg" asChild>
                <Link href="/submit">
                  <Plus className="h-4 w-4" />
                  Create Content
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg">
                <Play className="h-4 w-4" />
                View Demo
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground animate-fade-up animation-delay-600">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" />
                Free Tier
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" />
                No Credit Card
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" />
                API Access
              </span>
            </div>
          </div>

          {/* Right visual - Pipeline illustration */}
          <div className="relative lg:pl-8 animate-fade-up animation-delay-400">
            <div className="relative">
              {/* Terminal window */}
              <div className="rounded-2xl border border-border/50 bg-background-elevated overflow-hidden shadow-2xl shadow-primary/10">
                {/* Window header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-background-subtle">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-cherry" />
                    <span className="h-3 w-3 rounded-full bg-amber-500" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="flex-1 text-center text-xs text-muted-foreground font-mono">
                    autocast-pipeline.yml
                  </span>
                </div>

                {/* Pipeline visualization */}
                <div className="p-8 space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    {/* Source */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-16 w-16 rounded-xl border border-border bg-background-subtle flex items-center justify-center">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        source.md
                      </span>
                    </div>

                    {/* Arrow */}
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-border via-primary/50 to-border" />

                    {/* Processing */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg shadow-primary/30 animate-pulse-slow">
                        <Sparkles className="h-10 w-10 text-primary-foreground" />
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-border via-primary/50 to-border" />

                    {/* Outputs */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                          <Video className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div className="h-2 w-20 rounded-full bg-emerald-500/30" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                          <Mic className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="h-2 w-16 rounded-full bg-blue-500/30" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                          <Captions className="h-5 w-5 text-amber-400" />
                        </div>
                        <div className="h-2 w-24 rounded-full bg-amber-500/30" />
                      </div>
                    </div>
                  </div>

                  {/* Status bar */}
                  <div className="rounded-lg border border-border/50 bg-background-subtle px-4 py-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Status:
                      </span>
                      <span className="text-xs font-mono text-emerald-400">
                        Processing Events...
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 bg-gradient-radial from-accent/20 to-transparent blur-2xl" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 bg-gradient-radial from-primary/20 to-transparent blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
