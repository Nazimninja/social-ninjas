# Fit Ninja: Dynamic Island & Live Activities Architecture & Setup Guide

This guide explains how **Fit Ninja** achieves deep integration with Apple's **Dynamic Island**, **Lock Screen Live Activities**, and **background rest timers** even when the app is minimized or closed.

---

## Architecture: Dual-Tier Engine

Fit Ninja utilizes an intelligent dual-tier engine:

```
┌────────────────────────────────────────────────────────┐
│               WorkoutSessionContext                    │
│   (Global workout state, sets, rest timer, up next)    │
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
 ┌───────────────────────┐   ┌───────────────────────────┐
 │   Tier 1: Web / PWA   │   │     Tier 2: Native iOS    │
 ├───────────────────────┤   ├───────────────────────────┤
 │ • Dynamic Island Pill │   │ • Apple ActivityKit       │
 │ • Web Audio Chimes    │   │ • SwiftUI Island Widget   │
 │ • MediaSession API    │   │ • Lock Screen Live Widget │
 │ • Web Notifications   │   │ • Zero-battery countdown  │
 └───────────────────────┘   └───────────────────────────┘
```

### Tier 1: Web & PWA (Runs everywhere immediately)
* **Floating In-App Dynamic Island**: Fixed top pill matching Apple's hardware design. Shows live countdown ring, set info, and the **"UP NEXT"** exercise preview card.
* **Lock Screen MediaSession**: Uses `navigator.mediaSession` to push rest countdowns and upcoming exercises to the iPhone/Android Lock Screen and Apple Watch playback HUD.
* **Web Audio Synthesizer**: Generates 3-2-1 second audio warnings and a finish fanfare through the device speakers.

### Tier 2: Native iOS ActivityKit (iPhone 14 Pro, 15, 16+)
* **Hardware Dynamic Island**: Renders in the physical cutout:
  * **Compact Leading**: Blue barbell / timer glyph
  * **Compact Trailing**: Native `Text(timerInterval:..., countsDown: true)` hardware countdown
  * **Expanded View (Long-press)**: High-resolution card with rest ring, current set stats, "+30s Rest" / "Skip Rest" buttons, and the **"UP NEXT"** exercise card.
* **Zero Battery Background Execution**: iOS natively handles the countdown on the screen hardware without needing the app to run in the background.

---

## Setting Up Native iOS in Xcode

### Prerequisites
* macOS with Xcode 15+ installed
* iOS device with Dynamic Island (iPhone 14 Pro/Pro Max, iPhone 15/Plus/Pro/Pro Max, iPhone 16 series) or Xcode Simulator

### Steps

1. **Install Capacitor iOS CLI (if not already installed)**:
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/ios
   ```

2. **Build Web Assets**:
   ```bash
   npm run build
   npx cap add ios
   npx cap sync ios
   ```

3. **Enable Live Activities in `Info.plist`**:
   In `ios/App/App/Info.plist`, ensure the following boolean key is added:
   ```xml
   <key>NSSupportsLiveActivities</key>
   <true/>
   ```

4. **Add the Widget Extension**:
   * Open the project in Xcode:
     ```bash
     npx cap open ios
     ```
   * In Xcode, click **File > New > Target...**
   * Choose **Widget Extension**, name it `FitNinjaIslandWidgetExtension`, and uncheck "Include Configuration Intent".
   * Replace the generated widget code with:
     * `ios/App/WorkoutActivityAttributes.swift`
     * `ios/App/FitNinjaIslandWidget.swift`
   * Make sure `WorkoutActivityAttributes.swift` is checked in the Target Membership for **both** the main `App` and `FitNinjaIslandWidgetExtension`.

5. **Register the Native Plugin**:
   * Add `ios/App/LiveActivitiesPlugin.swift` to the main `App` target.

6. **Run on Device**:
   * Select your iPhone target and press **Cmd + R**.
   * Start a workout, check off a set, and lock your phone or swipe home to see the **Dynamic Island** and **Lock Screen Live Activity** in action!
