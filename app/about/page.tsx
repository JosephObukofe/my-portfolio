import React from 'react';
// Import custom Icons component
import { Icons } from '@/app/components/Icons'; 
import { Tilt } from '@/app/components/ui/tilt';
// Removed Heroicons import
// import { BookOpenIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import Link from 'next/link'; // Import Link
import { cn } from '@/lib/utils'; // Import cn for combining classes

const movies = [
    {
    title: 'Andor',
    description: 'Tony Gilroy',
    imageUrl: 'images/59SVNwLfoMnZPPB6ukW6dlPxAdI.png',
  },
  {
    title: 'Havoc',
    description: 'Gareth Evans',
    imageUrl: 'images/bEiJBcwdR4oOTCgstLkqTUja58p.png',
    },
    {
    title: 'The Last of Us',
    description: 'Neil Druckmann',
    imageUrl: 'images/dmo6TYuuJgaYinXBPjrgG9mB5od.png',
    },
    {
    title: 'The Wild Robot',
    description: 'Peter Brown',
    imageUrl: 'images/9w0Vh9eizfBXrcomiaFWTIPdboo.png',
    },
];

export default function AboutPage() {
    return (
      <section className="space-y-6 mb-32">
        {/* About Me Paragraphs */}
        <h1 className="text-[1.1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200">
          About me
        </h1>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          I'm a data scientist currently based in Lagos, Nigeria, drawn to the elegance of mathematics and the creative depth of machine learning. 
          My work lives at the intersection of curiosity and structure, transforming raw data into insights that inform, encode and predict.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          By day, I work as a Data Scientist (Product) at{' '}
          <a
            href="https://premiumtrustbank.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative font-semibold group"
          >
            PremiumTrust Bank
            <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-current transition-all duration-300 group-hover:w-full"></span>
          </a>{', '}
          where I build data-driven solutions that support innovation in digital finance. 
          At the same time, I'm pursuing a Master's in Big Data and Artificial Intelligence at the{' '}
          <a
            href="https://www.stir.ac.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative font-semibold group"
          >
            University of Stirling, Scotland
            <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-current transition-all duration-300 group-hover:w-full"></span>
          </a>{' '}
          —deepening my technical foundation while staying close to the evolving landscape of data science.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Right now, I'm on a learning journey—building intelligent systems that blend recommendation engines, clustering, and real-time inference, while also sharpening my foundation in traditional machine learning for enterprise use cases. 
          I'm exploring the depth of neural networks, mastering the art of taking models into production with MLOps, and documenting my journey through technical writing. Along the way, I'm picking up Rust for its precision, speed, and safety.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            This portfolio is both a reflection of where I am and a glimpse into where I'm headed. 
            My practice is grounded in constant learning, thoughtful execution, and a belief that data—like art—has the power to transform how we understand the world.
        </p>
        <div className="py-1"></div>

        {/* My Inspiration Section */}
        <h1 className="text-[1.1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-8">My inspiration</h1>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Inspiration can come from the most unexpected places—a fleeting moment, a powerful story, or a simple act of kindness. I find myself motivated by the creativity of others, the beauty of nature, and the endless possibilities that technology brings. Every day is an opportunity to learn, grow, and create something meaningful.
        </p>
        <div className="py-1"></div>

        {/* My Hobbies Section */}
        <h1 className="text-[1.1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-8">My hobbies</h1>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          When I'm not working, I love to unwind with a variety of hobbies. I enjoy playing basketball, exploring new music genres, reading thought-provoking books, and experimenting with digital art. I also find joy in cooking, hiking, and discovering hidden gems in the city. These activities help me recharge and inspire my creativity in unexpected ways.
        </p>
        <div className="py-1"></div>

        {/* Things I Like & Don't Like Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
          <div>
            <h2 className="text-[1.1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mb-2">Things I like</h2>
            <ul className="space-y-2 font-satoshi text-[0.95rem] mt-2">
              <li>My personal space</li>
              <li>Anime</li>
              <li>Black</li>
              <li>Colognes with woody base notes</li>
              <li>Scandinavian design philosophy</li>
              <li>Mellow and earthy-tuned afrobeats</li>
              <li>Sci-fi movies</li>
              <li>Abyssinian cats</li>
            </ul>
          </div>
          <div>
            <h2 className="text-[1.1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mb-2">Things I don't like</h2>
            <ul className="space-y-2 font-satoshi text-[0.95rem] mt-2">
              <li>Coffee</li>
              <li>Yoghurt</li>
              <li>Crowds</li>
              <li>Loud music</li>
              <li>Driving in Lagos</li>
              <li>Lorem</li>
              <li>Lorem</li>
              <li>Lorem</li>
        </ul>
          </div>
        </div>
        <div className="py-1"></div>
  
        {/* Currently Watching Section */}
        <h1 className="text-[1.1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-8">
          Currently watching
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
          {movies.map((movie, index) => (
            <div key={index} className="flex items-center">
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-12 h-18 rounded-lg object-cover mr-3 shadow"
              />
              <div>
                <div className="font-satoshi text-[0.98rem] text-neutral-800 dark:text-neutral-200">{movie.title}</div>
                <div className="font-satoshi text-s text-neutral-500 dark:text-neutral-400">{movie.description}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="py-1"></div>

        {/* Favorite Artists Section */}
        <h1 className="text-[1.1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-8">
          Favorite artistes
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
          {/* First column: 5 artists */}
          <div className="space-y-4">
            {[
              { name: 'Daniel Caesar', genre: 'R&B, Neo-Soul', image: '/images/Daniel Caesar - Artist.jpg' },
              { name: 'The Cavemen.', genre: 'Highlife', image: '/images/The Cavemen. - Artist.jpg' },
              { name: 'Cleo Sol', genre: 'Soul, R&B', image: '/images/Cleo Sol - Artist.jpg' },
              { name: 'Cruel Santino', genre: 'Alté', image: '/images/Cruel Santino - Artist.jpg' },
              { name: 'Juls', genre: 'Afrobeat', image: '/images/Juls - Artist.jpg' },
            ].map((artist, i) => (
              <a key={i} href={`https://open.spotify.com/search/${encodeURIComponent(artist.name)}`} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-12 h-12 rounded-full object-cover mr-3 shadow"
                />
                <div>
                  <div className="font-satoshi text-[0.98rem] text-neutral-800 dark:text-neutral-200">{artist.name}</div>
                  <div className="font-satoshi text-s text-neutral-500 dark:text-neutral-400">{artist.genre}</div>
                </div>
              </a>
            ))}
          </div>
          {/* Second column: 5 artists */}
          <div className="space-y-4">
            {[
              { name: 'Omah Lay', genre: 'Afrobeat', image: '/images/Omah Lay - Artist.jpg' },
              { name: 'Tyler the Creator', genre: 'Hip-Hop', image: '/images/Tyler, The Creator - Artist.jpg' },
              { name: 'Tay Iwar', genre: 'Neo-Soul, R&B', image: '/images/Tay Iwar - Artist.jpg' },
              { name: 'Victony', genre: 'Afropop', image: '/images/Victony - Artist.jpg' },
              { name: 'Masego', genre: 'Jazz, R&B', image: '/images/Masego - Artist.jpg' },
            ].map((artist, i) => (
              <a key={i + 5} href={`https://open.spotify.com/search/${encodeURIComponent(artist.name)}`} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-12 h-12 rounded-full object-cover mr-3 shadow"
                />
                <div>
                  <div className="font-satoshi text-[0.98rem] text-neutral-800 dark:text-neutral-200">{artist.name}</div>
                  <div className="font-satoshi text-s text-neutral-500 dark:text-neutral-400">{artist.genre}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="py-1"></div>

        {/* Recently Played Section */}
        <h1 className="text-[1.1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-8">
          Recently played
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          {[
            { title: 'Thought I Was Dead', artist: 'Tyler the Creator, ScHoolboy Q', image: '/images/Tyler, The Creator - CHROMAKOPIA.jpg' },
            { title: 'Lagos', artist: 'Seyi Vibez', image: '/images/Seyi Vibez - Loseyi Professor.jpg' },
            { title: 'OFA', artist: 'Oxlade', image: '/images/Oxlade - OFA_ Deluxe Edition.jpg' },
            { title: 'Pier 46', artist: 'Victony, KTIZO', image: '/images/Victony - Stubborn.jpg' },
            { title: 'WAKE UP', artist: 'Samara Cyn', image: '/images/Samara Cyn - WAKE UP.jpg' },
            { title: 'jazz is for ordinary people', artist: 'berlioz', image: '/images/berlioz - jazz is for ordinary people.jpg' },
            { title: 'Dispose of Me', artist: 'Omar Apollo', image: '/images/Omar Apollo - Dispose of Me.jpg' },
            { title: 'Reflection Station', artist: 'Tay Iwar', image: '/images/Tay Iwar - Reflection Station.jpg' },
            { title: 'BIOTM', artist: 'Steven Charlot', image: '/images/Steven Charlot - BIOTM.jpg' },
            { title: 'INRI', artist: 'Judeline', image: '/images/Judeline - INRI.jpg' },
          ].map((song, i) => (
            <a key={i} href={`https://open.spotify.com/search/${encodeURIComponent(song.title + ' ' + song.artist)}`} target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img
                src={song.image}
                alt={song.title}
                className="w-12 h-12 rounded-lg object-cover mr-3 shadow"
              />
              <div>
                <div className="font-satoshi text-[0.98rem] text-neutral-800 dark:text-neutral-200">{song.title}</div>
                <div className="font-satoshi text-s text-neutral-500 dark:text-neutral-400">{song.artist}</div>
              </div>
            </a>
          ))}
        </div>
        <div className="py-1"></div>

        {/* Bucket List Section */}
        <h1 className="text-[1.1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-8">
          Stuff I plan to do
        </h1>
        <ul className="space-y-2 font-satoshi text-[0.95rem] mt-2">
          <li className="line-through text-red-600">Scream at Asake's concert</li>
          <li className="line-through text-red-600">Jump out of a plane</li>
          <li>Travel to Japan for a year without working</li>
          <li>Have a white Christmas</li>
          <li>See the northern lights in Finland</li>
        </ul>
        <div className="py-5"></div>
      </section>
    );
  } 