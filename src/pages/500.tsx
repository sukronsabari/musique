import Image from 'next/image';
import Head from 'next/head';
import Image404 from '@/assets/image404.svg';

export default function Custom505() {
  return (
    <>
      <Head>
        <title>MusiQue | Server Error</title>
      </Head>
      <div className="flex flex-col h-[calc(100vh-72px)] justify-center items-center space-y-6">
        <Image src={Image404} alt="404 not found" width={200} height={200} />
        <h1 className="font-bold text-2xl">Oops! Server error.</h1>
      </div>
    </>
  );
}
