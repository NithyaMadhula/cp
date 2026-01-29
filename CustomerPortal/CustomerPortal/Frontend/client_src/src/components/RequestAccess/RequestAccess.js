import React, { useState } from "react";

//Styles
import {
  RequestAccessForm,
  InputsLeft,
  InputsRight,
  InputContainer,
  FormHeader,
  FormSubmit,
  FormSubmitDisabled,
  RequiredWarning,
  invalidEmail,
} from "./styles";

//Components
import ErrorDisplay from "../Errors/ErrorDisplay";
import SuccessNotification from "../SuccessNotifcations/SuccessNotification";
import Loading from "../Loading/Loading";

//Email Validation
const email_validator = require("email-validator");

const validateEmail = (evt, setEmailIsValid) => {
  const { target } = evt;
  let validated = email_validator.validate(target.value);

  validated ? setEmailIsValid(true) : setEmailIsValid(false);
};
//

//Set Input Values Into State
const setInputValue = (evt, action) => {
  const { target } = evt;
  action(target.value);
};
//

//Close error display
const closeErrorDisplay = (setEmailError) => setEmailError(false);
//

//Close success display
const closeSuccessDisplay = (setSuccessDisplay) => setSuccessDisplay(false);

//Fetch Request (send email)
const sendEmail = (body, setSuccessDisplay, setEmailError, setIsLoading) => {
  setSuccessDisplay(true);
  return;

  //Map through body object, if any field is undefined, return false.
  let keys = Object.keys(body);

  let valid_body = () => {
    let notValid;
    keys.forEach((key) => {
      if (!body.key) {
        notValid = false;
      }
    });
    if (!notValid) {
      return true; //return body is true
    } else {
      return false; //return body is false
    }
  };

  if (valid_body()) {
    const url = "/user/email";
    const fetchConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    //Set loading display
    setIsLoading(true);

    fetch(url, fetchConfig)
      .then((res) => {
        const { status } = res;
        if (status === 200) {
          setSuccessDisplay(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setEmailError(true);
        setIsLoading(false);
      });
  } else {
    return setEmailError(true);
  }
};

const RequestAccess = () => {
  //Actions
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [successDisplay, setSuccessDisplay] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //Values
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [emailAdd, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [clientId, setClientId] = useState();
  const [company, setCompany] = useState();

  // Create a form body from the state input values
  let formBody = {
    firstName,
    lastName,
    emailAdd,
    phone,
    clientId,
    company,
  };

  const getBody = () => {
    const body = encodeURIComponent(`Account Access Request\n
      Company: ${formBody.company} ${formBody.clientId ? formBody.clientId : ""}
      Name: ${formBody.firstName} ${formBody.lastName}
      Email: ${formBody.emailAdd}
      Phone: ${formBody.phone}
    `);

    return body;
  };

  return (
    <RequestAccessForm>
      {isLoading ? <Loading message="Your email is sending!" /> : null}
      {successDisplay ? (
        <SuccessNotification
          message="Please use the generated email to request access."
          closeAction={() => window.location.assign(window.location.origin)}
        />
      ) : null}

      {emailError ? (
        <ErrorDisplay
          closeAction={() => {
            closeErrorDisplay(setEmailError);
          }}
          message="The email failed to send! Please try again."
        />
      ) : null}

      <FormHeader>
        <h4>Request Access</h4>
        <p>
          Clients of IGT are able to gain access to advanced analytics and
          metrics, pending account approval. To request access, simply fill out
          this form to contact an IGT representative.
        </p>
      </FormHeader>

      <InputContainer>
        <InputsLeft>
          <input
            name="firstName"
            type="text"
            placeholder="First Name*"
            onChange={(evt) => {
              setInputValue(evt, setFirstName);
            }}
            required
          />

          <input
            name="emailAdd"
            style={!emailIsValid ? invalidEmail : null}
            type="email"
            placeholder="Email*"
            onChange={(evt) => {
              validateEmail(evt, setEmailIsValid);
              setInputValue(evt, setEmail);
            }}
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company / Organization*"
            onChange={(evt) => {
              setInputValue(evt, setCompany);
            }}
            required
          />
        </InputsLeft>
        <InputsRight>
          <input
            name="lastName"
            type="text"
            placeholder="Last Name*"
            onChange={(evt) => {
              setInputValue(evt, setLastName);
            }}
            required
          />
          <input
            type="tel"
            name="phone"
            onChange={(evt) => {
              setInputValue(evt, setPhone);
            }}
            placeholder="Phone*"
            required
          />
          <input
            name="clientId"
            type="text"
            placeholder="Client ID"
            onChange={(evt) => {
              setInputValue(evt, setClientId);
            }}
          />
        </InputsRight>
      </InputContainer>
      {formBody.emailAdd &&
      formBody.phone &&
      formBody.firstName &&
      formBody.lastName &&
      formBody.company ? (
        <a
          href={`mailto:InstantsShowcase@IGT.com?body=${getBody()}&subject=InstantsShowcase.IGT.com - Request Account Access`}
        >
          <FormSubmit
            type="button"
            onClick={() =>
              sendEmail(
                formBody,
                setSuccessDisplay,
                setEmailError,
                setIsLoading
              )
            }
          >
            Send
          </FormSubmit>
        </a>
      ) : (
        <FormSubmitDisabled type="button">Send</FormSubmitDisabled>
      )}
      <RequiredWarning>*Required fields</RequiredWarning>
    </RequestAccessForm>
  );
};

export default RequestAccess;
