class Schedule {
    constructor(hari, name, startTime, endTime) {
        this.hari = hari;
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

class WeekTime {
    constructor(timeWindow) {
        this.timeWindow = timeWindow;
    }
}

class ScheduleSpread {
    static checkConflicts(schedules) {
        const timeWindow = Array.from({ length: 5 }, () => Array(18).fill(null));

        let conflicts = false;

        schedules.forEach(schedule => {
            const startTokens = schedule.startTime.split(":");
            const endTokens = schedule.endTime.split(":");

            const startHour = parseInt(startTokens[0]);
            const endHour = parseInt(endTokens[0]);

            const startIndex = startHour;
            const endIndex = endHour;

            let indexHari = 0;
            switch (schedule.hari.toLowerCase()) {
                case "senin":
                    indexHari = 0;
                    break;
                case "selasa":
                    indexHari = 1;
                    break;
                case "rabu":
                    indexHari = 2;
                    break;
                case "kamis":
                    indexHari = 3;
                    break;
                default:
                    indexHari = 4;
            }

            for (let i = startIndex; i < endIndex; i++) {
                if (timeWindow[indexHari][i] !== null) {
                    conflicts = true;
                    console.log(`Konflik ditemukan pada hari ${schedule.hari}: ${timeWindow[indexHari][i].name} ${timeWindow[indexHari][i].startTime} - ${timeWindow[indexHari][i].endTime} dengan ${schedule.name} ${schedule.startTime} - ${schedule.endTime}`);
                    break;
                } else {
                    timeWindow[indexHari][i] = schedule;
                }
            }
        });

        if (!conflicts) {
            console.log("Tidak ada konflik dalam jadwal.");
        }

        return conflicts;
    }

    static main() {
        const schedules = [
            new Schedule("Senin", "Tugas Akhir 1", "12:00", "15:00"),
            new Schedule("Senin", "ASD", "13:00", "15:00"),
            new Schedule("senin", "Daspro", "10:00", "12:00"),
            new Schedule("senin", "Tugas Akhir 2", "11:00", "12:00"),
            new Schedule("selasa", "Struktur Diskret", "13:00", "16:00")
        ];

        ScheduleSpread.checkConflicts(schedules);

        const schedules2 = [
            new Schedule("Rabu", "Tugas Akhir 1", "12:00", "15:00"),
            new Schedule("Rabu", "RPL", "14:00", "17:00")
        ];

        ScheduleSpread.checkConflicts(schedules2);
    }
}

ScheduleSpread.main();