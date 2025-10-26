import { createContext, useContext, useState, useMemo, ReactNode } from 'react';

export type ColorPalette = 'purple' | 'blue' | 'green' | 'orange';
export type GradientStyle = 'linear' | 'radial' | 'conic' | 'diagonal';
export type FontStyle = 'inter' | 'system' | 'mono' | 'serif';
export type BackgroundType = 'solid' | 'gradient' | 'pattern' | 'none';

interface GradientControls {
  angle: number; // 0-360 for linear gradients
  startPosition: number; // 0-100
  endPosition: number; // 0-100
  intensity: number; // 0-100 (opacity/saturation)
  spread: number; // 0-100 (how much the gradient spreads)
}

interface BackgroundSettings {
  type: BackgroundType;
  solidColor: string;
  patternType: 'dots' | 'grid' | 'diagonal' | 'waves';
  patternOpacity: number;
}

interface ThemeContextType {
  colorPalette: ColorPalette;
  setColorPalette: (palette: ColorPalette) => void;
  gradientStyle: GradientStyle;
  setGradientStyle: (style: GradientStyle) => void;
  fontStyle: FontStyle;
  setFontStyle: (font: FontStyle) => void;
  gradientControls: GradientControls;
  setGradientControls: (controls: GradientControls) => void;
  updateGradientControl: (key: keyof GradientControls, value: number) => void;
  backgroundSettings: BackgroundSettings;
  setBackgroundSettings: (settings: BackgroundSettings) => void;
  updateBackgroundSetting: <K extends keyof BackgroundSettings>(key: K, value: BackgroundSettings[K]) => void;
  gradientStyleValue: string;
  gradientClass: string;
  fontClass: string;
  backgroundStyle: React.CSSProperties;
  getPrimaryColors: () => { from: string; to: string; raw: { from: string; to: string } };
  getAccentColors: () => { from: string; to: string };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorPalette, setColorPalette] = useState<ColorPalette>('purple');
  const [gradientStyle, setGradientStyle] = useState<GradientStyle>('linear');
  const [fontStyle, setFontStyle] = useState<FontStyle>('inter');
  const [gradientControls, setGradientControls] = useState<GradientControls>({
    angle: 90, // default left to right
    startPosition: 0,
    endPosition: 100,
    intensity: 100,
    spread: 50,
  });
  const [backgroundSettings, setBackgroundSettings] = useState<BackgroundSettings>({
    type: 'none',
    solidColor: '#f8fafc',
    patternType: 'dots',
    patternOpacity: 10,
  });

  const updateGradientControl = (key: keyof GradientControls, value: number) => {
    setGradientControls(prev => ({ ...prev, [key]: value }));
  };

  const updateBackgroundSetting = <K extends keyof BackgroundSettings>(
    key: K, 
    value: BackgroundSettings[K]
  ) => {
    setBackgroundSettings(prev => ({ ...prev, [key]: value }));
  };

  const getPrimaryColors = () => {
    const palettes = {
      purple: { from: 'from-violet-500', to: 'to-purple-600', raw: { from: '#8b5cf6', to: '#9333ea' } },
      blue: { from: 'from-blue-500', to: 'to-cyan-600', raw: { from: '#3b82f6', to: '#06b6d4' } },
      green: { from: 'from-green-500', to: 'to-emerald-600', raw: { from: '#10b981', to: '#059669' } },
      orange: { from: 'from-orange-500', to: 'to-red-600', raw: { from: '#f97316', to: '#dc2626' } },
    };
    return palettes[colorPalette];
  };

  const getAccentColors = () => {
    const accents = {
      purple: { from: 'from-violet-50', to: 'to-purple-50' },
      blue: { from: 'from-blue-50', to: 'to-cyan-50' },
      green: { from: 'from-green-50', to: 'to-emerald-50' },
      orange: { from: 'from-orange-50', to: 'to-red-50' },
    };
    return accents[colorPalette];
  };

  // Memoize the gradient style to prevent infinite re-renders
  const gradientStyleValue = useMemo(() => {
    const colors = getPrimaryColors();
    const { angle, startPosition, endPosition, intensity, spread } = gradientControls;
    
    // Calculate opacity based on intensity
    const opacity = intensity / 100;
    
    // Get raw color values
    const fromColor = colors.raw.from;
    const toColor = colors.raw.to;
    
    // Add alpha channel to colors
    const fromRGBA = hexToRGBA(fromColor, opacity);
    const toRGBA = hexToRGBA(toColor, opacity);
    
    // Calculate gradient stops based on spread
    const midPoint = spread;
    
    switch (gradientStyle) {
      case 'linear':
        return `linear-gradient(${angle}deg, ${fromRGBA} ${startPosition}%, ${toRGBA} ${endPosition}%)`;
      case 'radial':
        return `radial-gradient(circle at ${midPoint}% 50%, ${fromRGBA} ${startPosition}%, ${toRGBA} ${endPosition}%)`;
      case 'conic':
        return `conic-gradient(from ${angle}deg at 50% 50%, ${fromRGBA} ${startPosition}%, ${toRGBA} ${midPoint}%, ${fromRGBA} ${endPosition}%)`;
      case 'diagonal':
        return `linear-gradient(${angle}deg, ${fromRGBA} ${startPosition}%, ${toRGBA} ${endPosition}%)`;
      default:
        return `linear-gradient(${angle}deg, ${fromRGBA} ${startPosition}%, ${toRGBA} ${endPosition}%)`;
    }
  }, [colorPalette, gradientStyle, gradientControls]);

  // Memoize the gradient class
  const gradientClass = useMemo(() => {
    const colors = getPrimaryColors();
    const gradients = {
      linear: `bg-gradient-to-r ${colors.from} ${colors.to}`,
      radial: `bg-gradient-radial ${colors.from} ${colors.to}`,
      conic: `bg-gradient-conic ${colors.from} ${colors.to}`,
      diagonal: `bg-gradient-to-br ${colors.from} ${colors.to}`,
    };
    return gradients[gradientStyle];
  }, [colorPalette, gradientStyle]);

  // Memoize the font class
  const fontClass = useMemo(() => {
    const fonts = {
      inter: '',
      system: 'font-sans',
      mono: 'font-mono',
      serif: 'font-serif',
    };
    return fonts[fontStyle];
  }, [fontStyle]);

  // Memoize the background style
  const backgroundStyle = useMemo((): React.CSSProperties => {
    const { type, solidColor, patternType, patternOpacity } = backgroundSettings;
    
    switch (type) {
      case 'solid':
        return { backgroundColor: solidColor };
      
      case 'gradient':
        return { 
          background: gradientStyleValue,
          opacity: gradientControls.intensity / 100 
        };
      
      case 'pattern':
        const opacity = patternOpacity / 100;
        const patternStyles = {
          dots: `radial-gradient(circle, rgba(100, 116, 139, ${opacity}) 1px, transparent 1px)`,
          grid: `
            linear-gradient(rgba(100, 116, 139, ${opacity}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 116, 139, ${opacity}) 1px, transparent 1px)
          `,
          diagonal: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(100, 116, 139, ${opacity}) 10px, rgba(100, 116, 139, ${opacity}) 11px)`,
          waves: `radial-gradient(ellipse at top, rgba(100, 116, 139, ${opacity}) 0%, transparent 50%)`
        };
        
        const sizes = {
          dots: '20px 20px',
          grid: '30px 30px',
          diagonal: '20px 20px',
          waves: '100% 50%'
        };
        
        return {
          backgroundColor: solidColor,
          backgroundImage: patternStyles[patternType],
          backgroundSize: sizes[patternType]
        };
      
      case 'none':
      default:
        return {};
    }
  }, [backgroundSettings, gradientStyleValue, gradientControls.intensity]);

  return (
    <ThemeContext.Provider
      value={{
        colorPalette,
        setColorPalette,
        gradientStyle,
        setGradientStyle,
        fontStyle,
        setFontStyle,
        gradientControls,
        setGradientControls,
        updateGradientControl,
        backgroundSettings,
        setBackgroundSettings,
        updateBackgroundSetting,
        gradientStyleValue,
        gradientClass,
        fontClass,
        backgroundStyle,
        getPrimaryColors,
        getAccentColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Helper function to convert hex to RGBA
function hexToRGBA(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
