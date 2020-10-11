import React, { useEffect, useState } from "react";
import "./MedicalColleges.css";
import { TextField } from "@material-ui/core";

function MedicalColleges() {
  const [medicalColleges, setMedicalColleges] = useState([]);
  const [filterState, setFilterState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetch(`https://api.rootnet.in/covid19-in/hospitals/medical-colleges`)
      .then((res) => res.json())
      .then((data) => {
        setMedicalColleges(data.data.medicalColleges);
      });
  }, []);

  const handleState = (event) => {
    const data = medicalColleges.filter((state) => {
      return state.state === event.target.value;
    });
    console.log(data);
    if (data !== []) {
      setIsLoading(true);
    }
    setFilterState(data);
    console.log(data);
    console.log(typeof data);
  };

  const handleType = (event) => {
    console.log(event.target.type);
  };
  return (
    <div class="college">
      <div>
        <TextField
          label="State Name"
          variant="outlined"
          onChange={handleState}
          style={{
            marginLeft: "2rem",
            marginTop: "3rem",
            marginBottom: "2rem",
          }}
        />
        <TextField
          label="Type"
          variant="outlined"
          onChange={handleType}
          style={{
            marginLeft: "2rem",
            marginTop: "3rem",
            marginBottom: "2rem",
          }}
        />
      </div>
      <div className="collegeTable">
        <table>
          <tr>
            <td>State</td>
            <td>Name of College</td>
            <td>City</td>
            <td>Admission Capacity</td>
            <td>Hospitals Beds</td>
            <td>OwnerShip</td>
          </tr>
          {/* {isLoading ? (
              {filterState.map((fs) => (
            <tr>
                 <td>{fs.state}</td>
                 <td>{fs.name}</td>
                 <td>{fs.city}</td>
                 <td>{fs.admissionCapacity}</td>
                 <td>{fs.hospitalBeds}</td>
                 <td>{fs.ownership}</td>
            </tr>
              ))}
          ) : <h1>Helo World</h1>} */}
          {medicalColleges.map((medicalCollege) => (
            <tr>
              <td>{medicalCollege.state}</td>
              <td className="name">{medicalCollege.name}</td>
              <td>{medicalCollege.city}</td>
              <td>{medicalCollege.admissionCapacity}</td>
              <td>{medicalCollege.hospitalBeds}</td>
              <td>{medicalCollege.ownership}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default MedicalColleges;
