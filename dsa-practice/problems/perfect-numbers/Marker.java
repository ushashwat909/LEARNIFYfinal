import java.util.*;

class Marker {
    // Find the Ath Perfect Number
    // Perfect Number: contains only 1 and 2, even number of digits, palindrome
    public String solve(int A) {
        Deque<String> dq = new ArrayDeque<>();
        dq.addLast("1");
        dq.addLast("2");
        
        int count = 0;
        while (!dq.isEmpty()) {
            String x = dq.removeFirst();
            count++;
            
            if (count == A) {
                // Return x + reverse(x) to form palindrome
                return x + reverse(x);
            }
            
            // Add x+'1' and x+'2' to queue for next iterations
            dq.addLast(x + "1");
            dq.addLast(x + "2");
        }
        
        return "";
    }
    
    // Helper method to reverse a string
    private String reverse(String s) {
        StringBuilder sb = new StringBuilder(s);
        return sb.reverse().toString();
    }
    
    // Compare the output with expected result
    public boolean isCorrect(int A, String output) {
        String expected = solve(A);
        return expected.equals(output);
    }
}

