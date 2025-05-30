import type { NextPage } from "next"
import Image from "next/image"
import { Youtube, Folder, MapPin, BookOpen, ExternalLink, ChevronRight } from "lucide-react"
import React from "react"

const Documentation: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b overflow-hidden from-slate-900 to-slate-800 text-white font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center md:text-left md:max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Maze Search Algorithms
              </span>
              <span className="block text-white mt-1">Visualization & Implementation</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl">
              Explore our interactive 3D maze visualization that demonstrates multiple search algorithms—Breadth-First Search (BFS), Depth-First Search (DFS), Uniform Cost Search (UCS), A* Search, and Greedy Best-First Search. See how each algorithm navigates the maze and finds the optimal path.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#algorithm"
                className="px-8 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center"
              >
                View Maze Search
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#resources"
                className="px-8 py-3 rounded-lg bg-slate-700 text-white font-medium hover:bg-slate-600 transition-colors shadow-lg flex items-center justify-center"
              >
                Explore Resources
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Visualization Image */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Image
            src="/maze.png"
            alt="3D Maze Visualization with Search Algorithms"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 to-transparent">
            <p className="text-sm text-gray-300">
              A dynamic 3D maze where various search algorithms visualize their exploration process.
            </p>
          </div>
        </div>

        {/* Project Overview */}
        <section id="overview" className="mb-16 scroll-mt-20">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Project Overview</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl">
            <p className="text-gray-300 text-lg leading-relaxed">
              This project implements several search algorithms to solve a grid-based maze. The maze is represented by a matrix where each cell may be open, a wall, the start, or the goal. The search algorithms—BFS, DFS, Uniform Cost Search, A* Search, and Greedy Best-First Search—demonstrate distinct exploration and pathfinding techniques. The maze is rendered in 3D with smooth animations that reveal how each algorithm expands through the grid.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Interactive Maze</h3>
                <p className="text-gray-300">
                  A grid-based maze where walls, start, and goal are visually represented in a 3D environment.
                </p>
              </div>
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Multiple Algorithms</h3>
                <p className="text-gray-300">
                  Explore how different strategies like BFS, DFS, UCS, A*, and Greedy search navigate through the maze.
                </p>
              </div>
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Visual Feedback</h3>
                <p className="text-gray-300">
                  Animated expansion nodes and path connectors visually demonstrate the algorithm’s progression.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Components */}
        <section id="components" className="mb-16 scroll-mt-20">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Key Components</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-3 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Maze Renderer</h3>
              <p className="text-gray-300">
                The component responsible for rendering the 3D maze, including walls, start/goal cubes, and dynamic animations.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-3 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Search Algorithms</h3>
              <p className="text-gray-300">
                Implementations of BFS, DFS, Uniform Cost Search, A* Search, and Greedy Best-First Search tailored to explore the maze.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-3 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Animation Engine</h3>
              <p className="text-gray-300">
                Uses smooth timing and dynamic scaling (as seen in the ExpansionCube component) to visually represent node exploration.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-3 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Path Reconstruction</h3>
              <p className="text-gray-300">
                After finding the goal, the path is backtracked and rendered as connectors between the explored nodes.
              </p>
            </div>
          </div>
        </section>

        {/* Algorithm Steps */}
        <section id="algorithm" className="mb-16 scroll-mt-20">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Algorithm Steps</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-500/30"></div>
              <ol className="space-y-8 relative">
                <li className="pl-16 relative">
                  <div className="absolute left-6 -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Initialize the Maze</h3>
                  <p className="text-gray-300">
                    Identify the start, goal, and walls within the grid and prepare the rendering environment.
                  </p>
                </li>
                <li className="pl-16 relative">
                  <div className="absolute left-6 -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Select a Search Algorithm</h3>
                  <p className="text-gray-300">
                    Choose from BFS, DFS, UCS, A*, or Greedy Best-First Search to explore the maze.
                  </p>
                </li>
                <li className="pl-16 relative">
                  <div className="absolute left-6 -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Expand Nodes</h3>
                  <p className="text-gray-300">
                    Iteratively explore neighbor cells while marking visited nodes, using the selected algorithm’s strategy.
                  </p>
                </li>
                <li className="pl-16 relative">
                  <div className="absolute left-6 -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-xs font-bold">4</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Animate Expansion</h3>
                  <p className="text-gray-300">
                    Display each expansion step with smooth animations and dynamic scaling for visual clarity.
                  </p>
                </li>
                <li className="pl-16 relative">
                  <div className="absolute left-6 -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-xs font-bold">5</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Reconstruct the Path</h3>
                  <p className="text-gray-300">
                    Once the goal is reached, backtrack using parent pointers to highlight the optimal path.
                  </p>
                </li>
              </ol>
            </div>
          
          </div>
        </section>

        {/* Challenges & Solutions */}
        <section id="challenges" className="mb-16 scroll-mt-20">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Challenges & Solutions</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl">
            <p className="text-gray-300 text-lg mb-8">
              Implementing a dynamic maze with multiple search strategies brought its own set of challenges:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600 hover:border-blue-500/50 transition-colors">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Infinite Loops</h3>
                <p className="text-gray-300 mb-4">
                  Certain maze configurations risked infinite loops during exploration.
                </p>
                <div className="p-3 bg-slate-800 rounded-lg">
                  <h4 className="text-sm font-semibold text-blue-400 mb-1">Solution:</h4>
                  <p className="text-sm text-gray-400">
                    Implemented a robust visited tracking system and error counters to safely exit loops.
                  </p>
                </div>
              </div>
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600 hover:border-blue-500/50 transition-colors">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Accurate Cost & Heuristics</h3>
                <p className="text-gray-300 mb-4">
                  Balancing the actual path cost and heuristic estimates to ensure optimal pathfinding.
                </p>
                <div className="p-3 bg-slate-800 rounded-lg">
                  <h4 className="text-sm font-semibold text-blue-400 mb-1">Solution:</h4>
                  <p className="text-sm text-gray-400">
                    Tuned the cost functions and heuristics specific to the maze’s grid structure for each algorithm.
                  </p>
                </div>
              </div>
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600 hover:border-blue-500/50 transition-colors">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Smooth Animations</h3>
                <p className="text-gray-300 mb-4">
                  Ensuring that the visual expansion and path reconstruction are both engaging and informative.
                </p>
                <div className="p-3 bg-slate-800 rounded-lg">
                  <h4 className="text-sm font-semibold text-blue-400 mb-1">Solution:</h4>
                  <p className="text-sm text-gray-400">
                    Utilized timed state updates and frame-by-frame rendering to create responsive animations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section id="resources" className="mb-16 scroll-mt-20">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Resources</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
                {/* YouTube Resource Card */}
                <a
  href="https://www.youtube.com/watch?v=WbzNRTTrX0g&t=1908s"
  target="_blank"
  rel="noopener noreferrer"
  className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 transition-all flex items-start"
