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
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
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
        let temp = await axios.get("http://localhost:8080/movie/statistics?page=0");
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
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
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