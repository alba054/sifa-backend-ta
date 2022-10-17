import { Accordion, Breadcrumbs, Button, Grid, Group, MediaQuery, Space, Stack, Table, Text, Title} from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDownloadOutline, EditOutline, IconColorScheme } from "../../../assets/Icons/Fluent";
import LecturerAppShell from "../../../layouts/LecturerAppShell";
import Modal from './Modal'

const Circle = () => {
    return (
        <div className="w-[6px] h-[6px] rounded-full bg-primary-text-500" />
    )
}

const Portfolio = () => {
    enum PortfolioAccoridionValue{
        pelaksanaanPembelajaran = "pelaksanaan-pembelajaran",
        hasilEvaluasi = "hasil-evaluasi",
        analisisDanRefleksi = "analisis-dan-refleksi"
    }

    const [accordionValue, setAccordionValue] = useState<string|null>(null);
    const [isEvaluateModalOpen, setEvaluateModalOpen] = useState<boolean>(false)
    const [isAnalyticModalOpen, setAnalyticModalOpen] = useState<boolean>(false)

    return (
        <>
        <LecturerAppShell>
            <MediaQuery smallerThan={"md"} styles={{display: "none"}}>
                <Breadcrumbs>
                    <Link 
                        to={"/nilai"}
                        className="text-primary-500 font-semibold"
                    >
                        Nilai Dosen
                    </Link>
                    <Text  weight={600} color="primary-text">Portfolio Ilmu Biomedik Dasar</Text>
                </Breadcrumbs>
            </MediaQuery>
            <MediaQuery smallerThan={"md"} styles={{marginTop: 0}}>
             <Group position="apart" mt={"xl"}>
                <Group align={"flex-start"}>
                    <Stack spacing={0}>
                        <Title size={32} color="primary-text">Portfolio Ilmu Biomedik Dasar</Title>
                        <Group align={"center"} spacing={'xs'}>
                            <Text weight={300} color="secondary-text">21R01110105</Text>
                            <Circle />
                            <Text weight={300} color="secondary-text">Prodi Ilmu Keperawatan</Text>
                        </Group>
                    </Stack>
                </Group>
                <Button 
                    className="font-bold text-primary-text-500 border-[#CACCCE]" 
                    variant="outline" 
                    leftIcon={
                        <ArrowDownloadOutline 
                            color={
                                IconColorScheme.primaryText} 
                        />}>
                    Download Manual Dosen
                </Button>
             </Group>
            </MediaQuery>

            <div className="mt-10">
                <div className="rounded-t-lg w-full bg-primary-500 h-[72px] flex items-center px-8">
                    <Text color="white" size={22} weight={600}>Informasi Kelas</Text>
                </div>
                <div className="border-2 border-t-0 border-[#dfdfdf] rounded-b-md px-5 py-3 md:px-3">
                    <MediaQuery smallerThan={"sm"} styles={{
                        display: "none"
                    }}>
                        <Grid p={"md"} className="text-primary-text-500  border-[#dfdfdf] rounded-b-md">
                            <Grid.Col span={3}><span className="font-bold">Program Studi</span></Grid.Col>
                            <Grid.Col span={9}><span>: Ilmu Keperawatan</span></Grid.Col>

                            <Grid.Col span={3}><span className="font-bold">Mata Kuliah</span></Grid.Col>
                            <Grid.Col span={9}><span>: Ilmu Biomedik Dasar</span></Grid.Col>

                            <Grid.Col span={3}><span className="font-bold">Kode Matakuliah</span></Grid.Col>
                            <Grid.Col span={9}><span>: 21R01110105</span></Grid.Col>

                            <Grid.Col span={3}><span className="font-bold">Koordinator Matakuliah</span></Grid.Col>
                            <Grid.Col span={9}><span>: -</span></Grid.Col>

                            <Grid.Col span={3}><span className="font-bold">Anggota Tim Dosen Matakuliah</span></Grid.Col>
                            <Grid.Col span={9}><span>: Syahrul, S.Kep,. Ns., M.Kes., Ph.D, Dr. Kadek Ayu Erika, S.Kep.,
                                Ns.,M.Kes., Dr. Takdir Tahir, S.Kep.,NS.,M....</span></Grid.Col>
                        </Grid>
                    </MediaQuery>
                    <MediaQuery largerThan={"sm"} styles={{
                        display: "none"
                    }}>
                        <Stack className="text-primary-text-500">
                            <Stack spacing={5}>
                                <Title order={4} weight="bold">Program Studi</Title>
                                <Text ml="md">Ilmu Keperawatan</Text>
                            </Stack>
                            <Stack spacing={5}>
                                <Title order={4} weight="bold">Mata Kuliah</Title>
                                <Text ml="md">Ilmu Biomedik Dasar</Text>
                            </Stack>
                            <Stack spacing={5}>
                                <Title order={4} weight="bold">Kode Matakuliah</Title>
                                <Text ml="md">21R01110105</Text>
                            </Stack>
                            <Stack spacing={5}>
                                <Title order={4} weight="bold">Koordinator Matakuliah</Title>
                                <Text ml="md"> -</Text>
                            </Stack>
                            <Stack spacing={5}>
                                <Title order={4} weight="bold">Anggota Tim Dosen Matakuliah</Title>
                                <Text ml="md">Syahrul, S.Kep,. Ns., M.Kes., Ph.D, Dr. Kadek Ayu Erika, S.Kep.,
                                Ns.,M.Kes., Dr. Takdir Tahir, S.Kep.,NS.,M....</Text>
                            </Stack>
                        </Stack>
                    </MediaQuery>
                </div>
            </div>
            <Space h={32} />

            <Title order={2} size={28} weight={400} color="primary-text">
                Daftar Rubrik Portfolio
            </Title>
            <Accordion classNames={{
                chevron: "text-primary-500"
            }}
            value={accordionValue}
            onChange={setAccordionValue}
            >
                <Accordion.Item className="p-0 md:p-3 shadow-md rounded-md " my="md" value={PortfolioAccoridionValue.pelaksanaanPembelajaran}>
                    <Accordion.Control>
                        <Title 
                            order={3} 
                            size={24} 
                            color={`${accordionValue === PortfolioAccoridionValue.pelaksanaanPembelajaran ? "primary" : 'primary-text'}`}  
                            weight={600}>
                            A. Pelaksanaan Pembelajaran
                        </Title>
                    </Accordion.Control>
                    <Accordion.Panel >
                        <Title order={4} weight={600} size={20} color="primary-text">
                            1. Jumlah dan presentase kehadiran dosen dan mahasiswa
                        </Title>
                        <div className="grow basis-0 block overflow-x-auto whitespace-nowrap     mb-3 overflow-y-auto">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Kelas</th>
                                        <th>Kehadiran Dosen</th>
                                        <th>Kehadiran Mahasiswa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>A</td>
                                        <td>
                                            <Grid>
                                                <Grid.Col span={8}>
                                                    <span className="text-primary-text-500">Syahrul, S.Kep,. Ns., M.Kes., ...</span>
                                                </Grid.Col>
                                                <Grid.Col span={4}>
                                                    <Group noWrap align={"center"} spacing="xs">
                                                        <span className="text-primary-text-500">: 4 Kali (16.0 jam)</span>
                                                        <EditOutline  size={16} />
                                                    </Group>
                                                </Grid.Col>
                                                <Grid.Col span={8}>
                                                    <span className="text-primary-text-500">Syahrul, S.Kep,. Ns., M.Kes., ...</span>
                                                </Grid.Col>
                                                <Grid.Col span={4}>
                                                    <Group noWrap align={"center"} spacing="xs">
                                                        <span className="text-primary-text-500">: 4 Kali (16.0 jam)</span>
                                                        <EditOutline  size={16} />
                                                    </Group>
                                                </Grid.Col>
                                                <Grid.Col span={8}>
                                                    <span className="text-primary-text-500">Syahrul, S.Kep,. Ns., M.Kes., ...</span>
                                                </Grid.Col>
                                                <Grid.Col span={4}>
                                                    <Group noWrap align={"center"} spacing="xs">
                                                        <span className="text-primary-text-500">: 4 Kali (16.0 jam)</span>
                                                        <EditOutline  size={16} />
                                                    </Group>
                                                </Grid.Col>
                                            </Grid>
                                            <Text weight={600} mt="xl" color={"primary-text"}>Total Pertemuan: 100.00% dengan jumlah 37 jam.</Text>
                                        </td>
                                        <td >
                                            <MediaQuery smallerThan={"xl"} styles={{
                                                display:"none"
                                            }}>
                                                <Grid className="text-primary-text-500">
                                                    <Grid.Col span={4}>
                                                        <span className="text-primary-text-500">Jumlah Mahasiswa</span>
                                                    </Grid.Col>
                                                    <Grid.Col span={8}>
                                                        <Group noWrap align={"center"}>
                                                            <span className="text-primary-text-500">: 72 orang</span>
                                                            <EditOutline size={16} color={IconColorScheme.primaryText} className="cursor-pointer"  />
                                                        </Group>
                                                    </Grid.Col>

                                                    <Grid.Col span={4}>
                                                        <span className="text-primary-text-500">Kehadiran &ge; 80%</span>
                                                    </Grid.Col>
                                                    <Grid.Col span={8}>
                                                        <Group noWrap align={"center"}>
                                                            <span className="text-primary-text-500">: 66 orang (91.7%)</span>
                                                            <EditOutline size={16} color={IconColorScheme.primaryText} className="cursor-pointer"  />
                                                        </Group>
                                                    </Grid.Col>

                                                    <Grid.Col span={4}>
                                                        <span className="text-primary-text-500">Kehadiran &#60; 80%</span>
                                                    </Grid.Col>
                                                    <Grid.Col span={8}>
                                                        <Group noWrap align={"center"}>
                                                            <span className="text-primary-text-500">: 5 orang (6.9%)</span>
                                                            <EditOutline size={16} color={IconColorScheme.primaryText} className="cursor-pointer"  />
                                                        </Group>
                                                    </Grid.Col>
                                                </Grid>
                                            </MediaQuery>
                                            <MediaQuery largerThan={"xl"} styles={{
                                                display: 'none'
                                            }}>
                                                <Stack className="text-primary-text-500" ml={"md"}>
                                                    <Stack spacing={5}>
                                                        <Text weight={600}>Jumlah Mahasiswa</Text>
                                                        <Group noWrap>
                                                            <Text ml="md">72 orang</Text>
                                                            <EditOutline size={16} color={IconColorScheme.primaryText} className="cursor-pointer"  />
                                                        </Group>
                                                    </Stack>
                                                    <Stack spacing={5}>
                                                        <Text weight={600}>Kehadiran &ge; 80%</Text>
                                                        <Group noWrap>
                                                            <Text ml="md">66 orang (91.7%)</Text>
                                                            <EditOutline size={16} color={IconColorScheme.primaryText} className="cursor-pointer"  />
                                                        </Group>
                                                    </Stack>
                                                    <Stack spacing={5}>
                                                        <Text weight={600}>Kehadiran &#60; 80%</Text>
                                                        <Group noWrap>
                                                            <Text ml="md">66 orang (91.7%)</Text>
                                                            <EditOutline size={16} color={IconColorScheme.primaryText} className="cursor-pointer"  />
                                                        </Group>
                                                    </Stack>
                                                </Stack>
                                            </MediaQuery>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                        <Title order={4} weight={600} size={20} color="primary-text">
                            2. Metode pembelajaran yang dilaksanakan
                        </Title>
                        <div className="bg-[#f9fafc] rounded-t-xl border-2 border-[#dfdfdf] p-5">
                            <Group position="apart" align={'center'} noWrap>
                                <Title order={4} color="primary-text">Metode Pembelajaran yang dilaksanakan</Title>
                                <EditOutline
                                    color={IconColorScheme.primaryText} 
                                    onClick={() => setEvaluateModalOpen(true)} 
                                    className="cursor-pointer"
                                />
                            </Group>
                        </div>
                        <div className="h-64 overflow-y-auto p-5 border-2  border-[#dfdfdf] border-t-0 rounded-b-xl">
                            <p>1. Kuliah tatap muka</p>

                            <p>1. Kuliah tatap muka</p>
                            <p>2. Diskusi</p>
                            <p>3. Case-Study</p>
                            <p>4. Praktikum / Clinical Skill Lab</p>
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item className="p-0 md:p-3 shadow-md rounded-md" my="md" value={PortfolioAccoridionValue.hasilEvaluasi}>
                    <Accordion.Control>
                        <Title 
                            order={3} 
                            size={24}  
                            color={`${accordionValue === PortfolioAccoridionValue.hasilEvaluasi ? "primary" : 'primary-text'}`} 
                            weight={600}>
                            B. Hasil Evaluasi (Survei) Pembelajaran
                        </Title>
                    </Accordion.Control>
                </Accordion.Item>

                <Accordion.Item className="p-0 md:p-3 shadow-md rounded-md" my="md" value={PortfolioAccoridionValue.analisisDanRefleksi}>
                    <Accordion.Control>
                        <Title 
                            order={3} 
                            size={24} 
                            color={`${accordionValue === PortfolioAccoridionValue.analisisDanRefleksi ? "primary" : 'primary-text'}`} 
                            weight={600}
                            >
                            C. Analisis dan Refleksi
                        </Title>
                    </Accordion.Control>
                    <Accordion.Panel>
                    <div className="bg-[#f9fafc] rounded-t-xl border-2 border-[#dfdfdf] p-5">
                            <Group position="apart" align={'center'}>
                                <Title order={4} weight={600} color="primary-text">Analisis dan Refleksi</Title>
                                <EditOutline 
                                    color={IconColorScheme.primaryText}
                                    onClick={() => setAnalyticModalOpen(true)} 
                                    className="cursor-pointer"
                                />
                            </Group>
                        </div>
                        <div className="h-64 text-primary-text-500 overflow-y-auto p-5 border-2  border-[#dfdfdf] border-t-0 rounded-b-xl">
                            <ol className="list-decimal">
                                <li className="mx-5">Dari ketiga CPMK yang dibebankan pada mata kuliah, skor yang dihasilkan oleh mahasiswa, semua CPMK masuk ke kategori kurang memuaskan, dimana persentase mahasiswa yang mencapai nilai di atas 80 untuk CPMK 1, 2 dan 3 berturut turut adalah hanya 18.57%, 48,57% dan 48,57%</li>
                                <li className="mx-5">Refleksi: Hal tersebut kemungkina besar disebabkan oleh materi pembelajaran yang sangat luas dan metode asesmen sebagian besar bersumber dari ujian tengah dan ujian akhir semester.</li>
                            </ol>
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </LecturerAppShell>

        {
            isEvaluateModalOpen && <Modal isShown={isEvaluateModalOpen} onClose={() => {
                setEvaluateModalOpen(false)
            }} />
        }
        {
            isAnalyticModalOpen && <Modal isShown={isAnalyticModalOpen} onClose={() => {
                setAnalyticModalOpen(false)
            }} />
        }
        
        </>
    )
}

export default Portfolio;