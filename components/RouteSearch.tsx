import React, { useState, useMemo, useCallback } from 'react';
import { Node, Edge } from '@/app/types/graph';
import { aStar } from '@/app/utils/astar';

interface RouteSearchProps {
  nodes: Node[];
  edges: Edge[];
  onPathFound: (path: Node[]) => void;
}

interface SuggestionListProps {
  suggestions: string[];
  onSelect: (value: string) => void;
}

const SuggestionList: React.FC<SuggestionListProps> = ({ suggestions, onSelect }) => {
  if (suggestions.length === 0) return null;
  return (
    <ul
      className="absolute z-10 w-full bg-white mt-1 border border-gray-300  shadow-lg max-h-60 overflow-auto"
      role="listbox"
    >
      {suggestions.map((city) => (
        <li 
          key={city} 
          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
          role="option"
          aria-selected="false" // Added to satisfy ARIA requirements
          onMouseDown={() => onSelect(city)}
        >
          {city}
        </li>
      ))}
    </ul>
  );
};

const RouteSearch: React.FC<RouteSearchProps> = ({ nodes, edges, onPathFound }) => {
  const [start, setStart] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showStartSuggestions, setShowStartSuggestions] = useState(false);
  const [showGoalSuggestions, setShowGoalSuggestions] = useState(false);

  // Compute the list of city names once
  const cityNames = useMemo(() => nodes.map(node => node.name), [nodes]);

  // Wrap getSuggestions in useCallback so that its identity remains stable
  const getSuggestions = useCallback((input: string): string[] => {
    if (!input) return [];
    const inputLower = input.toLowerCase();
    return cityNames
      .filter(city => city.toLowerCase().includes(inputLower))
      .slice(0, 5);
  }, [cityNames]);

  // Memoized suggestions for each input field, now including getSuggestions in the dependency arrays
  const filteredStartSuggestions = useMemo(() => getSuggestions(start), [start, getSuggestions]);
  const filteredGoalSuggestions = useMemo(() => getSuggestions(goal), [goal, getSuggestions]);

  // Handle form submission for route search
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!start || !goal) {
      setError('Please enter both start and destination cities');
      return;
    }

    const startExists = cityNames.includes(start);
    const goalExists = cityNames.includes(goal);

    if (!startExists && !goalExists) {
      setError('Both start and destination cities are invalid');
      return;
    }

    if (!startExists) {
      setError(`Start city "${start}" not found`);
      return;
    }

    if (!goalExists) {
      setError(`Destination city "${goal}" not found`);
      return;
    }

    if (start === goal) {
      setError('Start and destination cities must be different');
      return;
    }

    // Calculate the path using the A* algorithm
    setIsLoading(true);
    try {
      const result = aStar({
        graph: { nodes, edges },
        start,
        goal
      });

      if (!result) {
        setError('No path found between these cities');
      } else {
        onPathFound(result.path);
      }
    } catch (err) {
      setError(`Error finding path: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle suggestion selection for both inputs
  const handleSelectSuggestion = (value: string, type: 'start' | 'goal') => {
    if (type === 'start') {
      setStart(value);
      setShowStartSuggestions(false);
    } else {
      setGoal(value);
      setShowGoalSuggestions(false);
    }
  };

  return (
    <section className="">
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row space-x-4 items-end">
            {/* Starting City Input */}
            <div className="relative flex-1">
              <label htmlFor="start" className="block text-sm font-medium text-white mb-1">
                Starting City
              </label>
              <input
                id="start"
                type="text"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                onFocus={() => setShowStartSuggestions(true)}
                onBlur={() => setTimeout(() => setShowStartSuggestions(false), 100)}
                placeholder="Enter starting city"
                className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-autocomplete="list"
                aria-controls="start-suggestion-list"
              />
              {showStartSuggestions && filteredStartSuggestions.length > 0 && (
                <SuggestionList 
                  suggestions={filteredStartSuggestions} 
                  onSelect={(value) => handleSelectSuggestion(value, 'start')}
                />
              )}
            </div>

            {/* Destination City Input */}
            <div className="relative flex-1">
              <label htmlFor="goal" className="block text-sm font-medium text-white mb-1">
                Destination City
              </label>
              <input
                id="goal"
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                onFocus={() => setShowGoalSuggestions(true)}
                onBlur={() => setTimeout(() => setShowGoalSuggestions(false), 100)}
                placeholder="Enter destination city"
                className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-autocomplete="list"
                aria-controls="goal-suggestion-list"
              />
              {showGoalSuggestions && filteredGoalSuggestions.length > 0 && (
                <SuggestionList 
                  suggestions={filteredGoalSuggestions} 
                  onSelect={(value) => handleSelectSuggestion(value, 'goal')}
                />
              )}
            </div>

            {/* Search Button */}
            <div className="flex-shrink-0">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4  transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Finding Route...
                  </span>
                ) : (
                  "Find Route"
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div role="alert" className="text-red-500 text-sm py-2 px-3 bg-red-50 ">
              {error}
            </div>
          )}
        </div>
      </form>
    </section>
  );
};

export default RouteSearch;
