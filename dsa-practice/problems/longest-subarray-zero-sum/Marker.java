import java.util.*;

class Marker {
    // Find the length of the longest subarray with sum zero
    public int solve(int[] A) {
        Map<Long, Integer> prefixSumMap = new HashMap<>();
        long prefixSum = 0;
        int maxLength = 0;
        
        for (int i = 0; i < A.length; i++) {
            prefixSum += A[i];
            
            // If prefix sum is 0, subarray from start to current index sums to zero
            if (prefixSum == 0) {
                maxLength = i + 1;
            }
            // If prefix sum was seen before, subarray between those indices sums to zero
            else if (prefixSumMap.containsKey(prefixSum)) {
                maxLength = Math.max(maxLength, i - prefixSumMap.get(prefixSum));
            }
            // Store first occurrence of this prefix sum
            else {
                prefixSumMap.put(prefixSum, i);
            }
        }
        
        return maxLength;
    }
    
    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}


