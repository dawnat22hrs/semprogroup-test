import { create } from 'zustand';
import { getRutubeDuration } from '@/services/rutube';

const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
};

interface VideoState {
  duration: string | null;
  isLoading: boolean;
  fetchDuration: (id: string) => Promise<void>;
}

export const useVideoStore = create<VideoState>((set) => ({
  duration: null,
  isLoading: false,
  fetchDuration: async (id) => {
    set({ isLoading: true });
    try {
      const seconds = await getRutubeDuration(id);
      set({ duration: seconds ? formatDuration(seconds) : null });
    } catch {
      set({ duration: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));
