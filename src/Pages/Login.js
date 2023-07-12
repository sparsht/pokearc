import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { isValidEmail, isValidPassword, httpPost } from "../utils";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export default function Login() {
    useEffect(() => {
        localStorage.clear();
    }, []);
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState({
        email: "",
        password: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        let errors = Object.values(error);
        const isError = errors.some((err) => err.length > 0);
        if(isError) {
            return false;
        }

        return httpPost(`${API_BASE_URL}/login`, {
            email: formValues.email,
            password: formValues.password
        }).then(res => res.json()).then((resp) => {
            localStorage.setItem("name", resp.name);
            localStorage.setItem("token", resp.token);
            localStorage.setItem("email", resp.email);
            setFormValues({
                email: "",
                password: ""
            });
            navigate("/");
        });
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setError({...error, [name]: "" });
        setFormValues({ ...formValues, [name]: value });
    }

    function handleBlur(e) {
        const name = e.target.name;
        const value = formValues[name];

        if (e.target.required && !value) {
            setError({ ...error, [name]: "This field is required" });
        } else {
            switch (name) {
                case "email":
                    if (!isValidEmail(value)) {
                        setError({ ...error, email: "Email is not valid" });
                    }
                    break;
                case "password":
                    if (!isValidPassword(value)) {
                        setError({ ...error, password: "Password should be of atleast 8 characters and can contain numbers, alphabets or special characters" });
                    }
                    break;
                default:
                    console.log("default case");
            }
        }
    }

    return (
        <Card className="mx-auto my-5" style={{ width: '25rem', padding: '1.5rem' }}>
        <Card.Title>
            <h5 className="mb-0 text-center">Login</h5>
        </Card.Title>
        <hr />
        <Form onSubmit={handleSubmit} id="login-form">
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Email" value={formValues.email} onChange={handleChange} onBlur={handleBlur} required />
                {error.email && <div className="error text-danger px-2 mt-1"><small>{error.email}</small></div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" value={formValues.password} onChange={handleChange} onBlur={handleBlur} required />
                {error.password && <div className="error text-danger px-2 mt-1"><small>{error.password}</small></div>}
            </Form.Group>
            <div className="text-center">
                <Button type="submit" variant="outline-primary">Login</Button>
            </div>
        </Form>
    </Card>
    );
};