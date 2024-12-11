export function customTimeout({ callback, delay, args }: { callback: (args: boolean) => void, delay: number, args: boolean; }) {
  setTimeout(() => {
    callback(args);
  }, delay);
}

