import BarChart from "./BarChart";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MovieStatisticChart() {

    const [userData, setUserData] = useState({
        labels: "",
        datasets: [
            {
                label: "",
                data: "",
                backgroundColor: [
                    "red", "green", "blue", "orange", "brown","purple", "pink", "teal", "gray", "cyan"
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    });

    useEffect( ()  => {
        console.log('aaaaaaaaaaaaaa');
        getUserData();
    }, []);

    const getUserData = async () => {
        let temp = await axios.get("http://localhost:8080/movie/statistics/top20?page=0");
        let movies = temp.data.content;
        console.log(movies);
        setUserData({
            labels: movies.map((data) => data.movie_name),
            datasets: [
                {
                    axis: 'y',
                    label: "Top phim có doanh thu cao nhất",
                    data: movies.map((data) => data.revenue),
                    backgroundColor: [
                        "red", "green", "blue", "orange", "brown","purple", "pink", "teal", "gray", "cyan"
                    ],

                },
            ],
        })
    }

    return (

        <div>
            <div style={{ width: 700 }}>
                <BarChart chartData={userData} />
            </div>
        </div>
    );
}