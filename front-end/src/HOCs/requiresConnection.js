import React, { useEffect } from "react";

import Login from "../components/Login/Login";
import "../index.scss";

const url = process.env.REACT_APP_SOCKET_URL || "ws://localhost:3040";

const requiresConnection = Component =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        ws: undefined,
        user: null
      };
    }
    connect = () => {
      this.setState({
        ws: new WebSocket(url)
      });
    };

    login = user => {
      this.setState({
        user
      });
    };

    render() {
      // if user is not logged in, return Login page
      if (this.state.user === null) {
        return <Login login={this.login} />;
      }

      // if websocket is connected, render HomeScreen
      if (this.state.ws !== undefined) {
        return <Component ws={this.state.ws} />;
      } else {
        return <Connect connect={this.connect} props={this.props} />;
      }
    }
  };

const Connect = ({ connect, props }) => {
  useEffect(() => {
    connect();
  }, [connect]);

  return (
    <div>
      <h2>Attempting to connect . . .</h2>
    </div>
  );
};

export default requiresConnection;
