import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';

interface AnimeCardProps {
  title: string;
  image: string;
  members: number;
  description: string;
  onSelect: () => void;
}

export default function AnimeCard({ title, image, members, description, onSelect }: AnimeCardProps) {
  return (
    <div 
      onClick={onSelect}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl cursor-pointer"
    >
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 flex-1">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <MessageCircle size={18} />
            <span className="text-sm">{members.toLocaleString()} members</span>
          </div>
          <div className="rounded-full bg-indigo-50 p-2 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}