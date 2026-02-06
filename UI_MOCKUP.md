# Radar Viewer UI Mockup

## Main Interface Layout

```
┌────────────────────────────────────────────────────────────────────┐
│  ┌─────┐                                                   [OSM ▼] │
│  │ GRC │                                                    [🔍]    │
│  │OHMC │                                              Lat/Lon: ... │
│  └─────┘                                                            │
│  ┌──────────┐                                                       │
│  │Inst Logos│                                                       │
│  └──────────┘                                                       │
│                                                                     │
│                         🗺️  MAP AREA                               │
│                     (Leaflet Interactive Map)                       │
│                   with Radar Overlays & Legends                     │
│                                                                     │
│  ╔═══════════════════════════════════════╗                         │
│  ║  ┌──────────────────────────────┐    ║                         │
│  ║  │ TH (Reflectividad)           │    ║  ← Product References   │
│  ║  │ 60  50  40  30  20  10       │    ║    (Color Legend)       │
│  ║  └──────────────────────────────┘    ║                         │
│  ╚═══════════════════════════════════════╝                         │
│                                                                     │
│                                                                     │
│  ╭─────────────────────────────────────────────────────────╮       │
│  │ ⏮️  ⏪  ▶️  ⏩  ⏭️                                       │ Playback│
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░ (Timeline)              │ Controls│
│  │ Velocidad: ▓▓▓▓░░░░░░ 50%                             │       │
│  ╰─────────────────────────────────────────────────────────╯       │
│                                                                     │
│                                                             ╔═══╗   │
│                                                             ║ ☰ ║   │
│                                                             ║⚙️ ║   │
│                                                             ║📚║   │
│                                                             ║🖥️║   │
│                                                             ║❓║   │
│                                                             ╚═══╝   │
│ ┌──────────────────────────────────────────────────────────────┐   │
│ │ Rango: 20/01/2024 18:00 - 21/01/2024 00:00                 │   │
│ │ Mostrando: 20/01/2024 21:30 (Frame 14 de 25)               │   │
│ └──────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────┘
```

## Configuration Panel (Sidebar Right)

```
╔════════════════════════════════════╗
║  ⚙️  Configuración                 ║
╠════════════════════════════════════╣
║                                    ║
║  🕐 Selección de Tiempo            ║
║  ────────────────────────────────  ║
║                                    ║
║  Rangos Rápidos:                   ║
║  ┌──────────────────────────────┐  ║
║  │ Última hora                  │  ║
║  ├──────────────────────────────┤  ║
║  │ Últimas 3 horas              │  ║
║  ├──────────────────────────────┤  ║
║  │ Últimas 6 horas              │  ║
║  ├──────────────────────────────┤  ║
║  │ Últimas 12 horas             │  ║
║  ├──────────────────────────────┤  ║
║  │ Últimas 24 horas             │  ║
║  └──────────────────────────────┘  ║
║                                    ║
║  Modo Actual [▓▓▓] Personalizado   ║
║                                    ║
║  ╭────────────────────────────╮    ║
║  │ Fecha y Hora Base:         │    ║
║  │ [20/01/2024 18:00      ▼]  │    ║
║  ╰────────────────────────────╯    ║
║                                    ║
║  Ventana de Tiempo:                ║
║  -6h ▓▓▓▓▓▓▓▓▓░░░░░░░░░ 0h        ║
║                                    ║
║  🗺️  Mapa Base                     ║
║  ────────────────────────────────  ║
║  ○ Open Street Map                 ║
║  ● ESRI Mapa                       ║
║  ○ ESRI Satelital                  ║
║  ○ ESRI Topográfico                ║
║  ○ IGN Argentina                   ║
║                                    ║
║  📡 Visualización                  ║
║  ────────────────────────────────  ║
║  ☑ Mostrar Radios de Cobertura     ║
║  ☑ Mostrar Topes de Nube           ║
║                                    ║
║  🔍 Búsqueda de Ubicación          ║
║  ────────────────────────────────  ║
║  [Buscar ciudad...             🔍] ║
║                                    ║
╚════════════════════════════════════╝
```

## Product Layers Panel (Sidebar Right)

