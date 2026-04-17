class Marker {
    public int numSetBits(int A) {
        int ans = 0;
        for (int i = 0; i < 32; i++) {
            if ((A & (1 << i)) != 0) {
                ans++;
            }
        }
        return ans;
    }

    public boolean isCorrect(int A, int output) {
        int expected = numSetBits(A);
        return expected == output;
    }
}





