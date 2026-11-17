# SnapNote: Design Spec

Photo-first notes app. React Native + Expo, expo-router, NativeWind, Zustand theme store.
This is a **visual restyle**. Keep existing routes, stores and auth logic. Match the PNGs in `docs/design/` exactly; this file gives the exact values the images can't.

Reference frame: **390 x 844**. Use real safe-area insets; the mockups use 64px top padding on content screens.
Light and dark modes follow the existing theme store (Light / Dark / System).

---

## 1. Fonts

| Use                      | Font                | Weights  |
| ------------------------ | ------------------- | -------- |
| All UI text              | Bricolage Grotesque | 500, 700 |
| Metadata, labels, counts | DM Mono             | 400      |

Install: `@expo-google-fonts/bricolage-grotesque`, `@expo-google-fonts/dm-mono`. Replaces Inter.

Mono labels are uppercase, 10-12px, letter-spacing `0.04em` (e.g. `NO.014 · 2 NOV`).

| Style                            | Size / line | Weight | Letter-spacing |
| -------------------------------- | ----------- | ------ | -------------- |
| Screen title (Library, Settings) | 46 / 46     | 700    | -0.035em       |
| Welcome headline                 | 40 / 41     | 700    | -0.035em       |
| Note title                       | 34 / 36     | 700    | -0.03em        |
| Sheet title                      | 26          | 700    | -0.02em        |
| Body                             | 16 / 24     | 500    | 0              |
| Button                           | 16-17       | 700    | 0              |
| Tile title                       | 15 / 17     | 700    | 0              |
| Chip                             | 14          | 500    | 0              |

---

## 2. Color tokens

Accent is the same in both modes: **#3DDC84**. Text on the accent is **#0F100D**.
Do not use the accent as text color on the light background (low contrast).

`tailwind.config.js` (`theme.extend.colors`):

```js
colors: {
  accent: { DEFAULT: '#3DDC84', ink: '#0F100D' },
  light: {
    bg: '#F2EEE6', fg: '#16150F', muted: '#5F5A50', card: '#E3DDD0',
    line: '#CFC8B8', sheet: '#FBF8F2', body: '#3A372F', bar: '#16150F',
    danger: '#A8362A', dangerLine: '#E3B5AE',
  },
  dark: {
    bg: '#0F100D', fg: '#F1EFE8', muted: '#A9AEA1', card: '#1F211B',
    line: '#34372E', sheet: '#181A15', body: '#D6D3C9', bar: '#262922',
    danger: '#FF9A8F', dangerLine: '#5A3A38',
  },
  tabIdle: '#C9C4B8',   // inactive tab icon, both modes
}
```

Usage: `className="bg-light-bg dark:bg-dark-bg"`, `text-light-muted dark:text-dark-muted`.

| Token               | Used for                                                      |
| ------------------- | ------------------------------------------------------------- |
| bg                  | screen background                                             |
| fg                  | primary text, selected chip/segment fill, account button fill |
| muted               | mono labels, subtitles, placeholders                          |
| card                | inactive chips, inputs, settings cards, add-sheet rows        |
| line                | input borders, dividers, tag borders, sheet grabber           |
| sheet               | bottom sheets (note detail, add sheet)                        |
| body                | note description text                                         |
| bar                 | floating tab bar background                                   |
| danger / dangerLine | Delete and Log out text / border                              |

Over-photo UI is the same in both modes: round icon buttons `rgba(15,16,13,.55)` with white icons; pills over photos `rgba(15,16,13,.7)`; scrim behind the add sheet `rgba(8,9,7,.55)`.

---

## 3. Shape, size, spacing

| Element                      | Value                                                              |
| ---------------------------- | ------------------------------------------------------------------ |
| Screen side padding          | 20 (Library, New note, Settings), 24 (Welcome, note detail sheet)  |
| Photo tile radius            | 20                                                                 |
| Chip                         | height 44, radius 22, padding-x 16, gap 8                          |
| Primary / secondary button   | height 52-56, fully rounded (radius = height / 2)                  |
| Input                        | height 52, radius 18, 1px `line` border, `card` fill, padding-x 16 |
| Textarea                     | height 104, radius 18, padding 12 16                               |
| Photo preview (New note)     | height 240, radius 24                                              |
| Thumbnails (attached photos) | 72 x 72, radius 14 (New note: 56 x 56)                             |
| Bottom sheet                 | top corners 32, padding 12 20 34, grabber 40 x 4 centered          |
| Add-sheet option row         | height 80, radius 22, icon circle 48 in accent                     |
| Settings card                | radius 20, rows min-height 48, 1px `line` dividers                 |
| Round icon button            | 44 x 44 (touch target minimum 44)                                  |
| Tag                          | border 1px `line`, radius 16, padding 8 12, mono 12                |
| Grid                         | 2 columns, gap 10                                                  |

### Floating tab bar

Absolute, left/right 16, bottom 24, height 72, radius 36, `bar` fill, padding-x 8, items evenly spaced.
Order: **Library, Search, + (center), Pinned, Settings**. There is no location/places tab.
Icon buttons 48 x 48. Active icon `#3DDC84`, idle `tabIdle`.
Center **+** button: 60 x 60 circle, accent fill, `#0F100D` icon, raised 18px above the bar, with a 6px ring in the screen `bg` color around it (box-shadow `0 0 0 6px bg`).

### Icons

