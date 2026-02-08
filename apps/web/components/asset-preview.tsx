import { Card, CardContent, CardHeader, CardTitle } from "@autocast/ui/components/card";
import { Button } from "@autocast/ui/components/button";
import {
  Download,
  Copy,
  Play,
  Image as ImageIcon,
  FileText,
  Volume2,
} from "lucide-react";

type AssetType = "video" | "audio" | "image" | "captions";

interface AssetPreviewProps {
  type: AssetType;
  title: string;
  url?: string;
  content?: string;
  thumbnail?: string;
}

const assetIcons = {
  video: Play,
  audio: Volume2,
  image: ImageIcon,
  captions: FileText,
};

const AssetPreview = ({
  type,
  title,
  url,
  content,
  thumbnail,
}: AssetPreviewProps) => {
  const Icon = assetIcons[type];

  return (
    <Card className="border-border/50 bg-card overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <Icon className="h-4 w-4 text-muted-foreground" />
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {type === "captions" && content && (
              <Button variant="ghost" size="sm" className="h-8">
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            )}
            <Button variant="outline" size="sm" className="h-8">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {type === "video" && (
          <div className="relative aspect-video rounded-lg bg-background-subtle border border-border overflow-hidden">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
                  <Play className="h-6 w-6 text-primary" />
                </div>
              </div>
            )}
          </div>
        )}
        {type === "audio" && (
          <div className="rounded-lg bg-background-subtle border border-border p-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full"
              >
                <Play className="h-5 w-5" />
              </Button>
              <div className="flex-1 h-2 rounded-full bg-secondary">
                <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-primary to-accent" />
              </div>
              <span className="text-sm text-muted-foreground font-mono">
                2:34
              </span>
            </div>
          </div>
        )}
        {type === "image" && (
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-video rounded-lg bg-background-subtle border border-border flex items-center justify-center"
              >
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
              </div>
            ))}
          </div>
        )}
        {type === "captions" && content && (
          <div className="rounded-lg bg-background-subtle border border-border p-4 font-mono text-sm text-muted-foreground max-h-40 overflow-y-auto">
            <pre className="whitespace-pre-wrap">{content}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AssetPreview;
