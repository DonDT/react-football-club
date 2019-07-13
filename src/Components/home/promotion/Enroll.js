import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import FormField from "../../ui/formFields";
import { validate } from "../../ui/minsc";
import { firebasePromotions } from "../../../firebase";

class Enroll extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formdata: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validationMessage: ""
      }
    }
  };

  resetFormSuccess(type) {
    const newFormData = { ...this.state.formdata };
    for (let key in newFormData) {
      newFormData[key].value = "";
      newFormData[key].valid = false;
      newFormData[key].validationMessage = "";
    }

    this.setState({
      formError: false,
      formdata: newFormData,
      formSuccess: type ? "Congratulations!" : "Already on the database"
    });
    this.successMessage();
  }

  successMessage() {
    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
    }, 2000);
  }

  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }
    if (formIsValid) {
      firebasePromotions
        .orderByChild("email")
        .equalTo(dataToSubmit.email)
        .once("value")
        .then(snapshot => {
          if (snapshot.val() === null) {
            firebasePromotions.push(dataToSubmit);
            this.resetFormSuccess(true);
          } else {
            this.resetFormSuccess(false);
          }
        });
    } else {
      this.setState({
        formError: true
      });
    }
  }

  updateForm(element) {
    const newFormData = { ...this.state.formdata };
    const newElement = { ...newFormData[element.id] };
    newElement.value = element.event.target.value;

    let validData = validate(newElement);

    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormData[element.id] = newElement;

    this.setState({ formError: false, formdata: newFormData });
  }

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={event => this.submitForm(event)}>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
              <FormField
                id={"email"}
                formdata={this.state.formdata.email}
                change={element => this.updateForm(element)}
              />
              {this.state.formError ? (
                <div className="error_label">
                  {" "}
                  Something went wrong, try again
                </div>
              ) : null}
              <div className="success_label">{this.state.formSuccess}</div>
              <button onClick={event => this.submitForm(event)}>Enroll</button>
              <div className="enroll_discl">
                Our Products and services comes as a recommendation and are not
                intended to be fault free. Also we would treat customer data
                with high respect and responsibility
              </div>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
