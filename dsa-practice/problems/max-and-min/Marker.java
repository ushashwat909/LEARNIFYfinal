import java.util.*;
class Marker {
    private static final int MOD = 1000000007;
    
    // Calculate sum of (max - min) for all subarrays using contribution technique
    public int solve(int[] A) {
        int n = A.length;
        
        // Find nearest smaller element on left (nsl)
        int[] nsl = new int[n];
        Stack<Integer> st = new Stack<>();
        st.push(0);
        nsl[0] = -1;
        
        for (int i = 1; i < n; i++) {
            while (!st.isEmpty() && A[i] <= A[st.peek()]) {
                st.pop();
            }
            if (!st.isEmpty()) {
                nsl[i] = st.peek();
            } else {
                nsl[i] = -1;
            }
            st.push(i);
        }
        
        // Find nearest smaller element on right (nsr)
        int[] nsr = new int[n];
        st.clear();
        st.push(n - 1);
        nsr[n - 1] = n;
        
        for (int i = n - 2; i >= 0; i--) {
            while (!st.isEmpty() && A[i] <= A[st.peek()]) {
                st.pop();
            }
            if (!st.isEmpty()) {
                nsr[i] = st.peek();
            } else {
                nsr[i] = n;
            }
            st.push(i);
        }
        
        // Find nearest greater element on left (ngl)
        int[] ngl = new int[n];
        st.clear();
        st.push(0);
        ngl[0] = -1;
        
        for (int i = 1; i < n; i++) {
            while (!st.isEmpty() && A[i] >= A[st.peek()]) {
                st.pop();
            }
            if (!st.isEmpty()) {
                ngl[i] = st.peek();
            } else {
                ngl[i] = -1;
            }
            st.push(i);
        }
        
        // Find nearest greater element on right (ngr)
        int[] ngr = new int[n];
        st.clear();
        st.push(n - 1);
        ngr[n - 1] = n;
        
        for (int i = n - 2; i >= 0; i--) {
            while (!st.isEmpty() && A[i] >= A[st.peek()]) {
                st.pop();
            }
            if (!st.isEmpty()) {
                ngr[i] = st.peek();
            } else {
                ngr[i] = n;
            }
            st.push(i);
        }
        
        // Calculate contribution of each element
        long ans = 0;
        for (int i = 0; i < n; i++) {
            long maxCont = (long)(ngr[i] - i) * (long)(i - ngl[i]);
            long minCont = (long)(nsr[i] - i) * (long)(i - nsl[i]);
            ans = (ans + (long)A[i] * (maxCont - minCont)) % MOD;
        }
        
        return (int)(ans % MOD);
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}

