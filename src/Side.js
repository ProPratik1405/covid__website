import React, { Component } from "react";
import "./Side.css";

export class Side extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      isLoaded: false,
      items2: [],
    };
  }

  componentDidMount() {
    fetch("https://api.rootnet.in/covid19-in/notifications")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json.data.notifications,
        });
      });
  }

  render() {
    const { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>The data is loading....</div>;
    } else {
      return (
        <div className="side">
          <div className="Sidetable">
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Link</th>
            </tr>
            {items.map((item) => (
              <tr>
                <td>{item.title.substring(0, 10)}</td>
                <td>{item.title.substring(10, item.title.length)}</td>
                <td>
                  <a href={item.link}>{item.link}</a>
                </td>
              </tr>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default Side;
