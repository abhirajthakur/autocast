import { Upload, Sparkles, Image, Video } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Content Input",
    description:
      "Upload raw text, audio files, or paste URLs directly into the dashboard.",
  },
  {
    icon: Sparkles,
    title: "AI Processing",
    description:
      "Multi-model orchestration analyzes context, tone, and key moments.",
  },
  {
    icon: Image,
    title: "Media Assets",
    description:
      "Generates assets: scripts, voiceovers, background loops, and SRTs.",
  },
  {
    icon: Video,
    title: "Final Video",
    description: "A polished, ready-to-publish short-form video is delivered.",
  },
];

const PipelineSection = () => {
  return (
    <section id="workflow" className="py-24 bg-background-elevated">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Fully Automated Pipeline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From upload to distribution, Autocast handles the heavy lifting.
            Just connect your source and let our event-driven engine do the
            rest.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative text-center group">
                {/* Icon container */}
                <div className="relative inline-flex mb-6">
                  <div className="h-20 w-20 rounded-2xl border border-border bg-background flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300">
                    <step.icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  {/* Connector dot */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-8">
                      <div className="w-full h-0.5 bg-border" />
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PipelineSection;
