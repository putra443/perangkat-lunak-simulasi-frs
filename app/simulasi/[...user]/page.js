import bg from '@/assets/background_unpar.jpg'
import LayoutUser from '../../layoutUser'
import AddMataKuliah from '../addMataKuliah';
import DeleteMataKuliah from '../deleteMataKuliah'
import CekBentrok from '../CekBentrok'
import ModalPrint from '../ModalPrint';


let conflictsStatus = false

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
//untuk get jadwal master
async function getJadwalMataKuliah(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jadwalKuliah`,{cache:'no-store'});
    const result = await res.json()
    return result
}

//untuk get jadwal per mahasiswa
async function getJadwalMahasiswa(params){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/simulasi/${params}`,{cache:'no-store'});
    const result = await res.json()
    return result
}

// untuk get jadwal ujian per mahasiswa
async function getJadwalUjian(params){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ujian/${params}`,{cache:'no-store'});
    const result = await res.json()
    return result
}


//untuk create object schedule
function createSchedule(hari, name, startTime, endTime){
    return { hari, name, startTime, endTime };
}

//untuk cek bentrok jadwal kuliah
function cekBentrok(schedules){
    const timeWindow = new Array(5).fill(null).map(() => new Array(18)); // 24 hours in a day

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
            if(schedule.hari.toLowerCase() == "senin"){
                indexHari=0;
            }
            else if(schedule.hari.toLowerCase() == "selasa"){
                indexHari=1;
            }
            else if(schedule.hari.toLowerCase() == "rabu"){
                indexHari=2;
            }
            else if(schedule.hari.toLowerCase() == "kamis"){
                indexHari=3;
            }
            else if(schedule.hari.toLowerCase() == "jumat"){
                indexHari=4;
            }
        // Check for overlapping time within the time window
        for (let i = startIndex; i < endIndex; i++) {
            if (timeWindow[indexHari][i] !== undefined) {
                conflicts = true; conflictsStatus = true;
                string += (`Ditemukan konflik pada Hari ${schedule.hari}: ${timeWindow[indexHari][i].name} ${timeWindow[indexHari][i].startTime} - ${timeWindow[indexHari][i].endTime} dengan ${schedule.name} ${schedule.startTime} - ${schedule.endTime}.` + "\n" + "\n");
                break;
            } else {
                timeWindow[indexHari][i] = schedule;
            }
        }
    }

    if (!conflicts) {
        conflictsStatus=false
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
    

    let conflicts = false;
    let string = ""
    if(schedules.length<1) return string="Belum ada jadwal yang dimasukkan."
    for (let i = 0; i < schedules.length - 1; i++) {
        for (let j = i + 1; j < schedules.length; j++) {
            // console.log(schedules[i], schedules[j]);
            const tanggalUTS1 = schedules[i].tanggalUTS.split("/");
            const tanggalUTS2 = schedules[j].tanggalUTS.split("/");

            if (parseInt(tanggalUTS1[0]) === parseInt(tanggalUTS2[0]) &&
                parseInt(tanggalUTS1[1]) === parseInt(tanggalUTS2[1])) {
                const timeWindow = Array.from({ length: 1 }, () => Array(18).fill(null));

                const startTokenUTS1 = schedules[i].jam_mulai_uts.split(":");
                const endTokenUTS1 = schedules[i].jam_selesai_uts.split(":");
                const startTokenUTS2 = schedules[j].jam_mulai_uts.split(":");
                const endTokenUTS2 = schedules[j].jam_selesai_uts.split(":");

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
                        string += `Ditemukan konflik pada jadwal ujian mata kuliah : ${schedules[i].namaMataKuliah} ${schedules[i].jam_mulai_uts}-${schedules[i].jam_selesai_uts} dengan ${schedules[j].namaMataKuliah} ${schedules[j].jam_mulai_uts}-${schedules[j].jam_selesai_uts} \n \n`
                        // console.log(`konflik ditemukan: ${schedules[i].name} dengan ${schedules[j].name}`);
                        // console.log(timeWindow[0][x]);
                        // console.log(timeWindow);
                        
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

function cekBentrokUjian2(schedules) {
    

    let conflicts = false;
    let string = ""
    if(schedules.length<1) return string="Belum ada jadwal yang dimasukkan."
    for (let i = 0; i < schedules.length - 1; i++) {
        for (let j = i + 1; j < schedules.length; j++) {
            // console.log(schedules[i], schedules[j]);
            const tanggalUAS1 = schedules[i].tanggalUAS.split("/");
            const tanggalUAS2 = schedules[j].tanggalUAS.split("/");

            if (parseInt(tanggalUAS1[0]) === parseInt(tanggalUAS2[0]) &&
                parseInt(tanggalUAS1[1]) === parseInt(tanggalUAS2[1])) {
                const timeWindow = Array.from({ length: 1 }, () => Array(18).fill(null));

                const startTokenUAS1 = schedules[i].jam_mulai_uas.split(":");
                const endTokenUAS1 = schedules[i].jam_selesai_uas.split(":");
                const startTokenUAS2 = schedules[j].jam_mulai_uas.split(":");
                const endTokenUAS2 = schedules[j].jam_selesai_uas.split(":");

                const startIndex1 = parseInt(startTokenUAS1[0]);
                const endIndex1 = parseInt(endTokenUAS1[0]);
                const startIndex2 = parseInt(startTokenUAS2[0]);
                const endIndex2 = parseInt(endTokenUAS2[0]);

                for (let x = startIndex1; x < endIndex1; x++) {
                    timeWindow[0][x] = schedules[i];
                }

                for (let x = startIndex2; x < endIndex2; x++) {
                    
                    if (timeWindow[0][x] !== null) {
                        conflicts = true; conflictsStatus = true;
                        string += `Ditemukan konflik pada jadwal ujian mata kuliah : ${schedules[i].namaMataKuliah} ${schedules[i].jam_mulai_uas}-${schedules[i].jam_selesai_uas} dengan ${schedules[j].namaMataKuliah} ${schedules[j].jam_mulai_uas}-${schedules[j].jam_selesai_uas} \n \n`
                        // console.log(`konflik ditemukan: ${schedules[i].name} dengan ${schedules[j].name}`);
                        // console.log(timeWindow[0][x]);
                        // console.log(timeWindow);
                        
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



export default async function Simulasi({params}){
    const mataKuliah = await getJadwalMataKuliah();
    const userId = params.user[2]
    // console.log(params.user[1]);
    // console.log(params.user);
    const jadwalMahasiswa = await getJadwalMahasiswa(params.user[1])
    const jadwalUjian = await getJadwalUjian(params.user[1])
    // console.log(jadwalUjian);
    // const ujian = await getJadwalUjian()
    // const dataMaster = await getJadwalMaster()
    // console.log(mataKuliah);

    //penambahan sks
    let totalSKS = 0;
    const jadwalSks = jadwalMahasiswa
    if(jadwalSks[0]!=null){
        jadwalSks.filter((jadwalSks, index, self)=>{
            return self.findIndex((m) => m.namaMataKuliah === jadwalSks.namaMataKuliah)=== index
        })
        .forEach((jadwalSks)=>totalSKS+=parseInt(jadwalSks.sks))
    }
    

    //pembuatan kelas schedule untuk cek jadwal kuliah
    const hasil  = Object.keys(jadwalMahasiswa).length
    const schedules = new Array(hasil)
    for(let i=0;i<hasil;i++){
        schedules[i] = createSchedule(jadwalMahasiswa[i].hari,jadwalMahasiswa[i].namaMataKuliah, jadwalMahasiswa[i].jam_mulai, jadwalMahasiswa[i].jam_selesai)
    }
    const hasilCek = cekBentrok(schedules)
    // console.log(conflictsStatus);


    //pembuatan kelas scheduleujian untuk cek jadwal ujian UTS dan UAS
    const hasilUjian = Object.keys(jadwalUjian).length
    const schedulesUjian = new Array(hasilUjian)
    for(let i=0;i<hasilUjian;i++) {
        schedulesUjian[i]= createScheduleUjian(jadwalUjian[i].formatteduts,jadwalUjian[i].formatteduas, jadwalUjian[i].namaMataKuliah, jadwalUjian[i].jam_mulai_uts, jadwalUjian[i].jam_selesai_uts, jadwalUjian[i].jam_mulai_uas, jadwalUjian[i].jam_selesai_uas)
    }

    const hasilCekUjian = cekBentrokUjian(schedulesUjian)
    const hasilCekUjian2 = cekBentrokUjian2(schedulesUjian)


    return(
        <main className="flex overflow-y-auto overflow-x-hidden min-h-screen max-h-content flex-col items-center lg:px-20 text-center bg-auto bg-center" style={{backgroundImage: `url(${bg.src})`}}>
           <LayoutUser/>
            <div className='flex flex-col lg:px-20 px-5 w-screen min-h-screen max-h-content max-h-full bg-gradient-to-br from-sky-500'>
                <div className="rounded-2xl flex flex-col text-left mt-10 text-xl" >
                    <p className='text-4xl text-left my-4 text-white'>Simulasi FRS</p>
                    <div className=' justify-start text-left my-5'>
                        {/* untuk add mata kuliah */}
                        <AddMataKuliah  user={params.user[1]}>{...mataKuliah}</AddMataKuliah>
                    </div>
                    <p className='text-xl text-center text-white bg-sky-700 lg:w-1/5 p-3 rounded-2xl'>Jadwal Kuliah</p>

                    <div className='overflow-x-scroll no-scrollbar rounded-xl mt-5'>
                        <table className=' table text-center rounded-2xl bg-gray-200'>
                            <thead>
                                <tr className='bg-sky-700 text-white'>
                                    <th className='p-5'>No</th>
                                    <th className='p-5'>Nama Mata Kuliah</th>
                                    <th className='p-5'>Hari</th>
                                    <th className='p-5'>Jam Mulai</th>
                                    <th className='p-5'>Jam Selesai</th>
                                    <th className='p-5'>Kelas</th>
                                    <th className='p-5'>Sesi</th>
                                    <th className='p-5'>Hapus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jadwalMahasiswa[0]!=null ? (
                                jadwalMahasiswa.map((jadwalMahasiswa, index)=>(
                                    <tr  key={jadwalMahasiswa?.idJadwalMahasiswa} className='hover:text-indigo-700 transition-all'>
                                        <td className=" font-semibold">{index+1}</td>
                                        <td className=" font-semibold">{jadwalMahasiswa.namaMataKuliah}</td>
                                        <td className=" font-semibold">{jadwalMahasiswa.hari}</td>
                                        <td className=" font-semibold">{jadwalMahasiswa.jam_mulai}</td>
                                        <td className=" font-semibold">{jadwalMahasiswa.jam_selesai}</td>
                                        <td className='font-semibold' >{jadwalMahasiswa.kelas}</td>
                                        <td className='font-semibold' >{jadwalMahasiswa.sesi}</td>
                                        <td className=" font-semibold pt-3 pb-3">
                                            <DeleteMataKuliah user={params.user[1]} {...jadwalMahasiswa} className="m-3"/>
                                            </td>

                                    </tr>
                                ))) :
                                (<tr className='hover:text-indigo-700 transition-all font-semibold text-l'><td colSpan={9} className=' text-center'>Belum ada mata kuliah yang dipilih</td></tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    

                    <p className='text-xl text-white mt-5 bg-sky-700 lg:w-1/5 text-center p-3 rounded-2xl'>Jadwal Ujian</p>
                    <div className='overflow-scroll no-scrollbar rounded-xl mt-5'>
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
                                {jadwalUjian[0]!=null ? (
                                jadwalUjian.map((jadwalUjian, index)=>(
                                    <tr  key={jadwalUjian?.idjadwalUjianMahasiswa} className='hover:text-indigo-700 transition-all'>
                                        <td className=" font-semibold">{index+1}</td>
                                        <td className=" font-semibold">{jadwalUjian.namaMataKuliah}</td>
                                        <td className=" font-semibold">{jadwalUjian.formatteduts}</td>
                                        <td className=" font-semibold">{jadwalUjian.jam_mulai_uts}</td>
                                        <td className=" font-semibold">{jadwalUjian.jam_selesai_uts}</td>
                                        <td className='font-semibold'>{jadwalUjian.formatteduas}</td>
                                        <td className='font-semibold'>{jadwalUjian.jam_mulai_uas}</td>
                                        <td className=" font-semibold pt-3 pb-3">{jadwalUjian.jam_selesai_uas}</td>

                                    </tr>
                                ))) :
                                (<tr className='hover:text-indigo-700 transition-all font-semibold text-l'><td colSpan={8} className=' text-center'>Belum ada jadwal ujian</td></tr>)
                                }
                            </tbody>
                        </table>                 
                    </div>
                    <div className='my-5 lg:w-1/4 self-center text-center bg-slate-200 rounded-xl p-4'>
                            <p>Total SKS = {totalSKS}</p>
                    </div>
                    <div className='mb-5 justify-start text-left float-left'>
                        <CekBentrok cekUjian={hasilCekUjian} cekUjian2={hasilCekUjian2}>{hasilCek}</CekBentrok>
                        <ModalPrint totalSKS={totalSKS} statusConflict = {conflictsStatus} jadwalUjian={jadwalUjian}>{jadwalMahasiswa}</ModalPrint>
                    </div>
                </div>
            </div>
        </main>
    )
        
}