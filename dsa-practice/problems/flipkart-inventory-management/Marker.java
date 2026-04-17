import java.util.*;

class Marker {
    public int solve(int[] A, int[] B) {
        int n = A.length;
        int mod = 1000000007;
        
        // Create pairs of (deadline, profit) and sort by deadline
        int[][] items = new int[n][2];
        for (int i = 0; i < n; i++) {
            items[i][0] = A[i];
            items[i][1] = B[i];
        }
        Arrays.sort(items, (a, b) -> Integer.compare(a[0], b[0]));
        
        // Min heap to maintain profits of selected items
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        
        for (int i = 0; i < n; i++) {
            int deadline = items[i][0];
            int profit = items[i][1];
            
            if (pq.size() < deadline) {
                // We can still add this item
                pq.offer(profit);
            } else {
                // Heap is full, but if current profit is better than minimum, replace it
                if (profit > pq.peek()) {
                    pq.poll();
                    pq.offer(profit);
                }
            }
        }
        
        // Sum all profits in the heap
        long ans = 0;
        while (!pq.isEmpty()) {
            ans = (ans + pq.poll()) % mod;
        }
        
        return (int) ans;
    }

    public boolean isCorrect(int[] A, int[] B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}

