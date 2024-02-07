import React, {useState} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

type LoginFormData = {
    username:string;
    password:string;
}



const LoginForm: React.FC = () =>{
    const navigate = useNavigate();
    const[logindata, setlogindata] = useState<LoginFormData>({
        username:'',
        password:'',
    })

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = event.target;
        //Pass previous data in function and update the necessary value "Name" and keep the "Password" and "Conform password" same
        setlogindata((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleSubmit =(event:React.FormEvent) => {
        event.preventDefault();
        const {username,password} = logindata;
        console.log(username);
        console.log(password);
        if (username !== " " && password !== " ") {
            // Add your registration logic here
            if (username === " ") {
              console.log("Empty username");
            }
            const inputobj = {
              "Username": username,
              "Password": password
            };
            fetch("https://localhost:7110/api/Auth/login", {
              method: "POST",
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(inputobj)
            }).then((res) => {
              return res.json();
            }).then((resp) => {
              console.log(resp.jwtToken);
              console.log(resp.role);
            //   console.log('login data:', { username, password });
            //   if (resp.jwtToken !== null) {
            //     console.log("Login success");
                toast.success("Login success!!!");
                sessionStorage.setItem('Jwttoken',resp.jwtToken);
                navigate('/');
                // let jwttoken: string = resp.jwtToken;
                // console.log("Jwttoken before userole fetch");
                // console.log(jwttoken);
            //   }
            }
            )
              }
    }
    // https://localhost:7110/api/Auth/register

    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center"> Login Page</h2>
                            <form onSubmit={handleSubmit}>
                                {/* form-control is to align text-feld correctly */}
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                    ></input>
                                </div>
                                <br></br>
                                <button type="submit">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;