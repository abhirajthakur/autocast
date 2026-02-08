"use client";

import AppHeader from "@/components/app-header";
import { Button } from "@autocast/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@autocast/ui/components/card";
import { Input } from "@autocast/ui/components/input";
import { Label } from "@autocast/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@autocast/ui/components/select";
import { Switch } from "@autocast/ui/components/switch";
import { Textarea } from "@autocast/ui/components/textarea";
import { Captions, Loader2, Mic, Sparkles, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SubmitContentPage() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [contentType, setContentType] = useState("blog");
  const [generateVideo, setGenerateVideo] = useState(true);
  const [generateVoiceover, setGenerateVoiceover] = useState(true);
  const [generateCaptions, setGenerateCaptions] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    //TODO: Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Redirect to job detail page
    router.push("/job/demo-job-1");
  };

  const isValid = content.trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-border/50 bg-card">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>

              <CardTitle className="text-2xl font-bold">
                Create New Content
              </CardTitle>
              <CardDescription>
                Submit your long-form content and let Autocast transform it into
                media assets.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title (optional)</Label>
                  <Input
                    id="title"
                    placeholder="Give your content a name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    placeholder="Paste your blog post, transcript, notes, or any long-form content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                </div>

                {/* Content Type */}
                <div className="space-y-2">
                  <Label>Content Type</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog">Blog Post</SelectItem>
                      <SelectItem value="transcript">Transcript</SelectItem>
                      <SelectItem value="notes">Notes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Outputs */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Outputs</Label>

                  <div className="space-y-4 rounded-lg border p-4">
                    <ToggleRow
                      icon={<Video className="h-4 w-4 text-emerald-400" />}
                      label="Generate video"
                      checked={generateVideo}
                      onChange={setGenerateVideo}
                      bg="bg-emerald-500/20"
                    />

                    <ToggleRow
                      icon={<Mic className="h-4 w-4 text-blue-400" />}
                      label="Generate voiceover"
                      checked={generateVoiceover}
                      onChange={setGenerateVoiceover}
                      bg="bg-blue-500/20"
                    />

                    <ToggleRow
                      icon={<Captions className="h-4 w-4 text-amber-400" />}
                      label="Generate captions"
                      checked={generateCaptions}
                      onChange={setGenerateCaptions}
                      bg="bg-amber-500/20"
                    />
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  Processing happens in the background. You'll be able to track
                  progress after submission.
                </p>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Start Repurposing
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

/* Small helper component */
function ToggleRow({
  icon,
  label,
  checked,
  onChange,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  bg: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={`h-8 w-8 rounded-lg flex items-center justify-center ${bg}`}
        >
          {icon}
        </div>
        <span className="text-sm">{label}</span>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
