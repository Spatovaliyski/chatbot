export const useTimestamp = () => {
    const time = new Date().getTime() / 1000;
    const timestamp = Math.floor(time);
  
    return timestamp;
};

