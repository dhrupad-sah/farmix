"use client";

import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "@/components";
import { useRouter } from "next/navigation";

export default function Hero2() {
  const { user, login, logout, ready, authenticated } = usePrivy();
  const [showMainContent, setShowMainContent] = useState(true);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const router = useRouter();

  const handleScrollDown = () => {
    setShowMainContent(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
  }

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        setShowMainContent(false);
      } else if (event.deltaY < 0) {
        setShowMainContent(true);
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <main className="flex flex-col overflow-hidden">
      <AnimatePresence>
        {showMainContent ? (
          <motion.div
            key="mainContent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, rotateX: 90 }}
            className="flex flex-col items-center min-h-screen pt-2 px-8"
            style={{ background: "linear-gradient(to top left, rgb(34, 34, 56), rgb(157, 0, 254))" }}
          >
            <div className="w-full">
              <div className="h-[1px] w-full bg-white border-white"></div>
              <div className="flex flex-row items-center justify-between py-6" style={{ fontFamily: "Satoshi" }}>
                <div className="text-lg hover:cursor-pointer" style={{ letterSpacing: '6px' }} onClick={() => router.push('/leaderboard')}>Leaderboard</div>
                <div className="text-6xl" style={{ fontFamily: 'Ares' }}>Farmix</div>
                <div className="relative text-2xl">
                  <button
                    onClick={authenticated ? toggleDropdown : login}
                    className=' gap-2 rounded-md py-1 px-3 flex flex-row justify-center items-center hover:cursor-pointer'
                  >
                    {authenticated && (
                      <div>
                        <img src={user?.farcaster?.pfp || ''} alt="Profile Picture" className='w-8 h-8 rounded-full' />
                      </div>
                    )}
                    {authenticated ? `${user?.farcaster?.username || ''}` : `Login`}
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10">
                      <button
                        onClick={handleLogout}
                        className="flex flex-row items-center justify-start gap-4 w-full text-left px-4 py-1 rounded-md bg-white text-black hover:bg-gray-200"
                      >
                        <img src="/logout.png" height={20} width={20} alt="logout logo" />
                        <div className="text-lg">
                          Logout
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="h-[1px] w-full bg-white border-white"></div>
            </div>
            <div className="flex flex-row items-end w-full justify-between">
              <div className="flex flex-col">
                <div className="flex flex-col w-[72%] gap-4">
                  <div className="py-2 text-[2rem] border border-white rounded-full flex justify-center" style={{ fontFamily: "Satoshi" }}>
                    Gauge Compatibility and Foster Connections
                  </div>
                  <div className="text-xl" style={{ fontFamily: "Satoshi" }}>
                    Farmix analyzes shared interests and mutual connections to generate personalized compatibility scores, fostering connections.
                  </div>
                </div>
                <div className="text-[10rem]" style={{ fontFamily: 'Ares' }}>FARMIX</div>
              </div>
              <div className="flex justify-center items-center">
                <img src="/farmix-cube.png" height={620} width={620} />
              </div>
            </div>
            <div
              className="text-white border border-white rounded-full py-2 px-6 flex flex-row justify-center items-center cursor-pointer"
              onClick={handleScrollDown}
            >
              SCROLL DOWN
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="secondaryContent"
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: 90 }}
            className="flex flex-col items-center min-h-screen w-full"
          >
            <div className="min-h-screen w-full bg-[url('/Home2.png')] bg-cover bg-no-repeat bg-center">
              <Hero />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
