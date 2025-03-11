export default function ScrollArea({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative h-[calc(100vh-180px)] overflow-auto scrollbar-thin ${className}`}>
      {children}
      <ScrollBar />
    </div>
  );
}

function ScrollBar() {
  return (
    <style>
      {`
        /* Hide scrollbar track but show the thumb */
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(63, 63, 70, 0); /* Fully transparent initially */
          border-radius: 6px;
          transition: background 0.3s ease-in-out;
        }

        /* Thumb becomes visible on hover or while scrolling */
        .scrollbar-thin:hover::-webkit-scrollbar-thumb,
        .scrollbar-thin:active::-webkit-scrollbar-thumb {
          background: rgba(113, 113, 122, 0.7); /* Dark gray, matches dark themes */
        }

        /* Scrollbar for Firefox */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
        }

        .scrollbar-thin:hover {
          scrollbar-color: rgba(113, 113, 122, 0.7) transparent;
        }
      `}
    </style>
  );
}
