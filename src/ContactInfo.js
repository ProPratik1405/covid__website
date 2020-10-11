import React, { useEffect, useState } from "react";
import "./ContactInfo.css";

function ContactInfo() {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    fetch(`https://api.rootnet.in/covid19-in/contacts`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInfos(data.data.contacts.regional);
      });
  }, []);
  return (
    <div>
      <div className="table">
        <h1>Contact and HelpLine Information</h1>
        {infos.map((info) => (
          <tr>
            <td>{info.loc}</td>
            <td>{info.number}</td>
          </tr>
        ))}
      </div>
    </div>
  );
}

export default ContactInfo;
