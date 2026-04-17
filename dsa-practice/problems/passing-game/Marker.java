import java.util.*;

class Marker {
    // Find the player who has the ball after A passes
    public int solve(int A, int B, int[] C) {
        Stack<Integer> st = new Stack<>();
        st.push(B);
        
        for (int i = 0; i < A; i++) {
            if (C[i] != 0) {
                st.push(C[i]);
            } else {
                st.pop();
            }
        }
        
        return st.peek();
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int B, int[] C, int output) {
        int expected = solve(A, B, C);
        return expected == output;
    }
}





