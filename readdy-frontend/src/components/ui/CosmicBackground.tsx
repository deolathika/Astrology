import StarfieldCanvas from './StarfieldCanvas';

interface CosmicBackgroundProps {
  intensity?: number;
  className?: string;
}

export default function CosmicBackground({ intensity = 100, className = "" }: CosmicBackgroundProps) {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      {/* Gradient Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #180C2E 0%, #2A1B4D 50%, #3B218A 100%)'
        }}
      />
      
      {/* Starfield */}
      <StarfieldCanvas intensity={intensity} speed={0.3} />
      
      {/* Cosmic Nebula Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
}