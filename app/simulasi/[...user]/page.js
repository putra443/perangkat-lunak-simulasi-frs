import bg from '@/assets/background_unpar.jpg'
import LayoutUser from '../../layoutUser'
import AddMataKuliah from '../AddMataKuliah';
import DeleteMataKuliah from '../DeleteMataKuliah'
import CekBentrok from '../CekBentrok'
import ModalPrint from '../ModalPrint';


let conflictsStatus = false
//untuk get jadwal master
async function getJadwalMataKuliah(){
    const res = await fetch('http://localhost:3000/api/jadwalKuliah',{cache:'no-store'});
    const result = await res.json()
    return result
}

//untuk get jadwal per mahasiswa
async function getJadwalMahasiswa(params){
    const res = await fetch(`http://localhost:3000/api/simulasi/${params}`,{cache:'no-store'});
    const result = await res.json()
    return result
}

// untuk get jadwal ujian per mahasiswa
async function getJadwalUjian(params){
    const res = await fetch(`http://localhost:3000/api/ujian/${params}`,{cache:'no-store'});
    const result = await res.json()
    return result
}


//untuk create object schedule
function createSchedule(hari, name, startTime, endTime){
    return { hari, name, startTime, endTime };
}

//untuk cek bentrok jadwal kuliah
function cekBentrok(schedules){
    const timeWindow = new Array(7).fill(null).map(() => new Array(24)); // 24 hours in a day

    let conflicts = false;
    let string = ""
    if(schedules.length<1) return string="Belum ada jadwal yang dimasukkan."
    for (const schedule of schedules) {
        const startTokens = schedule.startTime.split(":");
        const endTokens = schedule.endTime.split(":");

        const startHour = parseInt(startTokens[0]);
        const endHour = parseInt(endTokens[0]);

        // Convert start and end times to time window indices
        const startIndex = startHour;
        const endIndex = endHour;

        let indexHari = 0
            if(schedule.hari == "senin" || schedule.hari == "Senin"){
                indexHari=0;
            }
            else if(schedule.hari == "selasa" || schedule.hari == "Selasa"){
                indexHari=1;
            }
            else if(schedule.hari == "rabu" || schedule.hari == "Rabu"){
                indexHari=2;
            }
            else if(schedule.hari == "kamis" || schedule.hari == "Kamis"){
                indexHari=3;
            }
            else{
                indexHari=4;
            }
        // Check for overlapping time within the time window
        for (let i = startIndex; i < endIndex; i++) {
            if (timeWindow[indexHari][i] !== undefined) {
                conflicts = true; conflictsStatus = true;
                string += (`Ditemukan konflik pada Hari ${schedule.hari}: ${timeWindow[indexHari][i].name} ${timeWindow[indexHari][i].startTime} - ${timeWindow[indexHari][i].endTime} dengan ${schedule.name} ${schedule.startTime} - ${schedule.endTime}` + "\n" + "\n");
                break;
            } else {
                timeWindow[indexHari][i] = schedule;
            }
        }
    }

    if (!conflicts) {
        return string = "Tidak ditemukan konflik pada kumpulan jadwal.";
    }

    return string;

}

