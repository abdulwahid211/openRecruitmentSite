'use client';
import React, { createContext, useContext } from 'react';

type DialogContextType = {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
};

export const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}
