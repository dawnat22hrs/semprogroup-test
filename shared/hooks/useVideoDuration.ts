'use client';

import { useState, useEffect } from 'react';
import { getRutubeDuration } from '@/services/rutube';

const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
};

export function useVideoDuration(id: string): string | null {
  const [duration, setDuration] = useState<string | null>(null);

  useEffect(() => {
    getRutubeDuration(id)
      .then((seconds) => setDuration(seconds ? formatDuration(seconds) : null))
      .catch(() => setDuration(null));
  }, [id]);

  return duration;
}
