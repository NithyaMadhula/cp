//SUMMARY: checks if user isAuthenticated to show or hide PrivateRoutes. True = show content, False = redirect to Login
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { userCanAnalytics } from "./shared/utils/functions"; // Import the user authorization function

const PrivateRoute = ({ component: Component, path, ...rest }) => {

    const { user } = useSelector((state) => state.user);
    const canAccessAnalytics = localStorage.getItem("analytics")

    const canAnalytics = userCanAnalytics(user?.profile?.name);

    return (
        //if(?) user is true return target Route, else(:) Redirect to login

        <Route
            path={path}
            {...rest}
            render={(props) =>
                path === "/analytics" ? ( // For Analytics route
                    user && (userCanAnalytics(user?.profile?.name)) ? ( // Check if user is authenticated and has access to analytics
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                    pathname: "/", 
                            }}
                        />
                    )
                ) : ( // For other routes
                    user ? ( // Check if user is authenticated
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/authentication/login",
                            }}
                        />
                    )
                )
            }
        />
    );
};
//Expose PrivateRoute to application
export default PrivateRoute;
