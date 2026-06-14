import axios from 'axios';

export const getRutubeDuration = async (id: string): Promise<number | null> => {
  const { data } = await axios.get<{ duration: number | null }>(`/api/rutube?id=${id}`);
  return data.duration;
};
