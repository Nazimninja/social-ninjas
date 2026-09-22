import Foundation
import Capacitor
import ActivityKit

@available(iOS 16.1, *)
@objc(FitNinjaLiveActivity)
public class FitNinjaLiveActivity: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "FitNinjaLiveActivity"
    public let jsName = "FitNinjaLiveActivity"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "startRestActivity", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateRestActivity", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "endRestActivity", returnType: CAPPluginReturnPromise)
    ]

    private var currentActivity: Activity<WorkoutActivityAttributes>?

    @objc func startRestActivity(_ call: CAPPluginCall) {
        guard ActivityAuthorizationInfo().areActivitiesEnabled else {
            call.reject("Live Activities are disabled in system settings")
            return
        }

        let workoutTitle = call.getString("workoutTitle") ?? "Workout Routine"
        let currentExercise = call.getString("currentExercise") ?? "Exercise"
        let currentSetIndex = call.getInt("currentSetIndex") ?? 1
        let totalSets = call.getInt("totalSets") ?? 3
        let nextExercise = call.getString("nextExercise") ?? "Next Exercise"
        let nextExerciseTarget = call.getString("nextExerciseTarget") ?? "Target reps"
        let nextMuscleGroup = call.getString("nextMuscleGroup") ?? ""
        let restEndTimeMs = call.getDouble("restEndTime") ?? (Date().timeIntervalSince1970 * 1000 + 90000)
        let restEndDate = Date(timeIntervalSince1970: restEndTimeMs / 1000.0)

        let attributes = WorkoutActivityAttributes(workoutTitle: workoutTitle)
        let initialState = WorkoutActivityAttributes.ContentState(
            currentExercise: currentExercise,
            currentSetIndex: currentSetIndex,
            totalSets: totalSets,
            nextExercise: nextExercise,
            nextExerciseTarget: nextExerciseTarget,
            nextMuscleGroup: nextMuscleGroup,
            restEndDate: restEndDate,
            isResting: true
        )

        Task {
            do {
                // End existing activity if one was running
                if let existing = self.currentActivity {
                    await existing.end(dismissalPolicy: .immediate)
                }

                let activity = try Activity<WorkoutActivityAttributes>.request(
                    attributes: attributes,
                    contentState: initialState,
                    pushType: nil
                )
                self.currentActivity = activity

                call.resolve([
                    "activityId": activity.id
                ])
            } catch {
                call.reject("Failed to request Live Activity: \(error.localizedDescription)")
            }
        }
    }

    @objc func updateRestActivity(_ call: CAPPluginCall) {
        guard let activity = currentActivity else {
            call.reject("No active Live Activity found")
            return
        }

        let restEndTimeMs = call.getDouble("restEndTime") ?? (Date().timeIntervalSince1970 * 1000 + 30000)
        let restEndDate = Date(timeIntervalSince1970: restEndTimeMs / 1000.0)

        Task {
            var updatedState = activity.contentState
            updatedState.restEndDate = restEndDate
            await activity.update(using: updatedState)
            call.resolve()
        }
    }

    @objc func endRestActivity(_ call: CAPPluginCall) {
        guard let activity = currentActivity else {
            call.resolve()
            return
        }

        Task {
            await activity.end(dismissalPolicy: .immediate)
            self.currentActivity = nil
            call.resolve()
        }
    }
}
