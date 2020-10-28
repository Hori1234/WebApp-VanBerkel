import {Redirect, Route, Switch} from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import UploadButton from "../UploadButton/UploadButton";
import AccountManagementLayout from "../AccountManagerLayout/AccountManagementLayout";
import Logout from "../Logout/Logout";
import ManualPlanning from "../ManualPlanning/ManualPlanning";
import ViewPlanning from "../ViewPlanningPageLayout/ViewPlanning";
import DataVisualization from "../DataVisualization/DataVisualization";
import MonthlyDataAnalytics from "../MonthlyDataAnalytics/MonthlyDataAnalytics";
import Home from "../Home/Home";
import React from "react";

/**
 * Defines the routing for the pages in the NavigationLayout component.
 *
 * A private route only shows the component if the logged in user has the correct role.
 *
 * If a url is not matched with one of the routes, the user is redirected to the homepage.
 */
export default function PageRouter() {
    return (
        <Switch>
          <PrivateRoute
              path="/upload"
              requiredRoles={['planner', 'administrator']}>
            <UploadButton />
          </PrivateRoute>
          <PrivateRoute
              path="/account"
              requiredRoles={['administrator']}>
            <AccountManagementLayout />
          </PrivateRoute>
          <Route path="/logout">
            <Logout />
          </Route>
          <PrivateRoute
              path="/planning"
              requiredRoles={['planner', 'administrator']}>
            <ManualPlanning />
          </PrivateRoute>
          <PrivateRoute
              path="/view"
              requiredRoles={['view-only', 'planner', 'administrator']}>
            <ViewPlanning />
          </PrivateRoute>
          <PrivateRoute
              path="/data"
              requiredRoles={['planner', 'administrator']}>
            <DataVisualization />
          </PrivateRoute>
          <PrivateRoute
              path="/monthly"
              requiredRoles={['view-only', 'planner', 'administrator']}
          >
            <MonthlyDataAnalytics/>
          </PrivateRoute>
          <PrivateRoute
              path="/" exact
              requiredRoles={['view-only', 'planner', 'administrator']}>
            <Home />
          </PrivateRoute>
          <Route>
            <Redirect to='/'/>
          </Route>
        </Switch>
    )
}