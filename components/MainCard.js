import Image from "next/image";
import styles from "./MainCard.module.css";
import {ctoF} from "@/services/converters";

export const MainCard = ({
                             city,
                             country,
                             description,
                             iconName,
                             unitSystem,
                             weatherData
                         }) => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.location}>
                {city}, {country}
            </h1>
            <p className={styles.description}>{description}</p>
            <Image
                width={200}
                height={200}
                src={`https://openweathermap.org/img/wn/${iconName}@2x.png`}
                alt="weatherIcon"
            />
            <h1 className={styles.temperature}>
                {unitSystem === "metric"
                    ? Math.round(weatherData.main.temp)
                    : Math.round(ctoF(weatherData.main.temp))}
                °{unitSystem === "metric" ? "C" : "F"}
            </h1>
            <p>
                Feels like{" "}
                {unitSystem === "metric"
                    ? Math.round(weatherData.main.feels_like)
                    : Math.round(ctoF(weatherData.main.feels_like))}
                °{unitSystem === "metric" ? "C" : "F"}
            </p>
        </div>
    );
};
