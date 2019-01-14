import React from "react";
import { Subscribe } from "unstated";
import AuthContainer from "./AuthContainer";
const WithAuthContainer = (Component) => {
    return class extends React.Component {
        render(){
            return(
                <Subscribe to={[AuthContainer]}>
                    {(auth: AuthContainer) => (
                        <Component {...this.props} auth={auth} />
                    )}
                </Subscribe>
            )
        }
    };
};

export default WithAuthContainer;