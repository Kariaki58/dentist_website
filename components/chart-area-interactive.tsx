"use client"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useState, useEffect } from "react";

interface ChartData {
    month: string;
    bookings: number;
    cancellations: number;
}

interface ChartConfig {
    bookings: {
        label: string;
        color: string;
    };
    cancellations: {
        label: string;
        color: string;
    };
}

export function ChartAreaInteractive() {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            
            const response = await fetch(`/api/bookings/analytics`, {
                method: "GET"
            });
            
            if (!response.ok) {
                return;
            }
            
            const data: ChartData[] = await response.json();
            setChartData(data);
        } catch (error) {
            setError("Failed to fetch analytics data. Please try again later.");
        }
    }

    if (error) {
        return (
            <div className="bg-white border-2 p-4 shadow-md rounded-xl h-96 w-full flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }
    
    const chartConfig: ChartConfig = {
        bookings: {
            label: "Bookings",
            color: "hsl(var(--chart-1))",
        },
        cancellations: {
            label: "Cancellations",
            color: "hsl(var(--chart-2))",
        },
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (chartData.length === 0) {
        return <div className="bg-white border-2 p-4 shadow-md rounded-xl h-96 w-full flex items-center justify-center">
            <p>Loading analytics data...</p>
        </div>;
    }

    return (
        <ChartContainer config={chartConfig} className="bg-white border-2 p-4 shadow-md rounded-xl flex justify-between items-start gap-3 text-gray-600 h-96 w-full">
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value: string) => value.slice(0, 3)}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    width={40}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                    dataKey="bookings"
                    type="natural"
                    fill="var(--color-bookings)"
                    fillOpacity={0.4}
                    stroke="var(--color-bookings)"
                    stackId="a"
                />
                <Area
                    dataKey="cancellations"
                    type="natural"
                    fill="var(--color-cancellations)"
                    fillOpacity={0.4}
                    stroke="var(--color-cancellations)"
                    stackId="a"
                />
            </AreaChart>
        </ChartContainer>
    );
}