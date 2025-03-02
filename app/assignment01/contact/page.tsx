import type { NextPage } from "next"
import Link from "next/link"
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react"

type Props = {}

const contact: NextPage<Props> = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">


      {/* Contact Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* GitHub */}
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm p-8 border border-slate-700 shadow-xl hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="relative z-10">
              <div className="w-16 h-16 bg-slate-700/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Github className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">GitHub</h3>
              <p className="text-gray-400 mb-4">Check out my projects and contributions</p>
              <div className="flex items-center text-blue-400 group">
                <span className="text-sm group-hover:mr-2 transition-all">View Profile</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm p-8 border border-slate-700 shadow-xl hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="relative z-10">
              <div className="w-16 h-16 bg-slate-700/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Linkedin className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">LinkedIn</h3>
              <p className="text-gray-400 mb-4">Connect with me professionally</p>
              <div className="flex items-center text-blue-400 group">
                <span className="text-sm group-hover:mr-2 transition-all">View Profile</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:your.email@example.com"
            className="group relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm p-8 border border-slate-700 shadow-xl hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="relative z-10">
              <div className="w-16 h-16 bg-slate-700/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <p className="text-gray-400 mb-4">Get in touch via email</p>
              <div className="flex items-center text-blue-400 group">
                <span className="text-sm group-hover:mr-2 transition-all">Send Message</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        </div>

        {/* About Section */}
        <div className="mt-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">About Me</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              I'm a software developer passionate about creating efficient algorithms and solving complex problems. My
              recent work includes implementing the A* pathfinding algorithm for geographic data and various other
              optimization projects. Feel free to reach out if you'd like to collaborate or discuss interesting
              technical challenges.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm">Algorithm Development</span>
              <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm">TypeScript</span>
              <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm">React</span>
              <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm">Next.js</span>
              <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm">Geographic Data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-blue-400 font-bold text-xl">Contact</span>
              <p className="text-gray-400 mt-2">© {new Date().getFullYear()} All rights reserved</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default contact

