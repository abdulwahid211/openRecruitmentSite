import Image from 'next/image';
import NavBar from '../../components/nav/NavBar';
import { DialogProvider } from '../../context/DialogProvider';

export default function Home() {
  return (
    <div className="flex flex-col">
      <DialogProvider>
        <NavBar />
      </DialogProvider>
      <h1>Yoo bismilah</h1>
    </div>
  );
}
