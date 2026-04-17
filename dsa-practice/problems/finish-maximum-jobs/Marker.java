import java.util.*;

class Marker {
    public int solve(int[] A, int[] B) {
        int n = A.length;
        
        // Create pairs of (start, finish) and sort by finish time
        int[][] jobs = new int[n][2];
        for (int i = 0; i < n; i++) {
            jobs[i][0] = A[i];
            jobs[i][1] = B[i];
        }
        
        // Sort by finish time
        Arrays.sort(jobs, (a, b) -> Integer.compare(a[1], b[1]));
        
        int count = 1;
        int curEndTime = jobs[0][1];
        
        for (int i = 1; i < n; i++) {
            // If current job starts after the last selected job finishes, select it
            if (jobs[i][0] >= curEndTime) {
                count++;
                curEndTime = jobs[i][1];
            }
        }
        
        return count;
    }

    public boolean isCorrect(int[] A, int[] B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}

