# ReaderApp Notes Implementation Specification

## Overview
Triple-navigation notes interface with smart grouping, fuzzy search, infinite scroll support, and autosave functionality.

---

## Architecture

### 1. Global Search Bar (Top)
- **Location**: Fixed header, height 56px
- **Features**:
  - Real-time search across all notes (title, tags, content)
  - Cmd+K / Ctrl+K keyboard shortcut focus
  - Autosave status indicator (✓ Kaydedildi / Kaydediliyor…)
  - Green dot animation when saved, amber when saving

### 2. Column 1: Books (260px width)
#### Recently Used Section
- Top 5-7 most recent books as icons (44x44px)
- Gradient backgrounds per book
- Click to quick-select

#### Search & Categories
- Book search bar (filter by name)
- Collapsible categories:
  - 📘 Okunu (currently reading) — expanded by default
  - 📘 Okunan (finished) — collapsed by default
  - ⭐ Favori (favorites)
  - 🆕 Yeni Eklenen (newly added)
  - _Add more as needed_

#### Each Book Item Shows:
- Gradient icon (24x24px)
- Book name (truncated with ellipsis)
- Note count (smaller text, lighter color)

### 3. Column 2: Notes List (300px, resizable to 280-400px)
#### Resizable Right Border
- 4px draggable edge on right side
- Shows violet on hover/drag
- Min width: 280px, Max width: 400px

#### Header
- Book name + note count
- Note search bar (filters by title/tags/content)
- Filter chips: Tümü / 📜 Alıntı / 🖊 Kişisel / ✏️ İşaret

#### Note Cards
- **Personal Notes**: 🖊 icon (violet background)
- **Quotes**: 📜 icon (amber background) + left border 3px amber + italic text
- **Highlights**: ✏️ icon (emerald background)

