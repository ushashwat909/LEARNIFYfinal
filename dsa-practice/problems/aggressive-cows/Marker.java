import java.util.*;

class Marker {
    // Check if it's possible to place B cows with minimum distance 'mid'
    private boolean check(int mid, int[] A, int B) {
        int cnt = 1; // number of cows placed
        int current = A[0];
        
        for (int i = 1; i < A.length; i++) {
            if (A[i] - current >= mid) {
                cnt++;
                current = A[i];
            }
        }
        
        return cnt >= B;
    }
    
    // Find the largest minimum distance possible among B cows
    public int solve(int[] A, int B) {
        // Sort the array first
        Arrays.sort(A);
        
        int lo = 1;
        int hi = A[A.length - 1] - A[0];
        int ans = 0;
        
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (check(mid, A, B)) {
                ans = mid;
                lo = mid + 1; // Try to find larger distance
            } else {
                hi = mid - 1;
            }
        }
        
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}





