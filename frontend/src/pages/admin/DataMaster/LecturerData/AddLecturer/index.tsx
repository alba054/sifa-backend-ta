import { Breadcrumbs, Button, Group, MediaQuery, SimpleGrid, Text } from "@mantine/core"
import { useForm } from "@mantine/form"
import { Link } from "react-router-dom"
import { NumberInput, TextInput } from "../../../../../components/FormInput"
import PageTitle from "../../../../../components/PageTitle"
import AdminAppShell from "../../../../../layouts/AdminAppShell"

const AddLecturer = () => {
    const form = useForm({
        initialValues: {
            homebase: "",
            ttl: "",
            nip: "",
            alamat: "",
            gelarDepan: "",
            nidn: "",
            namaLengkap: "",
            nomorSertifikasi: "",
            gelarBelakang: "",
            bidangKeahlian: "",
        },
        validate: {
            ttl: (value) => (/^[\w]+\, \d{1,2} (Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember) \d{4}/i.test(value) ? null : "Invalid input")
        }
    })
    return (
        <AdminAppShell>
            <MediaQuery smallerThan={"md"} styles={{display: "none"}}>
                <Breadcrumbs>
                    <Link 
                        to={"/admin/master-data/data-dosen"}
                        className="text-primary-500 font-semibold"
                    >
                        Data Dosen
                    </Link>
                    <Text  weight={600} color="primary-text">Tambah Data Dosen</Text>
                </Breadcrumbs>
            </MediaQuery>
            <MediaQuery smallerThan={"md"} styles={{
                marginTop: 0
            }}>
                <>
                    <div>
                        <PageTitle mt="xl">Tambah Data Dosen</PageTitle>
                        <Text size={16} color="primary-text">Setelah mengisi formulir di bawah, tekan tombol <span className="font-bold">Simpan</span> untuk menambahkan data dosen</Text>
                    </div>
                    <form onSubmit={form.onSubmit((values) => console.log(values))}>
                        <SimpleGrid
                        mt={"xl"}
                        verticalSpacing="sm"
                            cols={1}
                            breakpoints={[
                                {
                                    minWidth: "md",
                                    cols: 2
                                }
                            ]}
                        >
                            <TextInput 
                                label="Homebase" 
                                required 
                                {...form.getInputProps("homebase")}
                            />
                            <TextInput 
                                label="Tempat dan tanggal lahir" 
                                placeholder="Misal. Makassar, 30 Februari 1980" 
                                {...form.getInputProps("ttl")}
                            />
                            <NumberInput 
                                label="NIP"
                                required
                                {...form.getInputProps('nip')}
                            />
                            <TextInput 
                                label="Alamat" 
                                {...form.getInputProps('alamat')} 
                            />
                            <TextInput 
                                label="Gelar depan" 
                                placeholder="Misal. Drs., Dr., Prof., dll " 
                                {...form.getInputProps("gelarDepan")}
                            />
                            <NumberInput 
                                label="NIDN" 
                                {...form.getInputProps("nidn")}
                            />
                            <TextInput 
                                label="Nama lengkap" 
                                required
                                {...form.getInputProps("namaLengkap")} 
                            />
                            <TextInput 
                                label="Nomor Sertifikasi"
                                {...form.getInputProps("nomorSertifikasi")}  
                                
                            />
                            <TextInput 
                                label="Gelar Belakang"  
                                placeholder="Misal. S.Kep, M.Kep, Ph.D, dll" 
                                {...form.getInputProps("gelarBelakang")}
                            />
                            <TextInput 
                                label="Bidang Keahlian"
                                {...form.getInputProps("bidangKeahlian")}
                            />
                        </SimpleGrid>
                        <Group mt={"md"} position="right">
                            <Button type="submit" className="bg-primary-500 font-bold text-white">Simpan</Button>
                        </Group>
                    </form>

                </>
            </MediaQuery>
        </AdminAppShell>
    )
}

export default AddLecturer