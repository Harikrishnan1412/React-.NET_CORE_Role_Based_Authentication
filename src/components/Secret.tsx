import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Secret: React.FC = () => {
    const[message,setmessage] = useState('')
    const[status,setstatus] = useState<number>();
    let jwttoken = sessionStorage.getItem('Jwttoken');
    useEffect(() => {
        fetch("https://localhost:7110/WeatherForecast", {
            headers: {
              Authorization: 'bearer ' + jwttoken
            }   
          }).then(
            response => {
                console.log("Inside Response");
                console.log(response.status);
                setstatus(response.status);
              return response.text();
            }
          )
          
          .then(
            data => {
              console.log("Role from API");
              console.log(data);
              if(data!=null)
              {
                setmessage(data);
              }
              if(status === 403)
              {
                setmessage("You are forbidden to see the Secret");
              }
            }
          ).catch((error) => {
            console.log(error)
          });
    });

    return (
        <div>
            <h1 className="text-center">{message}</h1>
        </div>
    )
}
export default Secret;