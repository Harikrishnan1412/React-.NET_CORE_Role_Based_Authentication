import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

// Creating type to hold data from form
type RegisterFormData = {
    username: string;
    password: string;
    confirmpassword: string;
};


const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    // Create variable using useState with Registerform type fill empty values for form
    const [FormData, setFormData] = useState<RegisterFormData>({
        username: '',
        password: '',
        confirmpassword: '',
    });
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setErrorMessage(''); // Clear error message when the user types
        //Pass previous data in function and update the necessary value "Name" and keep the "Password" and "Conform password" same
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const { username, password, confirmpassword } = FormData;
        console.log(username);
        console.log(password);

        const userobj = {
            "Username": username,
            "Password": password
        };

        // Check password match before submitting
        if (password === confirmpassword) {
            // Add your registration logic here
            fetch("https://localhost:7110/api/Auth/register", {
                method: "POST",
                headers: { 'content-type': "application/json" },
                body: JSON.stringify(userobj)
            }).then((res) => {
                toast.success("Register Success");
                console.log('Registration data:', { username, password });
                navigate('/login');
            }).catch((err) => {
                toast.error("Failed Registeration " + err.message);
            });
            // Reset the form if needed
            setFormData({
                username: '',
                password: '',
                confirmpassword: '',
            });
        } else {
            setErrorMessage('Passwords do not match');
            toast.error("Passwords do not match");
        }

    }



    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center"> Registration Page</h2>
                            <form onSubmit={handleSubmit}>
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
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmpassword"
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                    ></input>
                                </div>
                                <br></br>
                                <button type="submit">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RegisterForm;