`lucide-react-native`, 24px, `strokeWidth` 1.9 (the + uses 2.4), round caps and joins.
Library `LayoutGrid`, Search `Search`, Plus `Plus`, Pinned `Bookmark`, Settings `SlidersHorizontal`, gallery `Image`, camera `Camera`, close `X`, back `ChevronLeft`, share `Share`.

---

## 4. Screens

Each screen exists in light and dark (except Camera, which is always dark). Files in `docs/design/`:
`library`, `note`, `add`, `new-note`, `settings`, `welcome` each as `-light.png` / `-dark.png`, plus `camera.png`.

### Library

- Top row: mono label `SNAPNOTE / 2 NOV` (left), 44px round account button with initials (right; `fg` fill, `bg` text).
- Title "Library" (46). Under it a mono count line, e.g. `128 notes · 342 photos`.
- Filter chips: **All** (selected: `fg` fill, `bg` text), **Pinned**, **Recent** (`card` fill, `fg` text).
- Two-column masonry grid of photo tiles. Tile heights vary (about 110-250); derive from photo aspect ratio, clamped.
- Tile: full-bleed photo, bottom gradient from transparent at 45% to `rgba(10,10,8,.74)`, white title (15/700, max 2 lines) and mono meta (10px, 88% opacity) at left/right 12, bottom 11. Meta format `NO.014 · 2 NOV`.
- Tab bar with Library active.

### Note detail

- Photo fills the top 440px, with a top fade (`rgba(0,0,0,.35)` to transparent) and a bottom fade into the sheet color.
- Round Back (left) and Share (right) buttons at top 56, side 16.
- Sheet starts at y=360 and overlaps the photo; padding 26 24.
- Mono meta `NO.014 · 2 NOV 2026`, title (34), description (16/24, `body` color).
- Row of attached photo thumbnails (72px), last cell a bordered `+2` overflow count.
- Tags row, then actions: **Edit note** (accent, flex 1, height 52) and **Delete** (outline `dangerLine`, `danger` text, width 110).

### Add sheet (opened by the + button)

- Library is visible behind a scrim (`rgba(8,9,7,.55)`).
- Sheet: title "Add to SnapNote", subtitle "Start with a photo, then give it a title and description."
- Two rows: **Choose from gallery** (mono caption `PICK ONE OR MORE PHOTOS`, `Image` icon) and **Take a photo** (`OPEN THE CAMERA`, `Camera` icon).
- Outlined **Cancel** button (muted text).

### Camera

- Full-screen viewfinder with rule-of-thirds lines (1px, white at 35%).
- Top left close button, top right mono `FRAME 015`.
- Bottom panel fades from transparent to `rgba(10,14,12,.94)`: mono label `NEW NOTE`, **Title** input and **Description (optional)** input (height 48, pill, 1px white 30% border, `rgba(15,16,13,.5)` fill, white text).
- Controls row: gallery button (48 circle, left), shutter (76 circle, accent fill with a dark gap ring then a 2px accent ring), empty spacer (right) to keep the shutter centered.

### New note

- Header: close button (44, `card` fill), centered "New note" (17/700), spacer.
- Photo preview with mono `NO.015` top-left and a **Change photo** pill bottom-right.
- Fields with mono labels `TITLE` and `DESCRIPTION` above each (label margin 18 top / 8 bottom).
- Row of 56px thumbnails plus a dashed "add another photo" square (1.5px dashed `muted`).
- **Save note** button pinned at bottom 34, left/right 20, height 56, accent.

### Settings

Title "Settings", then grouped cards with mono group labels (11px, margin 14 top / 8 bottom):

- **ACCOUNT:** Signed in with (Google), Plan
- **APPEARANCE:** segmented control Light / Dark / System (selected segment `fg` fill, `bg` text; 44px segments, radius 14)
- **STORAGE:** Photo quality, Cloud backup (switch: 52 x 32 pill, accent when on, white 26px knob)
- **ABOUT:** Version, Terms and Privacy
- Outlined **Log out** button (`danger`), height 48, then the tab bar with Settings active.

Row values on the right use mono 12px `muted`. These row contents are placeholders; adjust to the real options.

### Welcome (sign in)

- Mono `SNAPNOTE` label, three tall photo columns (340px high, gap 10, radius 20) with top offsets 40 / 0 / 70.
- Headline "Notes that start with a photo.", subtitle "Photo notes, saved. Capture the frame, add a line, find it again." (`muted`).
- Buttons pinned to the bottom: **Continue with Google** (`fg` fill, `bg` text) and **Continue with X** (accent fill), height 54, gap 10.
- Mono terms line: "By continuing you accept the Terms and Privacy Policy".

---

## 5. Flow

`+` (tab bar) -> Add sheet -> **Choose from gallery** or **Take a photo (Camera)** -> New note (title + description, can add more photos) -> **Save note** -> Library.
Library tile -> Note detail -> Edit note / Delete.
Camera can also save directly: title and description are entered on the camera screen.

## 6. Implementation notes

- The gradient "photos" in the mockups are placeholders. Always render the user's real images.
- Build shared components once: `PhotoTile`, `TabBar`, `Chip`, `PrimaryButton`, `Field`, `BottomSheet`, `SettingsGroup`, `SettingsRow`.
- All tappable targets are at least 44 x 44. Icon-only buttons need `accessibilityLabel`. The switch uses `accessibilityRole="switch"`.
- Colors must come from the Tailwind tokens above, driven by the theme store, with no per-component color objects.
- Not designed yet: Search, empty states, Edit note, camera permission prompt. Follow the same tokens and components for those.
