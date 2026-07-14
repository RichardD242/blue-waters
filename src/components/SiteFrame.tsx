import { useEffect, useState } from "react";
import { AlertTriangle, ExternalLink } from "lucide-react";

interface SiteFrameProps {
  url: string;
}

export default function SiteFrame({ url }: SiteFrameProps) {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    setSlow(false);
    const timer = setTimeout(() => setSlow(true), 3500);
    return () => clearTimeout(timer);
  }, [url]);

  return (
    <div className="relative flex w-full flex-1 flex-col">
      {slow && (
        <div className="flex items-center justify-between gap-4 border-b border-amber-100 bg-amber-50 px-4 py-2 text-sm text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
          <span className="flex items-center gap-2">
            <AlertTriangle size={14} />
            this site might refuse to load inside blue waters
          </span>
          <a href={url} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-medium hover:underline">
            open in new tab
            <ExternalLink size={12} />
          </a>
        </div>
      )}
      <iframe src={url} title={url} className="w-full flex-1 border-0" onLoad={() => setSlow(false)} />
    </div>
  );
}
