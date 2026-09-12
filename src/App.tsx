import { useState, useEffect } from 'react';

// ============ TYPES ============
interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  status: 'online' | 'playing' | 'idle';
  device: string;
}

interface GameRoom {
  id: string;
  name: string;
  players: number;
  maxPlayers: number;
  status: 'waiting' | 'playing' | 'finished';
  theme: string;
  host: string;
}

// ============ COMPONENTS ============

function TopBar({ playerName }: { playerName: string }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="glass-strong fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ps-blue to-ps-accent flex items-center justify-center font-bold text-xl">
          K
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Kiosqly</h1>
          <p className="text-xs text-ps-gray">¿Quién Paga la Próxima Ronda?</p>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        {['Inicio', 'Salas', 'Jugar', 'Ranking', 'Perfil'].map((item, i) => (
          <button
            key={item}
            className={`text-sm font-medium transition-all hover:text-ps-accent ps-focus ${
              i === 0 ? 'text-ps-accent' : 'text-ps-gray'
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass">
          <div className="w-2 h-2 rounded-full bg-green-400 pulse-live"></div>
          <span className="text-xs font-medium">En línea</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 rounded-full glass cursor-pointer hover:bg-white/10 transition-all">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-ps-blue-light to-ps-accent flex items-center justify-center text-xs font-bold">
            {playerName[0]}
          </div>
          <span className="text-sm font-medium">{playerName}</span>
        </div>
        <span className="text-xs text-ps-gray font-mono">
          {time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative h-[500px] rounded-3xl overflow-hidden mb-10 animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-br from-ps-blue via-ps-dark to-black"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="relative h-full flex items-center justify-between px-12">
        <div className="max-w-xl">
          <span className="inline-block px-3 py-1 rounded-full bg-ps-accent/20 text-ps-accent text-xs font-semibold mb-4 border border-ps-accent/30">
            🔥 NUEVA TEMPORADA
          </span>
          <h2 className="text-6xl font-black leading-tight mb-4">
            ¿Quién Paga<br />
            <span className="bg-gradient-to-r from-ps-accent to-ps-blue-light bg-clip-text text-transparent">
              la Próxima Ronda?
            </span>
          </h2>
          <p className="text-lg text-ps-gray mb-8">
            Conecta tus tabletas y juega en vivo con amigos. El perdedor paga la ronda.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-ps-blue to-ps-blue-light font-semibold hover:scale-105 transition-transform ps-glow">
              ▶ Crear Sala
            </button>
            <button className="px-8 py-3 rounded-full glass font-semibold hover:bg-white/10 transition-all">
              Unirse a Sala
            </button>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="w-80 h-80 rounded-3xl glass-strong flex items-center justify-center relative">
            <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-ps-blue/20 to-ps-accent/20 blur-2xl"></div>
            <div className="relative text-center">
              <div className="text-8xl mb-2">🎮</div>
              <div className="text-sm text-ps-gray">Multijugador Local</div>
              <div className="text-2xl font-bold">4-8 Jugadores</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlayerCard({ player, index }: { player: Player; index: number }) {
  return (
    <div
      className="ps-tile glass rounded-2xl p-5 animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ps-blue-light to-ps-accent flex items-center justify-center text-lg font-bold">
              {player.avatar}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-ps-dark ${
              player.status === 'playing' ? 'bg-green-400' :
              player.status === 'online' ? 'bg-blue-400' : 'bg-gray-500'
            }`}></div>
          </div>
          <div>
            <h3 className="font-semibold">{player.name}</h3>
            <p className="text-xs text-ps-gray">{player.device}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-ps-accent">{player.score}</div>
          <div className="text-xs text-ps-gray">pts</div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <span className={`text-xs px-2 py-1 rounded-full ${
          player.status === 'playing' ? 'bg-green-500/20 text-green-400' :
          player.status === 'online' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
        }`}>
          {player.status === 'playing' ? '🎮 Jugando' :
           player.status === 'online' ? '● En línea' : '○ Inactivo'}
        </span>
        <button className="text-xs text-ps-gray hover:text-ps-accent transition-colors">
          Ver perfil →
        </button>
      </div>
    </div>
  );
}

function GameRoomCard({ room, index }: { room: GameRoom; index: number }) {
  return (
    <div
      className="ps-tile glass rounded-2xl p-6 cursor-pointer animate-slide-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg mb-1">{room.name}</h3>
          <p className="text-xs text-ps-gray">Host: {room.host}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${
          room.status === 'playing' ? 'bg-green-500/20 text-green-400' :
          room.status === 'waiting' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'
        }`}>
          {room.status === 'playing' ? 'EN JUEGO' :
           room.status === 'waiting' ? 'ESPERANDO' : 'FINALIZADA'}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-ps-gray mb-2">
          <span>Jugadores</span>
          <span className="font-semibold text-ps-white">{room.players}/{room.maxPlayers}</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-ps-blue to-ps-accent rounded-full transition-all"
            style={{ width: `${(room.players / room.maxPlayers) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <span className="text-xs text-ps-gray">🎯 {room.theme}</span>
        <button className="text-sm font-semibold text-ps-accent hover:scale-105 transition-transform">
          Unirse →
        </button>
      </div>
    </div>
  );
}

function StatsPanel() {
  const stats = [
    { label: 'Salas Activas', value: '24', icon: '🎮', change: '+12%' },
    { label: 'Jugadores Online', value: '156', icon: '👥', change: '+8%' },
    { label: 'Partidas Hoy', value: '89', icon: '🏆', change: '+23%' },
    { label: 'Rondas Pagadas', value: '47', icon: '💰', change: '+15%' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="glass rounded-2xl p-5 animate-slide-up"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">{stat.icon}</span>
            <span className="text-xs text-green-400 font-semibold">{stat.change}</span>
          </div>
          <div className="text-3xl font-bold mb-1">{stat.value}</div>
          <div className="text-xs text-ps-gray">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

// ============ MAIN APP ============

export default function App() {
  const [activeTab, setActiveTab] = useState<'rooms' | 'players' | 'games'>('rooms');

  // Mock data - REEMPLAZAR con datos reales de Firebase
  const players: Player[] = [
    { id: '1', name: 'Carlos M.', avatar: 'CM', score: 1250, status: 'playing', device: 'iPad Pro' },
    { id: '2', name: 'Ana R.', avatar: 'AR', score: 980, status: 'online', device: 'Samsung Tab' },
    { id: '3', name: 'Luis G.', avatar: 'LG', score: 1420, status: 'playing', device: 'iPad Air' },
    { id: '4', name: 'María S.', avatar: 'MS', score: 760, status: 'idle', device: 'Huawei Tab' },
  ];

  const rooms: GameRoom[] = [
    { id: '1', name: 'Mesa VIP #1', players: 4, maxPlayers: 6, status: 'playing', theme: 'Tragos Clásicos', host: 'Carlos M.' },
    { id: '2', name: 'After Office', players: 3, maxPlayers: 8, status: 'waiting', theme: 'Cervezas', host: 'Ana R.' },
    { id: '3', name: 'Cumpleaños ', players: 6, maxPlayers: 6, status: 'playing', theme: 'Mixto', host: 'Luis G.' },
    { id: '4', name: 'Viernes Social', players: 2, maxPlayers: 4, status: 'waiting', theme: 'Vinos', host: 'María S.' },
  ];

  return (
    <div className="min-h-screen ps-bg">
      <TopBar playerName="Carlos" />

      <main className="pt-24 px-8 pb-12 max-w-[1600px] mx-auto">
        <HeroSection />
        <StatsPanel />

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {[
            { id: 'rooms', label: 'Salas Activas', icon: '' },
            { id: 'players', label: 'Jugadores', icon: '👥' },
            { id: 'games', label: 'Mis Partidas', icon: '🏆' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ps-focus ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-ps-blue to-ps-blue-light text-white ps-glow'
                  : 'glass text-ps-gray hover:text-white'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'rooms' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {rooms.map((room, i) => (
              <GameRoomCard key={room.id} room={room} index={i} />
            ))}
          </div>
        )}

        {activeTab === 'players' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {players.map((player, i) => (
              <PlayerCard key={player.id} player={player} index={i} />
            ))}
          </div>
        )}

        {activeTab === 'games' && (
          <div className="glass rounded-3xl p-12 text-center">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold mb-2">No tienes partidas activas</h3>
            <p className="text-ps-gray mb-6">Crea una sala o únete a una existente</p>
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-ps-blue to-ps-blue-light font-semibold hover:scale-105 transition-transform">
              + Nueva Partida
            </button>
          </div>
        )}
      </main>
    </div>
  );
}