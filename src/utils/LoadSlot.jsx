export const loadSlotsFromLocalStorage = (nama) => {
    const storedSlots = localStorage.getItem(`parkingSlots_${nama}`);
    if (storedSlots) {
      return JSON.parse(storedSlots);
    } else {
      const initialSlots = Array(10)
        .fill(null)
        .map(() =>
          Array(10)
            .fill(null)
            .map(() => ({
              status: Math.random() > 0.3 ? 0 : 1,
              vehicle: null,
            }))
        );
      localStorage.setItem(`parkingSlots_${nama}`, JSON.stringify(initialSlots));
      return initialSlots;
    }
  };
  