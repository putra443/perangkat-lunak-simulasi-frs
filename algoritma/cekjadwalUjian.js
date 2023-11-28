class Schedule {
    constructor(hari,tanggal, name, startTime, endTime) {
        this.hari = hari;
        this.tanggal = tanggal;
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

class ScheduleSpreadUjian{
    static checkConflics(schedules){
        const timeWindow = Array(18).fill(null)
        let conflicts = false

        schedules.forEach(schedule => {
            const startTokens = schedule.startTime.split(":");
            const endTokens = schedule.endTime.split(":");

            const startHour = parseInt(startTokens[0]);
            const endHour = parseInt(endTokens[0]);

            const startIndex = startHour;
            const endIndex = endHour;

            for (let i = startIndex; i < endIndex; i++) {
                if (timeWindow[i] !== null) {
                    conflicts = true;
                    console.log(`Konflik ditemukan pada hari ${schedule.hari}: ${timeWindow[indexHari][i].name} ${timeWindow[indexHari][i].startTime} - ${timeWindow[indexHari][i].endTime} dengan ${schedule.name} ${schedule.startTime} - ${schedule.endTime}`);
                    break;
                } else {
                    timeWindow[i] = schedule;
                }
            }
        });

        if (!conflicts) {
            console.log("Tidak ada konflik dalam jadwal.");
        }
        return conflicts   
    }
    static main() {
        const schedules = [
            new Schedule("Senin","12/3/21", "Tugas Akhir 1", "12:00", "15:00"),
            new Schedule("Senin","12/3/21", "ASD", "13:00", "15:00")
        ];

        ScheduleSpread.checkConflicts(schedules);

        

        ScheduleSpread.checkConflicts(schedules2);
    }
}