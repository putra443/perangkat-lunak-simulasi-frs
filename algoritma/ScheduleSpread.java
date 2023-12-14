class Schedule {
    String hari;
    String name;
    String startTime;
    String endTime;
    String kelas;
    String sesi;


    public Schedule(String hari,String name, String startTime, String endTime,String kelas, String sesi) {
        this.hari = hari;
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.kelas = kelas;
        this.sesi = sesi;
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

            String startHour = startTokens[0];
            String endHour = endTokens[0];

            // Konversi waktu mulai dan selesai ke dalam indeks jendela waktu
            int startIndex = Integer.parseInt(startHour);
            int endIndex = Integer.parseInt(endHour);

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
                    timeWindow[indexHari][i].endTime +" Kelas " + timeWindow[indexHari][i].kelas + 
                    " Sesi " + timeWindow[indexHari][i].sesi + " dengan " + 
                    schedule.name + " " + schedule.startTime + " - " + schedule.endTime  + " Kelas " + schedule.kelas
                    + " Sesi " + schedule.sesi);
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
        schedules[0] = (new Schedule("Senin","Tugas Akhir 1","12:00", "15:00","A","Kuliah"));
        schedules[1] = (new Schedule("Senin","ASD","09:00", "11:00","A","Kuliah"));
        schedules[2] = new Schedule("senin","Daspro", "08:00", "10:00","A","Kuliah"); 
        schedules[3] = new Schedule("senin","Tugas Akhir 2", "11:00", "12:00","A","Kuliah"); 
        schedules[4] = new Schedule("selasa","Struktur Diskret", "13:00", "16:00","A","Kuliah"); 
        System.out.println("Cek Schedule 1 : ");
        checkConflicts(schedules);
        // System.out.println();
        // Schedule[] schedules2 =new Schedule[2];
        // schedules2[0] = (new Schedule("Rabu","Tugas Akhir 1","12:00", "15:00"));
        // schedules2[1] = (new Schedule("Rabu","RPL","14:00", "17:00"));
        // System.out.println("Cek Schedule 2: ");
        // checkConflicts(schedules2);
        // System.out.println();
        // Schedule[] schedules3 = new Schedule[2];
        // schedules3[0] = new Schedule("Jumat","MPB","13:00","16:00");
        // schedules3[1] = new Schedule("Jumat", "AI", "09:00", "11:00");
        // System.out.println("Cek Schedule 3: ");
        // checkConflicts(schedules3);
        // System.out.println();
    }
}
// Dalam contoh Java di atas, kami menggunakan kelas Schedule untuk merepresentasikan jadwal dengan waktu mulai dan waktu selesai. Fungsi checkConflicts memeriksa tumpang tindih waktu dalam jendela waktu dengan menghitung berapa kali setiap jam di dalam jendela waktu diisi oleh kegiatan. Jika ada lebih dari satu kegiatan yang mengisi jendela waktu yang sama, maka ada konflik.
