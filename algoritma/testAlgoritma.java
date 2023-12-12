
class ScheduleTest {
    String startTime;
    String endTime;

    public ScheduleTest(String startTime, String endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

public class testAlgoritma {
    public static boolean checkConflicts(ScheduleTest[] schedules) {
        int[] timeWindow = new int[24]; // 24 jam dalam sehari

        boolean conflicts = false;

        for (ScheduleTest schedule : schedules) {
            String[] startTokens = schedule.startTime.split(":");
            String[] endTokens = schedule.endTime.split(":");

            int startHour = Integer.parseInt(startTokens[0]);
            int startMinute = Integer.parseInt(startTokens[1]);
            int endHour = Integer.parseInt(endTokens[0]);
            int endMinute = Integer.parseInt(endTokens[1]);

            // Konversi waktu mulai dan selesai ke dalam indeks jendela waktu
            int startIndex = startHour;
            int endIndex = endHour;

            // Memeriksa tumpang tindih waktu dalam jendela waktu
            for (int i = startIndex; i < endIndex; i++) {
                if (timeWindow[i] > 0) {
                    conflicts = true;
                    System.out.println("Konflik ditemukan: " + schedule.startTime + " - " + schedule.endTime);
                    break;
                } else {
                    timeWindow[i]++;
                }
            }
        }

        if (!conflicts) {
            System.out.println("Tidak ada konflik dalam jadwal.");
        }

        return conflicts;
    }

    public static void main(String[] args) {
        ScheduleTest[] schedules = new ScheduleTest[5];
        schedules[0] = (new ScheduleTest("12:00", "15:00"));
        schedules[1] = (new ScheduleTest("13:00", "15:00"));
        schedules[2] = new ScheduleTest("10:00", "12:00"); 
        schedules[3] = new ScheduleTest("11:00", "12:00"); 
        schedules[4] = new ScheduleTest("13:00", "16:00"); 
        System.out.println("Cek Schedule 1 : ");
        checkConflicts(schedules);
    }
}