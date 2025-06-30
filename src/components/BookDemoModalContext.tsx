'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import BookDemoModal from './BookDemoModal';

interface BookDemoModalContextType {
  openBookDemoModal: () => void;
  closeBookDemoModal: () => void;
}

const BookDemoModalContext = createContext<BookDemoModalContextType | undefined>(undefined);

export function useBookDemoModal() {
  const ctx = useContext(BookDemoModalContext);
  if (!ctx) throw new Error('useBookDemoModal must be used within BookDemoModalProvider');
  return ctx;
}

export function BookDemoModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openBookDemoModal = () => setOpen(true);
  const closeBookDemoModal = () => setOpen(false);

  return (
    <BookDemoModalContext.Provider value={{ openBookDemoModal, closeBookDemoModal }}>
      {children}
      <BookDemoModal open={open} onClose={closeBookDemoModal} />
    </BookDemoModalContext.Provider>
  );
} 