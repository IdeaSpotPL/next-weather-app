import styles from '@/styles/Home.module.css';
import {useEffect, useState} from "react";
import {LoadingScreen} from "@/components/LoadingScreen";
import {ErrorScreen} from "@/components/ErrorScreen";
import {Search} from "@/components/Search";
import {MainCard} from "@/components/MainCard";
import {ContentBox} from "@/components/ContentBox";
import {Header} from "@/components/Header";
import {DateAndTime} from "@/components/DateAndTime";
import {MetricsBox} from "@/components/MetricsBox";
import {UnitSwitch} from "@/components/UnitSwitch";

const App = () => {
    const [cityInput, setCityInput] = useState('Szczecin');
    const [triggerFetch, setTriggerFetch] = useState(true);
    const [weatherData, setWeatherData] = useState();
    const [unitSystem, setUnitSystem] = useState('metric');

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("api/data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cityInput }),
            });
            const data = await res.json();
            setWeatherData({...data});
            setCityInput("");
        };
        getData();
        console.log(weatherData);
    }, [triggerFetch]);


    const changeSystem = () =>
        unitSystem === "metric"
            ? setUnitSystem("imperial")
            : setUnitSystem("metric");

    return weatherData && !weatherData.message ? (
        <div className={styles.wrapper}>
            <MainCard
                city={weatherData.name}
                country={weatherData.sys.country}
                description={weatherData.weather[0].description}
                iconName={weatherData.weather[0].icon}
                unitSystem={unitSystem}
                weatherData={weatherData}
            />

            <ContentBox>
                <Header>
                    <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
                    <Search
                        placeHolder="Search a city..."
                        value={cityInput}
                        onFocus={(e) => {
                            e.target.value = "";
                            e.target.placeholder = "";
                        }}
                        onChange={(e) => setCityInput(e.target.value)}
                        onKeyDown={(e) => {
                            e.keyCode === 13 && setTriggerFetch(!triggerFetch);
                            e.target.placeholder = "Search a city...";
                        }}
                    />
                </Header>
                <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
                <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
            </ContentBox>
        </div>
    ) : weatherData && weatherData.message ? (
        <ErrorScreen errorMessage="City not found, try again!">
            <Search
                onFocus={(e) => (e.target.value = "")}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyDown={(e) => e.keyCode === 13 && setTriggerFetch(!triggerFetch)}
            />
        </ErrorScreen>
    ) : (
        <LoadingScreen loadingMessage={"Loading data..."} />
    );
};

export default App;
