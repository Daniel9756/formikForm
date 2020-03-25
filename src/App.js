import React from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import "./App.css";
import axios from "axios";

const createAccount = ({
  values,
  errors,
  touched,
  isSubmitting,
  handleSubmit
}) => {
  return (
    <Form className="form_section">
      <h1 className="headline"> Employees Account </h1>
      <p>
        Required fields are followed by
        <strong>
          <abbr title="required">*</abbr>
        </strong>
        .
      </p>
      <br />
      <p>
        <label for="firstName">
          <span>First name:</span>
          <strong>
            <abbr title="required">*</abbr>
          </strong>
        </label>
        <Field
          className="field"
          type="firstName"
          name="firstName"
          placeholder="Your Firstname"
        />
        {touched.firstName && errors.firstName && (
          <p className="error">{errors.firstName}</p>
        )}
      </p>
      <p>
        <label for="lastName">
          <span>Last name:</span>
          <strong>
            <abbr title="required">*</abbr>
          </strong>
        </label>
        <Field
          className="field"
          type="lastName"
          name="lastName"
          placeholder="Your Lastname"
        />
        {touched.lastName && errors.lastName && (
          <p className="error">{errors.lastName}</p>
        )}
      </p>
      <p>
        <label for="email">
          <span>E-mail:</span>
          <strong>
            <abbr title="required">*</abbr>
          </strong>
        </label>
        <Field
          className="field"
          type="email"
          name="email"
          placeholder="Your Email Address"
        />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
      </p>

      <p>
        <label for="password">
          <span>Password:</span>
          <strong>
            <abbr title="required">*</abbr>
          </strong>
        </label>
        <Field
          className="field"
          type="password"
          name="password"
          placeholder="Your Password"
        />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
      </p>
      <p>
        <label for="gender">
          <span>Gender:</span>
        </label>
        <Field className="select"  component="select" name="gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Field>
      </p>
      <p>
        <label for="department">
          <span>Department:</span>
          <strong>
            <abbr title="required">*</abbr>
          </strong>
        </label>
        <Field
          className="field"
          type="department"
          name="department"
          placeholder="Your Department"
        />
        {touched.department && errors.department && (
          <p className="error">{errors.department}</p>
        )}
      </p>
      <p>
        <label for="address">
          <span>Address:</span>
          <strong>
            <abbr title="required">*</abbr>
          </strong>
        </label>
        <Field
          className="field"
          type="address"
          name="address"
          placeholder="Your Address"
        />
        {touched.address && errors.address && (
          <p className="error">{errors.address}</p>
        )}
      </p>

      <p>
        <label for="isAdmin">
          <span>isAdmin:</span>
        </label>
        <Field className="check" type="checkbox" name="isAdmin" checked={values.isAdmin} />
      </p>
      <p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <p className="handlesummit_error">{errors.message}</p>
      </p>
    </Form>
  );
};

const App = withFormik({
  mapPropsToValues({
    firstName,
    lastName,
    email,
    password,
    gender,
    jobRole,
    department,
    address,
    isAdmin
  }) {
    return {
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      password: password || "",
      gender: gender || "Male",
      jobRole: jobRole || "",
      department: department || "",
      address: address || "",
      isAdmin: isAdmin || false
    };
  },
  validationSchema: yup.object().shape({
    firstName: yup
      .string()
      .min(2, "Name must be atleast 2 character long")
      .required("Name is required"),
    lastName: yup
      .string()
      .min(2, "Name must be atleast 2 character long")
      .required("Name is required"),
    email: yup.string().email("Text must be a valid email address"),
    password: yup
      .string()
      .min(8, "It must be 8 character or longer")
      .required("Password is required"),

    address: yup
      .string()
      .min(3, "Please enter a valid address")
      .required("Address is required")
  }),
  handleSubmit: (values, { resetForm, setErrors }) => {
    axios
      .post("http://localhost:5000/users/signup", values)
      .then(response => {})
      .catch(error => {
        setErrors({
          message: "Invalid user input"
        });
      });
    resetForm();
  }
})(createAccount);

export default App;
