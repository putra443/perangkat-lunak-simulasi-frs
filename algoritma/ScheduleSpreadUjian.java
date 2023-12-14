class ScheduleUjian {
    String tanggalUTS;
    String name;
    String startTimeUTS;
    String endTimeUTS;

 

    public ScheduleUjian(String tanggalUTS,String name, String startTimeUTS, String endTimeUTS) {
        this.tanggalUTS=tanggalUTS;
        this.name=name;
        this.startTimeUTS=startTimeUTS;
        this.endTimeUTS=endTimeUTS;
    }
}

public class ScheduleSpreadUjian{
    public static boolean checkConflicts(ScheduleUjian[] schedules){
        ScheduleUjian[][] timeWindow = new ScheduleUjian[1][18];

        boolean conflicts = false;

        for(int i=0; i<schedules.length-1;i++){
            for(int j=i+1;j<schedules.length;j++){
                //ambil tanggal ujiian
                String[] tanggalUTS1 = schedules[i].tanggalUTS.split("-");
                String[] tanggalUTS2 = schedules[j].tanggalUTS.split("-");

                //jika sama tanggalnya ambil waktu

                if(Integer.parseInt(tanggalUTS1[0])==Integer.parseInt(tanggalUTS2[0])){
                    if(Integer.parseInt(tanggalUTS1[1])==Integer.parseInt(tanggalUTS2[1])){}
                        String[] startTokenUTS1 = schedules[i].startTimeUTS.split(":");
                        String[] endTokenUTS1 = schedules[i].endTimeUTS.split(":");
                        String[] startTokenUTS2 = schedules[j].startTimeUTS.split(":");
                        String[] endTokenUTS2 = schedules[j].endTimeUTS.split(":");
                        
                        int startIndex1 = Integer.parseInt(startTokenUTS1[0]);
                        int endIndex1 = Integer.parseInt(endTokenUTS1[0]);
                        int startIndex2 = Integer.parseInt(startTokenUTS2[0]);
                        int endIndex2 = Integer.parseInt(endTokenUTS2[0]);

                        for (int x = startIndex1; x < endIndex1; x++) {
                            timeWindow[0][x] = schedules[i];
                        }

                        for (int x = startIndex2; x < endIndex2; x++) {
                            if (timeWindow[0][x] != null) {
                                conflicts = true;
                                System.out.println("konflik ditemukan :" + schedules[i].name + " dengan " + schedules[j].name + " pada tanggal " + schedules[i].tanggalUTS);
                                break;
                            } else {
                                timeWindow[0][x]= schedules[j];
                            }
                        }
 
                }

            }
        }
        if(!conflicts){
            System.out.println("tidak ada konflik dalam jadwal.");
        }
        return conflicts;
    }

    public static void main(String[] args){
        ScheduleUjian[] schedules = new ScheduleUjian[4];
        schedules[0] = (new ScheduleUjian("01-11-2023","AI","10:00","12:00"));
        schedules[1] = (new ScheduleUjian("31-10-2023","ASD","10:00","12:00"));
        schedules[2] = (new ScheduleUjian("15-11-2023","PBW","09:00","10:00"));
        schedules[3] = (new ScheduleUjian("31-10-2023","PBO","10:00","12:00"));
        checkConflicts(schedules);
    }
}