//function untuk create schedule ujian
function createScheduleUjian(tanggalUTS,tanggalUAS,namaMataKuliah,jam_mulai_uts,jam_selesai_uts,jam_mulai_uas,jam_selesai_uas){
    return{tanggalUTS,tanggalUAS,namaMataKuliah,jam_mulai_uts,jam_selesai_uts,jam_mulai_uas,jam_selesai_uas}
}
// untuk cek bentrok jadwal ujian
function cekBentrokUjian(schedules) {
    const timeWindow = Array.from({ length: 1 }, () => Array(18).fill(null));

    let conflicts = false;
    let string = ""
    for (let i = 0; i < schedules.length - 1; i++) {
        for (let j = i + 1; j < schedules.length; j++) {
            console.log(schedules[i], schedules[j]);
            const tanggalUTS1 = schedules[i].tanggalUAS.split("-");
            const tanggalUTS2 = schedules[j].tanggalUAS.split("-");

            if (parseInt(tanggalUTS1[0]) === parseInt(tanggalUTS2[0]) &&
                parseInt(tanggalUTS1[1]) === parseInt(tanggalUTS2[1])) {

                const startTokenUTS1 = schedules[i].jam_mulai_uts.split(":");
                const endTokenUTS1 = schedules[i].jam_selesai_uts.split(":");
                const startTokenUTS2 = schedules[j].jam_mulai_uas.split(":");
                const endTokenUTS2 = schedules[j].jam_selesai_uas.split(":");

                const startIndex1 = parseInt(startTokenUTS1[0]);
                const endIndex1 = parseInt(endTokenUTS1[0]);
                const startIndex2 = parseInt(startTokenUTS2[0]);
                const endIndex2 = parseInt(endTokenUTS2[0]);

                for (let x = startIndex1; x < endIndex1; x++) {
                    timeWindow[0][x] = schedules[i];
                }

                for (let x = startIndex2; x < endIndex2; x++) {
                    if (timeWindow[0][x] !== null) {
                        conflicts = true; conflictsStatus = true;
                        string += `Konflik ditemukan pada jadwal ujian mata kuliah : ${schedules[i].namaMataKuliah} dengan ${schedules[j].namaMataKuliah}`
                        // console.log(`konflik ditemukan: ${schedules[i].name} dengan ${schedules[j].name}`);
                        break;
                    } else {
                        timeWindow[0][x] = schedules[j];
                    }
                }
            }
        }
    }

    if (!conflicts) {
        return string = "Tidak ditemukan konflik pada kumpulan jadwal."
        // console.log("tidak ada konflik dalam jadwal.");
    }

    return string;
}

function handlePrint(conflictsStatus){
    if(conflictsStatus){
        console.log("masih ada jadwal bentrok");
    }
    else{
        console.log("print jadwal");
    }
}


