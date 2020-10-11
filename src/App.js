import React, { useEffect, useState } from "react";
import "./App.css";
import ContactInfo from "./ContactInfo";
import { Select, FormControl, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";
import MedicalColleges from "./MedicalColleges";
import Side from "./Side";

const Styles = {
  root: {
    marginRight: "2rem",
    backgroundColor: "#056676",
    marginTop: "0.5rem",
  },
};

function App() {
  const useStyles = makeStyles(Styles);
  const [indiaStates, setIndiaStates] = useState([]);
  const [indiaStat, setIndiaStat] = useState("Choose State");
  const [ruralHospitals, setRuralHospitals] = useState();
  const [urbanHospitals, setUrbanHospitals] = useState();
  const [totalHospitals, setTotalHospitals] = useState();
  const [ruralBeds, setRuralBeds] = useState();
  const [urbanBeds, setUrbanBeds] = useState();
  const [totalBeds, setTotalBeds] = useState();
  useEffect(() => {
    fetch(`https://api.rootnet.in/covid19-in/hospitals/beds`)
      .then((res) => res.json())
      .then((data) => {
        setIndiaStates(data.data.regional);
      });
  }, []);

  const handleHospitalChart = (event) => {
    const IndiaState = event.target.value;
    setIndiaStat(IndiaState);
    let Statedata = indiaStates.find((elem) => elem.state === IndiaState);
    console.log(Statedata.ruralHospitals);
    console.log(Statedata.urbanHospitals);
    console.log(Statedata.totalHospitals);

    setRuralHospitals(Statedata.ruralHospitals);
    setUrbanHospitals(Statedata.urbanHospitals);
    setTotalHospitals(Statedata.totalHospitals);
    setRuralBeds(Statedata.ruralBeds);
    setUrbanBeds(Statedata.urbanBeds);
    setTotalBeds(Statedata.totalBeds);
  };

  const hospitalData = {
    labels: ["Rural hospital", "Urban hospital", "total hospitals"],
    datasets: [
      {
        label: `Hospitals in ${indiaStat}`,
        data: [ruralHospitals, urbanHospitals, totalHospitals],
        borderColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };

  const bedData = {
    labels: ["Rural Beds", "Urban Beds", "total Beds"],
    datasets: [
      {
        label: `Beds in ${indiaStat}`,
        data: [ruralBeds, urbanBeds, totalBeds],
        borderColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };
  const classes = useStyles();
  return (
    <div className="App">
      <div className="Navbar">
        <div className="Navbar__logo">COVID-19</div>
        <div className="Navbar__nav">
          <FormControl>
            <Select
              variant="outlined"
              value={indiaStat}
              onChange={handleHospitalChart}
              className={classes.root}
            >
              {indiaStates.map((indiaState) => (
                <MenuItem value={indiaState.state}>{indiaState.state}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <a to="#medicalcolleges" className="nav">
            Medical Colleges
          </a>
          <a href="#about" className="nav">
            Contact Us
          </a>
        </div>
      </div>
      <div className="dashboard">HOSPITAL DASHBOARD</div>
      <div className="charts">
        <div className="chart">
          <div className="data">
            <h2>{indiaStat}</h2>
            <div>No of Rural Hospitals {ruralHospitals}</div>
            <div>No of Urban Hospitals {urbanHospitals}</div>
            <div>No of Total Hospitals {totalHospitals}</div>
          </div>
          <Bar data={hospitalData} />
        </div>
        <div className="chart">
          <div className="data">
            <h2>{indiaStat}</h2>
            <div>No of Rural Beds {ruralBeds}</div>
            <div>No of Urban Beds {urbanBeds}</div>
            <div>No of Total Beds {totalBeds}</div>
          </div>
          <Bar data={bedData} />
        </div>
        <div className="sidebar">
          <ContactInfo />
        </div>
      </div>
      <div className="medicalColleges">
        <MedicalColleges />
        <div className="noti">
          list of all the Notifications and Advisiory Given By the Government
        </div>
        <Side />
      </div>
    </div>
  );
}

export default App;
