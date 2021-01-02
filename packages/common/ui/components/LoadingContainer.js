import React from "react";

import { Text } from "theme-ui";
import { Box } from "./Box";
import { Spinner } from "theme-ui";
import { logError } from "../../Logger";

class LoadingContainer extends React.Component {
  processedPromise = React.createRef();
  calledProvideWorkPromise = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      isLoadingInternal: props.provideWorkPromise !== undefined,
      error: null,
    };
  }

  setIsLoading = (value) => this.setState({ isLoadingInternal: value });
  setError = (value) => this.setState({ error: value });

  waitForPromise = (promise) => {
    this.setIsLoading(true);
    promise
      .then(() => {
        this.setIsLoading(false);
      })
      .catch((err) => {
        logError(err);
        this.setError(this.props.errorMessage || "Loading failed.");
        this.setIsLoading(false);
      });
  };

  checkForLoadingPromise = () => {
    if (
      this.props.isLoadingPromise &&
      this.props.isLoadingPromise !== this.processedPromise.current
    ) {
      this.processedPromise.current = this.props.isLoadingPromise;
      this.waitForPromise(this.props.isLoadingPromise);
    }
  };
  componentDidMount() {
    // If we've been given a function that will provide a work promise
    // and we haven't already called it, then call it and wait on it now
    if (
      !this.calledProvideWorkPromise.current &&
      this.props.provideWorkPromise
    ) {
      this.calledProvideWorkPromise.current = true;
      this.waitForPromise(this.props.provideWorkPromise());
    } else {
      this.checkForLoadingPromise();
    }
  }

  componentDidUpdate() {
    this.checkForLoadingPromise();
  }
  componentWillUnmount() {}

  static getDerivedStateFromError(error) {
    if (!error.severity || error.severity === "fail") {
      return { error: "Loading failed." };
    }
  }

  componentDidCatch(error, info) {
    error.componentStack = info.componentStack;
    logError(error);

    if (error.severity == "warn") {
      // this.props.enqueueSnackbar("Something went wrong.");
    }
  }

  render() {
    if (this.state.isLoadingInternal || this.props.isLoading) {
      return (
        <Box full flexCenter>
          <Text color="primary">{this.props.message}</Text>
          <Spinner />
        </Box>
      );
    }
    if (this.state.error) {
      return (
        <Box full flexCenter>
          <Text color="secondary">{this.state.error}</Text>
        </Box>
      );
    } else {
      return this.props.children;
    }
  }
}

export default LoadingContainer;
