import java.util.*;
class Marker {
    // Returns a string with numbers from 1 to A space-separated, followed by a newline
    public String solve(int A) {
        StringBuilder sb = new StringBuilder();
        printHelper(A, sb);
        sb.append("\n");
        return sb.toString();
    }
    
    private void printHelper(int A, StringBuilder sb) {
        if (A == 0) {
            return;
        }
        printHelper(A - 1, sb);
        sb.append(A).append(" ");
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, String output) {
        String expected = solve(A);
        return expected.equals(output);
    }
}





