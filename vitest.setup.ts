import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

vi.mock('zustand');

// jsdom doesn't implement ResizeObserver, but @dnd-kit/dom requires it at import time.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??=
  ResizeObserverStub as unknown as typeof ResizeObserver;

afterEach(() => {
  cleanup();
});
