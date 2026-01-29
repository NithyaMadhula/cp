import React from 'react';

//Styles
import {
  ContactContainer,
  ImageHeader,
  ContactInputContainer,
  ContactHeader,
  ContactInput
} from './styles';

const ContactIgtRep = () => {
  return (
    <ContactContainer>
      <ImageHeader>
        <h2>From insights to innovation, your trusted gaming partner.</h2>
      </ImageHeader>
      <ContactInputContainer>
        <ContactHeader>
          <h3>Contact Your IGT Representative</h3>
          <p>
            Looking for guided assitance looking for a game that's right for
            you? Contact a representative with the form below.
          </p>
        </ContactHeader>
        <ContactInput>
          <input type="email" placeholder="Your Email" name="email" required />
          <input
            type="text"
            placeholder="Company/Organization"
            name="company"
            required
          />
          <input type="text" placeholder="Client Id" name="clientid" required />
          <button>Submit</button>
        </ContactInput>
      </ContactInputContainer>
    </ContactContainer>
  );
};

export default ContactIgtRep;
