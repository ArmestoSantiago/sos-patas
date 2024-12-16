type customTimeout = {
  args: boolean;
  callback: (args: boolean) => void;
  delay: number;
};

export function customTimeout({ callback, delay, args }: customTimeout) {
  setTimeout(() => {
    callback(args);
  }, delay);
}

