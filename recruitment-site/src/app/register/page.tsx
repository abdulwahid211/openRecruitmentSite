import React from 'react';
import MenuBar from '../components/MenuBar';
import { DialogProvider } from '../context/DialogProvider';

export default function page() {
  return (
    <div>
      <DialogProvider>
        <MenuBar />
      </DialogProvider>
      <h1> Register</h1>
    </div>
  );
}
