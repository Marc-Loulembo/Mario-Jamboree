// store/store.js
import { create } from 'zustand';
import { Maps } from './Maps';

const useMapStore = create((set, get) => ({
  selectedMap: null,
  setSelectedMap: (map) => set({ selectedMap: map }),
  getRandomMap: () => {
    const currentMap = get().selectedMap;
    let randomIndex = Math.floor(Math.random() * Maps.length);
    // empêche de choisir la même carte 
    if (currentMap && Maps.length > 1) {
      while (Maps[randomIndex].id === currentMap.id) {
        randomIndex = Math.floor(Math.random() * Maps.length);
      }
    }
    set({ selectedMap: Maps[randomIndex] });
  },
}));

export default useMapStore;
