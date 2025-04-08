'use client';
import { ReactNode, useState } from 'react';
import { DialogContext } from './DialogContext';

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  return <DialogContext.Provider value={{ dialogOpen, setDialogOpen }}>{children}</DialogContext.Provider>;
}
