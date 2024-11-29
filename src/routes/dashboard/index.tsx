import { createFileRoute } from "@tanstack/react-router";
import {
  NutritionChartData,
  NutritionsPieChart,
} from "@/components/charts/NutritionsPieChart";
import { ChartConfig } from "@/components/ui/chart";
import {
  NutritionBarChartData,
  NutritionsBarChart,
} from "@/components/charts/NutritionsBarChart";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { chartData: dailyPieChartData, chartConfig: dailyPieChartConfig } =
    getNutritionsPieChartData();
  const { chartData: weeklyBarChartData, chartConfig } =
    getNutritionsBarChartData("weekly");

  const { chartData: monthlyBarChartData } =
    getNutritionsBarChartData("monthly");

  return (
    <div>
      {/* <NutritionsWeeklyBarChart /> */}
      <div className="grid grid-flow-col grid-cols-2 gap-4 min-h-[25rem]">
        <NutritionsBarChart
          weeklyChartData={weeklyBarChartData}
          monthlyChartData={monthlyBarChartData}
          mode="weekly"
          chartConfig={chartConfig}
        />
        <NutritionsPieChart
          chartData={dailyPieChartData}
          chartConfig={dailyPieChartConfig}
          showLegend
        />
      </div>
    </div>
  );
}

function getNutritionsBarChartData(type: "weekly" | "monthly" = "weekly") {
  const weeklyChartData = [
    { month: "Mon", kcal: 2167 },
    { month: "Tue", kcal: 2358 },
    { month: "Wed", kcal: 2421 },
    { month: "Thu", kcal: 2345 },
    { month: "Fri", kcal: 2456 },
    { month: "Sat", kcal: 2345 },
    { month: "Sun", kcal: 2456 },
  ];

  // This is a dummy data for monthly chart, iterate from jan to dec, with random kcal values that are between 2000 and 2500 multiplied by the length of the month
  const monthlyChartData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(0, i).toLocaleString("en", { month: "short" });
    return { month, kcal: Math.floor(Math.random() * 500 + 2000) * 30 };
  }) as NutritionBarChartData;

  const chartData = type === "weekly" ? weeklyChartData : monthlyChartData;

  const chartConfig = {
    kcal: {
      label: "kcal",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return { chartData, chartConfig };
}

function getNutritionsPieChartData() {
  const chartData = [
    { nutrition: "protein", nutritions: 643, fill: "hsl(var(--chart-1))" },
    { nutrition: "fat", nutritions: 803, fill: "hsl(var(--chart-2))" },
    { nutrition: "carbs", nutritions: 384, fill: "hsl(var(--chart-3))" },
  ] as NutritionChartData;

  const chartConfig = {
    nutritions: {
      label: "Nutritions",
    },
    protein: {
      label: "Protein",
      color: "hsl(var(--chart-1))",
    },
    fat: {
      label: "Fat",
      color: "hsl(var(--chart-2))",
    },
    carbs: {
      label: "Carbs",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return { chartData, chartConfig };
}
