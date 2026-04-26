import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

// Seed data for demo
const seedAmbassadors = [
  { id: 1, name: 'Arjun Sharma', github: 'torvalds', college: 'IIT Delhi', score: 92, grade: 'A+', points: 1450, badges: ['🔥 Top Performer', '⭐ Star Contributor', '📅 7-Day Streak'], tasksCompleted: 12, avatar: 'https://avatars.githubusercontent.com/u/1024025' },
  { id: 2, name: 'Priya Patel', github: 'gaearon', college: 'NIT Trichy', score: 78, grade: 'A', points: 1120, badges: ['⭐ Star Contributor', '🚀 Early Adopter'], tasksCompleted: 9, avatar: 'https://avatars.githubusercontent.com/u/810438' },
  { id: 3, name: 'Rahul Verma', github: 'sindresorhus', college: 'BITS Pilani', score: 65, grade: 'B', points: 870, badges: ['🚀 Early Adopter'], tasksCompleted: 7, avatar: 'https://avatars.githubusercontent.com/u/170270' },
  { id: 4, name: 'Sneha Gupta', github: 'addyosmani', college: 'VIT Vellore', score: 55, grade: 'B', points: 640, badges: ['🚀 Early Adopter'], tasksCompleted: 5, avatar: 'https://avatars.githubusercontent.com/u/110953' },
  { id: 5, name: 'Karan Mehta', github: 'tj', college: 'DTU Delhi', score: 42, grade: 'C', points: 390, badges: [], tasksCompleted: 3, avatar: 'https://avatars.githubusercontent.com/u/25254' },
];

const seedTasks = [
  { id: 1, title: 'Share CampusConnect on LinkedIn', type: 'promotion', points: 100, deadline: '2026-05-01', status: 'active', description: 'Post about CampusConnect on LinkedIn with #CampusConnect hashtag and tag 3 friends.' },
  { id: 2, title: 'Refer 3 new ambassadors', type: 'referral', points: 150, deadline: '2026-05-05', status: 'active', description: 'Refer 3 students from your college to join the ambassador program.' },
  { id: 3, title: 'Create a GitHub repo showcase', type: 'content', points: 200, deadline: '2026-05-10', status: 'active', description: 'Create a public GitHub repo showcasing a project and share the link.' },
  { id: 4, title: 'Attend weekly sync call', type: 'engagement', points: 50, deadline: '2026-04-30', status: 'active', description: 'Join the weekly ambassador sync call and participate actively.' },
  { id: 5, title: 'Write a blog post', type: 'content', points: 250, deadline: '2026-05-15', status: 'active', description: 'Write a 500+ word blog post about your campus ambassador experience.' },
];

export function AppProvider({ children }) {
  const [ambassadors, setAmbassadors] = useState(seedAmbassadors);
  const [tasks] = useState(seedTasks);
  const [currentUser, setCurrentUser] = useState(null); // logged-in ambassador
  const [view, setView] = useState('landing'); // landing | ambassador | org

  const addAmbassador = (ambassador) => {
    setAmbassadors(prev => {
      const exists = prev.find(a => a.github === ambassador.github);
      if (exists) return prev.map(a => a.github === ambassador.github ? { ...a, ...ambassador } : a);
      return [...prev, { ...ambassador, id: Date.now(), points: ambassador.score * 10, badges: getBadges(ambassador.score), tasksCompleted: 0 }];
    });
  };

  const getBadges = (score) => {
    const b = ['🚀 Early Adopter'];
    if (score >= 60) b.push('⭐ Star Contributor');
    if (score >= 80) b.push('🔥 Top Performer');
    return b;
  };

  return (
    <AppContext.Provider value={{ ambassadors, tasks, currentUser, setCurrentUser, view, setView, addAmbassador }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
