import React, {useEffect, useState} from "react";
import {Bar, Pie} from "react-chartjs-2";
import Chart from 'chart.js/auto';
import axios from "axios";

 export default function BarChart() {
     const [userData, setUserData] = useState({
         labels: [],
         datasets: [
             {
                 label: "Doanh thu",
                 data: [],
                 backgroundColor: [
                     "red", "green", "blue", "orange", "brown", "purple", "pink", "teal", "gray", "cyan"
                 ],
                 borderColor: "black",
                 borderWidth: 2,
             },
             {
                 label: "Số vé bán được ",
                 data: [],
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
                             label: "Top 20 phim",
                             data: movies.map((data) => data.revenue),
                             backgroundColor: [
                                 'rgba(255, 99, 132, 1)',
                                 'rgba(54, 162, 235, 1)',
                                 'rgba(255, 206, 86, 1)',
                                 'rgba(75, 192, 192, 1)',
                                 'rgba(153, 102, 255, 1)',
                                 'rgba(255, 159, 64, 1)',
                                 'rgba(255, 0, 0, 1)',
                                 'rgba(0, 255, 0, 1)',
                                 'rgba(0, 0, 255, 1)',
                                 'rgba(128, 0, 128, 1)',
                                 'rgba(255, 255, 0, 1)',
                                 'rgba(0, 255, 255, 1)',
                                 'rgba(255, 0, 255, 1)',
                                 'rgba(128, 128, 128, 1)',
                                 'rgba(0, 0, 0, 1)',
                                 'rgba(255, 140, 0, 1)',
                                 'rgba(0, 128, 0, 1)',
                                 'rgba(0, 0, 128, 1)',
                                 'rgba(165, 42, 42, 1)',
                                 'rgba(0, 128, 128, 1)'                             ],
                         },
                         {
                             label: "Số vé bán được",
                             data: movies.map((data) => data.sold_ticket),
                             backgroundColor: [
                                 'rgba(70, 130, 180, 1)',
                                 'rgba(210, 105, 30, 1)',
                                 'rgba(255, 20, 147, 1)',
                                 'rgba(0, 128, 0, 1)',
                                 'rgba(255, 215, 0, 1)',
                                 'rgba(0, 128, 128, 1)',
                                 'rgba(128, 0, 0, 1)',
                                 'rgba(255, 69, 0, 1)',
                                 'rgba(0, 191, 255, 1)',
                                 'rgba(255, 99, 71, 1)',
                                 'rgba(124, 252, 0, 1)',
                                 'rgba(240, 230, 140, 1)',
                                 'rgba(70, 130, 180, 1)',
                                 'rgba(255, 165, 0, 1)',
                                 'rgba(255, 192, 203, 1)',
                                 'rgba(173, 216, 230, 1)',
                                 'rgba(255, 228, 196, 1)',
                                 'rgba(0, 255, 127, 1)',
                                 'rgba(255, 250, 205, 1)',
                                 'rgba(255, 222, 173, 1)',
                                 'rgba(152, 251, 152, 1)',
                                 'rgba(255, 250, 240, 1)'
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
        <>
            <Bar data={userData} />
        </>
    );
}

