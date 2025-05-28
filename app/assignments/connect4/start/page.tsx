"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the 3D game component to avoid SSR issues with Three.js
const ConnectFourGame = dynamic(() => import("@/components/connect-four-game"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-b from-purple-900 to-indigo-900">
      <div className="text-white text-2xl">Loading 3D Connect Four...</div>
    </div>
  ),
})

export default function Home() {
  return (
   
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-full">
            <div className="text-white text-2xl">Loading 3D Connect Four...</div>
          </div>
        }
      >
        <ConnectFourGame />
      </Suspense>

  )
}
