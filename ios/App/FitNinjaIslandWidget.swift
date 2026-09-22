import SwiftUI
import WidgetKit
import ActivityKit

@available(iOS 16.1, *)
struct FitNinjaIslandWidget: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: WorkoutActivityAttributes.self) { context in
            // ─────────────────────────────────────────────────────────────
            // 1. Lock Screen & StandBy Live Activity Banner
            // ─────────────────────────────────────────────────────────────
            VStack(alignment: .leading, spacing: 8) {
                HStack(alignment: .center) {
                    HStack(spacing: 6) {
                        Image(systemName: "figure.strengthtraining.traditional")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(.blue)
                        Text(context.attributes.workoutTitle)
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundColor(.secondary)
                    }

                    Spacer()

                    // Native system countdown text — counts down smoothly even with phone locked!
                    if context.state.isResting {
                        HStack(spacing: 4) {
                            Image(systemName: "timer")
                                .font(.system(size: 12, weight: .bold))
                                .foregroundColor(.blue)
                            Text(timerInterval: Date.now...context.state.restEndDate, countsDown: true)
                                .font(.system(size: 14, weight: .bold, design: .monospaced))
                                .foregroundColor(.blue)
                        }
                        .padding(.horizontal, 8)
                        .padding(.vertical, 3)
                        .background(Color.blue.opacity(0.15))
                        .cornerRadius(8)
                    }
                }

                Divider().background(Color.white.opacity(0.1))

                HStack(alignment: .top) {
                    VStack(alignment: .leading, spacing: 3) {
                        Text("UP NEXT")
                            .font(.system(size: 9, weight: .black))
                            .foregroundColor(.blue)
                            .tracking(1.2)

                        Text(context.state.nextExercise)
                            .font(.system(size: 15, weight: .bold))
                            .foregroundColor(.white)
                            .lineLimit(1)

                        Text(context.state.nextExerciseTarget)
                            .font(.system(size: 12, weight: .medium))
                            .foregroundColor(.secondary)
                    }

                    Spacer()

                    if !context.state.nextMuscleGroup.isEmpty {
                        Text(context.state.nextMuscleGroup)
                            .font(.system(size: 10, weight: .semibold))
                            .padding(.horizontal, 7)
                            .padding(.vertical, 3)
                            .background(Color.white.opacity(0.1))
                            .foregroundColor(.white.opacity(0.8))
                            .cornerRadius(6)
                    }
                }
            }
            .padding(14)
            .background(Color(red: 0.05, green: 0.07, blue: 0.11))
        } dynamicIsland: { context in
            // ─────────────────────────────────────────────────────────────
            // 2. Dynamic Island Presentation
            // ─────────────────────────────────────────────────────────────
            DynamicIsland {
                // ── Expanded Region: When user long-presses Dynamic Island ─
                DynamicIslandExpandedRegion(.leading) {
                    HStack(spacing: 5) {
                        Image(systemName: "figure.strengthtraining.traditional")
                            .foregroundColor(.blue)
                        Text(context.state.currentExercise)
                            .font(.caption2.bold())
                            .lineLimit(1)
                    }
                    .padding(.leading, 4)
                }

                DynamicIslandExpandedRegion(.trailing) {
                    if context.state.isResting {
                        Text(timerInterval: Date.now...context.state.restEndDate, countsDown: true)
                            .font(.title3.bold().monospacedDigit())
                            .foregroundColor(.blue)
                            .padding(.trailing, 4)
                    }
                }

                DynamicIslandExpandedRegion(.bottom) {
                    VStack(alignment: .leading, spacing: 4) {
                        HStack {
                            Text("UP NEXT")
                                .font(.system(size: 9, weight: .black))
                                .foregroundColor(.blue)
                                .tracking(1)

                            Spacer()

                            if !context.state.nextMuscleGroup.isEmpty {
                                Text(context.state.nextMuscleGroup)
                                    .font(.system(size: 9, weight: .bold))
                                    .foregroundColor(.white.opacity(0.6))
                            }
                        }

                        Text("\(context.state.nextExercise) — \(context.state.nextExerciseTarget)")
                            .font(.subheadline.bold())
                            .foregroundColor(.white)
                            .lineLimit(1)
                    }
                    .padding(.horizontal, 8)
                    .padding(.vertical, 6)
                    .background(Color.white.opacity(0.06))
                    .cornerRadius(12)
                }
            } compactLeading: {
                // ── Compact Leading: Left pill cutout ────────────────────
                HStack(spacing: 3) {
                    Image(systemName: "timer")
                        .font(.system(size: 11, weight: .bold))
                        .foregroundColor(.blue)
                }
                .padding(.leading, 4)
            } compactTrailing: {
                // ── Compact Trailing: Right pill cutout ──────────────────
                if context.state.isResting {
                    Text(timerInterval: Date.now...context.state.restEndDate, countsDown: true)
                        .font(.system(size: 12, weight: .bold, design: .monospaced))
                        .foregroundColor(.blue)
                        .frame(width: 44, alignment: .trailing)
                        .padding(.trailing, 4)
                } else {
                    Text("DONE")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(.green)
                }
            } minimal: {
                // ── Minimal: When multiple apps share the Island ─────────
                Image(systemName: "timer")
                    .foregroundColor(.blue)
            }
        }
    }
}
