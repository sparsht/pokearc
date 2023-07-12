import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { isValidName, isValidEmail, isValidPhone, isValidPassword, httpPost } from '../utils';

const API_URL = process.env.REACT_APP_API_URL;

export default function SignUp() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        mobile_no: "",
        password: "",
        confirm_password: "",
        gender: ""
    });

    const [error, setError] = useState({
        name: "",
        email: "",
        mobile_no: "",
        password: "",
        confirm_password: "",
        gender: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setError({...error, [name]: "" });
        setFormValues({ ...formValues, [name]: value });
    }

    function handleBlur(e) {
        const name = e.target.name;
        const value = formValues[name]
        if (e.target.required && !value) {
            setError({ ...error, [name]: "This field is required" });
        } else {
            switch (name) {
                case "name":
                    if (!isValidName(value)) {
                        setError({ ...error, name: "Name can only contain alphabets or spaces" });
                    }
                    break;
                case "email":
                    if (!isValidEmail(value)) {
                        setError({ ...error, email: "Email is not valid" });
                    }
                    break;
                case "mobile_no":
                    if (!isValidPhone(value)) {
                        setError({ ...error, mobile_no: "Mobile No is not valid" });
                    }
                    break;
                case "password":
                    if (value && formValues.confirm_password) {
                        if (value !== formValues.confirm_password) {
                            setError({ ...error, confirm_password: "Confirm password should be same as password" });
                        }
                    }
                    if (!isValidPassword(value)) {
                        setError({ ...error, password: "Password should be of atleast 8 characters and can contain numbers, alphabets or special characters" });
                    }
                    break;
                case "confirm_password":
                    if (formValues.password !== formValues.confirm_password) {
                        setError({ ...error, confirm_password: "Confirm password should be same as password" });
                    }
                    break;
                default:
                    console.log("default case");
            }
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        let errors = Object.values(error);
        const isError = errors.some((err) => err.length > 0);
        if(isError) {
            return false;
        }
        const postBody = {
            name: formValues.name,
            email: formValues.email,
            mobile_no: formValues.mobile_no,
            password: formValues.password,
            gender: formValues.gender
        };

        return httpPost(`${API_URL}/users`, postBody).then((res) => res.json()).then((val) => {
            navigate('/login');
            setFormValues({
                name: "",
                email: "",
                mobile_no: "",
                password: "",
                confirm_password: "",
                gender: ""
            });
        }).catch((err) => console.log(err));
       
    }

    return (
        <Card className="mx-auto my-5" style={{ width: '27rem', padding: '1.5rem' }}>
            <Card.Title>
                <h5 className="mb-0 text-center">Sign Up</h5>
            </Card.Title>
            <hr />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Name" value={formValues.name} onChange={handleChange} onBlur={handleBlur} required />
                    {error.name && <div className="error text-danger px-2 mt-1"><small>{error.name}</small></div>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Email" value={formValues.email} onChange={handleChange} onBlur={handleBlur} required />
                    {error.email && <div className="error text-danger px-2 mt-1"><small>{error.email}</small></div>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="mobile_no">
                    <Form.Label>Mobile No</Form.Label>
                    <Form.Control name="mobile_no" type="text" placeholder="Mobile No" value={formValues.mobile_no} onChange={handleChange} onBlur={handleBlur} required />
                    {error.mobile_no && <div className="error text-danger px-2 mt-1"><small>{error.mobile_no}</small></div>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" value={formValues.password} onChange={handleChange} onBlur={handleBlur} required />
                    {error.password && <div className="error text-danger px-2 mt-1"><small>{error.password}</small></div>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirm_password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control name="confirm_password" type="password" placeholder="Confirm Password" value={formValues.confirm_password} onChange={handleChange} onBlur={handleBlur} required />
                    {error.confirm_password && <div className="error text-danger px-2 mt-1"><small>{error.confirm_password}</small></div>}
                </Form.Group>
                <Form.Label>Gender</Form.Label>
                <div className="mb-3">
                    <Form.Check inline label="Male" name="gender" type="radio" id="male" value="male" onChange={handleChange} required />
                    <Form.Check inline label="Female" name="gender" type="radio" id="female" value="female" onChange={handleChange} required />
                    <Form.Check inline label="Other" name="gender" type="radio" id="other" value="other" onChange={handleChange} required />
                    {error.gender && <div className="error text-danger px-2 mt-1"><small>{error.gender}</small></div>}
                </div>
                <div className="text-center">
                    <Button type="submit" variant="outline-primary">Sign Up</Button>
                </div>
            </Form>
        </Card>
    );
};