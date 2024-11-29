import { Card, CardContent } from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, Pie, PieChart, Sector } from "recharts";
import {
  NoChartConfigurationError,
  NoDataAvailableError,
} from "./ChartErrorComponents";
import React, { useState } from "react";

import { PieSectorDataItem } from "recharts/types/polar/Pie";

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
  showLegend?: boolean;
};

export function NutritionsPieChart({
  chartConfig,
  chartData,
  showTotalNutritions = true,
  showLegend = false,
}: NutritionsPieChartProps) {
  if (!chartConfig) {
    return <NoChartConfigurationError />;
  }

  if (!chartData || chartData.length === 0) {
    return <NoDataAvailableError />;
  }
  const totalNutritions = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.nutritions, 0);
  }, []);

  const [activeIndex, setActiveIndex] = useState(-1);
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            {showLegend && (
              <ChartLegend
                layout="vertical"
                verticalAlign="top"
                align="right"
                additive="sum"
                onMouseEnter={(_, index) => {
                  setActiveIndex(index);
                }}
                onMouseLeave={() => {
                  setActiveIndex(-1);
                }}
              />
            )}

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
              activeIndex={activeIndex}
              onMouseEnter={(_, index) => {
                setActiveIndex(index);
              }}
              onMouseLeave={() => {
                setActiveIndex(-1);
              }}
              activeShape={({ ...props }: PieSectorDataItem) => (
                <Sector {...props} fillOpacity={0.65} />
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
                          KCAL
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
