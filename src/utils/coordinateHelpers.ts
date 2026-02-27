import React from 'react';

export interface Point {
  x: number;
  y: number;
}

/**
 * Gets the coordinates of a mouse event relative to an element.
 * Useful when the element might be scaled, to ensure perfect alignment.
 */
export const getRelativeCoordinates = (
  e: React.MouseEvent | MouseEvent | React.TouchEvent | TouchEvent | React.PointerEvent | PointerEvent,
  container: HTMLElement
): Point => {
  const rect = container.getBoundingClientRect();

  let clientX = 0;
  let clientY = 0;

  if ('touches' in e && (e as any).touches.length > 0) {
    clientX = (e as any).touches[0].clientX;
    clientY = (e as any).touches[0].clientY;
  } else if ('clientX' in e) {
    clientX = (e as any).clientX;
    clientY = (e as any).clientY;
  }

  const x = Math.round(clientX - rect.left);
  const y = Math.round(clientY - rect.top);
  return { x, y };
};
