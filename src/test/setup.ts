import "@testing-library/jest-dom/vitest"

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
})

class ResizeObserverMock {
  private callback: ResizeObserverCallback

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
  }

  observe(target: Element) {
    this.callback(
      [
        {
          target,
          contentRect: {
            width: 400,
            height: 300,
            top: 0,
            right: 400,
            bottom: 300,
            left: 0,
            x: 0,
            y: 0,
            toJSON: () => ({}),
          },
          borderBoxSize: [],
          contentBoxSize: [],
          devicePixelContentBoxSize: [],
        },
      ],
      this as unknown as ResizeObserver
    )
  }
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: ResizeObserverMock,
})

Object.defineProperty(globalThis, "ResizeObserver", {
  writable: true,
  value: ResizeObserverMock,
})

Object.defineProperty(window, "PointerEvent", {
  writable: true,
  value: MouseEvent,
})

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  writable: true,
  value: () =>
    ({
      beginPath: () => undefined,
      clearRect: () => undefined,
      createLinearGradient: () => ({ addColorStop: () => undefined }),
      fill: () => undefined,
      fillRect: () => undefined,
      fillStyle: "",
      globalAlpha: 1,
      globalCompositeOperation: "source-over",
      roundRect: () => undefined,
      scale: () => undefined,
    }) as unknown as CanvasRenderingContext2D,
})
