import Image from 'next/image'
import ChatComponent from '@/components/chatComponent'

export default function Home() {
  // ChatComponent is a client-side component that manages chat interactions

  const backgroundImageSrc = 'images/Supertruth.png'; // Replace with the path to your static image

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24" style={{
      backgroundImage: `url('${backgroundImageSrc}')`,
      backgroundSize: 'cover', // Keeps the background image as large as possible
      backgroundPosition: 'center', // Centers the background image
      backgroundAttachment: 'fixed', // This will make the background image fixed during scroll
      backgroundRepeat: 'no-repeat' // Prevents the background image from repeating
    }}>
      <div className="bg-white-800 p-3 w-[1500px] rounded-md text-black">
        <h2 className="text-2xl">REALMS</h2>
        <ChatComponent />
      </div>
    </main>
  )
}
