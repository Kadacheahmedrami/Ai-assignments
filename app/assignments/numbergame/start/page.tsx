import { GameVisualizer } from "@/components/game-visualizer"
import { GameExplainer } from "@/components/game-explainer"
import { GamePlayer } from "@/components/game-player"
import { ThemeProvider } from "@/components/theme-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <ThemeProvider defaultTheme="blue" storageKey="number-game-theme">
      <main className="h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 py-4">
          <Tabs defaultValue="play" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-800/50">
              <TabsTrigger value="play" className="text-base">
                Play Game
              </TabsTrigger>
              <TabsTrigger value="visualize" className="text-base">
                Visualize Algorithm
              </TabsTrigger>
              <TabsTrigger value="learn" className="text-base">
                Learn Rules
              </TabsTrigger>
            </TabsList>
            <TabsContent value="play" className="mt-0">
              <GamePlayer />
            </TabsContent>
            <TabsContent value="visualize" className="mt-0">
              <GameVisualizer />
            </TabsContent>
            <TabsContent value="learn" className="mt-0">
              <GameExplainer expanded={true} />
            </TabsContent>
          </Tabs>
        </div>
        <footer className="w-full mt-auto bg-blue-900/80 border-t border-blue-800 py-3 text-center text-blue-100">
          <div className="container mx-auto px-4">
            <p className="text-sm">
              Developed by <span className="font-bold">Kadache Ahmed Rami</span> | Group 4
            </p>
            <p className="text-xs text-blue-300 mt-1">Assignment for AI Course | ESTIN School</p>
          </div>
        </footer>
      </main>
    </ThemeProvider>
  )
}
