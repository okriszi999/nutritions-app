import { Card, CardContent } from "../ui/card";

export function NoChartConfigurationError() {
  return (
    <Card>
      <CardContent className="grid place-items-center h-full">
        <p className="text-sm text-gray-500">Configuration is required.</p>
      </CardContent>
    </Card>
  );
}

export function NoDataAvailableError() {
  return (
    <Card>
      <CardContent className="grid place-items-center h-full">
        <p className="text-sm text-gray-500">No data available</p>
      </CardContent>
    </Card>
  );
}