```
╔════════════════════════════════════╗
║  📚 Productos de Radar             ║
╠════════════════════════════════════╣
║                                    ║
║  ℹ️ Puedes seleccionar hasta 4     ║
║     productos simultáneamente      ║
║  ────────────────────────────────  ║
║                                    ║
║  ╭────────────────────────────╮    ║
║  │ ☑ TH - Reflectividad       │    ║
║  │    Reflectividad           │    ║
║  │    horizontal en dBz       │    ║
║  │                            │    ║
║  │    💧 Transparencia   🎨   │    ║
║  │    ▓▓▓▓▓▓▓▓▓░░░░ 100%      │    ║
║  │                     ⋮⋮      │    ║
║  ╰────────────────────────────╯    ║
║                                    ║
║  ╭────────────────────────────╮    ║
║  │ ☑ VRAD - Velocidad Radial  │    ║
║  │    Velocidad de           │    ║
║  │    partículas             │    ║
║  │                            │    ║
║  │    💧 Transparencia   🎨   │    ║
║  │    ▓▓▓▓▓▓▓▓▓░░░░ 100%      │    ║
║  │                     ⋮⋮      │    ║
║  ╰────────────────────────────╯    ║
║                                    ║
║  ╭────────────────────────────╮    ║
║  │ ☐ PHIDP - Fase             │    ║
║  │    Diferencial             │    ║
║  │                        🎨  │    ║
║  │                     ⋮⋮      │    ║
║  ╰────────────────────────────╯    ║
║                                    ║
║  ╭────────────────────────────╮    ║
║  │ ☐ RHOHV - Correlación      │    ║
║  │    Coeficiente de          │    ║
║  │    correlación             │    ║
║  │                        🎨  │    ║
║  │                     ⋮⋮      │    ║
║  ╰────────────────────────────╯    ║
║                                    ║
║  ── Radares Disponibles ──         ║
║                                    ║
║  ╭────────────────────────────╮    ║
║  │ ☑ RMA1 - Radar Córdoba     │    ║
║  ╰────────────────────────────╯    ║
║  ╭────────────────────────────╮    ║
║  │ ☑ RMA3 - Radar Paraná      │    ║
║  ╰────────────────────────────╯    ║
║                                    ║
║  ── Controles Generales ──         ║
║                                    ║
║  ☑ Habilitar Capas de Radar        ║
║                                    ║
║  Opacidad General                  ║
║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%              ║
║                                    ║
║  [ 🗑️ Limpiar Selección ]          ║
║                                    ║
╚════════════════════════════════════╝
```

## Help Modal

```
╔═══════════════════════════════════════════════╗
║  ❓ Ayuda - Visualizador de Radar            ║
╠═══════════════════════════════════════════════╣
║                                               ║
║  Controles de Reproducción                    ║
║  ────────────────────────────────────────────║
║  ▶️ Reproducir/Pausar                         ║
║     Inicia o pausa la animación              ║
║                                               ║
║  ⏩ Frame siguiente/anterior                  ║
║     Navega frame por frame                   ║
║                                               ║
║  ⏭️ Ir al inicio/final                        ║
║     Salta al primer o último frame           ║
║                                               ║
║  Selección de Productos                       ║
║  ────────────────────────────────────────────║
║  • Usa el panel de Productos de Radar        ║
║  • Selecciona hasta 4 productos              ║
║  • Ajusta transparencia con deslizadores     ║
║                                               ║
║  Configuración de Tiempo                      ║
║  ────────────────────────────────────────────║
║  • Usa rangos predefinidos (1h, 3h, 6h...)   ║
║  • Selecciona fecha/hora personalizada       ║
║                                               ║
║  Atajos de Teclado                            ║
║  ────────────────────────────────────────────║
║  [Espacio]  - Reproducir/Pausar              ║
║  [← →]      - Frame anterior/siguiente       ║
║  [F]        - Pantalla completa              ║
║                                               ║
║                         [ Entendido ]         ║
╚═══════════════════════════════════════════════╝
```

## Color Scheme

### Gradients
- **Primary**: Purple-Blue (#667eea → #764ba2)
- **Secondary**: Pink-Red (#f093fb → #f5576c)
- **Accent**: Orange (#ff9800)
- **Success**: Green (#4caf50)

### UI Elements
- **Cards**: White with subtle shadow
- **Buttons**: Rounded, colored with gradients
- **Sliders**: Gradient fills showing progress
- **Text**: Dark gray (#212121) primary, Light gray (#757575) secondary

## Responsive Breakpoints

### Desktop (>992px)
- Full sidebar width (400px)
- Large playback controls
- All features visible

### Tablet (768px-992px)
- Medium sidebar width (350px)
- Medium playback controls
- Compact layout

### Mobile (<768px)
- Full-width sidebars (80vw)
- Bottom sheet style panels
- Touch-optimized controls
- Smaller text and spacing

## Animation States

### Loading
```
┌────────────────────┐
│  🔄 Cargando...    │
│  [====    ]        │
│  Frame 12 de 25    │
└────────────────────┘
```

### Playing
```
┌────────────────────┐
│  ⏸️  PAUSAR        │
│  ▓▓▓▓▓▓░░░░░░      │
│  Velocidad: 50%    │
└────────────────────┘
```

### Error
```
┌────────────────────┐
│  ⚠️  Sin datos     │
│  disponibles       │
│  [Reintentar]      │
└────────────────────┘
```

---

This mockup represents the modern, clean interface design of the radar viewer with improved usability and visual hierarchy.
