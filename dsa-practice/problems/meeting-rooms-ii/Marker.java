import java.util.*;

class Marker {
    public int solve(int A, int[][] B) {
        if (B == null || B.length == 0) {
            return 0;
        }
        
        // Sort meetings by start time
        Arrays.sort(B, (a, b) -> Integer.compare(a[0], b[0]));
        
        // Min-heap to track the end times of ongoing meetings
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.offer(B[0][1]);
        
        for (int i = 1; i < A; i++) {
            // If the earliest meeting to end has ended by the time the current meeting starts
            if (minHeap.peek() <= B[i][0]) {
                minHeap.poll();  // Free up a room
            }
            
            // Add the current meeting's end time to the heap
            minHeap.offer(B[i][1]);
        }
        
        // The size of the heap is the number of rooms required
        return minHeap.size();
    }

    public boolean isCorrect(int A, int[][] B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}


