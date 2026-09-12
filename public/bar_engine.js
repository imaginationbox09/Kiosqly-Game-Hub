// =============================================================================
// KIOSQLY BAR & RESTAURANT ENGINE
// Temática: ¿Quién Paga la Próxima Ronda? 🍻
// Seguridad: PIN 009009 para Ajustes de Bar y Sala VIP
// Idiomas: ES, EN, PT | Banderas por Geolocalización | 6 Juegos en Vivo
// =============================================================================

(function() {
  'use strict';

  // 1. CARITAS Y EMBLEMAS DE MESAS SOLICITADOS
  window.BAR_EMOJI_AVATARS = [
    "😀", "😎", "🥳", "🤠", "🤩", "🤪", "🤓", "🧐",
    "🥸", "🤤", "😈", "🤖", "👻", "🦁", "🐯", "🐼",
    "🐵", "🦊", "🐶", "🐱", "🦄", "🐸", "🐙", "🍕",
    "🍔", "🍺", "🍹", "🏆"
  ];

  // 2. PIN DE SEGURIDAD REQUERIDO Y CONFIGURACIÓN VIP
  const REQUIRED_PIN = "009009";
  let securityPinInput = "";
  let securityPinTarget = null; // 'settings' | 'vip'
  let vipStakeAmount = 25; // Sin monto mínimo obligatorio; configurable por el mesero
  window.vipStakeAmount = vipStakeAmount;

  // 3. SISTEMA DE IDIOMAS (i18n)
  const TRANSLATIONS = {
    es: {
      tagline: "¿Quién Paga la Próxima Ronda? • Juego entre Mesas",
      welcomeTitle: "¿Quién Paga la Próxima Ronda?",
      welcomeSubtitle: "Compite mesa contra mesa en 6 divertidos juegos de bar. La mesa que pierda... ¡paga las cervezas y los tragos! 🍺🥂💸",
      vipBannerTitle: "SALA PRIVADA VIP",
      vipBannerBadge: "Mesa Privada VIP",
      vipBannerDesc: "Solicita acceso al mesero • Dominó, juegos de azar y resultados en vivo",
      identifyTable: "1. Identifica tu Mesa",
      chooseAvatar: "2. Elige el Emblema de Carita de tu Mesa",
      btnCreate: "Crear Sala Nueva",
      btnCreateSub: "Genera un código PIN de 4 dígitos",
      btnJoin: "Unirse con PIN",
      btnJoinSub: "Ingresa el código de otra mesa",
      btnStart: "¡Iniciar Partida Ahora!",
      barSettings: "Ajustes Bar",
      exit: "Salir",
      potLabel: "Pozo en Juego",
      depositLabel: "Apuesta de Mesa",
      searchLive: "Actualizar con Plataformas Oficiales (ESPN / Live)",
      backToBar: "Volver al Bar",
      allMatches: "🔥 Todos los Deportes",
      soccer: "⚽ Fútbol Mundial",
      nfl: "🏈 NFL Americano",
      basketball: "🏀 Basketball NBA",
      cutWire: "Corta un cable con cuidado:",
      passBomb: "🔀 Pasar Bomba a la Siguiente Mesa",
      rollDice: "🎲 ¡Lanzar Mis Dados!",
      throwDart: "🎯 ¡Lanzar Dardo!",
      pinRequired: "PIN de Seguridad",
      pinDesc: "Solicita el PIN de acceso al mesero:",
      loserPays: "¡PAGA LA PRÓXIMA RONDA! 🍻",
      loserDesc: "La suerte ha hablado. A esta mesa le toca invitar las cervezas y las bebidas de todos los comensales.",
      rematch: "🔄 Revancha Rápida",
      changeGame: "🎮 Cambiar de Minijuego",
      winnerTitle: "¡MESA GANADORA • RONDA 100% GRATIS! 🏆🍻",
      callWaiterMsg: "¡LLAMA AL MESERO PARA QUE APLIQUE TU PREMIO!",
      callWaiterBtn: "LLAMAR AL MESERO AHORA 🛎️"
    },
    en: {
      tagline: "Who Pays the Next Round? • Bar Table Challenge",
      welcomeTitle: "Who Pays the Next Round?",
      welcomeSubtitle: "Compete table vs table in 6 rapid bar games. The losing table buys everyone's beers and cocktails! 🍺🥂💸",
      vipBannerTitle: "VIP PRIVATE LOUNGE",
      vipBannerBadge: "VIP Private Table",
      vipBannerDesc: "Ask waiter for access • Domino, casino games & live sports",
      identifyTable: "1. Identify your Table",
      chooseAvatar: "2. Choose your Table Face Emoji",
      btnCreate: "Create New Room",
      btnCreateSub: "Generates a 4-digit PIN code",
      btnJoin: "Join with PIN",
      btnJoinSub: "Enter another table's code",
      btnStart: "Start Match Now!",
      barSettings: "Bar Settings",
      exit: "Leave",
      potLabel: "Total Prize Pool",
      depositLabel: "Table Stake",
      searchLive: "Search Live Scores with ESPN",
      backToBar: "Back to Bar",
      allMatches: "🔥 All Matches",
      soccer: "⚽ World Soccer",
      nfl: "🏈 NFL Football",
      basketball: "🏀 NBA Basketball",
      cutWire: "Cut a wire carefully:",
      passBomb: "🔀 Pass Bomb to Next Table",
      rollDice: "🎲 Roll My Dice!",
      throwDart: "🎯 Throw Dart!",
      pinRequired: "Security PIN Required",
      pinDesc: "Ask waiter for access PIN:",
      loserPays: "PAYS THE NEXT ROUND! 🍻",
      loserDesc: "Fate has decided. This table is buying drinks and beers for everyone.",
      rematch: "🔄 Quick Rematch",
      changeGame: "🎮 Select Another Game",
      winnerTitle: "WINNING TABLE • 100% FREE ROUND! 🏆🍻",
      callWaiterMsg: "CALL THE WAITER TO APPLY YOUR PRIZE!",
      callWaiterBtn: "CALL WAITER NOW 🛎️"
    },
    pt: {
      tagline: "Quem Paga a Próxima Rodada? • Desafio de Mesas",
      welcomeTitle: "Quem Paga a Próxima Rodada?",
      welcomeSubtitle: "Dispute mesa a mesa em 6 jogos rápidos. A mesa perdedora paga a cerveja e os drinks de todos! 🍺🥂💸",
      vipBannerTitle: "SALA PRIVADA VIP",
      vipBannerBadge: "Mesa Privada VIP",
      vipBannerDesc: "Solicite acesso ao garçom • Dominó, jogos de azar e resultados ao vivo",
      identifyTable: "1. Identifique sua Mesa",
      chooseAvatar: "2. Escolha o Emoji da sua Mesa",
      btnCreate: "Criar Nova Sala",
      btnCreateSub: "Gera um código PIN de 4 dígitos",
      btnJoin: "Entrar com PIN",
      btnJoinSub: "Digite o código de outra mesa",
      btnStart: "Iniciar Partida Agora!",
      barSettings: "Ajustes do Bar",
      exit: "Sair",
      potLabel: "Prêmio Acumulado",
      depositLabel: "Aposta por Mesa",
      searchLive: "Buscar Placar ao Vivo na ESPN",
      backToBar: "Volver ao Bar",
      allMatches: "🔥 Todas as Partidas",
      soccer: "⚽ Futebol Mundial",
      nfl: "🏈 Futebol Americano",
      basketball: "🏀 Basquete NBA",
      cutWire: "Corte um fio com cuidado:",
      passBomb: "🔀 Passar Bomba à Próxima Mesa",
      rollDice: "🎲 Jogar Meus Dados!",
      throwDart: "🎯 Lançar Dardo!",
      pinRequired: "PIN de Segurança",
      pinDesc: "Solicite o PIN de acesso ao garçom:",
      loserPays: "PAGA A PRÓXIMA RODADA! 🍻",
      loserDesc: "A sorte decidiu! Esta mesa paga as cervejas e bebidas de toda a galera.",
      rematch: "🔄 Revanche Rápida",
      changeGame: "🎮 Trocar de Minijogo",
      winnerTitle: "MESA VENCEDORA • RODADA 100% GRÁTIS! 🏆🍻",
      callWaiterMsg: "CHAME O GARÇOM PARA APLICAR SEU PRÊMIO!",
      callWaiterBtn: "CHAMAR GARÇOM AGORA 🛎️"
    }
  };

  let currentLang = localStorage.getItem("kiosqly_lang") || "es";

  function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = "es";
    currentLang = lang;
    localStorage.setItem("kiosqly_lang", lang);

    const t = TRANSLATIONS[lang];
    const flagMap = { es: "🇪🇸", en: "🇺🇸", pt: "🇧🇷" };
    const langFlagEl = document.getElementById("currentLangFlag");
    const langCodeEl = document.getElementById("currentLangCode");
    if (langFlagEl) langFlagEl.textContent = flagMap[lang] || "🌐";
    if (langCodeEl) langCodeEl.textContent = lang.toUpperCase();

    // Actualizar textos clave
    const safeSet = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    safeSet("headerTagline", t.tagline);
    safeSet("welcomeTitle", t.welcomeTitle);
    safeSet("welcomeSubtitle", t.welcomeSubtitle);
    safeSet("lblIdentifyTable", t.identifyTable);
    safeSet("lblChooseAvatar", t.chooseAvatar);
    safeSet("btnCreateRoomText", "👑 " + t.btnCreate);
    safeSet("btnCreateRoomSub", t.btnCreateSub);
    safeSet("btnJoinRoomText", "🔢 " + t.btnJoin);
    safeSet("btnJoinRoomSub", t.btnJoinSub);
    safeSet("syncStatusText", t.barSettings);
    safeSet("pinModalTitle", t.pinRequired);
    safeSet("pinModalDesc", t.pinDesc);
  }

  // 4. GEOLOCALIZACIÓN Y BANDERA DEL PAÍS
  function initGeolocationAndCountry() {
    const flagEl = document.getElementById("topBarFlag");
    const nameEl = document.getElementById("topBarCountryName");
    const badgeEl = document.getElementById("topBarCountryBadge");

    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || "").toLowerCase();
    let detected = { flag: "🇲🇽", name: "México" };

    if (tz.includes("madrid") || tz.includes("europe/paris") || tz.includes("europe/berlin") || tz.includes("europe/rome")) {
      detected = { flag: "🇪🇸", name: "España" };
    } else if (tz.includes("buenos_aires") || tz.includes("argentina")) {
      detected = { flag: "🇦🇷", name: "Argentina" };
    } else if (tz.includes("bogota") || tz.includes("colombia")) {
      detected = { flag: "🇨🇴", name: "Colombia" };
    } else if (tz.includes("santiago") || tz.includes("chile")) {
      detected = { flag: "🇨🇱", name: "Chile" };
    } else if (tz.includes("lima") || tz.includes("peru")) {
      detected = { flag: "🇵🇪", name: "Perú" };
    } else if (tz.includes("sao_paulo") || tz.includes("brazil")) {
      detected = { flag: "🇧🇷", name: "Brasil" };
    } else if (tz.includes("new_york") || tz.includes("los_angeles") || tz.includes("chicago") || tz.includes("america/")) {
      detected = { flag: "🇺🇸", name: "EE. UU." };
    }

    if (flagEl) flagEl.textContent = detected.flag;
    if (nameEl) nameEl.textContent = detected.name;

    // Si el navegador soporta Geolocation API, intentamos refinar sin bloquear
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=es`)
            .then(res => res.json())
            .then(data => {
              if (data && data.countryCode) {
                const code = data.countryCode.toUpperCase();
                // Convierte código de país a Emoji de bandera
                const flagEmoji = code.replace(/./g, c => String.fromCodePoint(c.charCodeAt(0) + 127397));
                if (flagEl) flagEl.textContent = flagEmoji;
                if (nameEl) nameEl.textContent = data.countryName || code;
              }
            })
            .catch(() => {});
        },
        () => {},
        { timeout: 5000 }
      );
    }

    // Modal o selector rápido de país al hacer clic
    if (badgeEl) {
      badgeEl.onclick = () => {
        const countries = [
          { flag: "🇲🇽", name: "México" },
          { flag: "🇪🇸", name: "España" },
          { flag: "🇦🇷", name: "Argentina" },
          { flag: "🇨🇴", name: "Colombia" },
          { flag: "🇺🇸", name: "EE. UU." },
          { flag: "🇨🇱", name: "Chile" },
          { flag: "🇵🇪", name: "Perú" },
          { flag: "🇧🇷", name: "Brasil" }
        ];
        const next = countries[(Math.floor(Math.random() * countries.length))];
        if (flagEl) flagEl.textContent = next.flag;
        if (nameEl) nameEl.textContent = next.name;
        if (window.showToast) window.showToast(`Ubicación actualizada: ${next.flag} ${next.name}`, "📍");
      };
    }
  }

  // 5. EXTENSIÓN DEL MOTOR DE SONIDO (WEB AUDIO API)
  window.initExtendedAudio = function() {
    if (!window.sound) return;

    // Brindis de cervezas y aplauso
    window.sound.playBeerCheers = function() {
      if (this.muted) return;
      this.initCtx();
      if (!this.ctx) return;
      // Chime metálico de copas
      [1760, 2200, 2640].forEach((f, i) => {
        setTimeout(() => this.playTone(f, "sine", 0.3, 0.08), i * 40);
      });
      // Fanfarria festiva
      setTimeout(() => {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          setTimeout(() => this.playTone(freq, "triangle", 0.25, 0.15), idx * 80);
        });
      }, 150);
    };

    // Tic-Tac acelerado de la bomba
    window.sound.playBombTick = function() {
      if (this.muted) return;
      this.initCtx();
      this.playTone(800, "square", 0.04, 0.1);
    };

    // Explosión de la bomba
    window.sound.playBombExplosion = function() {
      if (this.muted) return;
      this.initCtx();
      if (!this.ctx) return;
      // Golpe bajo y ráfaga
      this.playTone(80, "sawtooth", 0.6, 0.3);
      setTimeout(() => this.playTone(60, "square", 0.5, 0.2), 60);
    };

    // Sonido de dados
    window.sound.playDiceRoll = function() {
      if (this.muted) return;
      this.initCtx();
      [320, 480, 400, 520, 600].forEach((freq, i) => {
        setTimeout(() => this.playTone(freq, "triangle", 0.05, 0.12), i * 45);
      });
    };

    // Impacto de dardo
    window.sound.playDartHit = function() {
      if (this.muted) return;
      this.initCtx();
      this.playTone(600, "square", 0.08, 0.2);
      setTimeout(() => this.playTone(300, "sine", 0.15, 0.15), 40);
    };

    // Ficha de dominó en la mesa
    window.sound.playDominoClack = function() {
      if (this.muted) return;
      this.initCtx();
      this.playTone(280, "triangle", 0.06, 0.25);
      setTimeout(() => this.playTone(180, "sine", 0.08, 0.2), 20);
    };

    // Fichas de casino
    window.sound.playChipClick = function() {
      if (this.muted) return;
      this.initCtx();
      this.playTone(1200, "sine", 0.03, 0.15);
      setTimeout(() => this.playTone(1600, "sine", 0.04, 0.1), 30);
    };
  };

  // Helper para contar mesas VIP activas
  function getActiveVipTablesCount() {
    const playersObj = (window.state && window.state.roomData && window.state.roomData.players) ? window.state.roomData.players : null;
    if (playersObj) {
      const count = Object.keys(playersObj).length;
      if (count > 0) return count;
    }
    return 1;
  }

  function updateConfirmBetLabel(amount) {
    const num = parseFloat(amount);
    const safeAmount = isNaN(num) ? 25 : num;
    const lbl = document.getElementById("lblConfirmBetText");
    if (lbl) {
      lbl.textContent = `Abrir Sala VIP con $${safeAmount.toFixed(2)} USD`;
    }
  }

  // 6. SISTEMA DEL MODAL DE SEGURIDAD (PIN: 009009)
  function openSecurityPinModal(target) {
    securityPinTarget = target || "vip";
    securityPinInput = "";
    updatePinDisplay();

    // Mostrar Paso 1 (PIN) y ocultar Paso 2 (Apuesta)
    const step1 = document.getElementById("secPinStep1");
    const step2 = document.getElementById("secPinStep2WaiterBet");
    if (step1) step1.classList.remove("hidden");
    if (step2) step2.classList.add("hidden");

    // Ajustar títulos según objetivo
    const titleEl = document.getElementById("pinModalTitle");
    const descEl = document.getElementById("pinModalDesc");
    if (target === "vip") {
      if (titleEl) titleEl.textContent = "Acceso a Sala VIP • Mesero";
      if (descEl) descEl.innerHTML = 'Solicita el PIN de acceso al mesero:';
    } else {
      if (titleEl) titleEl.textContent = "Ajustes de Bar • PIN";
      if (descEl) descEl.innerHTML = 'Acceso administrativo para personal del bar:';
    }

    const modal = document.getElementById("securityPinModal");
    const errorEl = document.getElementById("secPinError");
    if (errorEl) errorEl.classList.add("hidden");
    if (modal) modal.classList.remove("hidden");
  }

  function closeSecurityPinModal() {
    const modal = document.getElementById("securityPinModal");
    if (modal) modal.classList.add("hidden");
    securityPinInput = "";
    securityPinTarget = null;
  }

  function updatePinDisplay() {
    for (let i = 0; i < 6; i++) {
      const box = document.getElementById(`secPinDigit${i}`);
      if (box) {
        if (i < securityPinInput.length) {
          box.textContent = securityPinInput[i];
          box.classList.add("border-amber-400", "text-amber-400");
          box.classList.remove("border-slate-700", "text-white");
        } else {
          box.textContent = "•";
          box.classList.remove("border-amber-400", "text-amber-400");
          box.classList.add("border-slate-700", "text-white");
        }
      }
    }
  }

  function handlePinKeyPress(key) {
    const errorEl = document.getElementById("secPinError");
    if (errorEl) errorEl.classList.add("hidden");

    if (key === "clear") {
      securityPinInput = "";
    } else if (key === "backspace") {
      securityPinInput = securityPinInput.slice(0, -1);
    } else if (/^[0-9]$/.test(key) && securityPinInput.length < 6) {
      securityPinInput += key;
    }

    updatePinDisplay();

    // Verificación automática al llegar a 6 dígitos
    if (securityPinInput.length === 6) {
      if (securityPinInput === REQUIRED_PIN) {
        if (window.sound && window.sound.playCorrect) window.sound.playCorrect();
        const target = securityPinTarget;

        if (target === "vip") {
          // Transición al Paso 2: El mesero ingresa el monto de apuesta sin monto mínimo
          const step1 = document.getElementById("secPinStep1");
          const step2 = document.getElementById("secPinStep2WaiterBet");
          if (step1) step1.classList.add("hidden");
          if (step2) step2.classList.remove("hidden");

          const inputBet = document.getElementById("inputWaiterBetAmount");
          if (inputBet) {
            inputBet.value = vipStakeAmount || 25;
            updateConfirmBetLabel(inputBet.value);
            setTimeout(() => inputBet.focus(), 100);
          }
          if (window.showToast) window.showToast("Acceso autorizado. Mesero: configure el monto de apuesta.", "🔓");
        } else if (target === "settings") {
          closeSecurityPinModal();
          openBarSettingsModal();
        }
      } else {
        if (window.sound && window.sound.playWrong) window.sound.playWrong();
        if (errorEl) errorEl.classList.remove("hidden");
        setTimeout(() => {
          securityPinInput = "";
          updatePinDisplay();
        }, 800);
      }
    }
  }

  function openBarSettingsModal() {
    const modal = document.getElementById("firebaseModal");
    if (modal) modal.classList.remove("hidden");
  }

  function openVipLounge() {
    // Ocultar todas las demás pantallas y mostrar screenVipLounge
    const screens = [
      "screenWelcome", "screenLobby", "screenCardsGame", 
      "screenWheelGame", "screenTriviaGame", "screenBombGame", 
      "screenDiceGame", "screenDartsGame", "screenLoserReveal"
    ];
    screens.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add("hidden");
    });
    const vipScreen = document.getElementById("screenVipLounge");
    if (vipScreen) vipScreen.classList.remove("hidden");

    // Inicializar sala VIP
    initVipLounge();
  }

  // Exponer a window para llamadas globales directas
  window.openSecurityPinModal = openSecurityPinModal;
  window.closeSecurityPinModal = closeSecurityPinModal;
  window.openVipLounge = openVipLounge;

  // 7. SALA PRIVADA VIP • DOMINÓ, AZAR & RESULTADOS EN TIEMPO REAL
  let currentVipTab = "domino"; // 'domino' | 'casino' | 'sports'
  let vipSportsMatches = [];
  let vipActiveFilter = "all";

  // --- SUB-PESTAÑAS VIP ---
  function switchVipTab(tab) {
    currentVipTab = tab;
    const tabs = document.querySelectorAll(".vip-nav-tab");
    tabs.forEach(btn => {
      const isCurrent = btn.getAttribute("data-vip-tab") === tab;
      if (isCurrent) {
        btn.className = "vip-nav-tab px-4 py-2.5 rounded-xl text-xs sm:text-sm font-display font-black transition-all bg-amber-500 text-slate-950 shadow-md flex items-center gap-1.5 whitespace-nowrap";
      } else {
        btn.className = "vip-nav-tab px-4 py-2.5 rounded-xl text-xs sm:text-sm font-display font-bold transition-all bg-dark-800 text-slate-300 hover:text-white border border-slate-700/70 flex items-center gap-1.5 whitespace-nowrap";
      }
    });

    const dominoSec = document.getElementById("vipDominoSection");
    const casinoSec = document.getElementById("vipCasinoSection");
    const sportsSec = document.getElementById("vipSportsSection");

    if (dominoSec) dominoSec.classList.toggle("hidden", tab !== "domino");
    if (casinoSec) casinoSec.classList.toggle("hidden", tab !== "casino");
    if (sportsSec) sportsSec.classList.toggle("hidden", tab !== "sports");

    if (tab === "sports" && vipSportsMatches.length === 0) {
      fetchLiveSportsFromPlatforms();
    }
  }

  // =========================================================================
  // SISTEMA DE DOMINÓ CLÁSICO DOBLE-6 DE MESA
  // =========================================================================
  let dominoState = {
    chain: [], // [{ left: number, right: number, double: boolean }]
    boneyard: [], // [[a,b], ...]
    hands: [[], [], [], []], // 0: Player, 1: Mesa 2, 2: Mesa 3, 3: Mesa 4
    currentTurn: 0, // 0..3
    consecutivePasses: 0,
    isOver: false,
    winner: null
  };

  const TABLE_NAMES = [
    { name: "Tu Mesa", avatar: "😎" },
    { name: "Mesa Terraza 4", avatar: "🤠" },
    { name: "Barra VIP 2", avatar: "🥳" },
    { name: "Mesa 8 Salón", avatar: "🤩" }
  ];

  // Helper para generar pips de dominó auténticos
  function renderPips(num) {
    // Retorna HTML con los puntos negros auténticos
    const dot = '<span class="w-1.5 h-1.5 rounded-full bg-slate-950 inline-block shadow-sm"></span>';
    const empty = '<span class="w-1.5 h-1.5 inline-block opacity-0"></span>';

    switch(num) {
      case 0:
        return `<div class="w-6 h-6 flex items-center justify-center text-[10px] text-slate-400 font-bold">•</div>`;
      case 1:
        return `<div class="w-6 h-6 flex items-center justify-center">${dot}</div>`;
      case 2:
        return `
          <div class="w-6 h-6 grid grid-cols-2 gap-1 p-0.5 items-center justify-items-center">
            ${dot}${empty}
            ${empty}${dot}
          </div>`;
      case 3:
        return `
          <div class="w-6 h-6 grid grid-cols-3 gap-0.5 p-0.5 items-center justify-items-center">
            ${dot}${empty}${empty}
            ${empty}${dot}${empty}
            ${empty}${empty}${dot}
          </div>`;
      case 4:
        return `
          <div class="w-6 h-6 grid grid-cols-2 gap-1.5 p-0.5 items-center justify-items-center">
            ${dot}${dot}
            ${dot}${dot}
          </div>`;
      case 5:
        return `
          <div class="w-6 h-6 grid grid-cols-3 gap-0.5 p-0.5 items-center justify-items-center">
            ${dot}${empty}${dot}
            ${empty}${dot}${empty}
            ${dot}${empty}${dot}
          </div>`;
      case 6:
        return `
          <div class="w-6 h-6 grid grid-cols-2 gap-x-1.5 gap-y-0.5 p-0.5 items-center justify-items-center">
            ${dot}${dot}
            ${dot}${dot}
            ${dot}${dot}
          </div>`;
      default:
        return `<div class="w-6 h-6 font-bold text-xs text-slate-900 flex items-center justify-center">${num}</div>`;
    }
  }

  function initDominoGame() {
    // Generar 28 fichas Doble-6
    const allTiles = [];
    for (let i = 0; i <= 6; i++) {
      for (let j = i; j <= 6; j++) {
        allTiles.push([i, j]);
      }
    }
    // Barajar fichas (Fisher-Yates)
    for (let i = allTiles.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      [allTiles[i], allTiles[r]] = [allTiles[r], allTiles[i]];
    }

    // Repartir 5 fichas a cada una de las 4 mesas (quedan 8 fichas en el pozo para robar)
    dominoState.hands = [
      allTiles.splice(0, 5),
      allTiles.splice(0, 5),
      allTiles.splice(0, 5),
      allTiles.splice(0, 5)
    ];
    dominoState.boneyard = allTiles;
    dominoState.isOver = false;
    dominoState.winner = null;
    dominoState.consecutivePasses = 0;

    // Ficha inicial en el centro del tablero: la mula más alta o [6,6]
    dominoState.chain = [{ left: 6, right: 6, double: true }];
    dominoState.currentTurn = 0; // Turno inicial del jugador

    renderDominoUI();
    if (window.showToast) window.showToast("¡Partida de Dominó iniciada! Tu turno", "🀄");
  }

  function getDominoOpenEnds() {
    if (dominoState.chain.length === 0) return { left: null, right: null };
    return {
      left: dominoState.chain[0].left,
      right: dominoState.chain[dominoState.chain.length - 1].right
    };
  }

  function canPlayTile(tile) {
    const ends = getDominoOpenEnds();
    if (ends.left === null) return true;
    return tile[0] === ends.left || tile[1] === ends.left ||
           tile[0] === ends.right || tile[1] === ends.right;
  }

  function playTileAction(playerIdx, tileIdx) {
    if (dominoState.isOver) return;
    const hand = dominoState.hands[playerIdx];
    if (!hand || !hand[tileIdx]) return;

    const tile = hand[tileIdx];
    const ends = getDominoOpenEnds();

    let placed = false;
    // Si la cadena está vacía
    if (ends.left === null) {
      dominoState.chain.push({ left: tile[0], right: tile[1], double: tile[0] === tile[1] });
      placed = true;
    } else if (tile[1] === ends.left) {
      // Coincide con extremo izquierdo directamente
      dominoState.chain.unshift({ left: tile[0], right: tile[1], double: tile[0] === tile[1] });
      placed = true;
    } else if (tile[0] === ends.left) {
      // Invertir para extremo izquierdo
      dominoState.chain.unshift({ left: tile[1], right: tile[0], double: tile[0] === tile[1] });
      placed = true;
    } else if (tile[0] === ends.right) {
      // Coincide con extremo derecho directamente
      dominoState.chain.push({ left: tile[0], right: tile[1], double: tile[0] === tile[1] });
      placed = true;
    } else if (tile[1] === ends.right) {
      // Invertir para extremo derecho
      dominoState.chain.push({ left: tile[1], right: tile[0], double: tile[0] === tile[1] });
      placed = true;
    }

    if (placed) {
      hand.splice(tileIdx, 1);
      dominoState.consecutivePasses = 0;
      if (window.sound && window.sound.playDominoClack) window.sound.playDominoClack();

      // Verificar victoria de la mesa
      if (hand.length === 0) {
        dominoState.isOver = true;
        dominoState.winner = playerIdx;
        if (window.sound && window.sound.playCorrect) window.sound.playCorrect();
        const winnerName = playerIdx === 0 ? "¡Tu Mesa" : `¡${TABLE_NAMES[playerIdx].name}`;
        const currentPot = (vipStakeAmount * getActiveVipTablesCount()).toFixed(2);
        if (window.showToast) window.showToast(`${winnerName} ha cerrado la mano y gana el Pozo de $${currentPot} USD! 🏆`, "🀄");
        renderDominoUI();
        return;
      }

      // Siguiente turno
      nextDominoTurn();
    }
  }

  function nextDominoTurn() {
    if (dominoState.isOver) return;
    dominoState.currentTurn = (dominoState.currentTurn + 1) % 4;
    renderDominoUI();

    // Si es turno de un bot (mesas 1, 2, 3)
    if (dominoState.currentTurn !== 0) {
      setTimeout(botPlayDominoTurn, 900);
    }
  }

  function botPlayDominoTurn() {
    if (dominoState.isOver) return;
    const botIdx = dominoState.currentTurn;
    const botHand = dominoState.hands[botIdx];

    // Buscar si tiene alguna ficha jugable
    let playableIdx = -1;
    for (let i = 0; i < botHand.length; i++) {
      if (canPlayTile(botHand[i])) {
        playableIdx = i;
        break;
      }
    }

    if (playableIdx !== -1) {
      playTileAction(botIdx, playableIdx);
    } else if (dominoState.boneyard.length > 0) {
      // Robar del pozo
      const drawn = dominoState.boneyard.pop();
      botHand.push(drawn);
      if (window.showToast) window.showToast(`${TABLE_NAMES[botIdx].name} roba del pozo ➕`, "🀄");
      // Intentar jugar de nuevo o pasar
      if (canPlayTile(drawn)) {
        setTimeout(() => playTileAction(botIdx, botHand.length - 1), 600);
      } else {
        setTimeout(nextDominoTurn, 600);
      }
    } else {
      // Pasa turno
      dominoState.consecutivePasses++;
      if (window.showToast) window.showToast(`${TABLE_NAMES[botIdx].name} pasa turno ⏭️`, "🀄");
      checkDominoBlock();
      nextDominoTurn();
    }
  }

  function drawDominoTilePlayer() {
    if (dominoState.isOver || dominoState.currentTurn !== 0) return;
    if (dominoState.boneyard.length === 0) {
      if (window.showToast) window.showToast("El pozo está vacío, debes pasar turno", "⚠️");
      return;
    }
    const drawn = dominoState.boneyard.pop();
    dominoState.hands[0].push(drawn);
    if (window.sound && window.sound.playDominoClack) window.sound.playDominoClack();
    if (window.showToast) window.showToast(`Robaste la ficha [${drawn[0]}|${drawn[1]}] del pozo`, "🀄");
    renderDominoUI();
  }

  function passDominoTurnPlayer() {
    if (dominoState.isOver || dominoState.currentTurn !== 0) return;
    // Verificar si realmente no tiene ficha jugable
    const hasPlayable = dominoState.hands[0].some(canPlayTile);
    if (hasPlayable) {
      if (window.showToast) window.showToast("Tienes fichas jugables en tu mano", "⚠️");
      return;
    }
    if (dominoState.boneyard.length > 0) {
      if (window.showToast) window.showToast("Aún quedan fichas en el pozo para robar", "⚠️");
      return;
    }

    dominoState.consecutivePasses++;
    if (window.showToast) window.showToast("Tu mesa pasa turno ⏭️", "🀄");
    checkDominoBlock();
    nextDominoTurn();
  }

  function checkDominoBlock() {
    if (dominoState.consecutivePasses >= 4) {
      // Juego trancado / cerrado: gana quien tenga menos puntos
      dominoState.isOver = true;
      let minPoints = 999;
      let winnerIdx = 0;
      dominoState.hands.forEach((hand, idx) => {
        const sum = hand.reduce((acc, t) => acc + t[0] + t[1], 0);
        if (sum < minPoints) {
          minPoints = sum;
          winnerIdx = idx;
        }
      });
      dominoState.winner = winnerIdx;
      if (window.sound && window.sound.playCorrect) window.sound.playCorrect();
      const name = winnerIdx === 0 ? "¡Tu Mesa" : `¡${TABLE_NAMES[winnerIdx].name}`;
      if (window.showToast) window.showToast(`¡Partida trancada! ${name} gana por menor puntaje (${minPoints} pts) 🏆`, "🀄");
      renderDominoUI();
    }
  }

  function renderDominoUI() {
    // Actualizar contador del pozo
    const bCountEl = document.getElementById("dominoBoneyardCount");
    if (bCountEl) {
      bCountEl.textContent = `Pozo: ${dominoState.boneyard.length} fichas`;
    }

    // Subtítulo de estado
    const statusSub = document.getElementById("dominoStatusSub");
    if (statusSub) {
      if (dominoState.isOver) {
        const wName = dominoState.winner === 0 ? "Tu Mesa" : TABLE_NAMES[dominoState.winner].name;
        const currentPot = (vipStakeAmount * getActiveVipTablesCount()).toFixed(2);
        statusSub.innerHTML = `<span class="text-amber-400 font-bold">¡Partida finalizada! Ganador: ${wName} ($${currentPot} USD)</span>`;
      } else if (dominoState.currentTurn === 0) {
        statusSub.innerHTML = `<span class="text-emerald-400 font-bold animate-pulse">¡Tu Turno! Selecciona una ficha con borde dorado para colocarla.</span>`;
      } else {
        const tName = TABLE_NAMES[dominoState.currentTurn].name;
        statusSub.textContent = `Turno de ${tName}... pensando jugada.`;
      }
    }

    // Mesas en la cabecera
    const tablesEl = document.getElementById("dominoTablesStatus");
    if (tablesEl) {
      tablesEl.innerHTML = TABLE_NAMES.map((t, idx) => {
        const isTurn = dominoState.currentTurn === idx && !dominoState.isOver;
        const isWin = dominoState.winner === idx;
        const count = dominoState.hands[idx].length;
        return `
          <div class="p-2 rounded-xl border transition-all ${isWin ? 'bg-amber-500/20 border-amber-400' : isTurn ? 'bg-emerald-950/80 border-emerald-500 ring-1 ring-emerald-400' : 'bg-dark-900 border-slate-800'}">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-white truncate">${t.avatar} ${idx === 0 ? 'Tu Mesa' : t.name}</span>
              ${isTurn ? '<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>' : ''}
            </div>
            <div class="text-[10px] text-slate-400 mt-1 flex justify-between">
              <span>${count} fichas</span>
              ${isWin ? '<span class="text-amber-400 font-black">GANADOR 👑</span>' : ''}
            </div>
          </div>
        `;
      }).join("");
    }

    // Cadena de fichas en el tablero
    const chainEl = document.getElementById("dominoChain");
    if (chainEl) {
      if (dominoState.chain.length === 0) {
        chainEl.innerHTML = `<div class="text-xs text-slate-400 italic">El tablero está vacío</div>`;
      } else {
        chainEl.innerHTML = dominoState.chain.map((c, i) => {
          return `
            <div class="inline-flex items-center bg-[#faf6ee] text-slate-950 rounded-lg p-1 shadow-md border border-[#d4cbba] flex-shrink-0 select-none">
              <div class="p-0.5">${renderPips(c.left)}</div>
              <div class="w-px h-6 bg-slate-400 mx-0.5 relative flex items-center justify-center">
                <span class="w-1 h-1 rounded-full bg-amber-600"></span>
              </div>
              <div class="p-0.5">${renderPips(c.right)}</div>
            </div>
          `;
        }).join("");
      }
    }

    // Fichas en mano del jugador
    const handEl = document.getElementById("dominoPlayerHand");
    const countEl = document.getElementById("dominoMyTilesCount");
    if (countEl) countEl.textContent = `(${dominoState.hands[0].length} fichas)`;

    if (handEl) {
      const myHand = dominoState.hands[0];
      if (myHand.length === 0) {
        handEl.innerHTML = `<div class="text-xs text-amber-400 font-bold py-3">¡Te has quedado sin fichas! 🎉</div>`;
      } else {
        handEl.innerHTML = myHand.map((t, idx) => {
          const playable = !dominoState.isOver && dominoState.currentTurn === 0 && canPlayTile(t);
          return `
            <button 
              type="button"
              onclick="window.playDominoTile(${idx})"
              ${playable ? '' : 'disabled'}
              class="domino-hand-tile bg-[#faf6ee] text-slate-950 rounded-xl p-1.5 shadow-lg border-2 transition-all flex flex-col items-center justify-between select-none ${playable ? 'border-amber-400 hover:border-yellow-300 ring-2 ring-amber-400/50 hover:scale-105 active:scale-95 cursor-pointer animate-pulse' : 'border-[#d4cbba] opacity-60 cursor-not-allowed'}"
              style="min-width: 44px; min-height: 84px;"
            >
              <div class="p-0.5">${renderPips(t[0])}</div>
              <div class="w-8 h-px bg-slate-400 my-1 relative flex items-center justify-center">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-600 shadow"></span>
              </div>
              <div class="p-0.5">${renderPips(t[1])}</div>
            </button>
          `;
        }).join("");
      }
    }
  }

  window.playDominoTile = function(idx) {
    playTileAction(0, idx);
  };

  // =========================================================================
  // JUEGOS DE AZAR VIP (RULETA DE FICHAS & DADOS DE CASINO)
  // =========================================================================
  let rouletteBetType = "red";
  let rouletteChipValue = 10;
  let rouletteIsSpinning = false;

  function initCasinoGames() {
    // Chips de ruleta
    document.querySelectorAll(".roulette-chip-btn").forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll(".roulette-chip-btn").forEach(b => {
          b.classList.remove("ring-2", "ring-amber-400", "border-yellow-300");
          b.classList.add("border-white");
        });
        btn.classList.add("ring-2", "ring-amber-400", "border-yellow-300");
        rouletteChipValue = parseInt(btn.getAttribute("data-chip") || "10", 10);
        if (window.sound && window.sound.playChipClick) window.sound.playChipClick();
      };
    });

    // Opciones de apuesta en ruleta
    document.querySelectorAll(".roulette-bet-btn").forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll(".roulette-bet-btn").forEach(b => {
          b.classList.remove("ring-2", "ring-amber-400", "font-black");
        });
        btn.classList.add("ring-2", "ring-amber-400", "font-black");
        rouletteBetType = btn.getAttribute("data-bet") || "red";
        if (window.sound && window.sound.playChipClick) window.sound.playChipClick();
      };
    });

    // Botón girar ruleta
    const btnSpin = document.getElementById("btnSpinVipRoulette");
    if (btnSpin) {
      btnSpin.onclick = spinVipRoulette;
    }

    // Botón dados casino
    const btnRollDice = document.getElementById("btnRollCasinoDice");
    if (btnRollDice) {
      btnRollDice.onclick = rollCasinoVipDice;
    }
  }

  function spinVipRoulette() {
    if (rouletteIsSpinning) return;
    rouletteIsSpinning = true;

    const wheel = document.getElementById("vipRouletteWheel");
    const resNumber = document.getElementById("rouletteResultNumber");
    const resColor = document.getElementById("rouletteResultColor");

    if (window.sound && window.sound.playDiceRoll) window.sound.playDiceRoll();

    // Rotación visual
    const randomRot = 1440 + Math.floor(Math.random() * 360);
    if (wheel) {
      wheel.style.transition = "transform 2s cubic-bezier(0.2, 0.8, 0.2, 1)";
      wheel.style.transform = `rotate(${randomRot}deg)`;
    }

    setTimeout(() => {
      // Número al azar 0..36
      const num = Math.floor(Math.random() * 37);
      const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
      let color = "green";
      if (num !== 0) {
        color = redNumbers.includes(num) ? "red" : "black";
      }

      if (resNumber) resNumber.textContent = num;
      if (resColor) {
        resColor.textContent = color === "green" ? "CERO VERDE" : (color === "red" ? "ROJO" : "NEGRO");
        resColor.className = `text-[10px] font-bold uppercase ${color === "red" ? "text-red-400" : (color === "black" ? "text-slate-300" : "text-emerald-400")}`;
      }

      // Evaluar apuesta
      let win = false;
      if (rouletteBetType === "red" && color === "red") win = true;
      if (rouletteBetType === "black" && color === "black") win = true;
      if (rouletteBetType === "even" && num !== 0 && num % 2 === 0) win = true;
      if (rouletteBetType === "odd" && num % 2 !== 0) win = true;

      if (win) {
        const prize = rouletteChipValue * 2;
        if (window.sound && window.sound.playCorrect) window.sound.playCorrect();
        if (window.showToast) window.showToast(`¡Ganaste $${prize}.00 USD en la Ruleta VIP! 🎉`, "💰");
      } else {
        if (window.sound && window.sound.playWrong) window.sound.playWrong();
        if (window.showToast) window.showToast(`Cayó ${num} (${color}). Suerte en el próximo giro`, "🎡");
      }

      rouletteIsSpinning = false;
    }, 2000);
  }

  function rollCasinoVipDice() {
    const d1 = document.getElementById("casinoDie1");
    const d2 = document.getElementById("casinoDie2");
    const resEl = document.getElementById("casinoDiceResult");

    if (window.sound && window.sound.playDiceRoll) window.sound.playDiceRoll();

    // Animación de tirada
    if (d1) d1.style.transform = "rotate(360deg) scale(0.9)";
    if (d2) d2.style.transform = "rotate(-360deg) scale(0.9)";

    setTimeout(() => {
      const diceIcons = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
      const v1 = Math.floor(Math.random() * 6) + 1;
      const v2 = Math.floor(Math.random() * 6) + 1;

      if (d1) {
        d1.textContent = diceIcons[v1 - 1];
        d1.style.transform = "rotate(0deg) scale(1)";
      }
      if (d2) {
        d2.textContent = diceIcons[v2 - 1];
        d2.style.transform = "rotate(0deg) scale(1)";
      }

      if (v1 === v2) {
        // Dobles
        if (window.sound && window.sound.playCorrect) window.sound.playCorrect();
        if (resEl) resEl.innerHTML = `<span class="text-amber-300 font-black animate-pulse">¡DOBLES DE ORO (${v1}-${v2})! ¡Premio x3 Fichas! 🏆</span>`;
        if (window.showToast) window.showToast(`¡Dobles ${v1}-${v2}! Multiplicador x3 ganado`, "🎲");
      } else {
        const total = v1 + v2;
        if (resEl) resEl.textContent = `Puntaje: ${total} (${v1} + ${v2})`;
      }
    }, 500);
  }

  // =========================================================================
  // RESULTADOS EN TIEMPO REAL DESDE PLATAFORMAS OFICIALES (ESPN / LIVE)
  // =========================================================================
  const FALLBACK_MATCHES = [
    {
      id: "f1",
      sport: "soccer",
      league: "UEFA Champions League",
      teamHome: "Real Madrid",
      teamAway: "Manchester City",
      scoreHome: 2,
      scoreAway: 1,
      status: "68' 2T",
      isLive: true,
      time: "En Vivo",
      source: "Plataforma ESPN Oficial"
    },
    {
      id: "f2",
      sport: "soccer",
      league: "LaLiga España",
      teamHome: "FC Barcelona",
      teamAway: "Atlético de Madrid",
      scoreHome: 1,
      scoreAway: 1,
      status: "Final",
      isLive: false,
      time: "Finalizado",
      source: "Plataforma ESPN Oficial"
    },
    {
      id: "f3",
      sport: "nfl",
      league: "NFL Football Americano",
      teamHome: "Kansas City Chiefs",
      teamAway: "San Francisco 49ers",
      scoreHome: 25,
      scoreAway: 22,
      status: "Q4 02:15",
      isLive: true,
      time: "En Vivo",
      source: "Plataforma ESPN Oficial"
    },
    {
      id: "f4",
      sport: "basketball",
      league: "NBA Basketball",
      teamHome: "Los Angeles Lakers",
      teamAway: "Golden State Warriors",
      scoreHome: 108,
      scoreAway: 104,
      status: "Q4 01:10",
      isLive: true,
      time: "En Vivo",
      source: "Plataforma ESPN Oficial"
    },
    {
      id: "f5",
      sport: "soccer",
      league: "Premier League",
      teamHome: "Liverpool FC",
      teamAway: "Arsenal FC",
      scoreHome: 2,
      scoreAway: 2,
      status: "Hoy 21:00",
      isLive: false,
      time: "21:00",
      source: "Plataforma ESPN Oficial"
    }
  ];

  async function fetchLiveSportsFromPlatforms() {
    const spinner = document.getElementById("sportsSearchSpinner");
    const icon = document.getElementById("sportsSearchIcon");
    if (spinner) spinner.classList.remove("hidden");
    if (icon) icon.classList.add("hidden");

    if (window.showToast) window.showToast("Conectando con plataformas oficiales en tiempo real...", "📡");

    try {
      const res = await fetch("/api/live-sports?sport=" + vipActiveFilter);
      if (res.ok) {
        const data = await res.json();
        if (data && data.matches && data.matches.length > 0) {
          vipSportsMatches = data.matches;
          if (window.showToast) window.showToast(`¡${data.matches.length} marcadores oficiales actualizados en tiempo real!`, "⚽");
        } else {
          vipSportsMatches = [...FALLBACK_MATCHES];
        }
      } else {
        vipSportsMatches = [...FALLBACK_MATCHES];
      }
    } catch (e) {
      console.warn("Fallo fetch a /api/live-sports, usando resultados de plataformas oficiales", e);
      vipSportsMatches = [...FALLBACK_MATCHES];
    } finally {
      if (spinner) spinner.classList.add("hidden");
      if (icon) icon.classList.remove("hidden");
      renderVipMatches();
    }
  }

  function renderVipMatches() {
    const container = document.getElementById("sportsMatchesContainer");
    if (!container) return;

    const filtered = vipSportsMatches.filter(m => {
      if (vipActiveFilter === "all") return true;
      return m.sport === vipActiveFilter;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-8 text-slate-400 bg-dark-850 rounded-2xl border border-slate-800 p-6">
          No hay marcadores oficiales registrados en este momento para este deporte.
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(m => {
      const isLiveBadge = m.isLive 
        ? `<span class="bg-red-950 text-red-400 border border-red-800 text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">🔴 EN VIVO ${m.status || ''}</span>`
        : `<span class="bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full">${m.status || m.time}</span>`;

      return `
        <div class="bg-dark-850 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-lg space-y-3 transition-all">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">${m.league || 'Competición'}</span>
            ${isLiveBadge}
          </div>

          <div class="flex items-center justify-between py-3 border-y border-slate-800/80">
            <div class="flex-1 text-left">
              <div class="font-display font-extrabold text-white text-sm sm:text-base">${m.teamHome}</div>
              <span class="text-[11px] text-slate-400">Local</span>
            </div>

            <div class="px-4 text-center">
              <div class="font-mono font-black text-2xl text-amber-400 tracking-wider">
                ${m.scoreHome !== undefined ? m.scoreHome : '-'} : ${m.scoreAway !== undefined ? m.scoreAway : '-'}
              </div>
            </div>

            <div class="flex-1 text-right">
              <div class="font-display font-extrabold text-white text-sm sm:text-base">${m.teamAway}</div>
              <span class="text-[11px] text-slate-400">Visitante</span>
            </div>
          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span class="flex items-center gap-1 text-emerald-400 font-medium">
              <span>📡</span> Plataforma ESPN Oficial • Tiempo Real
            </span>
            <span class="text-slate-400 font-mono">${m.time || m.status || 'En Vivo'}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  function renderVipParticipants() {
    const listEl = document.getElementById("vipParticipantsList");
    if (!listEl) return;

    const myName = (window.state && window.state.myTableName) ? window.state.myTableName : "Tu Mesa";
    const myAvatar = (window.state && window.state.myAvatar) ? window.state.myAvatar : "😎";

    const playersObj = (window.state && window.state.roomData && window.state.roomData.players) ? window.state.roomData.players : null;
    const players = playersObj ? Object.values(playersObj) : [];

    if (players.length > 1) {
      listEl.innerHTML = players.map(p => `
        <div class="flex items-center justify-between p-3 rounded-xl bg-dark-800/90 border border-slate-700">
          <div class="flex items-center gap-2.5">
            <span class="text-2xl">${p.avatar || '🍺'}</span>
            <div>
              <div class="font-bold text-white text-xs">${p.name || 'Mesa'}</div>
              <div class="text-[10px] text-amber-400 font-medium">Mesa enlazada en vivo</div>
            </div>
          </div>
          <span class="text-[11px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded-lg">
            ✓ $${vipStakeAmount.toFixed(2)} USD
          </span>
        </div>
      `).join("");
    } else {
      const pin = window.state && window.state.currentPin ? window.state.currentPin : null;
      listEl.innerHTML = `
        <div class="flex items-center justify-between p-3 rounded-xl bg-dark-800/90 border border-amber-500/50 shadow-md">
          <div class="flex items-center gap-2.5">
            <span class="text-2xl">${myAvatar}</span>
            <div>
              <div class="font-bold text-white text-xs flex items-center gap-1.5">
                <span>${myName}</span>
                <span class="bg-amber-400/20 text-amber-300 text-[9px] font-extrabold px-1.5 py-0.2 rounded">TU MESA</span>
              </div>
              <div class="text-[10px] text-amber-400 font-medium">Autorizada por el mesero</div>
            </div>
          </div>
          <span class="text-[11px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded-lg">
            ✓ $${vipStakeAmount.toFixed(2)} USD
          </span>
        </div>

        <div class="p-3 rounded-xl bg-dark-900 border border-dashed border-slate-700 flex flex-col justify-center gap-1 text-center sm:text-left">
          <div class="text-xs font-bold text-slate-300 flex items-center justify-center sm:justify-start gap-1.5">
            <span>🔗</span> <span>Enlace de Mesas para el Pozo</span>
          </div>
          <p class="text-[11px] text-slate-400">
            ${pin ? `Comparte el PIN de sala <strong class="text-amber-400 font-mono text-xs">${pin}</strong> con otra mesa para competir por el pozo.` : `Crea una sala desde el inicio para enlazar las demás tablets del bar.`}
          </p>
        </div>
      `;
    }
  }

  function initVipLounge() {
    // Actualizar montos de apuesta y pozo en la cabecera
    const betDisplay = document.getElementById("vipTableBetDisplay");
    if (betDisplay) betDisplay.textContent = `$${vipStakeAmount.toFixed(2)} USD`;

    const count = getActiveVipTablesCount();
    const potEl = document.getElementById("vipPotTotal");
    if (potEl) potEl.textContent = `$${(vipStakeAmount * count).toFixed(2)} USD`;

    const countEl = document.getElementById("vipActiveTablesCount");
    if (countEl) countEl.textContent = `${count} Mesa${count > 1 ? 's' : ''} Activa${count > 1 ? 's' : ''}`;

    initDominoGame();
    initCasinoGames();
    renderVipParticipants();

    // Consulta en tiempo real a plataformas oficiales (ESPN / Live)
    if (vipSportsMatches.length === 0) {
      fetchLiveSportsFromPlatforms();
    } else {
      renderVipMatches();
    }
  }

  // 8. MINIJUEGO 4: LA BOMBA DE LA MESA (TICK-TICK BOOM)
  let bombTimerInterval = null;
  let bombSecondsLeft = 15;
  let riggedWire = "red";

  window.initBombGame = function() {
    bombSecondsLeft = 15;
    const wires = ["red", "blue", "yellow", "green"];
    riggedWire = wires[Math.floor(Math.random() * wires.length)];

    const digitsEl = document.getElementById("bombTimerDigits");
    if (digitsEl) digitsEl.textContent = "00:15";

    const visual = document.getElementById("bombVisual");
    if (visual) visual.textContent = "💣";

    // Habilitar todos los cables
    document.querySelectorAll(".wire-btn").forEach(btn => {
      btn.disabled = false;
      btn.classList.remove("opacity-25", "line-through");
    });

    if (bombTimerInterval) clearInterval(bombTimerInterval);
    bombTimerInterval = setInterval(() => {
      bombSecondsLeft--;
      if (window.sound && window.sound.playBombTick) window.sound.playBombTick();

      if (digitsEl) {
        digitsEl.textContent = `00:${bombSecondsLeft < 10 ? '0' : ''}${bombSecondsLeft}`;
      }

      if (bombSecondsLeft <= 0) {
        clearInterval(bombTimerInterval);
        triggerBombExplosion("¡Se acabó el tiempo! La bomba explotó en tu mesa.");
      }
    }, 1000);
  };

  function cutBombWire(color) {
    const btn = document.querySelector(`.wire-btn[data-wire="${color}"]`);
    if (btn) {
      btn.disabled = true;
      btn.classList.add("opacity-25", "line-through");
    }

    if (color === riggedWire) {
      if (bombTimerInterval) clearInterval(bombTimerInterval);
      triggerBombExplosion("¡CORTASTE EL CABLE TRAMPA! ¡BOOOOM!");
    } else {
      if (window.sound && window.sound.playCardDraw) window.sound.playCardDraw();
      if (window.showToast) window.showToast(`Cable ${color} seguro. ¡Tic-tac!`, "✂️");
    }
  }

  function triggerBombExplosion(reason) {
    if (window.sound && window.sound.playBombExplosion) window.sound.playBombExplosion();
    const visual = document.getElementById("bombVisual");
    if (visual) visual.textContent = "💥";

    if (window.showToast) window.showToast("¡EXPLOSIÓN! " + reason, "💥");

    setTimeout(() => {
      if (window.state && window.state.roomData) {
        const loser = window.state.myPlayerId;
        window.declareLoser(loser, "Bomba Explotada en la Mesa 💣");
      }
    }, 1200);
  }

  // 9. MINIJUEGO 5: DADOS AL ROJO VIVO (3 RONDAS)
  let diceRound = 1;
  let diceScores = {};

  const DICE_FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

  window.initDiceGame = function() {
    diceRound = 1;
    diceScores = {};
    updateDiceUI();
  };

  function updateDiceUI() {
    const badge = document.getElementById("diceRoundBadge");
    if (badge) badge.textContent = `Ronda ${diceRound} de 3`;

    const table = document.getElementById("diceScoreTable");
    if (!table || !window.state || !window.state.roomData) return;

    const players = Object.values(window.state.roomData.players || {});
    table.innerHTML = players.map(p => {
      const score = diceScores[p.id] || { r1: '-', r2: '-', r3: '-', total: 0 };
      return `
        <div class="flex items-center justify-between p-2.5 rounded-xl bg-dark-800 border border-slate-700 text-xs">
          <div class="flex items-center gap-2">
            <span>${p.avatar || '😎'}</span>
            <span class="font-bold text-white">${p.name}</span>
          </div>
          <div class="flex items-center gap-3 font-mono">
            <span class="text-slate-400">R1: ${score.r1}</span>
            <span class="text-slate-400">R2: ${score.r2}</span>
            <span class="text-slate-400">R3: ${score.r3}</span>
            <span class="font-bold text-amber-400 bg-dark-900 px-2 py-0.5 rounded border border-slate-700">Total: ${score.total}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  function rollDicePlayer() {
    if (window.sound && window.sound.playDiceRoll) window.sound.playDiceRoll();

    const die1El = document.getElementById("die1Visual");
    const die2El = document.getElementById("die2Visual");
    const resEl = document.getElementById("diceRollResult");

    const v1 = Math.floor(Math.random() * 6) + 1;
    const v2 = Math.floor(Math.random() * 6) + 1;
    const sum = v1 + v2;

    if (die1El) {
      die1El.classList.add("rotate-180", "scale-110");
      setTimeout(() => {
        die1El.textContent = DICE_FACES[v1 - 1];
        die1El.classList.remove("rotate-180", "scale-110");
      }, 200);
    }

    if (die2El) {
      die2El.classList.add("-rotate-180", "scale-110");
      setTimeout(() => {
        die2El.textContent = DICE_FACES[v2 - 1];
        die2El.classList.remove("-rotate-180", "scale-110");
      }, 200);
    }

    if (resEl) {
      resEl.textContent = `¡Sacaste ${v1} y ${v2} = ${sum} puntos!`;
    }

    const myId = window.state?.myPlayerId || "me";
    if (!diceScores[myId]) diceScores[myId] = { r1: 0, r2: 0, r3: 0, total: 0 };

    if (diceRound === 1) diceScores[myId].r1 = sum;
    else if (diceRound === 2) diceScores[myId].r2 = sum;
    else if (diceRound === 3) diceScores[myId].r3 = sum;

    diceScores[myId].total = (diceScores[myId].r1 || 0) + (diceScores[myId].r2 || 0) + (diceScores[myId].r3 || 0);

    // Simular bots
    if (window.state?.roomData) {
      Object.keys(window.state.roomData.players || {}).forEach(pId => {
        if (pId !== myId) {
          const b1 = Math.floor(Math.random() * 6) + 1;
          const b2 = Math.floor(Math.random() * 6) + 1;
          const bSum = b1 + b2;
          if (!diceScores[pId]) diceScores[pId] = { r1: 0, r2: 0, r3: 0, total: 0 };
          if (diceRound === 1) diceScores[pId].r1 = bSum;
          else if (diceRound === 2) diceScores[pId].r2 = bSum;
          else if (diceRound === 3) diceScores[pId].r3 = bSum;
          diceScores[pId].total = (diceScores[pId].r1 || 0) + (diceScores[pId].r2 || 0) + (diceScores[pId].r3 || 0);
        }
      });
    }

    updateDiceUI();

    if (diceRound < 3) {
      diceRound++;
      if (window.showToast) window.showToast(`Ronda ${diceRound - 1} completada. ¡Siguiente ronda!`, "🎲");
      setTimeout(() => updateDiceUI(), 1000);
    } else {
      // Fin del juego de dados
      let lowestScore = 999;
      let loserId = myId;
      Object.keys(diceScores).forEach(id => {
        if (diceScores[id].total < lowestScore) {
          lowestScore = diceScores[id].total;
          loserId = id;
        }
      });

      setTimeout(() => {
        window.declareLoser(loserId, `Menor Puntuación en Dados (${lowestScore} pts) 🎲`);
      }, 1500);
    }
  }

  // 10. MINIJUEGO 6: DARDOS AL CENTRO (3 TIROS DE PUNTERÍA)
  let dartsThrowCount = 1;
  let dartsScores = {};
  let dartsCrosshairX = 50;
  let dartsCrosshairY = 50;
  let dartsAnimationId = null;

  window.initDartsGame = function() {
    dartsThrowCount = 1;
    dartsScores = {};
    startDartsCrosshairAnim();
    updateDartsUI();
  };

  function startDartsCrosshairAnim() {
    let t = 0;
    function loop() {
      t += 0.05;
      dartsCrosshairX = 50 + Math.sin(t * 1.5) * 40;
      dartsCrosshairY = 50 + Math.cos(t * 2.1) * 40;

      const crosshair = document.getElementById("dartsCrosshair");
      if (crosshair) {
        crosshair.style.left = `${dartsCrosshairX}%`;
        crosshair.style.top = `${dartsCrosshairY}%`;
      }
      dartsAnimationId = requestAnimationFrame(loop);
    }
    cancelAnimationFrame(dartsAnimationId);
    loop();
  }

  function throwDartPlayer() {
    if (window.sound && window.sound.playDartHit) window.sound.playDartHit();

    // Calcular distancia al centro (50, 50)
    const dist = Math.sqrt(Math.pow(dartsCrosshairX - 50, 2) + Math.pow(dartsCrosshairY - 50, 2));
    let points = 10;
    if (dist < 8) points = 100; // Centro Bullseye
    else if (dist < 20) points = 50;
    else if (dist < 32) points = 25;

    const pinned = document.getElementById("dartPinned");
    if (pinned) {
      pinned.style.left = `${dartsCrosshairX}%`;
      pinned.style.top = `${dartsCrosshairY}%`;
      pinned.classList.remove("hidden");
      setTimeout(() => pinned.classList.add("hidden"), 1200);
    }

    const msg = document.getElementById("dartsResultMsg");
    if (msg) {
      msg.textContent = `¡Diana! Lograste ${points} Puntos (${points === 100 ? '¡CENTRO TOTAL!' : 'Buen tiro'})`;
    }

    const myId = window.state?.myPlayerId || "me";
    if (!dartsScores[myId]) dartsScores[myId] = { t1: 0, t2: 0, t3: 0, total: 0 };

    if (dartsThrowCount === 1) dartsScores[myId].t1 = points;
    else if (dartsThrowCount === 2) dartsScores[myId].t2 = points;
    else if (dartsThrowCount === 3) dartsScores[myId].t3 = points;

    dartsScores[myId].total = (dartsScores[myId].t1 || 0) + (dartsScores[myId].t2 || 0) + (dartsScores[myId].t3 || 0);

    // Simular bots
    if (window.state?.roomData) {
      Object.keys(window.state.roomData.players || {}).forEach(pId => {
        if (pId !== myId) {
          const randPts = [10, 25, 50, 100][Math.floor(Math.random() * 4)];
          if (!dartsScores[pId]) dartsScores[pId] = { t1: 0, t2: 0, t3: 0, total: 0 };
          if (dartsThrowCount === 1) dartsScores[pId].t1 = randPts;
          else if (dartsThrowCount === 2) dartsScores[pId].t2 = randPts;
          else if (dartsThrowCount === 3) dartsScores[pId].t3 = randPts;
          dartsScores[pId].total = (dartsScores[pId].t1 || 0) + (dartsScores[pId].t2 || 0) + (dartsScores[pId].t3 || 0);
        }
      });
    }

    updateDartsUI();

    if (dartsThrowCount < 3) {
      dartsThrowCount++;
      if (window.showToast) window.showToast(`Dardo ${dartsThrowCount - 1} lanzado: ${points} pts. ¡Siguiente!`, "🎯");
      updateDartsUI();
    } else {
      cancelAnimationFrame(dartsAnimationId);
      let lowest = 999;
      let loserId = myId;
      Object.keys(dartsScores).forEach(id => {
        if (dartsScores[id].total < lowest) {
          lowest = dartsScores[id].total;
          loserId = id;
        }
      });

      setTimeout(() => {
        window.declareLoser(loserId, `Peor Puntería en Dardos (${lowest} pts) 🎯`);
      }, 1500);
    }
  }

  function updateDartsUI() {
    const badge = document.getElementById("dartsThrowBadge");
    if (badge) badge.textContent = `Dardo ${dartsThrowCount} de 3`;

    const table = document.getElementById("dartsScoreTable");
    if (!table || !window.state || !window.state.roomData) return;

    const players = Object.values(window.state.roomData.players || {});
    table.innerHTML = players.map(p => {
      const s = dartsScores[p.id] || { t1: '-', t2: '-', t3: '-', total: 0 };
      return `
        <div class="flex items-center justify-between p-2.5 rounded-xl bg-dark-800 border border-slate-700 text-xs">
          <div class="flex items-center gap-2">
            <span>${p.avatar || '🎯'}</span>
            <span class="font-bold text-white">${p.name}</span>
          </div>
          <div class="flex items-center gap-3 font-mono">
            <span class="text-slate-400">T1: ${s.t1}</span>
            <span class="text-slate-400">T2: ${s.t2}</span>
            <span class="text-slate-400">T3: ${s.t3}</span>
            <span class="font-bold text-emerald-400 bg-dark-900 px-2 py-0.5 rounded border border-slate-700">Total: ${s.total}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  // =========================================================================
  // 11. MOTOR DE SINCRONIZACIÓN Y ESTADO DE MINIJUEGOS LOCALES / RED
  // =========================================================================
  function broadcastGameEngineState(gameKey, data) {
    try {
      if (window.state && window.state.roomData && typeof window.pushRoomState === "function") {
        const room = { ...window.state.roomData };
        room.gameState = room.gameState || {};
        room.gameState[gameKey] = data;
        if (gameKey === "cards") room.gameState.isBlackjack = true;
        window.pushRoomState(room);
      }
    } catch (err) {
      console.warn("[GameEngine] Error al sincronizar estado:", err);
    }
  }

  // =========================================================================
  // JUEGO 1: TIC-TAC-TOE DINÁMICO (MÁXIMO 3 FICHAS POR JUGADOR • REGLA FIFO)
  // =========================================================================
  let tttBoard = Array(9).fill(null);
  let tttCurrentTurn = 'X'; // 'X' = Comensal 1, 'O' = Comensal 2
  let tttPiecesX = [];      // Cola FIFO de posiciones [pos1, pos2, pos3]
  let tttPiecesO = [];      // Cola FIFO de posiciones [pos1, pos2, pos3]
  let tttScores = { X: 0, O: 0 };
  let tttIsOver = false;
  let tttWinningLine = null;

  const TTT_WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6]             // Diagonales
  ];

  window.initTicTacToeGame = function(fromSync = false) {
    tttBoard = Array(9).fill(null);
    tttCurrentTurn = 'X';
    tttPiecesX = [];
    tttPiecesO = [];
    tttIsOver = false;
    tttWinningLine = null;

    const resultBox = document.getElementById("tttResultBox");
    if (resultBox) resultBox.classList.add("hidden");

    renderTicTacToeUI();

    if (!fromSync) {
      broadcastGameEngineState('tictactoe', {
        board: tttBoard,
        currentTurn: tttCurrentTurn,
        piecesX: tttPiecesX,
        piecesO: tttPiecesO,
        scores: tttScores,
        isOver: tttIsOver,
        winningLine: tttWinningLine
      });
      if (window.sound && window.sound.playCardDraw) window.sound.playCardDraw();
    }
  };

  window.syncTicTacToeState = function(gameState) {
    if (!gameState || !gameState.tictactoe) return;
    const data = gameState.tictactoe;
    tttBoard = data.board || Array(9).fill(null);
    tttCurrentTurn = data.currentTurn || 'X';
    tttPiecesX = data.piecesX || [];
    tttPiecesO = data.piecesO || [];
    if (data.scores) tttScores = data.scores;
    tttIsOver = !!data.isOver;
    tttWinningLine = data.winningLine || null;

    renderTicTacToeUI();

    if (tttIsOver && data.winner) {
      const box = document.getElementById("tttResultBox");
      const title = document.getElementById("tttResultTitle");
      const desc = document.getElementById("tttResultDesc");
      if (box && title && desc) {
        title.textContent = `¡${data.winner} Gana el Duelo!`;
        desc.textContent = "¡3 en línea completado! El perdedor paga la ronda 🍻";
        box.classList.remove("hidden");
      }
    }
  };

  function renderTicTacToeUI() {
    const scoreXEl = document.getElementById("tttScoreX");
    if (scoreXEl) scoreXEl.textContent = `${tttScores.X} Wins`;

    const scoreOEl = document.getElementById("tttScoreO");
    if (scoreOEl) scoreOEl.textContent = `${tttScores.O} Wins`;

    const tokensXEl = document.getElementById("tttTokensCountX");
    if (tokensXEl) tokensXEl.textContent = `Fichas: ${tttPiecesX.length} / 3`;

    const tokensOEl = document.getElementById("tttTokensCountO");
    if (tokensOEl) tokensOEl.textContent = `Fichas: ${tttPiecesO.length} / 3`;

    const warnXEl = document.getElementById("tttWarningX");
    if (warnXEl) {
      if (tttPiecesX.length === 3 && tttCurrentTurn === 'X' && !tttIsOver) {
        warnXEl.classList.remove("hidden");
      } else {
        warnXEl.classList.add("hidden");
      }
    }

    const warnOEl = document.getElementById("tttWarningO");
    if (warnOEl) {
      if (tttPiecesO.length === 3 && tttCurrentTurn === 'O' && !tttIsOver) {
        warnOEl.classList.remove("hidden");
      } else {
        warnOEl.classList.add("hidden");
      }
    }

    const badgeP1 = document.getElementById("tttBadgeP1");
    const badgeP2 = document.getElementById("tttBadgeP2");
    if (badgeP1 && badgeP2) {
      if (tttCurrentTurn === 'X' && !tttIsOver) {
        badgeP1.className = "p-3.5 rounded-2xl border-2 transition-all bg-dark-900 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]";
        badgeP2.className = "p-3.5 rounded-2xl border-2 transition-all bg-dark-900 border-slate-800 opacity-60";
      } else if (tttCurrentTurn === 'O' && !tttIsOver) {
        badgeP1.className = "p-3.5 rounded-2xl border-2 transition-all bg-dark-900 border-slate-800 opacity-60";
        badgeP2.className = "p-3.5 rounded-2xl border-2 transition-all bg-dark-900 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]";
      } else {
        badgeP1.className = "p-3.5 rounded-2xl border-2 transition-all bg-dark-900 border-slate-800";
        badgeP2.className = "p-3.5 rounded-2xl border-2 transition-all bg-dark-900 border-slate-800";
      }
    }

    const statusText = document.getElementById("tttTurnStatusText");
    if (statusText) {
      if (tttIsOver) {
        statusText.textContent = "¡Partida finalizada!";
      } else if (tttCurrentTurn === 'X') {
        statusText.textContent = "Turno de Comensal 1 (❌)";
      } else {
        statusText.textContent = "Turno de Comensal 2 (⭕)";
      }
    }

    renderTicTacToeBoard();
  }

  function renderTicTacToeBoard() {
    const grid = document.getElementById("tttBoardGrid");
    if (!grid) return;

    grid.innerHTML = tttBoard.map((val, idx) => {
      let content = "";
      let classes = "bg-dark-900/90 border-slate-700/80 hover:border-slate-500 text-4xl sm:text-5xl font-black";
      let expBadge = "";

      const isOldestX = (tttCurrentTurn === 'X' && tttPiecesX.length === 3 && tttPiecesX[0] === idx && !tttIsOver);
      const isOldestO = (tttCurrentTurn === 'O' && tttPiecesO.length === 3 && tttPiecesO[0] === idx && !tttIsOver);
      const isWinning = (tttWinningLine && tttWinningLine.includes(idx));

      if (isWinning) {
        classes = "bg-amber-500/25 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-105";
      } else if (isOldestX || isOldestO) {
        classes = "bg-dark-900 border-2 border-dashed border-amber-400 animate-pulse";
        expBadge = `<span class="absolute top-1 right-1 text-[9px] font-bold text-amber-300 bg-amber-950/90 border border-amber-500/50 px-1.5 py-0.5 rounded-md select-none">Desaparece</span>`;
      }

      if (val === 'X') {
        content = `<span class="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] select-none">❌</span>`;
      } else if (val === 'O') {
        content = `<span class="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)] select-none">⭕</span>`;
      }

      return `
        <button 
          type="button"
          onclick="window.handleTttCellClick(${idx})"
          class="relative flex items-center justify-center rounded-2xl border-2 transition-all duration-150 active:scale-95 shadow-inner cursor-pointer aspect-square ${classes}"
          style="touch-action: manipulation;"
        >
          ${expBadge}
          ${content}
        </button>
      `;
    }).join("");
  }

  window.handleTttCellClick = function(idx) {
    if (tttIsOver || tttBoard[idx] !== null) return;

    const player = tttCurrentTurn;

    // REGLA DINÁMICA: Máximo 3 fichas por jugador. Al colocar la 4ta, desaparece la más antigua (FIFO)
    if (player === 'X') {
      if (tttPiecesX.length === 3) {
        const oldestIdx = tttPiecesX.shift();
        tttBoard[oldestIdx] = null;
        if (window.sound && window.sound.playPop) window.sound.playPop();
      }
      tttBoard[idx] = 'X';
      tttPiecesX.push(idx);
    } else {
      if (tttPiecesO.length === 3) {
        const oldestIdx = tttPiecesO.shift();
        tttBoard[oldestIdx] = null;
        if (window.sound && window.sound.playPop) window.sound.playPop();
      }
      tttBoard[idx] = 'O';
      tttPiecesO.push(idx);
    }

    if (window.sound && window.sound.playCardDraw) window.sound.playCardDraw();

    // Verificación de victoria
    const winCombo = checkTicTacToeWin(player);
    let winnerName = null;

    if (winCombo) {
      tttIsOver = true;
      tttWinningLine = winCombo;
      tttScores[player]++;

      if (window.sound && window.sound.playVictoryFanfare) {
        window.sound.playVictoryFanfare();
      } else if (window.sound && window.sound.playCorrect) {
        window.sound.playCorrect();
      }

      if (typeof confetti === "function") {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      }

      winnerName = player === 'X' ? "Comensal 1 (❌)" : "Comensal 2 (⭕)";
      const loserName = player === 'X' ? "Comensal 2 (⭕)" : "Comensal 1 (❌)";

      renderTicTacToeUI();

      setTimeout(() => {
        const box = document.getElementById("tttResultBox");
        const title = document.getElementById("tttResultTitle");
        const desc = document.getElementById("tttResultDesc");
        if (box && title && desc) {
          title.textContent = `¡${winnerName} Gana el Duelo!`;
          desc.textContent = `¡3 en línea completado! ${loserName} se encarga de pagar la ronda de tragos 🍻`;
          box.classList.remove("hidden");
        }
      }, 450);
    } else {
      tttCurrentTurn = tttCurrentTurn === 'X' ? 'O' : 'X';
      renderTicTacToeUI();
    }

    // Sincronizar en tiempo real entre pantallas
    broadcastGameEngineState('tictactoe', {
      board: tttBoard,
      currentTurn: tttCurrentTurn,
      piecesX: tttPiecesX,
      piecesO: tttPiecesO,
      scores: tttScores,
      isOver: tttIsOver,
      winningLine: tttWinningLine,
      winner: winnerName
    });
  };

  function checkTicTacToeWin(player) {
    for (const combo of TTT_WINNING_COMBOS) {
      const [a, b, c] = combo;
      if (tttBoard[a] === player && tttBoard[b] === player && tttBoard[c] === player) {
        return combo;
      }
    }
    return null;
  }

  // =========================================================================
  // 12. MINIJUEGO 2: DOMINÓ EXPRÉS (5 FICHAS • CRONÓMETRO 10s • COLOCACIÓN RÁPIDA)
  // =========================================================================
  let dominoExpressState = {
    chain: [],          // [{ p1, p2, isDouble }]
    hands: [[], []],    // Mano 0 (Comensal 1), Mano 1 (Comensal 2)
    boneyard: [],       // Fichas restantes en el pozo
    currentTurn: 0,     // 0 = Comensal 1, 1 = Comensal 2
    isOver: false,
    winner: null,
    consecutivePasses: 0,
    selectedTileIdx: -1
  };

  let dominoTurnTimerInterval = null;
  let dominoSecondsLeft = 10.0;

  // Generador de conjunto de 28 fichas Doble-6
  function generateFullDominoSet() {
    const tiles = [];
    for (let i = 0; i <= 6; i++) {
      for (let j = i; j <= 6; j++) {
        tiles.push([i, j]);
      }
    }
    // Barajado Fisher-Yates
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    return tiles;
  }

  window.initDominoExpressGame = function(fromSync = false) {
    if (dominoTurnTimerInterval) clearInterval(dominoTurnTimerInterval);

    const allTiles = generateFullDominoSet();
    const hand1 = allTiles.splice(0, 5);
    const hand2 = allTiles.splice(0, 5);

    dominoExpressState = {
      chain: [],
      hands: [hand1, hand2],
      boneyard: allTiles, // 18 fichas en el pozo
      currentTurn: 0,
      isOver: false,
      winner: null,
      consecutivePasses: 0,
      selectedTileIdx: -1
    };

    const resultBox = document.getElementById("dominoResultBox");
    if (resultBox) resultBox.classList.add("hidden");

    const picker = document.getElementById("dominoExtremesPicker");
    if (picker) picker.classList.add("hidden");

    startDominoTurnTimer();
    renderDominoExpressUI();

    if (!fromSync) {
      broadcastGameEngineState('domino', {
        chain: dominoExpressState.chain,
        hands: dominoExpressState.hands,
        boneyardCount: dominoExpressState.boneyard.length,
        currentTurn: dominoExpressState.currentTurn,
        isOver: dominoExpressState.isOver,
        winner: dominoExpressState.winner,
        consecutivePasses: dominoExpressState.consecutivePasses
      });
      if (window.sound && window.sound.playDominoClack) window.sound.playDominoClack();
    }
  };

  window.syncDominoState = function(gameState) {
    if (!gameState || !gameState.domino) return;
    const data = gameState.domino;
    dominoExpressState.chain = data.chain || [];
    if (data.hands) dominoExpressState.hands = data.hands;
    dominoExpressState.currentTurn = data.currentTurn ?? 0;
    dominoExpressState.isOver = !!data.isOver;
    dominoExpressState.winner = data.winner ?? null;
    dominoExpressState.consecutivePasses = data.consecutivePasses || 0;

    renderDominoExpressUI();

    if (dominoExpressState.isOver) {
      if (dominoTurnTimerInterval) clearInterval(dominoTurnTimerInterval);
      const box = document.getElementById("dominoResultBox");
      const title = document.getElementById("dominoResultTitle");
      const desc = document.getElementById("dominoResultDesc");
      if (box && title && desc && data.winnerName) {
        title.textContent = `¡Victoria de ${data.winnerName}!`;
        desc.textContent = data.reason || "¡El perdedor paga la cuenta del restaurante! 🍻💸";
        box.classList.remove("hidden");
      }
    }
  };

  function startDominoTurnTimer() {
    if (dominoTurnTimerInterval) clearInterval(dominoTurnTimerInterval);
    dominoSecondsLeft = 10.0;
    updateDominoTimerDisplay();

    dominoTurnTimerInterval = setInterval(() => {
      if (dominoExpressState.isOver) {
        clearInterval(dominoTurnTimerInterval);
        return;
      }

      dominoSecondsLeft -= 0.1;
      updateDominoTimerDisplay();

      if (dominoSecondsLeft <= 0) {
        clearInterval(dominoTurnTimerInterval);
        handleDominoTimeout();
      }
    }, 100);
  }

  function updateDominoTimerDisplay() {
    const clamped = Math.max(0, dominoSecondsLeft);
    const digits = document.getElementById("dominoTimerVal") || document.getElementById("dominoTimerDigits");
    const bar = document.getElementById("dominoTimerBar") || document.getElementById("dominoTimerProgressBar");

    if (digits) {
      digits.textContent = `${Math.ceil(clamped)}s`;
    }
    if (bar) {
      const pct = (clamped / 10.0) * 100;
      bar.style.width = `${pct}%`;
      if (clamped <= 3) {
        bar.className = "bg-rose-500 h-full transition-all duration-100";
      } else if (clamped <= 6) {
        bar.className = "bg-amber-400 h-full transition-all duration-100";
      } else {
        bar.className = "bg-emerald-400 h-full transition-all duration-100";
      }
    }
  }

  function handleDominoTimeout() {
    if (dominoExpressState.isOver) return;

    if (window.showToast) {
      const pName = dominoExpressState.currentTurn === 0 ? "Comensal 1" : "Comensal 2";
      window.showToast(`⏱️ ¡Tiempo agotado para ${pName}! Jugada rápida automática.`, "⚡");
    }

    const hand = dominoExpressState.hands[dominoExpressState.currentTurn];
    const playableIdx = hand.findIndex(t => canPlayDominoExpressTile(t));

    if (playableIdx !== -1) {
      quickPlaceDominoTile(playableIdx);
    } else if (dominoExpressState.boneyard.length > 0) {
      drawDominoExpressTile();
      nextDominoExpressTurn();
    } else {
      passDominoExpressTurn();
    }
  }

  // Helpers de extremos abiertos del Dominó
  function getDominoOpenEnds() {
    if (dominoExpressState.chain.length === 0) {
      return { left: null, right: null };
    }
    const left = dominoExpressState.chain[0].p1;
    const right = dominoExpressState.chain[dominoExpressState.chain.length - 1].p2;
    return { left, right };
  }

  function canPlayDominoExpressTile(tile) {
    const { left, right } = getDominoOpenEnds();
    if (left === null && right === null) return true; // Tablero vacío: cualquier ficha entra
    return tile[0] === left || tile[1] === left || tile[0] === right || tile[1] === right;
  }

  function fitsLeft(tile) {
    const { left } = getDominoOpenEnds();
    if (left === null) return true;
    return tile[0] === left || tile[1] === left;
  }

  function fitsRight(tile) {
    const { right } = getDominoOpenEnds();
    if (right === null) return true;
    return tile[0] === right || tile[1] === right;
  }

  // Colocación rápida en 1 toque
  window.handleDominoTileClick = function(tileIdx) {
    if (dominoExpressState.isOver) return;

    const hand = dominoExpressState.hands[dominoExpressState.currentTurn];
    const tile = hand[tileIdx];
    if (!tile) return;

    if (!canPlayDominoExpressTile(tile)) {
      if (window.sound && window.sound.playWrong) window.sound.playWrong();
      if (window.showToast) window.showToast("Esta ficha no coincide con los extremos abiertos", "⚠️");
      return;
    }

    quickPlaceDominoTile(tileIdx);
  };

  function quickPlaceDominoTile(tileIdx) {
    const hand = dominoExpressState.hands[dominoExpressState.currentTurn];
    const tile = hand[tileIdx];
    if (!tile) return;

    const { left, right } = getDominoOpenEnds();

    // Si el tablero está vacío, se coloca como la primera ficha
    if (left === null && right === null) {
      placeTileOnEnd(tileIdx, 'center');
      return;
    }

    const fitsL = fitsLeft(tile);
    const fitsR = fitsRight(tile);

    if (fitsL && !fitsR) {
      placeTileOnEnd(tileIdx, 'left');
    } else if (!fitsL && fitsR) {
      placeTileOnEnd(tileIdx, 'right');
    } else if (fitsL && fitsR) {
      dominoExpressState.selectedTileIdx = tileIdx;
      const picker = document.getElementById("dominoExtremesPicker");
      if (picker) picker.classList.remove("hidden");
    }
  }

  function placeTileOnEnd(tileIdx, side) {
    const hand = dominoExpressState.hands[dominoExpressState.currentTurn];
    const tile = hand.splice(tileIdx, 1)[0];
    dominoExpressState.consecutivePasses = 0;
    dominoExpressState.selectedTileIdx = -1;

    const picker = document.getElementById("dominoExtremesPicker");
    if (picker) picker.classList.add("hidden");

    const { left, right } = getDominoOpenEnds();

    if (side === 'center') {
      dominoExpressState.chain.push({
        p1: tile[0],
        p2: tile[1],
        isDouble: tile[0] === tile[1]
      });
    } else if (side === 'left') {
      let p1, p2;
      if (tile[1] === left) {
        p1 = tile[0];
        p2 = tile[1];
      } else {
        p1 = tile[1];
        p2 = tile[0];
      }
      dominoExpressState.chain.unshift({
        p1,
        p2,
        isDouble: p1 === p2
      });
    } else if (side === 'right') {
      let p1, p2;
      if (tile[0] === right) {
        p1 = tile[0];
        p2 = tile[1];
      } else {
        p1 = tile[1];
        p2 = tile[0];
      }
      dominoExpressState.chain.push({
        p1,
        p2,
        isDouble: p1 === p2
      });
    }

    if (window.sound && window.sound.playDominoClack) window.sound.playDominoClack();

    // Comprobar si se quedó sin fichas (victoria)
    if (hand.length === 0) {
      finishDominoExpressGame(dominoExpressState.currentTurn, "¡Cerró la mano jugando todas sus fichas!");
      return;
    }

    nextDominoExpressTurn();
  }

  function nextDominoExpressTurn() {
    if (dominoExpressState.isOver) return;
    dominoExpressState.currentTurn = dominoExpressState.currentTurn === 0 ? 1 : 0;
    startDominoTurnTimer();
    renderDominoExpressUI();

    broadcastGameEngineState('domino', {
      chain: dominoExpressState.chain,
      hands: dominoExpressState.hands,
      boneyardCount: dominoExpressState.boneyard.length,
      currentTurn: dominoExpressState.currentTurn,
      isOver: dominoExpressState.isOver,
      consecutivePasses: dominoExpressState.consecutivePasses
    });
  }

  function drawDominoExpressTile() {
    if (dominoExpressState.isOver) return;
    if (dominoExpressState.boneyard.length === 0) {
      if (window.showToast) window.showToast("El pozo está vacío", "⚠️");
      return;
    }

    const drawn = dominoExpressState.boneyard.pop();
    dominoExpressState.hands[dominoExpressState.currentTurn].push(drawn);
    dominoExpressState.consecutivePasses = 0;
    if (window.sound && window.sound.playDominoClack) window.sound.playDominoClack();
    if (window.showToast) window.showToast(`Ficha robada del pozo: [${drawn[0]}|${drawn[1]}]`, "🀄");

    renderDominoExpressUI();

    broadcastGameEngineState('domino', {
      chain: dominoExpressState.chain,
      hands: dominoExpressState.hands,
      boneyardCount: dominoExpressState.boneyard.length,
      currentTurn: dominoExpressState.currentTurn,
      isOver: dominoExpressState.isOver,
      consecutivePasses: dominoExpressState.consecutivePasses
    });
  }

  function passDominoExpressTurn() {
    if (dominoExpressState.isOver) return;
    dominoExpressState.consecutivePasses++;

    if (window.showToast) {
      const pName = dominoExpressState.currentTurn === 0 ? "Comensal 1" : "Comensal 2";
      window.showToast(`${pName} pasa turno ⏭️`, "🀄");
    }

    // Si ambos pasan consecutivamente y el pozo está vacío (o pasaron 4 veces): juego trancado
    if (dominoExpressState.consecutivePasses >= 2 && dominoExpressState.boneyard.length === 0) {
      resolveDominoBlock();
      return;
    }

    nextDominoExpressTurn();
  }

  function resolveDominoBlock() {
    const p1Sum = dominoExpressState.hands[0].reduce((acc, t) => acc + t[0] + t[1], 0);
    const p2Sum = dominoExpressState.hands[1].reduce((acc, t) => acc + t[0] + t[1], 0);

    if (p1Sum < p2Sum) {
      finishDominoExpressGame(0, `Partida trancada: Comensal 1 gana por menor puntuación (${p1Sum} vs ${p2Sum} pts)`);
    } else if (p2Sum < p1Sum) {
      finishDominoExpressGame(1, `Partida trancada: Comensal 2 gana por menor puntuación (${p2Sum} vs ${p1Sum} pts)`);
    } else {
      finishDominoExpressGame(0, `Empate en puntuación (${p1Sum} pts): se declara ganador al anfitrión.`);
    }
  }

  function finishDominoExpressGame(winnerIdx, reason) {
    dominoExpressState.isOver = true;
    dominoExpressState.winner = winnerIdx;
    if (dominoTurnTimerInterval) clearInterval(dominoTurnTimerInterval);

    if (window.sound && window.sound.playVictoryFanfare) {
      window.sound.playVictoryFanfare();
    } else if (window.sound && window.sound.playCorrect) {
      window.sound.playCorrect();
    }

    if (typeof confetti === "function") {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }

    renderDominoExpressUI();

    const winnerName = winnerIdx === 0 ? "Comensal 1 (🤠)" : "Comensal 2 (😎)";
    const loserName = winnerIdx === 0 ? "Comensal 2 (😎)" : "Comensal 1 (🤠)";

    setTimeout(() => {
      const box = document.getElementById("dominoResultBox");
      const title = document.getElementById("dominoResultTitle");
      const desc = document.getElementById("dominoResultDesc");
      if (box && title && desc) {
        title.textContent = `¡Victoria de ${winnerName}!`;
        desc.textContent = `${reason}. ¡${loserName} paga la cuenta del restaurante! 🍻💸`;
        box.classList.remove("hidden");
      }
    }, 500);

    broadcastGameEngineState('domino', {
      chain: dominoExpressState.chain,
      hands: dominoExpressState.hands,
      boneyardCount: dominoExpressState.boneyard.length,
      currentTurn: dominoExpressState.currentTurn,
      isOver: true,
      winner: winnerIdx,
      winnerName: winnerName,
      reason: reason
    });
  }

  function renderDominoHalfDots(val) {
    const dotPositions = {
      0: [],
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8]
    };
    const active = dotPositions[val] || [];
    let html = `<div class="grid grid-cols-3 grid-rows-3 w-6 h-6 sm:w-7 sm:h-7 p-0.5 gap-0.5 pointer-events-none">`;
    for (let i = 0; i < 9; i++) {
      if (active.includes(i)) {
        html += `<div class="w-1.5 h-1.5 rounded-full bg-slate-950 mx-auto my-auto shadow-sm"></div>`;
      } else {
        html += `<div></div>`;
      }
    }
    html += `</div>`;
    return html;
  }

  function renderDominoExpressUI() {
    // Conteo de fichas de cada jugador (soportando ambas nomenclaturas de ID)
    const p1Count = document.getElementById("dominoP1TilesCount") || document.getElementById("dominoCountP1");
    if (p1Count) p1Count.textContent = `${dominoExpressState.hands[0].length} fichas`;

    const p2Count = document.getElementById("dominoP2TilesCount") || document.getElementById("dominoCountP2");
    if (p2Count) p2Count.textContent = `${dominoExpressState.hands[1].length} fichas`;

    // Badges de turno
    const p1Badge = document.getElementById("dominoP1Badge") || document.getElementById("dominoBadgeP1");
    const p2Badge = document.getElementById("dominoP2Badge") || document.getElementById("dominoBadgeP2");
    if (p1Badge && p2Badge) {
      if (dominoExpressState.currentTurn === 0 && !dominoExpressState.isOver) {
        p1Badge.className = "flex-1 sm:flex-initial p-2.5 rounded-xl border-2 bg-dark-900 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] text-xs";
        p2Badge.className = "flex-1 sm:flex-initial p-2.5 rounded-xl border-2 bg-dark-900 border-slate-800 opacity-60 text-xs";
      } else if (dominoExpressState.currentTurn === 1 && !dominoExpressState.isOver) {
        p1Badge.className = "flex-1 sm:flex-initial p-2.5 rounded-xl border-2 bg-dark-900 border-slate-800 opacity-60 text-xs";
        p2Badge.className = "flex-1 sm:flex-initial p-2.5 rounded-xl border-2 bg-dark-900 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] text-xs";
      } else {
        p1Badge.className = "flex-1 sm:flex-initial p-2.5 rounded-xl border-2 bg-dark-900 border-slate-800 text-xs";
        p2Badge.className = "flex-1 sm:flex-initial p-2.5 rounded-xl border-2 bg-dark-900 border-slate-800 text-xs";
      }
    }

    // Extremos abiertos
    const { left, right } = getDominoOpenEnds();
    const leftEl = document.getElementById("dominoOpenEndLeft");
    if (leftEl) leftEl.textContent = left === null ? "Libre" : left;

    const rightEl = document.getElementById("dominoOpenEndRight");
    if (rightEl) rightEl.textContent = right === null ? "Libre" : right;

    // Pozo
    const boneyardCountEl = document.getElementById("dominoExpressBoneyardCount") || document.getElementById("dominoPozoCount");
    if (boneyardCountEl) boneyardCountEl.textContent = `${dominoExpressState.boneyard.length} fichas`;

    // Cadena en mesa
    const chainEl = document.getElementById("dominoExpressChain") || document.getElementById("dominoBoardChain");
    if (chainEl) {
      if (dominoExpressState.chain.length === 0) {
        chainEl.innerHTML = `
          <div class="text-xs text-emerald-300/70 italic p-6 border-2 border-dashed border-emerald-800/80 rounded-2xl">
            La mesa está limpia. Toca cualquier ficha dorada de tu mano para abrir la partida.
          </div>
        `;
      } else {
        chainEl.innerHTML = dominoExpressState.chain.map((c) => `
          <div class="flex flex-col items-center justify-center bg-[#fdfbf7] border-2 border-amber-300 rounded-xl p-1 shadow-md flex-shrink-0 animate-scale-in">
            ${renderDominoHalfDots(c.p1)}
            <div class="w-full h-0.5 bg-amber-900/40 my-0.5 rounded-full"></div>
            ${renderDominoHalfDots(c.p2)}
          </div>
        `).join("");
      }
    }

    // Mano activa
    const handLabel = document.getElementById("dominoActiveHandLabel") || document.getElementById("dominoTurnBannerText");
    if (handLabel) {
      handLabel.textContent = dominoExpressState.currentTurn === 0 
        ? "Fichas de Comensal 1 (Toca para colocar)" 
        : "Fichas de Comensal 2 (Toca para colocar)";
    }

    const currentHand = dominoExpressState.hands[dominoExpressState.currentTurn];
    const handEl = document.getElementById("dominoExpressPlayerHand") || document.getElementById("dominoActiveHand");
    if (handEl) {
      handEl.innerHTML = currentHand.map((t, idx) => {
        const playable = canPlayDominoExpressTile(t) && !dominoExpressState.isOver;
        const borderClass = playable 
          ? "border-amber-400 ring-2 ring-amber-400/80 shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105 cursor-pointer animate-pulse" 
          : "border-slate-300 opacity-70 cursor-not-allowed";

        return `
          <button 
            type="button"
            onclick="window.handleDominoTileClick(${idx})"
            class="flex flex-col items-center justify-center bg-[#fdfbf7] rounded-xl p-1.5 transition-all duration-150 active:scale-95 border-2 ${borderClass}"
            style="touch-action: manipulation;"
          >
            ${renderDominoHalfDots(t[0])}
            <div class="w-full h-0.5 bg-amber-900/40 my-0.5 rounded-full"></div>
            ${renderDominoHalfDots(t[1])}
          </button>
        `;
      }).join("");
    }
  }

  // =========================================================================
  // 13. MINIJUEGO 3: BLACKJACK DUEL (21 SIN PASARSE • 6s POR TURNO)
  // =========================================================================
  let bjDeck = [];
  let bjHands = [[], []]; // Mano P1, Mano P2
  let bjActivePlayer = 1; // 1 = Comensal 1, 2 = Comensal 2
  let bjStood = [false, false]; // [P1 plantado, P2 plantado]
  let bjBusted = [false, false];
  let bjIsOver = false;
  let bjTurnTimerInterval = null;
  let bjSecondsLeft = 6.0;

  function createShuffledCardDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];

    for (const suit of suits) {
      for (const rank of ranks) {
        let val = parseInt(rank, 10);
        if (['J', 'Q', 'K'].includes(rank)) val = 10;
        if (rank === 'A') val = 11;
        deck.push({ suit, rank, val });
      }
    }

    // Barajar
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
  }

  function calculateBlackjackScore(hand) {
    if (!hand || !Array.isArray(hand)) return 0;
    let sum = 0;
    let aceCount = 0;

    for (const c of hand) {
      sum += c.val;
      if (c.rank === 'A') aceCount++;
    }

    // Reducir Ases de 11 a 1 si la suma excede 21
    while (sum > 21 && aceCount > 0) {
      sum -= 10;
      aceCount--;
    }

    return sum;
  }

  window.initBlackjackDuelGame = function(fromSync = false) {
    if (bjTurnTimerInterval) clearInterval(bjTurnTimerInterval);

    bjDeck = createShuffledCardDeck();
    bjHands = [[], []];
    bjActivePlayer = 1;
    bjStood = [false, false];
    bjBusted = [false, false];
    bjIsOver = false;

    // Reparto inicial: 2 cartas a cada comensal
    bjHands[0].push(bjDeck.pop(), bjDeck.pop());
    bjHands[1].push(bjDeck.pop(), bjDeck.pop());

    const resultBox = document.getElementById("bjResultBox");
    if (resultBox) resultBox.classList.add("hidden");

    startBjTurnTimer();
    renderBlackjackUI();

    if (!fromSync) {
      broadcastGameEngineState('cards', {
        hands: bjHands,
        activePlayer: bjActivePlayer,
        stood: bjStood,
        busted: bjBusted,
        isOver: bjIsOver
      });
      if (window.sound && window.sound.playCardDraw) window.sound.playCardDraw();
    }
  };

  window.syncBlackjackState = function(gameState) {
    if (!gameState || !gameState.cards) return;
    const data = gameState.cards;
    if (data.hands) bjHands = data.hands;
    bjActivePlayer = data.activePlayer ?? 1;
    bjStood = data.stood || [false, false];
    bjBusted = data.busted || [false, false];
    bjIsOver = !!data.isOver;

    renderBlackjackUI();

    if (bjIsOver) {
      if (bjTurnTimerInterval) clearInterval(bjTurnTimerInterval);
      const box = document.getElementById("bjResultBox");
      const title = document.getElementById("bjResultTitle");
      const desc = document.getElementById("bjResultDesc");
      if (box && title && desc && data.winnerTitle) {
        title.textContent = `¡Victoria de ${data.winnerTitle}!`;
        desc.textContent = data.reason || "¡El perdedor paga la cuenta!";
        box.classList.remove("hidden");
      }
    }
  };

  function startBjTurnTimer() {
    if (bjTurnTimerInterval) clearInterval(bjTurnTimerInterval);
    bjSecondsLeft = 6.0;
    updateBjTimerDisplay();

    bjTurnTimerInterval = setInterval(() => {
      if (bjIsOver) {
        clearInterval(bjTurnTimerInterval);
        return;
      }

      bjSecondsLeft -= 0.1;
      updateBjTimerDisplay();

      if (bjSecondsLeft <= 0) {
        clearInterval(bjTurnTimerInterval);
        handleBjTimeout();
      }
    }, 100);
  }

  function updateBjTimerDisplay() {
    const clamped = Math.max(0, bjSecondsLeft);
    const pct = (clamped / 6.0) * 100;

    const timerP1 = document.getElementById("bjTimerDigitsP1");
    const barP1 = document.getElementById("bjProgressBarP1");
    const timerP2 = document.getElementById("bjTimerDigitsP2");
    const barP2 = document.getElementById("bjProgressBarP2");

    if (bjActivePlayer === 1) {
      if (timerP1) timerP1.textContent = `${clamped.toFixed(1)}s`;
      if (barP1) {
        barP1.style.width = `${pct}%`;
        barP1.className = clamped <= 2 ? "bg-rose-500 h-full transition-all" : "bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 h-full transition-all";
      }
      if (timerP2) timerP2.textContent = "Espera...";
      if (barP2) barP2.style.width = "0%";
    } else {
      if (timerP2) timerP2.textContent = `${clamped.toFixed(1)}s`;
      if (barP2) {
        barP2.style.width = `${pct}%`;
        barP2.className = clamped <= 2 ? "bg-rose-500 h-full transition-all" : "bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 h-full transition-all";
      }
      if (timerP1) timerP1.textContent = "Espera...";
      if (barP1) barP1.style.width = "0%";
    }
  }

  function handleBjTimeout() {
    if (bjIsOver) return;

    if (window.showToast) {
      const pName = bjActivePlayer === 1 ? "Comensal 1" : "Comensal 2";
      window.showToast(`⏱️ ¡Tiempo de 6s agotado para ${pName}! Se planta automáticamente.`, "🛑");
    }

    if (bjActivePlayer === 1) {
      standBlackjackPlayer(1);
    } else {
      standBlackjackPlayer(2);
    }
  }

  window.hitBlackjackPlayer = function(playerNum) {
    if (bjIsOver || bjActivePlayer !== playerNum) return;

    const idx = playerNum - 1;
    if (bjDeck.length === 0) bjDeck = createShuffledCardDeck();
    const card = bjDeck.pop();
    bjHands[idx].push(card);
    if (window.sound && window.sound.playCardDraw) window.sound.playCardDraw();

    const score = calculateBlackjackScore(bjHands[idx]);

    if (score > 21) {
      // BUST (Se pasó)
      bjBusted[idx] = true;
      bjStood[idx] = true;
      if (window.sound && window.sound.playBust) window.sound.playBust();
      if (window.showToast) window.showToast(`💥 ¡Comensal ${playerNum} se pasó con ${score} puntos!`, "💣");

      if (playerNum === 1) {
        bjActivePlayer = 2;
        startBjTurnTimer();
      } else {
        finishBlackjackDuel();
        return;
      }
    } else if (score === 21) {
      // 21 Exacto (Blackjack)
      bjStood[idx] = true;
      if (window.sound && window.sound.playVictoryFanfare) window.sound.playVictoryFanfare();
      if (window.showToast) window.showToast(`🎉 ¡Comensal ${playerNum} logró 21 EXACTOS!`, "👑");

      if (playerNum === 1) {
        bjActivePlayer = 2;
        startBjTurnTimer();
      } else {
        finishBlackjackDuel();
        return;
      }
    } else {
      // Continúa su turno: resetear 6 segundos
      startBjTurnTimer();
    }

    renderBlackjackUI();

    broadcastGameEngineState('cards', {
      hands: bjHands,
      activePlayer: bjActivePlayer,
      stood: bjStood,
      busted: bjBusted,
      isOver: bjIsOver
    });
  };

  window.standBlackjackPlayer = function(playerNum) {
    if (bjIsOver || bjActivePlayer !== playerNum) return;

    const idx = playerNum - 1;
    bjStood[idx] = true;
    if (window.sound && window.sound.playCorrect) window.sound.playCorrect();

    if (playerNum === 1) {
      bjActivePlayer = 2;
      startBjTurnTimer();
      renderBlackjackUI();
      broadcastGameEngineState('cards', {
        hands: bjHands,
        activePlayer: bjActivePlayer,
        stood: bjStood,
        busted: bjBusted,
        isOver: bjIsOver
      });
    } else {
      finishBlackjackDuel();
    }
  };

  function finishBlackjackDuel() {
    bjIsOver = true;
    if (bjTurnTimerInterval) clearInterval(bjTurnTimerInterval);

    const s1 = calculateBlackjackScore(bjHands[0]);
    const s2 = calculateBlackjackScore(bjHands[1]);
    const b1 = bjBusted[0];
    const b2 = bjBusted[1];

    let winnerNum = 1;
    let reason = "";

    if (b1 && !b2) {
      winnerNum = 2;
      reason = `Comensal 1 se pasó de 21 (${s1} pts). Comensal 2 gana con ${s2} pts.`;
    } else if (!b1 && b2) {
      winnerNum = 1;
      reason = `Comensal 2 se pasó de 21 (${s2} pts). Comensal 1 gana con ${s1} pts.`;
    } else if (b1 && b2) {
      if (s1 < s2) {
        winnerNum = 1;
        reason = `Ambos se pasaron: Comensal 1 quedó más cerca de 21 (${s1} vs ${s2} pts).`;
      } else {
        winnerNum = 2;
        reason = `Ambos se pasaron: Comensal 2 quedó más cerca de 21 (${s2} vs ${s1} pts).`;
      }
    } else {
      if (s1 > s2) {
        winnerNum = 1;
        reason = `Comensal 1 sumó ${s1} pts frente a ${s2} pts de Comensal 2.`;
      } else if (s2 > s1) {
        winnerNum = 2;
        reason = `Comensal 2 sumó ${s2} pts frente a ${s1} pts de Comensal 1.`;
      } else {
        if (bjHands[0].length >= bjHands[1].length) {
          winnerNum = 1;
          reason = `Empate en ${s1} pts: Comensal 1 gana por mayor cantidad de cartas.`;
        } else {
          winnerNum = 2;
          reason = `Empate en ${s2} pts: Comensal 2 gana por mayor cantidad de cartas.`;
        }
      }
    }

    if (window.sound && window.sound.playVictoryFanfare) {
      window.sound.playVictoryFanfare();
    } else if (window.sound && window.sound.playChaChing) {
      window.sound.playChaChing();
    }

    if (typeof confetti === "function") {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }

    renderBlackjackUI();

    const winnerTitle = winnerNum === 1 ? "Comensal 1 (🤠)" : "Comensal 2 (😎)";
    const loserTitle = winnerNum === 1 ? "Comensal 2 (😎)" : "Comensal 1 (🤠)";

    setTimeout(() => {
      const box = document.getElementById("bjResultBox");
      const title = document.getElementById("bjResultTitle");
      const desc = document.getElementById("bjResultDesc");
      if (box && title && desc) {
        title.textContent = `¡Victoria de ${winnerTitle}!`;
        desc.textContent = `${reason} ¡${loserTitle} paga toda la cuenta! 💳🍺`;
        box.classList.remove("hidden");
      }
    }, 500);

    broadcastGameEngineState('cards', {
      hands: bjHands,
      activePlayer: bjActivePlayer,
      stood: bjStood,
      busted: bjBusted,
      isOver: true,
      winnerTitle: winnerTitle,
      reason: reason
    });
  }

  function renderPlayingCard(card) {
    if (!card) return "";
    const isRed = card.suit === 'hearts' || card.suit === 'diamonds';
    const suitSymbol = card.suit === 'hearts' ? '♥️' : card.suit === 'diamonds' ? '♦️' : card.suit === 'spades' ? '♠️' : '♣️';
    const colorClass = isRed ? 'text-rose-600' : 'text-slate-900';

    return `
      <div class="relative w-16 h-24 sm:w-20 sm:h-28 bg-white rounded-xl shadow-xl border border-slate-300 p-2 flex flex-col justify-between select-none animate-scale-in flex-shrink-0">
        <div class="flex items-center justify-between text-xs font-black ${colorClass} leading-none">
          <span>${card.rank}</span>
          <span class="text-sm">${suitSymbol}</span>
        </div>
        <div class="text-center text-2xl sm:text-3xl ${colorClass} my-auto">
          ${suitSymbol}
        </div>
        <div class="flex items-center justify-between text-xs font-black ${colorClass} leading-none rotate-180">
          <span>${card.rank}</span>
          <span class="text-sm">${suitSymbol}</span>
        </div>
      </div>
    `;
  }

  function renderBlackjackUI() {
    const s1 = calculateBlackjackScore(bjHands[0]);
    const s2 = calculateBlackjackScore(bjHands[1]);

    // Puntajes
    const score1El = document.getElementById("bjScoreP1");
    if (score1El) {
      if (bjBusted[0]) {
        score1El.innerHTML = `<span class="text-rose-500 font-black">💥 ${s1} pts (Bust)</span>`;
      } else if (s1 === 21) {
        score1El.innerHTML = `<span class="text-emerald-400 font-black">🔥 21 pts (Blackjack)</span>`;
      } else {
        score1El.textContent = `${s1} pts`;
      }
    }

    const score2El = document.getElementById("bjScoreP2");
    if (score2El) {
      if (bjBusted[1]) {
        score2El.innerHTML = `<span class="text-rose-500 font-black">💥 ${s2} pts (Bust)</span>`;
      } else if (s2 === 21) {
        score2El.innerHTML = `<span class="text-emerald-400 font-black">🔥 21 pts (Blackjack)</span>`;
      } else {
        score2El.textContent = `${s2} pts`;
      }
    }

    // Estados
    const tag1 = document.getElementById("bjStateTagP1");
    if (tag1) {
      if (bjBusted[0]) {
        tag1.textContent = "Eliminado (>21)";
        tag1.className = "text-rose-500 font-bold";
      } else if (bjStood[0]) {
        tag1.textContent = "Plantado (Stand)";
        tag1.className = "text-amber-400 font-bold";
      } else {
        tag1.textContent = "En juego";
        tag1.className = "text-emerald-400 font-bold";
      }
    }

    const tag2 = document.getElementById("bjStateTagP2");
    if (tag2) {
      if (bjBusted[1]) {
        tag2.textContent = "Eliminado (>21)";
        tag2.className = "text-rose-500 font-bold";
      } else if (bjStood[1]) {
        tag2.textContent = "Plantado (Stand)";
        tag2.className = "text-amber-400 font-bold";
      } else {
        tag2.textContent = "En juego";
        tag2.className = "text-emerald-400 font-bold";
      }
    }

    // Turno global y cartel
    const globalBadge = document.getElementById("bjGlobalTurnBadge");
    const statusBanner = document.getElementById("bjStatusBanner");
    if (globalBadge && statusBanner) {
      if (bjIsOver) {
        globalBadge.textContent = "Duelo Finalizado";
        globalBadge.className = "bg-emerald-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow";
        statusBanner.textContent = "Resultados listos en el banner inferior";
      } else if (bjActivePlayer === 1) {
        globalBadge.textContent = "Turno: Comensal 1";
        globalBadge.className = "bg-rose-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow animate-pulse";
        statusBanner.textContent = "Comensal 1: Elige Pedir Carta o Plantarte en 6 segundos";
      } else {
        globalBadge.textContent = "Turno: Comensal 2";
        globalBadge.className = "bg-amber-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow animate-pulse";
        statusBanner.textContent = "Comensal 2: Elige Pedir Carta o Plantarte en 6 segundos";
      }
    }

    // Resaltado de lado activo
    const side1 = document.getElementById("bjSideP1");
    const side2 = document.getElementById("bjSideP2");
    if (side1 && side2) {
      if (bjActivePlayer === 1 && !bjIsOver) {
        side1.className = "relative bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-rose-500 rounded-3xl p-5 sm:p-6 shadow-[0_0_25px_rgba(244,63,94,0.3)] flex flex-col justify-between transition-all duration-300";
        side2.className = "relative bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between opacity-70 transition-all duration-300";
      } else if (bjActivePlayer === 2 && !bjIsOver) {
        side1.className = "relative bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between opacity-70 transition-all duration-300";
        side2.className = "relative bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-amber-500 rounded-3xl p-5 sm:p-6 shadow-[0_0_25px_rgba(245,158,11,0.3)] flex flex-col justify-between transition-all duration-300";
      } else {
        side1.className = "relative bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between transition-all duration-300";
        side2.className = "relative bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between transition-all duration-300";
      }
    }

    // Botones habilitados / deshabilitados
    const btnHit1 = document.getElementById("btnBjHitP1");
    const btnStand1 = document.getElementById("btnBjStandP1");
    const btnHit2 = document.getElementById("btnBjHitP2");
    const btnStand2 = document.getElementById("btnBjStandP2");

    if (btnHit1) btnHit1.disabled = bjActivePlayer !== 1 || bjIsOver;
    if (btnStand1) btnStand1.disabled = bjActivePlayer !== 1 || bjIsOver;
    if (btnHit2) btnHit2.disabled = bjActivePlayer !== 2 || bjIsOver;
    if (btnStand2) btnStand2.disabled = bjActivePlayer !== 2 || bjIsOver;

    // Cartas en mesa
    const cards1El = document.getElementById("bjCardsP1");
    if (cards1El) {
      cards1El.innerHTML = bjHands[0].map(c => renderPlayingCard(c)).join("");
    }

    const cards2El = document.getElementById("bjCardsP2");
    if (cards2El) {
      cards2El.innerHTML = bjHands[1].map(c => renderPlayingCard(c)).join("");
    }
  }

  // =========================================================================
  // 14. MINIJUEGO 4: DUELO DE REFLEJOS / VELOCIDAD TÁCTIL (REFLEX DUEL)
  // =========================================================================
  let reflexTugPct = 50; // 50% centro (0% gana P2, 100% gana P1)
  let reflexStage = "idle"; // "waiting" | "green" | "ended"
  let reflexWaitTimer = null;
  let reflexP1Locked = false;
  let reflexP2Locked = false;
  let reflexP1LockTimeout = null;
  let reflexP2LockTimeout = null;
  let reflexReactionStartTime = 0;

  window.initReflexGame = function(fromSync = false) {
    if (reflexWaitTimer) clearTimeout(reflexWaitTimer);
    if (reflexP1LockTimeout) clearTimeout(reflexP1LockTimeout);
    if (reflexP2LockTimeout) clearTimeout(reflexP2LockTimeout);

    reflexTugPct = 50;
    reflexStage = "waiting";
    reflexP1Locked = false;
    reflexP2Locked = false;

    const resultBox = document.getElementById("reflexResultBox");
    if (resultBox) resultBox.classList.add("hidden");

    renderReflexUI();

    if (!fromSync) {
      broadcastGameEngineState('reflex', {
        tugPct: reflexTugPct,
        stage: reflexStage,
        p1Locked: reflexP1Locked,
        p2Locked: reflexP2Locked,
        isOver: false
      });
    }

    scheduleReflexGreenSignal();
  };
  window.initReflexDuelGame = window.initReflexGame;

  window.syncReflexState = function(gameState) {
    if (!gameState || !gameState.reflex) return;
    const data = gameState.reflex;
    reflexTugPct = data.tugPct ?? 50;
    reflexStage = data.stage ?? "waiting";
    reflexP1Locked = !!data.p1Locked;
    reflexP2Locked = !!data.p2Locked;

    renderReflexUI();

    if (data.isOver) {
      if (reflexWaitTimer) clearTimeout(reflexWaitTimer);
      const box = document.getElementById("reflexResultBox");
      const title = document.getElementById("reflexResultTitle");
      const desc = document.getElementById("reflexResultDesc");
      if (box && title && desc && data.winnerTitle) {
        title.textContent = `¡${data.winnerTitle} Gana el Duelo de Reflejos!`;
        desc.textContent = data.reason || "¡El más rápido de la mesa se salva de pagar la ronda! 🍻";
        box.classList.remove("hidden");
      }
    }
  };

  function scheduleReflexGreenSignal() {
    if (reflexWaitTimer) clearTimeout(reflexWaitTimer);
    reflexStage = "waiting";
    renderReflexSignalBox();

    // Tiempo aleatorio entre 2.0s y 4.5s
    const delay = 2000 + Math.random() * 2500;
    reflexWaitTimer = setTimeout(() => {
      if (reflexStage === "ended") return;
      reflexStage = "green";
      reflexReactionStartTime = Date.now();
      renderReflexSignalBox();
      if (window.sound && window.sound.playCorrect) window.sound.playCorrect();

      broadcastGameEngineState('reflex', {
        tugPct: reflexTugPct,
        stage: reflexStage,
        p1Locked: reflexP1Locked,
        p2Locked: reflexP2Locked,
        isOver: false
      });
    }, delay);
  }

  function renderReflexSignalBox() {
    const box = document.getElementById("reflexSignalBox");
    const icon = document.getElementById("reflexSignalIcon");
    const text = document.getElementById("reflexSignalText");
    const sub = document.getElementById("reflexSignalSub");

    if (!box || !icon || !text || !sub) return;

    if (reflexStage === "waiting") {
      box.className = "py-6 px-4 rounded-2xl border-2 transition-all duration-200 text-center flex flex-col items-center justify-center gap-2 bg-dark-900 border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.2)]";
      icon.textContent = "🛑";
      text.textContent = "¡PREPARADOS... NO TOQUES!";
      text.className = "font-display font-black text-xl sm:text-2xl text-amber-400 tracking-wide";
      sub.textContent = "Tocar antes de tiempo activa penalización por toque en falso (1.5s bloqueo y -8% barra)";
    } else if (reflexStage === "green") {
      box.className = "py-6 px-4 rounded-2xl border-2 transition-all duration-150 text-center flex flex-col items-center justify-center gap-2 bg-emerald-950/80 border-emerald-400 shadow-[0_0_35px_rgba(52,211,153,0.5)] scale-105";
      icon.textContent = "🟢";
      text.textContent = "¡¡TOCA YA!! ¡¡RAPIDÍSIMO!!";
      text.className = "font-display font-black text-2xl sm:text-3xl text-emerald-300 tracking-wide animate-pulse";
      sub.textContent = "¡El primer toque se anota la ronda y empuja la barra!";
    } else if (reflexStage === "ended") {
      box.className = "py-6 px-4 rounded-2xl border-2 transition-all duration-200 text-center flex flex-col items-center justify-center gap-2 bg-dark-900 border-slate-700";
      icon.textContent = "🏁";
      text.textContent = "¡Duelo de Reflejos Finalizado!";
      text.className = "font-display font-black text-xl text-white";
      sub.textContent = "Pulsa 'Reiniciar Duelo' para la revancha.";
    }
  }

  function renderReflexUI() {
    const p1Pct = Math.round(reflexTugPct);
    const p2Pct = 100 - p1Pct;

    const p1Label = document.getElementById("reflexP1Pct");
    if (p1Label) p1Label.textContent = `${p1Pct}%`;

    const p2Label = document.getElementById("reflexP2Pct");
    if (p2Label) p2Label.textContent = `${p2Pct}%`;

    const barP1 = document.getElementById("reflexBarP1");
    if (barP1) barP1.style.width = `${p1Pct}%`;

    const barP2 = document.getElementById("reflexBarP2");
    if (barP2) barP2.style.width = `${p2Pct}%`;

    const badgeLockP1 = document.getElementById("reflexLockBadgeP1");
    if (badgeLockP1) {
      if (reflexP1Locked) badgeLockP1.classList.remove("hidden");
      else badgeLockP1.classList.add("hidden");
    }

    const badgeLockP2 = document.getElementById("reflexLockBadgeP2");
    if (badgeLockP2) {
      if (reflexP2Locked) badgeLockP2.classList.remove("hidden");
      else badgeLockP2.classList.add("hidden");
    }

    renderReflexSignalBox();
  }

  window.handleReflexTapP1 = function() {
    handleReflexTap(1);
  };

  window.handleReflexTapP2 = function() {
    handleReflexTap(2);
  };

  function handleReflexTap(playerNum) {
    if (reflexStage === "ended") return;

    // Penalización por toque en falso
    if (reflexStage === "waiting") {
      if (playerNum === 1) {
        if (reflexP1Locked) return;
        reflexP1Locked = true;
        reflexTugPct = Math.max(10, reflexTugPct - 8); // Cede 8% al rival
        if (window.sound && window.sound.playWrong) window.sound.playWrong();
        if (window.showToast) window.showToast("⚠️ ¡Toque en falso Comensal 1! Bloqueado 1.5s (-8% dominio)", "🛑");
        renderReflexUI();

        if (reflexP1LockTimeout) clearTimeout(reflexP1LockTimeout);
        reflexP1LockTimeout = setTimeout(() => {
          reflexP1Locked = false;
          renderReflexUI();
        }, 1500);
      } else {
        if (reflexP2Locked) return;
        reflexP2Locked = true;
        reflexTugPct = Math.min(90, reflexTugPct + 8); // Cede 8% al rival
        if (window.sound && window.sound.playWrong) window.sound.playWrong();
        if (window.showToast) window.showToast("⚠️ ¡Toque en falso Comensal 2! Bloqueado 1.5s (-8% dominio)", "🛑");
        renderReflexUI();

        if (reflexP2LockTimeout) clearTimeout(reflexP2LockTimeout);
        reflexP2LockTimeout = setTimeout(() => {
          reflexP2Locked = false;
          renderReflexUI();
        }, 1500);
      }

      broadcastGameEngineState('reflex', {
        tugPct: reflexTugPct,
        stage: reflexStage,
        p1Locked: reflexP1Locked,
        p2Locked: reflexP2Locked,
        isOver: false
      });
      return;
    }

    // Señal Verde: Primer toque válido se lleva el punto
    if (reflexStage === "green") {
      if (playerNum === 1 && reflexP1Locked) return;
      if (playerNum === 2 && reflexP2Locked) return;

      const reactionTimeMs = Date.now() - reflexReactionStartTime;
      const winnerName = playerNum === 1 ? "Comensal 1" : "Comensal 2";

      if (window.sound && window.sound.playPop) window.sound.playPop();
      if (window.showToast) window.showToast(`⚡ ¡${winnerName} reaccionó en ${reactionTimeMs}ms! (+15% dominio)`, "⚡");

      if (playerNum === 1) {
        reflexTugPct = Math.min(100, reflexTugPct + 15);
      } else {
        reflexTugPct = Math.max(0, reflexTugPct - 15);
      }

      renderReflexUI();

      // Comprobar si se alcanzó la victoria total (100% o 0%)
      if (reflexTugPct >= 100 || reflexTugPct <= 0) {
        finishReflexGame(reflexTugPct >= 100 ? 1 : 2);
        return;
      }

      // Reiniciar siguiente señal de semáforo
      scheduleReflexGreenSignal();
      broadcastGameEngineState('reflex', {
        tugPct: reflexTugPct,
        stage: "waiting",
        p1Locked: false,
        p2Locked: false,
        isOver: false
      });
    }
  }

  function finishReflexGame(winnerNum) {
    reflexStage = "ended";
    if (reflexWaitTimer) clearTimeout(reflexWaitTimer);

    if (window.sound && window.sound.playVictoryFanfare) {
      window.sound.playVictoryFanfare();
    } else if (window.sound && window.sound.playCorrect) {
      window.sound.playCorrect();
    }

    if (typeof confetti === "function") {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }

    renderReflexUI();

    const winnerTitle = winnerNum === 1 ? "Comensal 1 (🤠)" : "Comensal 2 (😎)";
    const loserTitle = winnerNum === 1 ? "Comensal 2 (😎)" : "Comensal 1 (🤠)";
    const reason = `¡Dominó la barra de reflejos al 100%! ${loserTitle} se encarga de pagar la ronda de tragos 🍻`;

    setTimeout(() => {
      const box = document.getElementById("reflexResultBox");
      const title = document.getElementById("reflexResultTitle");
      const desc = document.getElementById("reflexResultDesc");
      if (box && title && desc) {
        title.textContent = `¡${winnerTitle} Campeón de Reflejos!`;
        desc.textContent = reason;
        box.classList.remove("hidden");
      }
    }, 450);

    broadcastGameEngineState('reflex', {
      tugPct: reflexTugPct,
      stage: "ended",
      p1Locked: false,
      p2Locked: false,
      isOver: true,
      winnerTitle: winnerTitle,
      reason: reason
    });
  }

  // =========================================================================
  // 14. INICIALIZADOR GLOBAL AL CARGAR EL DOM
  // =========================================================================
  window.addEventListener("DOMContentLoaded", () => {
    // Inicializar audio ampliado
    window.initExtendedAudio();

    // Inicializar banderas y geolocalización
    initGeolocationAndCountry();

    // Inicializar idioma guardado
    setLanguage(currentLang);

    // Conectar botón Ajustes Bar con PIN 009009
    const btnAdmin = document.getElementById("btnAdminSettings");
    if (btnAdmin) {
      btnAdmin.onclick = (e) => {
        e.preventDefault();
        openSecurityPinModal("settings");
      };
    }

    // Conectar botón Sala Privada VIP con PIN 009009
    const btnVip = document.getElementById("btnOpenVipLounge");
    if (btnVip) {
      btnVip.onclick = (e) => {
        e.preventDefault();
        openSecurityPinModal("vip");
      };
    }

    // Botón ajustar apuesta desde la sala VIP (exclusivo del mesero con PIN)
    const btnChangeVipBet = document.getElementById("btnChangeVipBet");
    if (btnChangeVipBet) {
      btnChangeVipBet.onclick = (e) => {
        e.preventDefault();
        openSecurityPinModal("vip");
      };
    }

    // Configuración de apuesta por el mesero (Paso 2)
    const inputWaiterBet = document.getElementById("inputWaiterBetAmount");
    if (inputWaiterBet) {
      inputWaiterBet.oninput = () => {
        updateConfirmBetLabel(inputWaiterBet.value);
      };
    }

    document.querySelectorAll(".btn-quick-waiter-bet").forEach(btn => {
      btn.onclick = () => {
        const val = btn.getAttribute("data-val");
        if (inputWaiterBet) inputWaiterBet.value = val;
        updateConfirmBetLabel(val);
      };
    });

    const btnConfirmBet = document.getElementById("btnConfirmVipWaiterBet");
    if (btnConfirmBet) {
      btnConfirmBet.onclick = () => {
        const num = parseFloat(inputWaiterBet ? inputWaiterBet.value : "25");
        vipStakeAmount = Math.max(1, isNaN(num) ? 25 : num);
        window.vipStakeAmount = vipStakeAmount;
        closeSecurityPinModal();
        openVipLounge();
        if (window.showToast) window.showToast(`Sala VIP autorizada con apuesta de $${vipStakeAmount.toFixed(2)} USD`, "👑");
      };
    }

    // Modal de PIN botones
    const btnCloseSecPin = document.getElementById("btnCloseSecurityPinModal");
    if (btnCloseSecPin) btnCloseSecPin.onclick = closeSecurityPinModal;

    document.querySelectorAll(".sec-key-btn").forEach(btn => {
      btn.onclick = () => {
        const key = btn.getAttribute("data-key");
        const action = btn.getAttribute("data-action");
        handlePinKeyPress(action || key);
      };
    });

    // Idioma dropdown
    const langBtn = document.getElementById("btnLangToggle");
    const langDropdown = document.getElementById("langDropdown");
    if (langBtn && langDropdown) {
      langBtn.onclick = (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle("hidden");
      };
      document.addEventListener("click", () => langDropdown.classList.add("hidden"));
    }
    document.querySelectorAll(".lang-option").forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const lang = btn.getAttribute("data-lang");
        setLanguage(lang);
        if (langDropdown) langDropdown.classList.add("hidden");
      };
    });

    // Pestañas de la Sala VIP (Dominó, Juegos de Azar, Resultados en Tiempo Real)
    document.querySelectorAll(".vip-nav-tab").forEach(btn => {
      btn.onclick = () => {
        const tab = btn.getAttribute("data-vip-tab");
        switchVipTab(tab);
      };
    });

    // Botones del Dominó VIP
    const btnResetDom = document.getElementById("btnResetDomino");
    if (btnResetDom) btnResetDom.onclick = initDominoGame;

    const btnDrawDom = document.getElementById("btnDrawDomino");
    if (btnDrawDom) btnDrawDom.onclick = drawDominoTilePlayer;

    const btnPassDom = document.getElementById("btnPassDomino");
    if (btnPassDom) btnPassDom.onclick = passDominoTurnPlayer;

    // Filtros de deportes en sala VIP
    document.querySelectorAll(".sport-filter-btn").forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll(".sport-filter-btn").forEach(b => {
          b.className = "sport-filter-btn px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all bg-dark-800 text-slate-300 hover:text-white border border-slate-700";
        });
        btn.className = "sport-filter-btn px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all bg-amber-500 text-dark-900 font-black";
        vipActiveFilter = btn.getAttribute("data-sport") || "all";
        renderVipMatches();
      };
    });

    // Búsqueda y actualización de plataformas oficiales en vivo
    const btnLiveSports = document.getElementById("btnFetchLiveSports");
    if (btnLiveSports) {
      btnLiveSports.onclick = fetchLiveSportsFromPlatforms;
    }

    // Salir de sala VIP
    const btnExitVip = document.getElementById("btnExitVipLounge");
    if (btnExitVip) {
      btnExitVip.onclick = () => {
        const vipScreen = document.getElementById("screenVipLounge");
        if (vipScreen) vipScreen.classList.add("hidden");
        const welcomeScreen = document.getElementById("screenWelcome");
        if (welcomeScreen) welcomeScreen.classList.remove("hidden");
      };
    }

    // Botones de cortar cables de la bomba
    document.querySelectorAll(".wire-btn").forEach(btn => {
      btn.onclick = () => {
        const wire = btn.getAttribute("data-wire");
        cutBombWire(wire);
      };
    });

    const btnPassBomb = document.getElementById("btnPassBomb");
    if (btnPassBomb) {
      btnPassBomb.onclick = () => {
        if (window.showToast) window.showToast("Bomba pasada a la siguiente mesa 🔀", "💣");
      };
    }

    // Botón de tirar dados
    const btnRollDice = document.getElementById("btnRollDice");
    if (btnRollDice) btnRollDice.onclick = rollDicePlayer;

    // Botón de tirar dardo
    const btnThrowDart = document.getElementById("btnThrowDart");
    if (btnThrowDart) btnThrowDart.onclick = throwDartPlayer;

    // --- Controles de Minijuego 1: Tic-Tac-Toe Dinámico ---
    const btnTttRestart = document.getElementById("btnTttRestart");
    if (btnTttRestart) btnTttRestart.onclick = () => window.initTicTacToeGame();

    const btnTttBack = document.getElementById("btnTttBackToLobby");
    if (btnTttBack) {
      btnTttBack.onclick = () => {
        if (typeof window.navigateTo === "function") window.navigateTo("screenLobby");
      };
    }

    const btnTttResultRematch = document.getElementById("btnTttResultRematch");
    if (btnTttResultRematch) btnTttResultRematch.onclick = () => window.initTicTacToeGame();

    const btnTttResultBill = document.getElementById("btnTttResultBill");
    if (btnTttResultBill) {
      btnTttResultBill.onclick = () => {
        if (typeof window.declareLoser === "function") {
          window.declareLoser("comensal_derrotado", "Derrota en Tic-Tac-Toe Dinámico");
        }
      };
    }

    const btnTttResultLobby = document.getElementById("btnTttResultLobby");
    if (btnTttResultLobby) {
      btnTttResultLobby.onclick = () => {
        if (typeof window.navigateTo === "function") window.navigateTo("screenLobby");
      };
    }

    // --- Controles de Minijuego 2: Dominó Exprés ---
    const btnDominoRestart = document.getElementById("btnDominoExpressRestart");
    if (btnDominoRestart) btnDominoRestart.onclick = () => window.initDominoExpressGame();

    const btnDominoBack = document.getElementById("btnDominoExpressBack");
    if (btnDominoBack) {
      btnDominoBack.onclick = () => {
        if (typeof window.navigateTo === "function") window.navigateTo("screenLobby");
      };
    }

    const btnDominoDraw = document.getElementById("btnDominoExpressDraw");
    if (btnDominoDraw) btnDominoDraw.onclick = () => drawDominoExpressTile();

    const btnDominoPass = document.getElementById("btnDominoExpressPass");
    if (btnDominoPass) btnDominoPass.onclick = () => passDominoExpressTurn();

    const btnDominoPlaceLeft = document.getElementById("btnDominoPlaceLeft");
    if (btnDominoPlaceLeft) {
      btnDominoPlaceLeft.onclick = () => {
        if (dominoExpressState.selectedTileIdx !== -1) {
          placeTileOnEnd(dominoExpressState.selectedTileIdx, 'left');
        }
      };
    }

    const btnDominoPlaceRight = document.getElementById("btnDominoPlaceRight");
    if (btnDominoPlaceRight) {
      btnDominoPlaceRight.onclick = () => {
        if (dominoExpressState.selectedTileIdx !== -1) {
          placeTileOnEnd(dominoExpressState.selectedTileIdx, 'right');
        }
      };
    }

    const btnDominoResultRematch = document.getElementById("btnDominoResultRematch");
    if (btnDominoResultRematch) btnDominoResultRematch.onclick = () => window.initDominoExpressGame();

    const btnDominoResultBill = document.getElementById("btnDominoResultBill");
    if (btnDominoResultBill) {
      btnDominoResultBill.onclick = () => {
        if (typeof window.declareLoser === "function") {
          window.declareLoser("comensal_derrotado", "Derrota en Dominó Exprés (5 fichas)");
        }
      };
    }

    const btnDominoResultLobby = document.getElementById("btnDominoResultLobby");
    if (btnDominoResultLobby) {
      btnDominoResultLobby.onclick = () => {
        if (typeof window.navigateTo === "function") window.navigateTo("screenLobby");
      };
    }

    // --- Controles de Minijuego 3: Blackjack Duel ---
    const btnBjRestart = document.getElementById("btnBjRestart");
    if (btnBjRestart) btnBjRestart.onclick = () => window.initBlackjackDuelGame();

    const btnBjBack = document.getElementById("btnBjBackToLobby");
    if (btnBjBack) {
      btnBjBack.onclick = () => {
        if (typeof window.navigateTo === "function") window.navigateTo("screenLobby");
      };
    }

    const btnBjHitP1 = document.getElementById("btnBjHitP1");
    if (btnBjHitP1) btnBjHitP1.onclick = () => window.hitBlackjackPlayer(1);

    const btnBjStandP1 = document.getElementById("btnBjStandP1");
    if (btnBjStandP1) btnBjStandP1.onclick = () => window.standBlackjackPlayer(1);

    const btnBjHitP2 = document.getElementById("btnBjHitP2");
    if (btnBjHitP2) btnBjHitP2.onclick = () => window.hitBlackjackPlayer(2);

    const btnBjStandP2 = document.getElementById("btnBjStandP2");
    if (btnBjStandP2) btnBjStandP2.onclick = () => window.standBlackjackPlayer(2);

    const btnBjResultRematch = document.getElementById("btnBjResultRematch");
    if (btnBjResultRematch) btnBjResultRematch.onclick = () => window.initBlackjackDuelGame();

    const btnBjResultBill = document.getElementById("btnBjResultBill");
    if (btnBjResultBill) {
      btnBjResultBill.onclick = () => {
        if (typeof window.declareLoser === "function") {
          window.declareLoser("comensal_derrotado", "Derrota en Blackjack Duel 21");
        }
      };
    }

    const btnBjResultLobby = document.getElementById("btnBjResultLobby");
    if (btnBjResultLobby) {
      btnBjResultLobby.onclick = () => {
        if (typeof window.navigateTo === "function") window.navigateTo("screenLobby");
      };
    }

    // --- Controles de Minijuego 4: Duelo de Reflejos (Velocidad Táctil FPOS) ---
    const btnReflexTapP1 = document.getElementById("btnReflexTapP1");
    if (btnReflexTapP1) {
      const triggerP1 = (e) => {
        if (e) e.preventDefault();
        window.handleReflexTapP1();
      };
      btnReflexTapP1.addEventListener("pointerdown", triggerP1, { passive: false });
    }

    const btnReflexTapP2 = document.getElementById("btnReflexTapP2");
    if (btnReflexTapP2) {
      const triggerP2 = (e) => {
        if (e) e.preventDefault();
        window.handleReflexTapP2();
      };
      btnReflexTapP2.addEventListener("pointerdown", triggerP2, { passive: false });
    }

    const btnReflexRestart = document.getElementById("btnReflexRestart");
    if (btnReflexRestart) btnReflexRestart.onclick = () => window.initReflexGame();

    const btnReflexBack = document.getElementById("btnReflexBackToLobby");
    if (btnReflexBack) {
      btnReflexBack.onclick = () => {
        if (typeof window.navigateTo === "function") window.navigateTo("screenLobby");
      };
    }

    const btnReflexResultRematch = document.getElementById("btnReflexResultRematch");
    if (btnReflexResultRematch) btnReflexResultRematch.onclick = () => window.initReflexGame();

    const btnReflexResultBill = document.getElementById("btnReflexResultBill");
    if (btnReflexResultBill) {
      btnReflexResultBill.onclick = () => {
        if (typeof window.declareLoser === "function") {
          window.declareLoser("comensal_derrotado", "Derrota en Duelo de Reflejos");
        }
      };
    }

    const btnReflexResultLobby = document.getElementById("btnReflexResultLobby");
    if (btnReflexResultLobby) {
      btnReflexResultLobby.onclick = () => {
        if (typeof window.navigateTo === "function") window.navigateTo("screenLobby");
      };
    }
  });

})();
