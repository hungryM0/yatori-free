---
name: Chromatic Material
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#424753'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#727785'
  outline-variant: '#c2c6d5'
  surface-tint: '#005ac1'
  primary: '#0058bd'
  on-primary: '#ffffff'
  primary-container: '#2771df'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#006e2c'
  on-secondary: '#ffffff'
  secondary-container: '#86f898'
  on-secondary-container: '#00722f'
  tertiary: '#765700'
  on-tertiary: '#ffffff'
  tertiary-container: '#956e00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004494'
  secondary-fixed: '#89fa9b'
  secondary-fixed-dim: '#6ddd81'
  on-secondary-fixed: '#002108'
  on-secondary-fixed-variant: '#005320'
  tertiary-fixed: '#ffdea0'
  tertiary-fixed-dim: '#fbbc06'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.1px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.5px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

This design system is built on the principles of clarity, optimism, and systematic order. It draws inspiration from modern Material Design, focusing on a friendly yet professional aesthetic that prioritizes content through a minimalist, card-based interface. 

The personality is approachable and intelligent, designed to feel like a helpful assistant. It utilizes a high-clarity visual language characterized by ample whitespace, a vibrant color palette, and soft, organic shapes. The emotional response should be one of reliability and ease of use, making complex tasks feel manageable and engaging.

## Colors

The palette is anchored by four iconic hues. **Google Blue** serves as the primary action color, used for links, primary buttons, and active states to denote focus and progress. **Google Green** is utilized for success states and growth-related data. **Google Yellow** acts as a warm accent for warnings or highlighting, while **Google Red** is reserved for errors and critical alerts.

The background uses a soft off-white (`#F8F9FA`) to reduce eye strain compared to pure white, while surfaces (cards) use pure white (`#FFFFFF`) to create a subtle natural lift. Text utilizes a deep charcoal gray rather than pure black to maintain a softer, more modern contrast.

## Typography

The design system exclusively uses **Plus Jakarta Sans** to achieve a soft, geometric, and contemporary look. The typeface's open counters and modern proportions ensure high legibility across all digital surfaces.

Headlines should use tighter letter-spacing and heavier weights to create a strong visual anchor. Body text is set with generous line-height to ensure readability in long-form content. Labels use a medium weight to differentiate themselves from standard body text, even at smaller scales.

## Layout & Spacing

The layout is built on an 8px grid system, ensuring a consistent mathematical rhythm across all components. 

### Grid Model
- **Desktop:** A 12-column fluid grid with 24px gutters and 32px side margins. 
- **Tablet:** An 8-column grid with 24px gutters and 24px margins.
- **Mobile:** A 4-column grid with 16px gutters and 16px margins.

Spacing should be used to group related elements together (8px-16px) and separate distinct sections (24px-40px). Negative space is a functional tool here, not just an aesthetic choice; it is used to prevent the interface from feeling cluttered despite the colorful palette.

## Elevation & Depth

Hierarchy is established through a mix of **tonal layers** and **ambient shadows**. The design avoids heavy, dark shadows in favor of light, diffused shadows that mimic natural light.

- **Level 0 (Background):** Neutral surface (`#F8F9FA`).
- **Level 1 (Cards/Sheet):** Pure white surface with a subtle 1px border (`#E0E0E0`) or a very soft shadow (Blur: 4px, Y: 2px, Opacity: 0.05).
- **Level 2 (Hover/Active):** Slightly deeper shadow (Blur: 12px, Y: 4px, Opacity: 0.1) to indicate interactivity.
- **Level 3 (Modals/Menus):** Maximum elevation with a broad, soft shadow to focus user attention.

Interactive elements use a "lift" effect on hover, where the shadow expands slightly to provide tactile feedback.

## Shapes

The shape language is defined by friendly, rounded corners. Standard components like cards and input fields use an 8px radius (`rounded-md`). 

Buttons and chips utilize a more pronounced rounding—often 12px or full pill-shapes—to distinguish them as touch-friendly, interactive objects. This consistent use of rounded geometry softens the systematic nature of the grid, reinforcing the "friendly professional" brand narrative.

## Components

### Buttons
Primary buttons use the Google Blue background with white text. Secondary buttons use a tonal variant (light blue background with blue text) or a simple outline. All buttons have a minimum height of 48px for accessibility.

### Cards
Cards are the primary container for content. They should have an 8px-12px corner radius, a white background, and a subtle shadow or light border. Padding within cards should default to 24px (`md`).

### Input Fields
Inputs use a "Filled" or "Outlined" Material style. The active state is indicated by a 2px Google Blue bottom border or stroke. Labels should float or remain visible to maintain context.

### Chips
Used for filtering or tags. Chips are highly rounded (pill-shaped) and utilize the secondary/tertiary colors at low opacity (e.g., 10% Green) with high-contrast text for a sophisticated, colorful look.

### Selection Controls
Checkboxes and radio buttons use Google Blue for the selected state. Toggle switches should have a soft, fluid animation when transitioning states.

### Sign-in Monitor & Logs
The Sign-in Monitor interface uses a split-layout presenting configuration on the left and history/logs on the right. 
- **Status Indicator**: Employs live indicators (pulsing green dot for `running`, rotating amber spinner for `reconnecting`, solid gray dot for `stopped`, warning icon for `failed`).
- **Configuration Groups**: Features distinct visual clusters for each sign-in type, tagged with category icons (e.g., MapPin for location details, Fingerprint for gesture/codes, Camera for photo IDs).
- **Log History**: Presents historical activity with semantic status badges (emerald/blue for successful/already-signed events, amber for pending details, red for failures) alongside human-readable relative timestamps.