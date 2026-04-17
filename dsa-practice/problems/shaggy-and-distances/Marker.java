import java.util.*;

class Marker {
    public int solve(int[] A) {
        Map<Integer, Integer> indexMap = new HashMap<>();
        int minDistance = Integer.MAX_VALUE;
        
        for (int i = 0; i < A.length; i++) {
            int value = A[i];
            
            if (indexMap.containsKey(value)) {
                // Calculate the distance between the current index and the last index of the same value
                int distance = i - indexMap.get(value);
                minDistance = Math.min(minDistance, distance);
            }
            
            // Update the last index of the current value
            indexMap.put(value, i);
        }
        
        // If no special pair is found, return -1; otherwise, return the minimum distance
        return minDistance == Integer.MAX_VALUE ? -1 : minDistance;
    }

    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}


