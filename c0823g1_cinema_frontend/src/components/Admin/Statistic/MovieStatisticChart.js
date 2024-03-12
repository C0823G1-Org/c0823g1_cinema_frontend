import BarChart from "./BarChart";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MovieStatisticChart() {

    const [userData, setUserData] = useState({
        labels: [], // Mảng chứa nhãn của các điểm dữ liệu
        datasets: [
            {
                label: "Doanh thu",
                data: [], // Mảng chứa doanh thu của các điểm
                backgroundColor: [
                    "red", "green", "blue", "orange", "brown", "purple", "pink", "teal", "gray", "cyan"
                ],
                borderColor: "black",
                borderWidth: 2,
            },
            {
                label: "Số vé bán được",
                data: [], // Mảng chứa số vé bán được của các điểm
                backgroundColor: [
                    "lightcoral", "lightgreen", "lightblue", "lightsalmon", "lightseagreen",
                    "mediumpurple", "lightpink", "mediumturquoise", "lightgray", "lightcyan"
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/movie/statistics?page=0");
                const movies = response.data.content;

                setUserData({
                    labels: movies.map((data) => data.movie_name),
                    datasets: [
                        {
                            label: "Doanh thu",
                            data: movies.map((data) => data.revenue),
                            backgroundColor: [
                                "red", "green", "blue", "orange", "brown", "purple", "pink", "teal", "gray", "cyan"
                            ],
                        },
                        {
                            label: "Số vé bán được",
                            data: movies.map((data) => data.sold_ticket),
                            backgroundColor: [
                                "lightcoral", "lightgreen", "lightblue", "lightsalmon", "lightseagreen",
                                "mediumpurple", "lightpink", "mediumturquoise", "lightgray", "lightcyan"
                            ],
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);



    return (

        <div>
            <div style={{ width: 700 }}>
                <BarChart chartData={userData} />
            </div>
        </div>
    );
}