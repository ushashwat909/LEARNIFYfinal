import java.util.*;

class Marker {
    // Remove consecutive identical pairs of characters
    public String solve(String A) {
        Stack<Character> st = new Stack<>();
        
        for (int i = 0; i < A.length(); i++) {
            if (st.isEmpty()) {
                st.push(A.charAt(i));
            } else {
                char top = st.peek();
                if (top == A.charAt(i)) {
                    st.pop();
                } else {
                    st.push(A.charAt(i));
                }
            }
        }
        
        // Build result string from stack
        StringBuilder ans = new StringBuilder();
        while (!st.isEmpty()) {
            ans.insert(0, st.pop());
        }
        
        return ans.toString();
    }

    // Compare the output with expected result
    public boolean isCorrect(String A, String output) {
        String expected = solve(A);
        return expected.equals(output);
    }
}





