import Foundation
import ActivityKit

public struct WorkoutActivityAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic states updated over the course of the workout
        public var currentExercise: String
        public var currentSetIndex: Int
        public var totalSets: Int
        public var nextExercise: String
        public var nextExerciseTarget: String
        public var nextMuscleGroup: String
        public var restEndDate: Date
        public var isResting: Bool

        public init(
            currentExercise: String,
            currentSetIndex: Int,
            totalSets: Int,
            nextExercise: String,
            nextExerciseTarget: String,
            nextMuscleGroup: String,
            restEndDate: Date,
            isResting: Bool
        ) {
            self.currentExercise = currentExercise
            self.currentSetIndex = currentSetIndex
            self.totalSets = totalSets
            self.nextExercise = nextExercise
            self.nextExerciseTarget = nextExerciseTarget
            self.nextMuscleGroup = nextMuscleGroup
            self.restEndDate = restEndDate
            self.isResting = isResting
        }
    }

    // Static metadata fixed for the activity
    public var workoutTitle: String

    public init(workoutTitle: String) {
        self.workoutTitle = workoutTitle
    }
}
