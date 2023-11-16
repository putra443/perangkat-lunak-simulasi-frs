class Schedule {
    String hari;
    String name;
    String startTime;
    String endTime;


    public Schedule(String hari,String name, String startTime, String endTime) {
        this.hari = hari;
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

class weekTime{
    int[][] timeWindow;

    public weekTime(int[][] timeWindow){
        this.timeWindow=timeWindow;
    }
}

public class ScheduleSpread {
    public static boolean checkConflicts(Schedule[] schedules) {
        Schedule[][] timeWindow = new Schedule[5][18]; // 24 jam dalam sehari

        boolean conflicts = false;

        for (Schedule schedule : schedules) {
            String[] startTokens = schedule.startTime.split(":");
            String[] endTokens = schedule.endTime.split(":");

            int startHour = Integer.parseInt(startTokens[0]);
            int endHour = Integer.parseInt(endTokens[0]);

            // Konversi waktu mulai dan selesai ke dalam indeks jendela waktu
            int startIndex = startHour;
            int endIndex = endHour;

            int indexHari = 0;
            if(schedule.hari.equals("senin") || schedule.hari.equals("Senin")){
                indexHari=0;
            }
            else if(schedule.hari.equals("selasa") || schedule.hari.equals("Selasa")){
                indexHari=1;
            }
            else if(schedule.hari.equals("rabu") || schedule.hari.equals("Rabu")){
                indexHari=2;
            }
            else if(schedule.hari.equals("kamis") || schedule.hari.equals("Kamis")){
                indexHari=3;
            }
            else{
                indexHari=4;
            }
            // Memeriksa tumpang tindih waktu dalam jendela waktu
            for (int i = startIndex; i < endIndex; i++) {
                if (timeWindow[indexHari][i] != null) {
                    conflicts = true;
                    System.out.println("Konflik ditemukan pada hari "+schedule.hari+": "+ 
                    timeWindow[indexHari][i].name+ " " + timeWindow[indexHari][i].startTime + " - " + 
                    timeWindow[indexHari][i].endTime + " dengan " + schedule.name + " " + schedule.startTime + " - " + schedule.endTime);
                    break;
                } else {
                    timeWindow[indexHari][i]= schedule;
                }
            }
        }

        if (!conflicts) {
            System.out.println("Tidak ada konflik dalam jadwal.");
        }

        return conflicts;
    }

    public static void main(String[] args) {
        Schedule[] schedules = new Schedule[5];
        schedules[0] = (new Schedule("Senin","Tugas Akhir 1","12:00", "15:00"));
        schedules[1] = (new Schedule("Senin","ASD","13:00", "15:00"));
        schedules[2] = new Schedule("senin","Daspro", "10:00", "12:00"); 
        schedules[3] = new Schedule("senin","Tugas Akhir 2", "11:00", "12:00"); 
        schedules[4] = new Schedule("selasa","Struktur Diskret", "13:00", "16:00"); 
        checkConflicts(schedules);
        Schedule[] schedules2 =new Schedule[2];
        schedules2[0] = (new Schedule("Rabu","Tugas Akhir 1","12:00", "15:00"));
        schedules2[1] = (new Schedule("Rabu","RPL","14:00", "17:00"));
        checkConflicts(schedules2);
    }
}
// Dalam contoh Java di atas, kami menggunakan kelas Schedule untuk merepresentasikan jadwal dengan waktu mulai dan waktu selesai. Fungsi checkConflicts memeriksa tumpang tindih waktu dalam jendela waktu dengan menghitung berapa kali setiap jam di dalam jendela waktu diisi oleh kegiatan. Jika ada lebih dari satu kegiatan yang mengisi jendela waktu yang sama, maka ada konflik.
