"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  NoChartConfigurationError,
  NoDataAvailableError,
} from "./ChartErrorComponents";
import { Button } from "../ui/button";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const assignFillToChartData = (data: any[]) => {
  const MIN_COLORS = 1;
  const MAX_COLORS = 6;
  return data.map((item, index) => {
    const colorIndex = (index % (MAX_COLORS - MIN_COLORS)) + MIN_COLORS;
    return {
      ...item,
      fill: `hsl(var(--chart-${colorIndex}))`,
    };
  });
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  protein: {
    label: "Protein",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export type NutritionBarChartData = {
  month: string;
  kcal: number;
}[];

type NutritionsWeeklyBarChartProps = {
  chartConfig: ChartConfig;
  weeklyChartData: NutritionBarChartData;
  monthlyChartData: NutritionBarChartData;
  mode: "weekly" | "monthly";
};

export function NutritionsBarChart({
  chartConfig,
  weeklyChartData,
  monthlyChartData,
  mode,
}: NutritionsWeeklyBarChartProps) {
  const [chartMode, setChartMode] = useState<typeof mode>(mode);

  if (!chartConfig) {
    return <NoChartConfigurationError />;
  }

  if (!weeklyChartData?.length || !monthlyChartData?.length) {
    return <NoDataAvailableError />;
  }

  const chartData = assignFillToChartData(
    chartMode === "weekly" ? weeklyChartData : monthlyChartData
  );

  return (
    <Card>
      <Button
        onClick={() =>
          setChartMode(chartMode === "monthly" ? "weekly" : "monthly")
        }
      >
        Switch to {chartMode === "weekly" ? "monthly" : "weekly"} view
      </Button>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="kcal" radius={8}>
              <LabelList
                position="bottom"
                offset={-20}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
