# BUBT TAFE IELTS Academy — Computer-Delivered Examination & TRF Certification Portal

> **Proprietary Software** • Built exclusively for **BUBT TAFE** (Bangladesh University of Business and Technology).  
> **Lead Architect & Engineer**: [Masruf Rahman](https://www.masrufrahman.info)  
> **Examination Headquarters**: Office Room 307, Building 01, BUBT Campus, Mirpur-2, Dhaka  
> **Official Hotline**: `01827459921`

---

## 🏛️ Executive Overview

The **BUBT TAFE IELTS Academy Portal** is an enterprise-grade, computer-delivered IELTS simulation and administration platform. Designed with strict academic integrity standards, the system enforces a clear separation between the public **Student Candidate Portal** and the secure **Examiner & Administrative Hub**.

### 🔒 Core Institutional Architecture: Zero Online Score Leakage
In accordance with official institutional testing protocol:
- **No Band Scores are Disclosed to Candidates Online**: Upon test completion, students are issued a cryptographically verified **Submission Verification Slip** containing their candidate ID, timestamp, and security hash.
- **Physical TRF Handover**: Official printed and stamped **Test Report Forms (TRF)** must be collected in person from **Office Room 307, Building 01** upon presenting the verification slip and student identification.

---

## 🌟 Key System Capabilities

### 1. 🎓 Candidate Examination Portal (`/`)
- **Institutionally Themed Interface**: Designed with BUBT TAFE Navy/Royal Blue `#0b2860` and authentic IELTS Crimson Red accents `#cc0000`, incorporating Google Sans and Nunito typography.
- **Candidate Registration & Session Management**:
  - Full registration capturing Full Name, Email, Contact Mobile (`01827459921`), University, National ID / Student ID, Target Band Score, and Address.
  - Multi-profile management with instant `➕ Register New Candidate` and `✕ Clear Session` controls.
- **4-Module Computer-Delivered IELTS Test Engine**:
  - **🎧 Listening Section (40 Questions)**:
    - **Audible Spoken Narration**: Utilizes browser **Web SpeechSynthesis** configured for British/Cambridge examination cadence.
    - **Acoustic Chimes**: Dual-tone sine wave chimes via **Web Audio API** signaling test section transitions.
    - **Interactive Audio Deck**: Headphone sound-check (`🔊 Test Speaker`), volume slider, playback speed toggles (`0.9x`, `1.0x`, `1.15x`), animated 5-bar audio waveform, and dialogue transcript drawer.
  - **📖 Reading Section (40 Questions)**:
    - Synchronized dual-pane layout with 3 comprehensive Academic Passages.
    - Split-screen question pane supporting MCQs, True/False/Not Given, and Sentence Completion.
  - **✍️ Writing Section (Tasks 1 & 2)**:
    - Task 1: 150-word Academic Visual/Data Report.
    - Task 2: 250-word Discursive Analytical Essay.
    - Real-time word count monitoring, visual progress bars, and autosave.
  - **🎙️ Speaking Section (Parts 1, 2, 3)**:
    - **Genuine MediaRecorder Capture**: Real microphone hardware stream capturing user voice into audio chunks.
    - **Base64 Persistence**: Encodes recorded voice into Base64 Data URLs so audio survives page reloads and transfers securely to examiner records.
    - **Self-Review & Retake**: Candidate can listen back to their recorded answers via native in-browser audio players before finalizing submission.
- **Verification Receipt Modal**:
  - Immediately delivers printable PDF and digital receipts directing the candidate to Room 307, Building 01.

---

### 2. 🛡️ Examiner & Administrative Hub (`/admin`)
- **Security Access Gate**: Passcode-protected administrative entry (Default: `bubt2026`).
- **Comprehensive Candidate Dossiers Table**:
  - High-density evaluation roster with responsive `min-w-[960px]` overflow container.
  - Monospace, nowrap Candidate ID tracking (`BUBT-2026-XXXX`).
  - **Sticky Right Actions Column**: Actions (**Grade**, **Print TRF**, **Delete**) remain anchored on screen during horizontal inspection.
- **🎙️ Speaking Evaluation Lab**:
  - Dedicated examiner playback deck playing candidates' actual recorded speech chunks.
  - Real-time scoring across the four official Cambridge assessment criteria:
    - **FC**: Fluency & Coherence
    - **LR**: Lexical Resource
    - **GRA**: Grammatical Range & Accuracy
    - **PR**: Pronunciation
  - Live band score moderator and examiner remarks recorder.
- **🛠️ 4-Module Mock Test Builder**:
  - Author complete Cambridge-standard IELTS mock tests directly within the browser.
  - Live voice preview button (`🔊 Test Voice Narration`) to audit listening dialogues before publication.
  - Full Question, Reading Passage, and Essay prompt editors with instant live publishing.
- **🖨️ Institutional TRF (Test Report Form) PDF Generator**:
  - Generates authentic, stamped, high-resolution Test Report Forms (TRF) using `jsPDF`.
  - Includes watermarks, institutional seals, candidate photo placeholders, band breakdown tables, and official signatory blocks.
- **🧪 Testing & Database Controls**:
  - **Clear Database (Fresh Start)**: 1-click clean slate for new test trials.
  - **Load Sample Demo Data**: Instant population of authentic test submissions for demonstration.

---

## 💻 Tech Stack & Architecture

- **Framework**: Next.js 16.4 (Turbopack, App Router)
- **UI Engine**: React 19, Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **Audio & Media**:
  - Web Audio API (Frequency synthesis & exam acoustic cues)
  - Web SpeechSynthesis API (IELTS dialogue narration engine)
  - HTML5 MediaRecorder API (Real microphone stream capture & chunk encoding)
- **PDF Engine**: jsPDF (Vectorized institutional TRFs & submission slips)
- **Persistence Layer**: LocalStorage Data Layer with Base64 media persistence

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.18.0 or later)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/masrufOfficial/IETLS-Mock-Test-Portal.git
   cd IETLS-Mock-Test-Portal
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Access the applications**:
   - **Student Examination Portal**: [http://localhost:3000](http://localhost:3000)
   - **Examiner & Administration Hub**: [http://localhost:3000/admin](http://localhost:3000/admin) *(Passcode: `bubt2026`)*

### Production Build
```bash
npm run build
npm start
```

---

## 🏢 Institutional Venue & Contact

- **Institution**: BUBT TAFE (Bangladesh University of Business and Technology)
- **Center**: Official IELTS Examination & Certification Division
- **Office**: Room 307, Building 01, BUBT Campus, Mirpur-2, Dhaka
- **Hotline**: `01827459921`

---

## ⚖️ License & Intellectual Property

**PROPRIETARY & CONFIDENTIAL — NOT OPEN SOURCE**

Copyright © 2026 **Masruf Rahman** ([www.masrufrahman.info](https://www.masrufrahman.info)) & **BUBT TAFE**. All rights reserved.

This software and its documentation are strictly proprietary. Unauthorized copying, modification, distribution, sublicensing, decompilation, public display, or commercial hosting of this codebase or its derived works via any medium is strictly prohibited. Refer to the [LICENSE](./LICENSE) file for complete terms.
