# Birthday Wishes — Design Brainstorm

## Three stylistic approaches

### 1. Theme Name: The Keepsake Conservatory
**Very Brief Intro:** A sunlit, botanical love letter composed from vellum paper, delicate florals, and heirloom scrapbook details. It feels intimate, tactile, and quietly celebratory rather than loud or sugary.

**Probability:** 0.07

### 2. Theme Name: A Letter From Midnight
**Very Brief Intro:** A midnight-blue celestial celebration with constellations, candlelight, and a single theatrical birthday reveal. It feels cinematic and a little mysterious.

**Probability:** 0.02

### 3. Theme Name: Blush Paper Moon
**Very Brief Intro:** A dreamlike pink paper-world of floating hearts, translucent stationery, and warm candlelight. It turns the birthday greeting into an unfolding love letter that invites small moments of play.

**Probability:** 0.08

---

## Chosen approach: Blush Paper Moon

### Design Movement
**Modern romantic editorial meets paper-craft dreamscape.** The composition borrows the calm luxury of a printed keepsake journal, then layers it with translucent glass, hand-cut heart silhouettes, miniature stars, and the soft buoyancy of a paper mobile.

### Core Principles
1. **Reveal before explanation:** The birthday cake opening creates anticipation; each following section feels like another page of a surprise.
2. **Soft objects with an analogue soul:** Glass surfaces, paper edges, ink marks, satin ribbons, and shadows make digital interactions feel collected and personal.
3. **Asymmetry with a clear emotional focal point:** Every scene is balanced around a large intimate object rather than centered boxes in a generic grid.
4. **Play is considerate:** Interaction rewards curiosity—opening an envelope, moving a note, turning a page—without becoming noisy or hard to navigate.

### Color Philosophy
The visual system starts with **porcelain pink** and a warm cream background so it feels like a cherished card, not a candy shop. **Cherry-ribbon red** is reserved for the most important actions and heartfelt emphasis; dusty rose and burgundy create depth. A pale gold glow evokes candlelight and keeps the celebration warm.

### Layout Paradigm
The page is a **vertical storybook trail** instead of a conventional component grid. The hero is a full-screen stage. Following sections alternate between a handwritten left-leaning column and a floating object on the opposite side. Curved paper “ribbons” overlap section edges to make the scroll feel continuous. The diary closes the journey as a generous full-width final page.

### Signature Elements
1. **Paper Moon:** A half-moon cut from soft pink paper, appearing in the hero and later as a notebook tab motif.
2. **Cherry-ink doodles:** Hand-drawn heart loops, date marks, and underline flourishes that frame, but never obstruct, content.
3. **Glass stationery:** Frosted, gently translucent cards with paper-like border highlights and soft internal shine.

### Interaction Philosophy
Opening the envelope is an intentional reveal. Love notes are draggable on pointer devices and remain readable with keyboard-accessible controls. Memory cards turn like pages with a clear tap/click affordance. Buttons use a tiny press-in response, and all movement honors reduced-motion preferences.

### Animation
The opening uses a 1.4-second candle-and-confetti sequence: a small flame flickers, the cake rises on a soft spring, then the greeting blooms in with an editorial stagger. Hearts drift slowly with varied durations and lateral paths. Page flips use a 650ms cubic-bezier fold; cards only rotate enough to suggest paper, not a game UI. Hover transitions run at 180ms, while celebratory reveals take 450–800ms. Reduced-motion replaces floating/flip motion with subtle opacity transitions.

### Typography System
**DM Serif Display** is the warm, expressive display face used for major messages and diary headings. **Manrope** handles readable body copy and buttons with friendly precision. **Caveat** is used sparingly for names, doodle labels, and handwritten annotations. Headings retain generous letter spacing; body copy stays compact and calm.

### Brand Essence
**A private birthday love letter for someone worth celebrating in every little detail.**

Personality: **tender, luminous, playful**.

### Brand Voice
Headlines feel like direct, specific affection. CTAs invite a small emotional action rather than sounding transactional. Microcopy sounds like a note left inside a book.

Example lines:

> “Today, the whole sky is a little more yours.”

> “Open when you’re ready for something sweet.”

### Wordmark & Logo
The logo is a **cherry-red ribbon heart** folded around a tiny four-point candle spark, drawn as one recognizable symbol without text. The wordmark combines a high-contrast serif with a small handwritten “for you” tail when it appears in the footer.

### Signature Brand Color
**Cherry Ribbon — #D84562.** A warm, emotionally vivid red-pink used sparingly as the unmistakable celebratory signal.

## Style Decisions

- The **Paper Moon** is a recognizable hand-cut half-moon in the hero and reappears as a letter-section seal and diary tab.
- Section changes overlap with irregular paper ribbons, avoiding plain block-to-block cuts.
- Frosted vellum, bright inner borders, and soft reflected shine appear in the hero art, envelope letter, and note stage to reinforce the luminous glass-stationery language.
- Utility copy uses the private love-letter voice: visitors are invited to add a touch, return to the original, or seal a page close.
