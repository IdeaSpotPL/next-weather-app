import {degToCompass} from "@/services/converters";
import {
    getTime,
    getAMPM,
    getVisibility,
    getWindSpeed,
} from "@/services/helpers";
import {MetricsCard} from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({weatherData, unitSystem}) => {
    return (
        <div className={styles.wrapper}>
            <MetricsCard
                title={"Humidity"}
                iconSrc={"/icons/humidity.svg"}
                metric={weatherData.main.humidity}
                unit={"%"}
            />
            <MetricsCard
                title={"Wind speed"}
                iconSrc={"/icons/wind.svg"}
                metric={getWindSpeed(unitSystem, weatherData.wind.speed)}
                unit={unitSystem === "metric" ? "m/s" : "m/h"}
            />
            <MetricsCard
                title={"Wind direction"}
                iconSrc={"/icons/compass.svg"}
                metric={degToCompass(weatherData.wind.deg)}
            />
            <MetricsCard
                title={"Visibility"}
                iconSrc={"/icons/binoculars.svg"}
                metric={getVisibility(unitSystem, weatherData.visibility)}
                unit={unitSystem === "metric" ? "km" : "miles"}
            />
            <MetricsCard
                title={"Sunrise"}
                iconSrc={"/icons/sunrise.svg"}
                metric={getTime(
                    unitSystem,
                    weatherData.sys.sunrise,
                    weatherData.timezone
                )}
                unit={getAMPM(
                    unitSystem,
                    weatherData.sys.sunrise,
                    weatherData.timezone
                )}
            />
            <MetricsCard
                title={"Sunset"}
                iconSrc={"/icons/sunset.svg"}
                metric={getTime(
                    unitSystem,
                    weatherData.sys.sunset,
                    weatherData.timezone
                )}
                unit={getAMPM(unitSystem, weatherData.sys.sunset, weatherData.timezone)}
            />
        </div>
    );
};
