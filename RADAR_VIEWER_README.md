# Radar Viewer - Modern UI/UX Implementation

## Overview
This is a modern, radar-centric frontend implementation inspired by webmet.ohmc.ar with significant UI/UX improvements. The viewer focuses exclusively on radar data visualization with an intuitive, responsive interface.

## Features

### 🎯 Radar-Only Focus
- Clean interface showing only radar-related products
- No WRF, weather stations, or other distractions
- Supports all polarimetric variables (TH, TV, TDR, PHIDP, KDP, RHOHV, VRAD, WRAD, HID)
- Cloud tops visualization (topes de nube)

### ⏱️ Advanced Time Controls
- **Quick Presets**: Select common time ranges with one click
  - Last hour
  - Last 3 hours
  - Last 6 hours
  - Last 12 hours
  - Last 24 hours
- **Custom Date Selection**: Pick any date/time for historical analysis
- **Visual Time Slider**: Intuitive range selection with hour indicators
- **Real-time Mode**: Automatically updates with latest data every 15 minutes

### 🎬 Smooth Animation
- Modern playback controls (play/pause, skip, fast forward/rewind)
- Adjustable playback speed (10% - 100%)
- Timeline slider for direct frame navigation
- Automatic frame preloading for smooth transitions
- Loop mode for continuous playback

### 🎨 Modern UI/UX
- **Gradient Design**: Beautiful color gradients throughout the interface
- **Smooth Transitions**: All interactions include smooth CSS transitions
- **Card-Based Layouts**: Clean, organized product cards
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Floating Controls**: Non-intrusive playback controls at the bottom center
- **Tooltips**: Helpful hints on all interactive elements

### 🗺️ Map Features
- Multiple base layers (OSM, ESRI, IGN Argentina)
- Radar coverage circles
- Mouse position display
- Location search
- Fullscreen mode
- Scale indicator

### ⌨️ Keyboard Shortcuts
- `Space` - Play/Pause animation
- `←` / `→` - Previous/Next frame
- `F` - Toggle fullscreen

### 🎛️ Product Control
- Select up to 4 radar products simultaneously
- Individual opacity control for each product
- Drag-and-drop layer ordering
- Color reference legends
- Quick "Clear All" button

## File Structure

```
frontend/
├── templates/
│   ├── radar_viewer.html          # Main viewer template
│   ├── radar_config_panel.html    # Configuration sidebar
│   └── radar_layers_panel.html    # Product selection sidebar
├── urls.py                         # URL routing (added /radar/ endpoint)
└── views.py                        # View functions

static/
├── css/
│   └── radar_viewer.css           # Modern styling (14KB)
└── js/
    ├── radar_maps.js              # Map initialization
    ├── radar_viewer.js            # Main viewer logic
    └── radar_animation.js         # Animation controls
```

## Usage

### Accessing the Viewer
Navigate to `/radar/` endpoint:
```
http://your-domain.com/radar/
```

You can also pass parameters:
```
http://your-domain.com/radar/?lat=-31.4&long=-64.2&zoom=7
```

### Configuration Panel
Click the **cyan settings button** (⚙️) to access:
- Time range selection
- Map base layer
- Coverage visualization options
- Location search

### Product Selection
Click the **orange layers button** (📚) to:
- Select radar products (up to 4)
- Adjust opacity for each product
- Reorder layers
- View color references

### Playback Controls
Located at the bottom center:
- **⏮️** Fast rewind - Jump to first frame
- **⏪** Previous - Go back one frame
- **▶️/⏸️** Play/Pause - Start/stop animation
- **⏩** Next - Advance one frame  
- **⏭️** Fast forward - Jump to last frame
- **Speed slider** - Adjust playback speed when playing

## Technical Details

### Dependencies
- **Leaflet.js 1.1.0** - Interactive maps
- **Materialize CSS** - UI framework
- **jQuery 2.2.4** - DOM manipulation
- **Moment.js** - Date/time handling
- **noUiSlider** - Range sliders
- **jQuery Datetimepicker** - Date selection

### Browser Support
- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Optimizations
- Canvas rendering for better performance
- Image preloading with error handling
- Lazy loading of radar data
- Throttled frame updates
- CSS transitions via GPU acceleration

## Improvements Over Original

### UI/UX Enhancements
1. **Cleaner Interface**: Removed clutter, focused on radar data
2. **Better Hierarchy**: Clear visual organization with sections
3. **Modern Design**: Gradient backgrounds, card layouts, smooth transitions
4. **Mobile-First**: Responsive design that works on all devices
5. **Accessibility**: Keyboard shortcuts, focus states, ARIA labels

### Functional Improvements
1. **Quick Presets**: Instant access to common time ranges
2. **Better Controls**: Larger, more intuitive playback buttons
3. **Visual Feedback**: Loading states, progress indicators, toast notifications
4. **Smart Limits**: Prevents selecting too many products (max 4)
5. **Help System**: Built-in help modal with instructions

### Technical Improvements
1. **Modular Code**: Separated concerns (maps, viewer, animation)
2. **Error Handling**: Graceful fallbacks for missing images
3. **Memory Management**: Proper cleanup of resources
4. **Code Quality**: Modern JavaScript patterns, proper scoping

## Future Enhancements

Possible additions:
- [ ] Export current view as image
- [ ] Share link with current settings
- [ ] Bookmarks for favorite locations
- [ ] Comparison mode (side-by-side views)
- [ ] Animation GIF export
- [ ] Touch gestures for mobile
- [ ] Offline caching
- [ ] PWA support

## Development

### Local Testing
1. Start Django development server:
   ```bash
   python manage.py runserver
   ```

2. Navigate to:
   ```
   http://localhost:8000/radar/
   ```

### Customization
- **Colors**: Edit CSS variables in `radar_viewer.css` (top of file)
- **Time Presets**: Modify buttons in `radar_config_panel.html`
- **Products**: Configure via Django admin (RadarProduct model)
- **Map Layers**: Add/remove in `radar_maps.js`

## Credits

**Original System**: webmet.ohmc.ar by Grupo Radar Córdoba
**Modern Implementation**: Enhanced radar-centric viewer with improved UI/UX
**Technologies**: Django, Leaflet.js, Materialize CSS

## License

Same as parent project (webmet24)

---

For questions or issues, please refer to the main project documentation.
