import React, { useState } from 'react';
import AnimeCard from './components/AnimeCard';
import ChatSection from './components/ChatSection';
import { Tv, Users, MessageCircle, Sparkles } from 'lucide-react';

const animeList = [
  {
    id: 1,
    title: "Attack on Titan",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80",
    members: 158000,
    description: "Join the fight for humanity's survival"
  },
  {
    id: 2,
    title: "Demon Slayer",
    image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?auto=format&fit=crop&q=80",
    members: 142000,
    description: "Breathe in the excitement with fellow slayers"
  },
  {
    id: 3,
    title: "One Piece",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80",
    members: 234000,
    description: "Set sail for the greatest adventure"
  },
  {
    id: 4,
    title: "Jujutsu Kaisen",
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80",
    members: 167000,
    description: "Unleash your cursed energy"
  },
  {
    id: 5,
    title: "My Hero Academia",
    image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?auto=format&fit=crop&q=80",
    members: 145000,
    description: "Go beyond, Plus Ultra!"
  },
  {
    id: 6,
    title: "Chainsaw Man",
    image: "https://images.unsplash.com/photo-1625895197185-efcec01cffe0?auto=format&fit=crop&q=80",
    members: 128000,
    description: "Rev up the conversation"
  }
];

const stats = [
  { icon: Users, label: "Active Members", value: "974K+" },
  { icon: MessageCircle, label: "Daily Messages", value: "250K+" },
  { icon: Sparkles, label: "Communities", value: "100+" }
];

function App() {
  const [selectedAnime, setSelectedAnime] = useState<string | null>(null);

  if (selectedAnime) {
    return <ChatSection animeName={selectedAnime} onBack={() => setSelectedAnime(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-indigo-600 pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541562232579-512a21360020?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        </div>
        
        <header className="relative">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                <Tv className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">AniChat</h1>
            </div>
          </div>
        </header>

        <div className="relative">
          <div className="container mx-auto px-4 py-16 sm:py-24">
            <div className="text-center">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Connect with Anime Fans Worldwide
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-100">
                Join vibrant communities, discuss your favorite series, and make friends who share your passion for anime.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-2xl bg-white/10 p-6 backdrop-blur-sm"
                >
                  <stat.icon className="h-8 w-8 text-white" />
                  <div className="mt-4 text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-indigo-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Communities Section */}
      <main className="relative -mt-32 container mx-auto px-4 pb-16">
        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Popular Communities</h3>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {animeList.map((anime) => (
              <AnimeCard
                key={anime.id}
                title={anime.title}
                image={anime.image}
                members={anime.members}
                description={anime.description}
                onSelect={() => setSelectedAnime(anime.title)}
              />
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Tv className="h-6 w-6 text-indigo-600" />
              <span className="font-bold text-gray-900">AniChat</span>
            </div>
            <p className="text-gray-600">© 2024 AniChat. Connect with anime fans worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;