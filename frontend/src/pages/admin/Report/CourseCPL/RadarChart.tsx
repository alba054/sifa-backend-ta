import { AspectRatio, Text } from "@mantine/core";
import { ArrowDownloadOutline, IconColorScheme } from "../../../../assets/Icons/Fluent";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ChartData
  } from 'chart.js';
  import { Radar } from 'react-chartjs-2';
  
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

interface IRadarChartProps{
    title: string;
    data:  ChartData<"radar", number[]|null , unknown>;
    color: "red" | "blue"
}

const RadarChart = ({title, data, color="blue"}: IRadarChartProps) => {
    
    return (
        <div className="w-full max-w-[600px]">
            <div className={`w-full ${color === "blue" ? "bg-primary-500" : "bg-error-500"} h-4 rounded-t-full`}/>
            <div className="border border-[#dfdfdf] rounded-b-md border-t-0">
                <div className="py-3 px-5 flex justify-between border-b border-[#dfdfdf] ">
                    <Text size={22} color="primary-text" weight={600}>{title}</Text>
                    <div className="w-8 h-8 flex items-center justify-center bg-secondary-500 cursor-pointer rounded-md">
                        <ArrowDownloadOutline color={IconColorScheme.primary} size={18} />
                    </div>
                </div>
                <div className="px-5 md:px-0">
                    <AspectRatio ratio={1} className="max-w-md mx-auto" my={"xl"}>
                        <Radar  options={{
                            scales: {
                                r: {
                                    min: 0,
                                    max: 100,
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 20
                                    }
                                },
                            },
                            plugins: {
                                legend: {
                                    display: false
                                }
                            }
                        }}  data={data} />
                    </AspectRatio>
                </div>
            </div>
        </div>
    )
}

export default RadarChart;