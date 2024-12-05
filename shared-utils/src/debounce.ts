type DebouncedFunction = (...args: any[]) => void;

function debounce(func: DebouncedFunction, wait: number, immediate: boolean = false): DebouncedFunction {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function(this: any, ...args: any[]) {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout as ReturnType<typeof setTimeout>);

    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}

export default debounce;
