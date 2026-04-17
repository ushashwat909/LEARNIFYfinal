import java.util.*;
class Marker {
    // Count distinct pairs with difference equal to B using two pointers
    public int solve(int[] A, int B) {
        int n = A.length;
        Arrays.sort(A);
        
        // Use set to store distinct pairs (as strings to avoid duplicates)
        Set<String> pairs = new HashSet<>();
        int i = 0;
        int j = 1;
        
        while (i < n && j < n) {
            if (i == j) {
                j++;
                continue;
            }
            
            int diff = A[j] - A[i];
            
            if (diff == B) {
                // Found a pair with difference B
                String pair = A[i] + "," + A[j];
                pairs.add(pair);
                
                // Move both pointers to find next distinct pair
                i++;
                j++;
                
                // Skip duplicates for i
                while (i < n && i > 0 && A[i] == A[i - 1]) {
                    i++;
                }
                // Skip duplicates for j
                while (j < n && j > 0 && A[j] == A[j - 1]) {
                    j++;
                }
            } else if (diff < B) {
                // Need larger difference, move j forward
                j++;
            } else {
                // Difference too large, move i forward
                i++;
            }
        }
        
        return pairs.size();
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}

