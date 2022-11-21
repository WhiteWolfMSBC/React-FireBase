import React, { Component } from "react";
import StartFirebase from "../FireBaseConfig/FireBase";
import { ref, set, get, update, remove, child } from "firebase/database";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      db: "",
      username: "",
      fullname: "",
      phoneno: "",
      dob: "",
    };
    this.interface = this.interface.bind(this);
  }

  componentDidMount() {
    this.setState({
      db: StartFirebase(),
    });
  }

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="container-xl container-lg container-md container-sm container-xs">
          {/* Form */}

          <div className="row">
            <div className="col-xl-4 col-lg-3 col-md-2 col-sm-1 col-xs-12"></div>
            <div className="Product-card col-xl-4 col-lg-3 col-md-2 col-sm-1 col-xs-12">

                <p className="text-danger mt-2 fs-3 text-center fw-semibold">
                    DataBase form
                </p>


              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  value={this.state.username}
                  onChange={(e) => {
                    this.setState({ username: e.target.value });
                  }}
                  placeholder="name"
                />
                <label for="floatingInput">Enter Your User Name</label>
              </div>

              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingPassword"
                  value={this.state.fullname}
                  onChange={(e) => {
                    this.setState({ fullname: e.target.value });
                  }}
                  placeholder="fullname"
                />
                <label for="floatingPassword">Enter Your Full Name</label>
              </div>

              <div class="form-floating mb-3">
                <input
                  type="tel"
                  class="form-control"
                  id="floatingInput"
                  value={this.state.phoneno}
                  onChange={(e) => {
                    this.setState({ phoneno: e.target.value });
                  }}
                  placeholder="contact"
                />
                <label for="floatingInput">Enter Your Phone Number</label>
              </div>

              <div class="form-floating">
                <input
                  type="date"
                  class="form-control"
                  id="floatingPassword"
                  value={this.state.dob}
                  onChange={(e) => {
                    this.setState({ dob: e.target.value });
                  }}
                  placeholder="dob"
                />
                <label for="floatingPassword">Enter Your Date Of Birth</label>
              </div>

              <center className="mt-3 mb-3">
                <button
                  className="btn btn-danger px-5 mt-3"
                  id="addBtn"
                  onClick={this.interface}
                >
                  Add Data
                </button> <br />
                <button
                  className="btn btn-primary px-5 mt-3"
                  id="updateBtn"
                  onClick={this.interface}
                >
                  Update Data
                </button> <br />
                <button
                  className="btn btn-warning px-5 mt-3"
                  id="deleteBtn"
                  onClick={this.interface}
                >
                  Delete Data
                </button> <br />
                <button
                  className="btn btn-success px-5 mt-3"
                  id="selectBtn"
                  onClick={this.interface}
                >
                  Get Data From DB
                </button>
              </center>
            </div>
            <div className="col-xl-4 col-lg-3 col-md-2 col-sm-1 col-xs-12"></div>
          </div>
        </div>
      </div>
    );
  }

  interface(event) {
    const id = event.target.id;

    if (id === "addBtn") {
      this.insertData();
    } else if (id === "updateBtn") {
      this.updateData();
    } else if (id === "deleteBtn") {
      this.deleteData();
    } else if (id === "selectBtn") {
      this.selectData();
    }
  }

  getAllInputs() {
    return {
      username: this.state.username,
      name: this.state.fullname,
      phone: Number(this.state.phoneno),
      dob: this.state.dob,
    };
  }

  //Add Data

  insertData() {
    const db = this.state.db;
    const data = this.getAllInputs();

    set(ref(db, "Customer/" + data.username), {
      Fullname: data.name,
      Phonenumber: data.phone,
      dateofbirth: data.dob,
    })
      .then(() => {
        alert("data Added Successfully");
      })
      .catch((error) => {
        alert("Their Is Problem To Add Data" + error);
      });
  }

  // Update data

  updateData() {
    const db = this.state.db;
    const data = this.getAllInputs();

    update(ref(db, "Customer/" + data.username), {
      Fullname: data.name,
      Phonenumber: data.phone,
      dateofbirth: data.dob,
    })
      .then(() => {
        alert("data Added Successfully");
      })
      .catch((error) => {
        alert("Their Is Problem To Add Data" + error);
      });
  }

  // Delete data

  deleteData() {
    const db = this.state.db;
    const data = this.getAllInputs();

    remove(ref(db, "Customer/" + data.username), {
      Fullname: data.name,
      Phonenumber: data.phone,
      dateofbirth: data.dob,
    })
      .then(() => {
        alert("data Added Successfully");
      })
      .catch((error) => {
        alert("Their Is Problem To Add Data" + error);
      });
  }

  // Select data

  selectData() {
    const dbref = ref(this.state.db);
    const username = this.getAllInputs().username;

    get(child(dbref, "Customer/" + username))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.setState({
            fullname: snapshot.val().Fullname,
            phoneno: snapshot.val().Phonenumber,
            dob: snapshot.val().dateofbirth,
          });
        } else {
          alert("No Data Found");
        }
      })
      .catch((error) => {
        alert("There was an Error" + error);
      });
  }
}

export default Form;
