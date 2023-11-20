import AddMataKuliah from "./addMataKuliah";
import DeleteMataKuliah from "./deleteMataKuliah";
import UpdateMataKuliah from "./updateMataKuliah";
import CekBentrok from "./cekBentrok";

// async function getMataKuliah (){
//     const res = await fetch('http://localhost:5001/mataKuliah',{cache:'no-store'});
//     const result = await res.json()
//     return result
// }

async function getMataKuliah(){
    const res = await fetch('http://localhost:3000/api/post',{cache:'no-cache'})// Update the URL accordingly
    const data = await res.json();
    return data
}

function createSchedule(indexHari, name, startTime, endTime){
    return { indexHari, name, startTime, endTime };
}

function cekBentrok(schedules){
    const timeWindow = new Array(7).fill(null).map(() => new Array(24)); // 24 hours in a day

    let conflicts = false;
    let string = ""

    for (const schedule of schedules) {
        const startTokens = schedule.startTime.split(":");
        const endTokens = schedule.endTime.split(":");

        const startHour = parseInt(startTokens[0]);
        const endHour = parseInt(endTokens[0]);

        // Convert start and end times to time window indices
        const startIndex = startHour;
        const endIndex = endHour;

        // Check for overlapping time within the time window
        for (let i = startIndex; i < endIndex; i++) {
            if (timeWindow[schedule.indexHari][i] !== undefined) {
                conflicts = true;
                string += (`Conflict found on day ${schedule.indexHari}: ${timeWindow[schedule.indexHari][i].name} ${timeWindow[schedule.indexHari][i].startTime} - ${timeWindow[schedule.indexHari][i].endTime} with ${schedule.name} ${schedule.startTime} - ${schedule.endTime}` + "\n");
                break;
            } else {
                timeWindow[schedule.indexHari][i] = schedule;
            }
        }
    }

    if (!conflicts) {
        return string = "There are no conflict found on the schedule.";
    }

    return string;

}


export default async function PostList() {
    const mataKuliah = await getMataKuliah();
    console.log(mataKuliah);
    const hasil = Object.keys(mataKuliah).length;
    const schedules = new Array(hasil);
    for (let index = 0; index < hasil; index++) {
        schedules[index] = createSchedule(0,mataKuliah[index].namaMataKuliah,mataKuliah[index].jam_mulai,mataKuliah[index].jam_selesai)
    }
    const hasilCek = cekBentrok(schedules)
    return (
        <div className="py-10 px-10 my-20 mx-20">
            <div className="py-2">
                <AddMataKuliah/>
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama Mata Kuliah</th>
                        <th>Jam Mulai</th>
                        <th>Jam Selesai</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mataKuliah.map((mataKuliah, index)=> (
                         <tr key={mataKuliah.idMataKuliah}>
                            <td>{index+1}</td>
                            <td key={mataKuliah.idMataKuliah}>{mataKuliah.namaMataKuliah}</td>
                            <td key={mataKuliah.idMataKuliah}>{mataKuliah.jam_mulai}</td>
                            <td key={mataKuliah.idMataKuliah}>{mataKuliah.jam_selesai}</td>
                            <td key={mataKuliah.idMataKuliah}>
                                <UpdateMataKuliah {...mataKuliah}></UpdateMataKuliah>
                                <DeleteMataKuliah {...mataKuliah}/>
                            </td>
                         </tr>   
                    ))}
                </tbody>
            </table>
            <CekBentrok>{hasilCek}</CekBentrok>
        </div>
    )

}
