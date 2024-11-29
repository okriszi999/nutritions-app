import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, Pie, PieChart, Sector } from "recharts";

import { PieSectorDataItem } from "recharts/types/polar/Pie";
import React from "react";

export type Nutritions = "protein" | "fat" | "carbs";

export type NutritionChartData = {
  nutrition: Nutritions;
  nutritions: number;
  fill: string;
}[];

export type NutritionsPieChartProps = {
  chartData: NutritionChartData;
  chartConfig: ChartConfig;
  showTotalNutritions?: boolean;
  highlightBiggestChunk?: boolean;
};

export function NutritionsPieChart({
  chartConfig,
  chartData,
  highlightBiggestChunk = false,
  showTotalNutritions = false,
}: NutritionsPieChartProps) {
  const totalNutritions = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.nutritions, 0);
  }, []);
  return (
    <div>
      chart
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="nutritions"
            nameKey="nutrition"
            innerRadius={60}
            strokeWidth={5}
            activeIndex={0}
            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
              <Sector
                {...props}
                outerRadius={outerRadius + (highlightBiggestChunk ? 10 : 0)}
              />
            )}
          >
            <Label
              content={({ viewBox }) => {
                if (!showTotalNutritions) return;
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalNutritions.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Visitors
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
