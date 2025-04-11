import Image from 'next/image';
import MenuBar from './../../components/MenuBar';
import { DialogProvider } from '../../context/DialogProvider';

export default function Home() {
  return (
    <div className="flex flex-col">
      <DialogProvider>
        <MenuBar />
      </DialogProvider>
      <h1>Yoo bismilah</h1>
    </div>
  );
}