Each card shows:
- Icon (22x22px)
- Title (1 line, ellipsis)
- Preview (2 lines max, truncated)
- Tags (#tag1 #tag2)
- Time (top-right corner)

#### Sticky Group Headers
- Position sticky, top: 0
- Format: "Bugün", "Bu Hafta", "Geçen Ay", "Ücret Ay", etc.
- Based on note creation date
- Minimal styling (small caps, light color)

#### Virtual Scrolling
- Use @tanstack/react-virtual
- Only render visible items + buffer (50px above/below viewport)
- Support for 500+ notes without lag
- Group headers should stick to top during scroll

### 4. Column 3: Zen Editor (Flex 1)
#### Topbar (44px)
- Breadcrumb: 📘 BookName › Note Title
- Buttons: 🔗 Bağla, 🏷 Etiket (no Save button)
- Minimal styling, transparent background

#### Note Type Badge
- 📜 Alıntı / 🖊 Kişisel Not / ✏️ İşaretleme
- Inline, small (10px), colored border

#### Title (contenteditable)
- 28px font weight 700
- Auto-focus when note selected
- Outline: none

#### Metadata Row
- Date created (with calendar icon)
- Book & page number
- Tags (clickable)
- Flex wrap, light gray color

#### Body (contenteditable)
- 15px font size, 1.8 line-height
- Min-height: 200px
- Support blockquote formatting
- Highlight spans with light violet background

#### Blockquote Styling
- Left border: 3px amber
- Padding: 12px 16px
- Background: rgba(251,191,36,0.06)
- Italic, amber text
- Border-radius: 0 6px 6px 0

#### Backlinks Section
- "↩ Geri Bağlantılar" title
- Clickable chips (link to other notes)
- Hide if empty

---

## Features

### 1. Autosave
- **Trigger**: On `blur` event from title/body (contenteditable)
- **Status**: "Kaydediliyor…" → "Kaydedildi" (after 500ms)
- **Visual**: Green dot pulse animation while saving
- **Backend**: Save to `notesStore` (Zustand)
- **No explicit Save button** — pure autosave flow

### 2. Resizable Columns
- Col 2 (notes list) can be dragged from right edge
- Min: 280px, Max: 400px
- Smooth CSS transition (0.3s)
- Save width to localStorage

### 3. Smart Grouping
- Group by date: Bugün, Dün, Bu Hafta, Geçen Ay, Daha Eski
- Sticky headers (position: sticky, top: 0)
- Sort by creation date descending

### 4. Fuzzy Search
- **Global**: Top search bar → searches all notes (title + tags + body)
- **Local (Col 2)**: Per-book search
- **Real-time**: Filter notes as user types
- **Case-insensitive**
- Match on:
  - Title (full word or partial)
  - Tags (e.g., search "#güç" returns notes with #güç tag)
  - Body text (first 100 chars preview)

### 5. Filter Chips
- Tümü: Show all notes
- 📜 Alıntı: Only notes with type = 'quote'
- 🖊 Kişisel: Only notes with type = 'personal'
- ✏️ İşaret: Only notes with type = 'highlight'
- Combine with search: search FIRST, then apply type filter

### 6. Book Categories
- **Google Books Integration** (future):
  - Fetch categories from Google Books API (free tier)
  - Or use hardcoded categories:
    - 📱 Teknoloji
    - 🚀 Bilim Kurgu
    - 🤔 Felsefe
    - 💪 Kişisel Gelişim
    - 📖 Tarih
    - 🎨 Sanat
    - 🧠 Psikoloji
    - 📊 Ekonomi
    - ✍️ Edebiyat
    - 🌍 Sosyoloji
- Books in store already have a `category` field
- Categories are collapsible
- Search within categories

### 7. Keyboard Shortcuts
- **Cmd+K / Ctrl+K**: Focus global search
- **Enter in note card**: Select note and focus editor
- **Escape**: Blur editor

---

## Data Structure

### Note Object
```typescript
interface Note {
  id: string                    // UUID or timestamp
  kitap_id: number             // Book ID
  baslik: string               // Title
  icerik: string               // HTML content (from TipTap)
  etiketler: string[]          // Tags array: ['güç', 'karakter']
  tur: 'kisisel' | 'alintiş' | 'isaretleme'  // Type
  olusturulma_tarihi: ISO8601  // Created date
  guncellenme_tarihi: ISO8601  // Updated date
  sayfa: number                // Page number (optional)
  basari_durumu: 'kaydedildi' | 'kaydediliyor' | 'hata'  // Autosave state
}
```

### Book Object (existing, add if missing)
```typescript
interface Book {
  id: number
  ad: string                   // Title
  yazar: string                // Author
  kategori: string             // Google Books category
  resim: string                // Cover URL
  aciklama: string             // Description
  notlar: Note[]               // Notes for this book
}
```

---

## Implementation Steps (For Cursor)

### Step 1: Update NotesPool.jsx Structure
- Move search bar to top-level app (new global bar)
- Restructure 3-column layout:
  - Col 1: Books (move from NotesPanel, enhance)
  - Col 2: Notes list (from NotesPool)
  - Col 3: Editor (from NotePoolRichEditor)

### Step 2: Global Search Component
- Create `GlobalSearchBar.jsx`
- Implement Cmd+K focus
- Real-time fuzzy search across ALL notes
- Highlight matches in results

### Step 3: Books Column
- Create `BooksPanel.jsx`
- Recently-used logic (sort by last access)
- Category collapse/expand state (localStorage)
- Book search filter

### Step 4: Notes List (Virtual Scrolling)
- Replace current list with `useVirtualizer` (@tanstack/react-virtual)
- Implement date grouping (sticky headers)
- Filter + search combined logic
- Resizable right edge (drag handler)

### Step 5: Zen Editor
- Remove Save button
- Implement autosave on blur
- Autosave status indicator (top bar)
- contenteditable with outline: none
- Blockquote + highlight styling

### Step 6: Styling & Polish
- CSS transitions (0.3s for column width)
- Hover states on all interactive elements
- Glow effects (box-shadow on active)
- Dark theme consistency (all colors from :root vars)

### Step 7: Testing
- Test with 500+ notes
- Test all filters + search combinations
- Test autosave (offline support?)
- Test keyboard shortcuts
- Test column resizing

---

## Color Palette (Already in CSS)
```
--bg0: #08080f        // Main background
--bg1: #0d0d18        // Panels background
--bg2: #13131f        // Input/button background
--bg3: #1a1a28        // Hover state
--border: rgba(255,255,255,0.06)
--text1: #e8e8f0      // Primary text
--text2: #9090a8      // Secondary text
--text3: #5a5a72      // Tertiary text (labels)
--violet: #a78bfa     // Accent (primary actions)
--amber: #fbbf24      // Quotes
--emerald: #34d399    // Saved state
```

---

## Performance Considerations
1. **Virtual Scrolling**: Must handle 500+ notes smoothly
2. **Debounce Search**: 200-300ms debounce on input
3. **Lazy Load**: Images in notes (if any)
4. **Zustand Store**: Already optimized, use selectors
5. **contenteditable**: Consider CodeMirror/TipTap for large notes

---

## Future Enhancements
- Markdown preview mode
- Rich text toolbar (floating)
- Note templates
- Collaborative editing (WebSocket)
- Export notes (PDF/Markdown)
- Offline sync
- Dark/Light theme toggle
- Note versioning (history)

---

## File Organization
```
src/
├── components/
│   ├── NotesPool.jsx          (main container, 3-column layout)
│   ├── GlobalSearchBar.jsx    (top search + autosave indicator)
│   ├── BooksPanel.jsx         (left column, books + categories)
│   ├── NotesList.jsx          (middle column, virtual list)
│   └── NoteEditor.jsx         (right column, zen editor)
├── lib/
│   ├── noteSearch.js          (fuzzy search logic)
│   ├── noteGrouping.js        (date grouping logic)
│   └── noteVirtualizer.js     (virtual scrolling setup)
└── store/
    └── notesStore.js          (already exists, update as needed)
```

---

## Notes
- All text is in Turkish (✓ double-check all strings)
- No external UI library (pure CSS + TailwindCSS)
- Keyboard-first interaction design
- Mobile: responsive (hide Col 1 on small screens)
