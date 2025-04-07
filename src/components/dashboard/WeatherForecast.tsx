
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Wind } from "lucide-react";

// This would normally be fetched from a weather API
const weatherData = [
  {
    day: "Today",
    date: "Apr 7",
    icon: Sun,
    temp: "24°C",
    condition: "Sunny",
    precipitation: "0%",
    humidity: "45%",
    wind: "5 km/h",
  },
  {
    day: "Tomorrow",
    date: "Apr 8",
    icon: Cloud,
    temp: "22°C",
    condition: "Partly Cloudy",
    precipitation: "10%",
    humidity: "50%",
    wind: "8 km/h",
  },
  {
    day: "Wednesday",
    date: "Apr 9",
    icon: CloudRain,
    temp: "19°C",
    condition: "Rain Showers",
    precipitation: "60%",
    humidity: "75%",
    wind: "12 km/h",
  },
  {
    day: "Thursday",
    date: "Apr 10",
    icon: CloudRain,
    temp: "18°C",
    condition: "Rain",
    precipitation: "80%",
    humidity: "85%",
    wind: "15 km/h",
  },
  {
    day: "Friday",
    date: "Apr 11",
    icon: Cloud,
    temp: "20°C",
    condition: "Overcast",
    precipitation: "20%",
    humidity: "65%",
    wind: "10 km/h",
  },
];

export function WeatherForecast() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <p className="text-sm text-muted-foreground">Location: Greenfield Farm</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {weatherData.map((day, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="p-3">
              <CardTitle className="text-sm">{day.day}</CardTitle>
              <CardDescription className="text-xs">{day.date}</CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="flex flex-col items-center justify-center">
                <day.icon className="h-8 w-8 mb-2" />
                <p className="text-lg font-bold">{day.temp}</p>
                <p className="text-xs">{day.condition}</p>
                <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <span className="text-muted-foreground">Precip:</span>
                  <span>{day.precipitation}</span>
                  <span className="text-muted-foreground">Humidity:</span>
                  <span>{day.humidity}</span>
                  <span className="text-muted-foreground">Wind:</span>
                  <span>{day.wind}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-xs text-muted-foreground">
        <p>Weather data is for demonstration only. Connect to a real weather API for live updates.</p>
      </div>
    </div>
  );
}
