'use client';
                          
import { getImageSrc } from '@/lib/client/getImageSrc';
import React from 'react';
                          
export const Background = () => {
  return (
    <div 
      className="relative w-full h-[500px] bg-cover bg-center opacity-75 z-[0]" 
      style={{ backgroundImage: `url(${getImageSrc('background.jpg')})` }}
    >
      {/* Overlay for Contrast */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Overlay Box */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer Border */}
        <div className="relative flex items-center justify-center w-[90%] h-[75%] border-8 border-white rounded-md">
          {/* Inner Border */}
          <div className="flex items-center justify-center w-[98%] h-[95%] border-2 border-white rounded-lg">
            {/* Text in the Center */}
            <div className="text-center">
              <h1 className="text-8xl font-bold text-white mb-4 drop-shadow-lg transition-transform duration-300 ease-in-out hover:scale-110">
                ROOM RENTAL
              </h1>
              <p className="text-4xl italic font-medium text-gray-200 transition-transform duration-300 ease-in-out hover:scale-105">
                Find Room Easier
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};