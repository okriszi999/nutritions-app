import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

import { createFileRoute } from "@tanstack/react-router";
import {
  NutritionChartData,
  NutritionsPieChart,
} from "@/components/charts/NutritionsPieChart";
import { ChartConfig } from "@/components/ui/chart";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
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
  return (
    <div>
      <Button>Click me</Button>
      <ModeToggle />
      <div className="flex flex-col">
        <h1>Dashboard</h1>
        <h2>Dashboard</h2>
        <h3>Dashboard</h3>
        <h4>Dashboard</h4>
        <h5>Dashboard</h5>
        <h6>Dashboard</h6>
      </div>

      <NutritionsPieChart chartConfig={chartConfig} chartData={chartData} />
    </div>
  );
}
