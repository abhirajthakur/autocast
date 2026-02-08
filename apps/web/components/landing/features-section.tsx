import { Card, CardContent, CardHeader, CardTitle } from "@autocast/ui/components/card";
import { Zap, Layers, Coins } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Event-Driven Processing",
    description:
      "Our architecture reacts to webhooks instantly. Trigger workflows from your CMS, GitHub actions, or custom API calls without manual intervention.",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Layers,
    title: "Multi-Provider AI",
    description:
      "We orchestrate the best models for the job. GPT-4 for writing, ElevenLabs for voice, and Stable Diffusion for imagery—all seamlessly connected.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Coins,
    title: "Cost-Aware Design",
    description:
      "Smart token usage and caching reduce your API costs by up to 40%. We optimize prompts and asset generation to keep your pipeline profitable.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Technical Superpowers
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Built for developers and creators who need scale. Autocast isn't just a tool, it's infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-border/50 bg-card hover:border-primary/30 transition-all duration-300 group"
            >
              <CardHeader>
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${feature.bgColor} mb-4`}
                >
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
