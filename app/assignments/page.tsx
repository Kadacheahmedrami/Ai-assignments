import type { NextPage } from "next";
import { ArrowRight } from "lucide-react";

const Assignments: NextPage = () => {
  return (
    <div className="min-h-[92.1vh] flex flex-col w-full bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Assignments</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Assignment 1: A* Shortest Path */}
          <a
            href="/assignments/assignment01Tp/start" // update with your route or external link
            className="group relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm p-8 border border-slate-700 shadow-xl hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2">
                A* Shortest Path in Algeria Map
              </h3>
              <p className="text-gray-400 mb-4">
                An implementation of the A* algorithm to find the shortest path across the map of Algeria.
              </p>
              <div className="flex items-center text-blue-400 group">
                <span className="text-sm group-hover:mr-2 transition-all">
                  View Assignment
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>

          {/* Assignment 2: 3D Maze with Search Algorithms */}
          <a
            href="/assignments/assignment01Td/start" // update with your route or external link
            className="group relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm p-8 border border-slate-700 shadow-xl hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2">
                3D Maze &amp; Search Algorithms
              </h3>
              <p className="text-gray-400 mb-4">
                A 3D maze visualization implementing various search algorithms including BFS, DFS, and more to explore pathfinding.
              </p>
              <div className="flex items-center text-blue-400 group">
                <span className="text-sm group-hover:mr-2 transition-all">
                  View Assignment
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t w-full  border-slate-800 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Kadache Ahmed Rami. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Assignments;
