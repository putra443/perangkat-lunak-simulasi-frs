class ScheduleUjian {
    constructor(tanggalUTS, tanggalUAS, name, startTimeUTS, endTimeUTS, startTimeUAS, endTimeUAS) {
        this.tanggalUTS = tanggalUTS;
        this.tanggalUAS = tanggalUAS;
        this.name = name;
        this.startTimeUTS = startTimeUTS;
        this.endTimeUTS = endTimeUTS;
        this.startTimeUAS = startTimeUAS;
        this.endTimeUAS = endTimeUAS;
    }
}

function checkConflicts(schedules) {
    const timeWindow = Array.from({ length: 1 }, () => Array(18).fill(null));

    let conflicts = false;

    for (let i = 0; i < schedules.length - 1; i++) {
        for (let j = i + 1; j < schedules.length; j++) {
            const tanggalUTS1 = schedules[i].tanggalUAS.split("-");
            const tanggalUTS2 = schedules[j].tanggalUAS.split("-");

            if (parseInt(tanggalUTS1[0]) === parseInt(tanggalUTS2[0]) &&
                parseInt(tanggalUTS1[1]) === parseInt(tanggalUTS2[1])) {

                const startTokenUTS1 = schedules[i].startTimeUTS.split(":");
                const endTokenUTS1 = schedules[i].endTimeUTS.split(":");
                const startTokenUTS2 = schedules[j].startTimeUAS.split(":");
                const endTokenUTS2 = schedules[j].endTimeUAS.split(":");

                const startIndex1 = parseInt(startTokenUTS1[0]);
                const endIndex1 = parseInt(endTokenUTS1[0]);
                const startIndex2 = parseInt(startTokenUTS2[0]);
                const endIndex2 = parseInt(endTokenUTS2[0]);

                for (let x = startIndex1; x < endIndex1; x++) {
                    timeWindow[0][x] = schedules[i];
                }

                for (let x = startIndex2; x < endIndex2; x++) {
                    if (timeWindow[0][x] !== null) {
                        conflicts = true;
                        console.log(`konflik ditemukan: ${schedules[i].name} dengan ${schedules[j].name}`);
                        break;
                    } else {
                        timeWindow[0][x] = schedules[j];
                    }
                }
            }
        }
    }

    if (!conflicts) {
        console.log("tidak ada konflik dalam jadwal.");
    }

    return conflicts;
}

const schedules = [
    new ScheduleUjian("01-11-2023", "16-1-2023", "AI", "10:00", "12:00", "10:00", "12:00"),
    new ScheduleUjian("31-10-2023", "15-1-2023", "ASD", "10:00", "11:00", "10:00", "11:00"),
    new ScheduleUjian("15-11-2023", "21-1-2023", "PBW", "09:00", "10:00", "09:00", "10:00"),
    new ScheduleUjian("31-10-2023", "15-1-2023", "PBO", "10:00", "11:00", "10:00", "11:00"),
    new ScheduleUjian("03-11-2023", "18-1-2023", "ALPRO", "10:00", "11:00", "10:00", "11:00")
];

checkConflicts(schedules);