>
  <div className="w-12 h-12  rounded-lg flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
    <Youtube className="text-red-400 w-8 h-8" />
  </div>
  <div>
    <h3 className="text-xl font-bold text-white mb-2">CS50 Introduction to AI Search - Lecture 0</h3>
    <p className="text-gray-300 mb-4">
      Explore how NASA clever coding methods power AI search, and discover practical tips you can apply to your own projects.
    </p>
    <div className="flex items-center">
      <ExternalLink className="h-4 w-4 text-gray-400 mr-2" />
      <span className="text-sm text-gray-400">Watch on YouTube</span>
    </div>
  </div>
</a>

<a
  href="https://www.youtube.com/watch?v=GWYhtksrmhE"
  target="_blank"
  rel="noopener noreferrer"
  className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 transition-all flex items-start"
>
  <div className="w-12 h-12  rounded-lg flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
    <Youtube className="text-red-400 w-8 h-8" />
  </div>
  <div>
    <h3 className="text-xl font-bold text-white mb-2">NASAs Uncrashable Code</h3>
    <p className="text-gray-300 mb-4">
      Uncover the secrets behind NASA’s resilient code and see how these battle-tested techniques can inspire your own software solutions.
    </p>
    <div className="flex items-center">
      <ExternalLink className="h-4 w-4 text-gray-400 mr-2" />
      <span className="text-sm text-gray-400">Watch on YouTube</span>
    </div>
  </div>
</a>

{/* Google Drive Resource Card */}
<a
  href="https://drive.google.com/file/d/1Ua5NQmB-9rFB6Td3B9aMq0pmn05GeN23/view"
  target="_blank"
  rel="noopener noreferrer"
  className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 transition-all flex items-start"
>
  <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
    <Folder className="text-green-400 w-8 h-8" />
  </div>
  <div>
    <h3 className="text-xl font-bold text-white mb-2">Supporting Materials</h3>
    <p className="text-gray-300 mb-4">
      Get easy-to-follow guides, sample code, and extra resources to help you master the A* algorithm and boost your programming skills.
    </p>
    <div className="flex items-center">
      <ExternalLink className="h-4 w-4 text-gray-400 mr-2" />
      <span className="text-sm text-gray-400">View on Google Drive</span>
    </div>
  </div>
</a>

{/* CS50 AI Lectures Resource Card */}
<a
  href="#"
  className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 transition-all flex items-start"
>
  <div className="w-12 h-12  rounded-lg flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
    <BookOpen className="text-purple-400 w-8 h-8" />
  </div>
  <div>
    <h3 className="text-xl font-bold text-white mb-2">CS50 AI Lectures</h3>
    <p className="text-gray-300 mb-4">
      Enjoy Harvard’s engaging CS50 AI lectures that break down complex search algorithms into clear, relatable concepts for beginners and pros alike.
    </p>
    <div className="flex items-center">
      <ExternalLink className="h-4 w-4 text-gray-400 mr-2" />
      <span className="text-sm text-gray-400">Access Lectures</span>
    </div>
  </div>
</a>

          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-blue-400 font-bold text-xl">Maze Search Algorithms</span>
              <p className="text-gray-400 mt-2">© {new Date().getFullYear()} All rights reserved</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Documentation
