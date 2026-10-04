import java.util.Calendar;
import java.util.TimeZone;
import android.content.SharedPreferences;
import android.os.CountDownTimer;

// --- FITUR BATAS TAMBANG 10 MENIT - FINAL VQI ANTI BANNED ---
SharedPreferences prefs = getSharedPreferences("vqi_mining", MODE_PRIVATE);
Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
long today = cal.get(Calendar.DAY_OF_YEAR);
long lastDay = prefs.getLong("last_day", -1);
long usedMillis = prefs.getLong("used_today", 0);

if (today != lastDay) {
    usedMillis = 0;
    prefs.edit().putLong("last_day", today).putLong("used_today", 0).apply();
}

long MAX_MENIT = 10 * 60 * 1000;
long sisa = MAX_MENIT - usedMillis;

if (sisa <= 0) {
    btnMining.setEnabled(false);
    btnMining.setText("Limit Harian Tercapai (10 Menit) - Besok Lagi");
    return;
}

CountDownTimer timer = new CountDownTimer(sisa, 1000) {
    public void onTick(long millisUntilFinished) {
        long menit = millisUntilFinished / 60000;
        long detik = (millisUntilFinished % 60000) / 1000;
        btnMining.setText("Menambang... Sisa " + menit + ":" + detik);
        prefs.edit().putLong("used_today", MAX_MENIT - millisUntilFinished).apply();
    }
    public void onFinish() {
        btnMining.setEnabled(false);
        btnMining.setText("Selesai 10 Menit Hari Ini!");
        stopMiningService();
        saveLedgerToFile();
    }
}.start();
