import Image from 'next/image';
import MenuBar from './components/MenuBar';

export default function Home() {
  return (
    <div className="flex flex-col">
      <MenuBar />
      <h1>Yoo bismilah</h1>
    </div>
  );
}