export default async function Simulasi({params}){
    const mataKuliah = await getJadwalMataKuliah();
    const userId = params.user[2]
    // console.log(params.user);
    const jadwalMahasiswa = await getJadwalMahasiswa(userId)
    const jadwalUjian = await getJadwalUjian(userId)
    // console.log(jadwalUjian);
    // const ujian = await getJadwalUjian()
    // const dataMaster = await getJadwalMaster()
    // console.log(mataKuliah);

    //pembuatan kelas schedule untuk cek jadwal kuliah
    const hasil  = Object.keys(jadwalMahasiswa).length
    const schedules = new Array(hasil)
    for(let i=0;i<hasil;i++){
        schedules[i] = createSchedule(jadwalMahasiswa[i].hari,jadwalMahasiswa[i].namaMataKuliah, jadwalMahasiswa[i].jam_mulai, jadwalMahasiswa[i].jam_selesai)
    }
    const hasilCek = cekBentrok(schedules)
    // console.log(conflictsStatus);


    //pembuatan kelas scheduleujian untuk cek jadwal ujian
    const hasilUjian = Object.keys(jadwalUjian).length
    const schedulesUjian = new Array(hasilUjian)
    for(let i=0;i<hasilUjian;i++) {
        schedulesUjian[i]= createScheduleUjian(jadwalUjian[i].formatteduts,jadwalUjian[i].formatteduas, jadwalUjian[i].namaMataKuliah, jadwalUjian[i].jam_mulai_uts, jadwalUjian[i].jam_selesai_uts, jadwalUjian[i].jam_mulai_uas, jadwalUjian[i].jam_selesai_uas)
    }

    const hasilCekUjian = cekBentrokUjian(schedulesUjian)


    return(
        <main className="flex overflow-y-scroll overflow-x-hidden min-h-screen min-w-screen w-screen flex-col items-center lg:px-20 text-center bg-cover bg-center h-screen" style={{backgroundImage: `url(${bg.src})`}}>
           <LayoutUser/>
            <div className='flex flex-col px-2 lg:px-20 w-screen h-screen bg-gradient-to-br from-sky-500'>
                <p className='text-4xl text-left my-4 text-white'>Simulasi FRS</p>
                <div className=' justify-start text-left my-5'>
                    {/* untuk add mata kuliah */}
                    <AddMataKuliah user={userId}>{...mataKuliah}</AddMataKuliah>
                </div>
                <p className='text-xl text-left text-white bg-sky-700 lg:w-1/5 text-center p-3 rounded-2xl'>Jadwal Kuliah</p>

                <div className=' overflow-auto rounded-xl mt-5'>
                    <table className='table text-center rounded-2xl bg-gray-200'>
                        <thead>
                            <tr className='bg-sky-700 text-white'>
                                <th className='p-5'>No</th>
                                <th className='p-5'>Nama Mata Kuliah</th>
                                <th className='p-5'>Hari</th>
                                <th className='p-5'>Jam Mulai</th>
                                <th className='p-5'>Jam Selesai</th>
                                <th className='p-5'>Kelas</th>
                                <th className='p-5'>Sesi</th>
                                <th className='p-5'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jadwalMahasiswa.map((jadwalMahasiswa, index)=>(
                                <tr  key={index} className='hover:text-indigo-700 transition-all'>
                                    <td className=" font-semibold">{index+1}</td>
                                    <td className=" font-semibold">{jadwalMahasiswa.namaMataKuliah}</td>
                                    <td className=" font-semibold">{jadwalMahasiswa.hari}</td>
                                    <td className=" font-semibold">{jadwalMahasiswa.jam_mulai}</td>
                                    <td className=" font-semibold">{jadwalMahasiswa.jam_selesai}</td>
                                    <td className='font-semibold' >{jadwalMahasiswa.kelas}</td>
                                    <td className='font-semibold' >{jadwalMahasiswa.sesi}</td>
                                    <td className=" font-semibold pt-3 pb-3">
                                        <DeleteMataKuliah user={userId} {...jadwalMahasiswa} className="m-3"/>
                                        </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                

                <p className='text-xl text-left text-white mt-5 bg-sky-700 lg:w-1/5 text-center p-3 rounded-2xl'>Jadwal Ujian</p>
                <div className=' overflow-auto rounded-xl mt-5'>
                    <table className='table text-center rounded-2xl bg-gray-200'>
                        <thead>
                            <tr className='bg-sky-700 text-white'>
                                <th className='p-5'>No</th>
                                <th className='p-5'>Nama Mata Kuliah</th>
                                <th className='p-5'>Tanggal UTS</th>
                                <th className='p-5'>Waktu Mulai UTS</th>
                                <th className='p-5'>Waktu Selesai UTS</th>
                                <th className='p-5'>Tanggal UAS</th>
                                <th className='p-5'>Waktu Mulai UAS</th>
                                <th className='p-5'>Waktu Selesai UAS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jadwalUjian.map((jadwalUjian, index)=>(
                                <tr  key={index}>
                                    <td className=" font-semibold">{index+1}</td>
                                    <td className=" font-semibold">{jadwalUjian.namaMataKuliah}</td>
                                    <td className=" font-semibold">{jadwalUjian.formatteduts}</td>
                                    <td className=" font-semibold">{jadwalUjian.jam_mulai_uts}</td>
                                    <td className=" font-semibold">{jadwalUjian.jam_selesai_uts}</td>
                                    <td className='font-semibold'>{jadwalUjian.formatteduas}</td>
                                    <td className='font-semibold'>{jadwalUjian.jam_mulai_uas}</td>
                                    <td className=" font-semibold pt-3 pb-3">{jadwalUjian.jam_selesai_uas}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>                 
                </div>
                
                <div className='mb-10 justify-start text-left float-left'>
                    <CekBentrok cekUjian={hasilCekUjian}>{hasilCek}</CekBentrok>
                    <ModalPrint statusConflict = {conflictsStatus} jadwalUjian={jadwalUjian}>{jadwalMahasiswa}</ModalPrint>
                </div>
            </div>
        </main>
    )
        
}